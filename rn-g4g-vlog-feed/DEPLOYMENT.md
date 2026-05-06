# Deployment

End-to-end notes for shipping this app to both stores. `$ROOT` is the repo root, anything in `<>` is a placeholder, anything in `BLOCK_CAPS` is an env var or secret.

## 0. Prerequisites

| Thing  | What you need                                                                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Apple  | Apple Developer Program seat ($99/yr), agreements signed in App Store Connect, Team ID handy.                                                                  |
| Google | Google Play Console seat ($25 one-time), with 2-step verification on the owner account. Google rejects developer onboarding without it.                        |
| Local  | Xcode 16.1+ (RN 0.85 toolchain floor), Android Studio + JDK 17, Ruby 3.2 via rbenv or asdf. System Ruby on macOS won't survive `pod install`.                  |
| GitHub | Repo Admin rights, for setting Actions secrets.                                                                                                                |

First time shipping to a region, expect 2–3 working days of review even on a clean build. Build the bundle well before any deadline.

## 1. iOS signing

CI in `.github/workflows/ci.yml` expects to import a distribution certificate and an App Store provisioning profile from secrets. Two options:

- `fastlane match` — encrypted cert + profile in a private git repo. Wire CI to `match decrypt` instead of the base64-import block below.
- Manual export — what's wired in this repo.

### 1a. Create the certificate and profile (one-time)

