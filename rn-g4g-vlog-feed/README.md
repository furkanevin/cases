# GeeksForGeeks Reader

React Native (CLI) app that pulls the GeeksForGeeks feed, lets you save articles for offline reading, and gates the saved tab behind biometrics or a PIN.

## What's in here

- Feed screen with infinite scroll, pull-to-refresh, and skeleton loaders.
- "Save offline" toggle on each card, persisted to AsyncStorage.
- WebView for opening articles, with a small toolbar (back / share / open in browser).
- Saved tab protected by Face ID / Touch ID / fingerprint, falling back to a 4-digit PIN stored in the iOS Keychain or Android Keystore.
- GitHub Actions workflow: lint, typecheck, Jest, signed APK + IPA artifacts. Store-submission notes live in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Getting it running

You'll need:

- Node 22.x
- Ruby 3.2+ via rbenv (system Ruby breaks `pod install`)
- Xcode 16.1+ for iOS, Android Studio + JDK 17 for Android

```bash
git clone <repo-url> && cd rn-rss-feed-case
npm install
cd ios && bundle install && bundle exec pod install && cd ..

npm run ios
# or
npm run android
```

Metro starts automatically with `run-ios` / `run-android`. Run it on its own with `npm start` if you need to.

### Just want to check the code compiles?

```bash
npm run lint
npm run typecheck
npm test
```

These are the same checks CI runs.

### Pre-built APK

CI publishes a signed release APK on every push to `main`. Pull `app-release-apk` from the latest run's Artifacts and install with `adb install` — no Android toolchain needed.

## Layout

```
src/
├─ components/    ArticleCard, SkeletonCard, BiometricGate, PinPad
├─ navigation/    RootNavigator + typed param lists
├─ screens/       Feed, SavedTab, ArticleWebView
├─ services/      rssParser, rssService, storage, secureStorage, biometric
├─ store/         RTK store with feedSlice, savedSlice, authSlice
├─ types/         Article
└─ utils/         readTime / stripHtml
```

### Why Redux Toolkit

Three async flows (initial load, refresh, paged fetch) all want explicit pending/fulfilled/rejected handling and id-based dedupe. RTK gives that for free with `createAsyncThunk` plus typed hooks. Zustand would have worked but I'd be hand-rolling status enums.

### Navigation

Flat root stack with two routes (`Tabs`, `ArticleWebView`). Tabs sit inside the `Tabs` route so the WebView covers both tabs. `TabScreenProps` uses `CompositeScreenProps` so screens inside the tabs still get typed access to root navigation.

### RSS parsing

GeeksForGeeks now serves a Next.js page for `/feed/` instead of XML, so the parser handles both: RSS items if the response looks like XML, otherwise the `__NEXT_DATA__` JSON blob from the homepage. ~50 lines of regex, no extra dep. If we needed Atom or RSS 1.0 I'd swap to `fast-xml-parser`.

### Offline saving

`savedSlice.toggleSaved` is an async thunk that mutates state and writes to AsyncStorage in the same dispatch, so callers don't have to remember to persist. Hydration happens once from `App.tsx` on cold start.

### Biometric gate

1. No PIN set → walk the user through PIN setup + confirm. Without a PIN there's no recovery if biometrics fail.
2. Biometrics available → prompt them. Cancel or failure drops to PIN entry.
3. No biometrics → straight to PIN.
4. 5 failed PIN attempts locks the gate until app restart.
5. Unlock state isn't persisted; cold start re-challenges, and `App.tsx` listens to `AppState` to lock again on background.
6. PINs are FNV-1a hashed before going into the Keychain. Defence-in-depth — the Keychain is hardware-backed, but a 4-digit PIN is too low entropy to leave in plain text.

## Edge cases

- **Duplicate ids across pages** — `feedSlice.seenIds` keeps the same article from rendering twice.
- **`reachedEnd`** — if a paged fetch returns only seen items, stop calling `?paged=N+1`.
- **Pull-to-refresh** — prepends new items rather than replacing, so scroll position stays put.
- **Corrupt AsyncStorage** — dropped instead of crashing the saved tab.
- **WebView in-app history** — toolbar back navigates web history first, then falls through to the nav stack.
- **Share on Android** — `Share.share({ url })` is a no-op there, so the URL is folded into the message body.
- **App-switcher peek** — the `AppState` listener locks the gate the moment the app leaves foreground.
- **Re-auth tolerance** — only re-prompts after 60s in background, so flipping to a password manager doesn't burn Face ID.

## Not in scope

- No splash / onboarding.
- No analytics or Sentry. `DEPLOYMENT.md` notes where they'd plug in.
- No e2e tests. The brief asked for at least 3 unit tests; there are 21 covering the feed reducer, offline persistence, RSS parser, and secure storage. Detox would be the next step.
