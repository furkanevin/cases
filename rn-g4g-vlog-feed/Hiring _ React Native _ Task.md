**The assessment task** is divided into three modules, totalling 100 points. You have **72 hours** from the time you receive this email to submit your work.

**Module 1 — GeeksForGeeks article feed (35 pts)**

Build a scrollable feed that fetches the latest articles from the GeeksForGeeks RSS feed: `https://www.geeksforgeeks.org/feed/`

Requirements:

* Parse the RSS feed and display article cards showing title, category tag, and estimated read time  
* Implement infinite scroll with skeleton loaders  
* Add a "save offline" toggle on each card using AsyncStorage  
* On tap, open the article in a native WebView with a custom in-app toolbar (back, share, open-in-browser buttons)

**Module 2 — Native biometric gate (30 pts)**

Protect the "Saved Articles" tab behind native biometric authentication (Face ID / fingerprint).

Requirements:

* Use `react-native-biometrics` or equivalent native module  
* Gracefully fall back to a PIN screen if biometrics are unavailable  
* Store the PIN securely using the iOS Keychain / Android Keystore  
* Provide a screen recording or screenshots showing the flow working on both platforms

**Module 3 — CI/CD and store readiness (35 pts)**

Requirements:

* Provide a GitHub Actions (or Bitrise) workflow that lints, runs tests, and produces a signed APK and IPA  
* Write at least 3 meaningful Jest unit tests covering your feed reducer and offline logic  
* Include a `DEPLOYMENT.md` explaining how to configure signing certificates and submit to both stores — draw on your real experience here

**Technical requirements across all modules**

* All code must be written in TypeScript — avoid `any` types without a comment explaining why  
* Use React Native CLI (not Expo)  
* Target iOS 15+ and Android API 31+  
* State management: Redux Toolkit or Zustand — your choice, but be prepared to justify it  
* Navigation: React Navigation v6 with typed routes  
* Your README must allow a reviewer to run the project in under 5 minutes  
* Include a screen recording or screenshots of the app running on a physical device

**How to submit**

Push your work to a **private GitHub repository** and invite `jimishio` as a collaborator. Reply to this email with the repo link before your deadline.

Email: [jim@shlenpower.com](mailto:jim@shlenpower.com)

Cc: hr@shlenpower.com

Please do not make the repository public.

**How we evaluate**

We are looking for production-quality thinking, not just working code. We care about how you handle edge cases, errors, and platform differences — not just whether the happy path works. The `DEPLOYMENT.md` in Module 3 is taken seriously: it is a direct signal of whether you have personally shipped apps to both stores.

Shortlist threshold: 70 / 100\. Strong hire signal: 85+

If you have any clarifying questions, reply to this email and we will respond within a few hours. We wish you the best of luck — we are genuinely excited to see what you build.

Warm regards,