1. Apple Developer → Certificates → +. Pick "Apple Distribution". Generate the CSR locally with Keychain Access (Certificate Assistant → Request a Certificate from a Certificate Authority). Don't lose the private key. If you do, every existing provisioning profile is dead and the next release will be a day late.
2. Download the `.cer`, double-click to import into login keychain.
3. Export cert + private key as a `.p12` with a strong password. CI imports this.
4. Apple Developer → Identifiers → +. App ID:
   - Bundle ID: `com.awesomeproject` (must match Xcode's `PRODUCT_BUNDLE_IDENTIFIER`).
   - Capabilities: defaults are fine; nothing here uses Push or Sign in with Apple.
5. Profiles → +. App Store distribution profile, attach the App ID from step 4 and the cert from step 1. Download the `.mobileprovision`.

### 1b. App Store Connect record

App Store Connect → My Apps → +:

- Bundle ID matches step 4 above.
- SKU: any unique string (this template uses `awesomeproject-001`).
- User access: Full Access.

### 1c. Wire CI

Repo secrets (Settings → Secrets and variables → Actions):

| Secret                            | What goes in it                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `APPLE_TEAM_ID`                   | 10-char team ID from your developer.apple.com membership page                                                                         |
| `IOS_DIST_CERT_BASE64`            | `base64 -i Distribution.p12`                                                                                                          |
| `IOS_DIST_CERT_PASSWORD`          | password used when exporting the .p12                                                                                                 |
| `IOS_PROVISIONING_PROFILE_BASE64` | `base64 -i AppStore.mobileprovision`                                                                                                  |
| `MATCH_KEYCHAIN_PASSWORD`         | random string used to unlock the temporary CI keychain                                                                                |
| `APPLE_API_KEY_BASE64`            | optional; base64 of an App Store Connect API key (.p8). Only needed if you want CI to upload via altool / fastlane pilot.             |

> macOS Sequoia gotcha: `security set-key-partition-list` started failing silently if the keychain isn't already unlocked in the same shell. The workflow unlocks it explicitly before the partition-list call. Don't reorder those lines.

### 1d. First TestFlight upload

```bash
cd ios
xcodebuild -workspace AwesomeProject.xcworkspace \
  -scheme AwesomeProject \
  -configuration Release \
  -archivePath build/AwesomeProject.xcarchive archive
xcodebuild -exportArchive \
  -archivePath build/AwesomeProject.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/ipa-out
xcrun altool --upload-app -f build/ipa-out/AwesomeProject.ipa \
  --apiKey <KEY_ID> --apiIssuer <ISSUER_ID>
```

The build appears in App Store Connect → TestFlight within ~15 min. The first TestFlight upload also asks for Export Compliance ("Does your app use encryption? Only standard system encryption (HTTPS, Keychain).") — answer yes (exempt), or every build sits at "Missing Compliance" forever.

### 1e. Submitting for review

App Store Connect → App Store tab:

1. Version metadata, screenshots (6.5" and 5.5" are the smallest accepted sizes), keywords, support URL, privacy policy URL.
2. App Privacy. Declare what you collect:
   - "Identifiers — Device ID" if you wire up Sentry/analytics. This template ships none, so declare nothing if you keep it that way.
   - Saved articles are on-device only, so nothing to declare for that.
3. App Review → set a demo PIN so the reviewer can pass the biometric gate (Face ID isn't available in their review rigs). The gate falls back to PIN automatically; supply that PIN in "Sign-in information".
4. Submit. Review is typically 24–48h. Common rejections on similar apps:
   - 2.5.4 — "background modes used without justification". This app doesn't use any; leave Background Modes off.
   - 5.1.1 — missing privacy policy URL. Required for any app using Face ID, even if you collect nothing.
   - 4.0 — biometric prompts must explain why. `NSFaceIDUsageDescription` already covers it.

### 1f. Phased rollout

App Store Connect → "Phased Release for Automatic Updates". 7-day ramp from 1% to 100%. Watch crash reports on day 1 and day 3; that's where most regressions show up.

## 2. Android signing

### 2a. Generate the upload keystore (one-time)

```bash
keytool -genkeypair -v \
  -keystore upload.keystore \
  -alias awesomeproject-upload \
  -keyalg RSA -keysize 2048 -validity 10000
```

Back this keystore up in two places that don't share a failure mode (1Password and an encrypted USB stick on a different drive, for example). Play can reset upload keys via support, but it costs 3–5 days of not being able to ship.

### 2b. Local config

Create `android/keystore.properties` (already gitignored):

```
storeFile=upload.keystore
storePassword=<your store password>
keyAlias=awesomeproject-upload
keyPassword=<your key password>
```

Drop `upload.keystore` next to `android/app/build.gradle`. Build locally:

```bash
cd android
./gradlew assembleRelease
# android/app/build/outputs/apk/release/app-release.apk
```

For Play you need an AAB:

```bash
./gradlew bundleRelease
# android/app/build/outputs/bundle/release/app-release.aab
```

### 2c. Wire CI

Repo secrets:

| Secret                      | Value                       |
| --------------------------- | --------------------------- |
| `ANDROID_KEYSTORE_BASE64`   | `base64 -i upload.keystore` |
| `ANDROID_KEYSTORE_PASSWORD` | store password              |
| `ANDROID_KEY_ALIAS`         | `awesomeproject-upload`     |
| `ANDROID_KEY_PASSWORD`      | key password                |

The workflow decodes the keystore into `android/app/upload.keystore`. Gradle picks up `UPLOAD_STORE_FILE` / `UPLOAD_KEY_*` from the environment.

### 2d. Play Console — first submission

1. Create the app, leave Default Language as `en-US`. Changing it later technically works but breaks links to existing reviews.
2. App content. Fill every row. Play won't let you ship if even one is incomplete (target audience, ads, content rating, data safety, government-app status, etc.).
3. Data safety. Article IDs in AsyncStorage aren't personal data, so the answer to "Does your app collect data?" for this template is No.
4. Internal testing track. Upload the AAB. On first upload, opt into Play App Signing — Google takes over the signing key, your upload key stays yours.
5. Promote Internal → Closed → Open → Production.

> Target SDK gotcha: Google enforces a target-SDK floor every August. Current floor is 34 (Android 14). `targetSdkVersion = 36` here is already future-proof.

### 2e. App Bundle gotchas

- Hermes is on by default; Play splits the bundle by ABI for you.
- ProGuard/R8 is off in this template (`enableProguardInReleaseBuilds = false`) for review ease. Before production, flip it on, run `./gradlew bundleRelease`, sideload the resulting universal APK (`bundletool build-apks --mode=universal`), and smoke-test the full flow — particularly the WebView, since R8 occasionally strips classes that need reflection.
- A rejection seen on similar apps: "your app uses biometrics but does not declare its usage in the data safety section" — declare it under Authentication.

## 3. CI / CD

`.github/workflows/ci.yml` runs on push / PR to `main`, plus `workflow_dispatch` for manual runs. Three jobs:

1. `static-checks` — lint + typecheck + Jest. Fails fast.
2. `android` — needs static-checks. Produces a release APK as the `app-release-apk` artifact. With `ANDROID_KEYSTORE_BASE64` etc. set, the APK is signed with the upload key; otherwise it falls back to debug signing so the pipeline still produces an installable APK on a fresh checkout.
3. `ios` — needs static-checks. Runs on `macos-15` (Xcode 16.x), the minimum RN 0.85 accepts. Always builds an archive; produces a signed IPA only if Apple Developer secrets are present, so forked PRs still validate the iOS build path.

### Performance notes

- Android job skips `lint` and `lintVitalRelease` (`-x lint -x lintVitalRelease`). Release lint added ~12 min of wall time without catching anything static-checks didn't already.
- `GRADLE_OPTS=-Xmx4g`. Default 2 GiB metaspace ran out once `react-native-screens` and `react-native-webview` were added.

### Branching

- `main` is always shippable. Release tags `v1.2.3` cut from `main`.
- A scheduled workflow (`.github/workflows/release.yml`, not in this template — add when you're ready) tags + drafts a GitHub Release every Tuesday and uploads artifacts from the matching `main` build.

### What I'd add next

- `fastlane match` + `fastlane pilot` for automatic TestFlight uploads on every successful main build.
- `fastlane supply` for promoting the Play internal track on the same cadence.
- Sentry source maps + dSYMs. `npx @sentry/wizard` writes the upload step into Gradle and Xcode build phases.
- Detox or Maestro smoke flow against a built APK in CI, gating the release-train workflow on the smoke pass.

## 4. Versioning

Semver mapped to a monotonically increasing build number:

| Bump                                   | iOS `CFBundleShortVersionString` / Android `versionName` | Build number |
| -------------------------------------- | -------------------------------------------------------- | ------------ |
| Patch                                  | 1.2.3 → 1.2.4                                            | always +1    |
| Minor                                  | 1.2.x → 1.3.0                                            | always +1    |
| Major                                  | 1.x.x → 2.0.0                                            | always +1    |
| TestFlight rebuild without code change | unchanged                                                | always +1    |

The build number (`CFBundleVersion` / Android `versionCode`) must only ever go up. Both stores reject re-uploads of an already-seen build number, even if the version string differs.

## 5. Privacy + legal

- Privacy policy URL is required by both stores even if you collect nothing. `github.io` hosting works.
- Apple Privacy Manifest (`PrivacyInfo.xcprivacy`). Required for apps using "Required Reason API"s. This app touches `NSUserDefaults` (via AsyncStorage) and `Keychain`. The included `ios/AwesomeProject/PrivacyInfo.xcprivacy` declares both with their `CA92.1` and `8FFB.1` reasons. Leave it alone unless you add new required-reason APIs.
- Children's apps. If you ever set the age rating to "Made for Kids" on Play, the Family policy locks down WebView content. Don't.

## 6. Troubleshooting

| Symptom                                                                   | Fix                                                                                                                                                       |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pod install` fails with `LoadError - cannot load such file -- xcodeproj` | You're on system Ruby. Install rbenv, `rbenv install 3.2.5`, `rbenv global 3.2.5`, `bundle install`, retry.                                               |
| iOS build: `Multiple commands produce '.../Hermes.framework/Hermes'`      | Stale Pods cache. `rm -rf ios/Pods ios/build && cd ios && pod install`.                                                                                   |
| Android build: `SDK location not found`                                   | Set `ANDROID_HOME` or create `android/local.properties` with `sdk.dir=/Users/<you>/Library/Android/sdk`.                                                  |
| Face ID prompt never appears in Simulator                                 | Simulator → Features → Face ID → Enrolled, then Features → Face ID → "Matching Face". Real devices Just Work.                                             |
| "Cannot find native module 'RNKeychain'"                                  | Did you `pod install` after the dep change? On Android, `cd android && ./gradlew clean`?                                                                  |
| Play upload rejected with "Version code already used"                     | Bump `versionCode` in `android/app/build.gradle` even if the version name didn't change.                                                                  |
| Apple "Invalid Bundle — Disallowed selectors"                             | Pre-built JS bundle has dev-only debugger references. Build with `RCT_NO_LAUNCH_PACKAGER=true` or run `react-native bundle --dev false` before archiving. |

## 7. Submission day

Print this. Tick every box.

```
[ ] versionCode and CFBundleVersion both bumped
[ ] Hermes byte-code crashes reproduced and fixed in dev
[ ] No console.log() / debugger statements in shipping bundle
[ ] All TODO/FIXME with my name resolved
[ ] AsyncStorage migration — old saved-articles JSON still readable?
[ ] Biometric flow tested on a fresh install (no existing PIN)
[ ] Biometric flow tested on a device WITHOUT enrolled biometrics
[ ] Privacy policy URL still resolves (it goes down weirdly often)
[ ] Reviewer demo PIN set and noted in App Review answers
[ ] Release notes drafted — Apple "What's New" and Play "Release notes"
[ ] Crashlytics/Sentry has the new build's dSYMs/source maps
[ ] Smoke-test the *signed* APK and IPA, not the debug build
[ ] Coffee
```
