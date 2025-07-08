# CineBase

A modern React Native movie app. This guide will help you set up and run CineBase locally on macOS for both iOS and Android development.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Clone the Repository](#1-clone-the-repository)
- [2. Install Dependencies](#2-install-dependencies)
- [3. Environment Variables](#3-environment-variables)
- [4. iOS Setup & Running](#4-ios-setup--running)
- [5. Android Setup & Running](#5-android-setup--running)
- [6. Useful Scripts](#6-useful-scripts)
- [7. Troubleshooting](#7-troubleshooting)
- [8. Project Structure](#8-project-structure)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (Recommended: v18+)
- **Yarn** (Recommended) or npm
- **Watchman** (for macOS, improves file watching)
- **Xcode** (for iOS, from the Mac App Store)
- **CocoaPods** (`sudo gem install cocoapods`)
- **Android Studio** (for Android, includes SDK & emulator)
- **Ruby** (>= 2.6.10, managed via rbenv or rvm)
- **Bundler** (`gem install bundler`)

For detailed React Native environment setup, see the [official guide](https://reactnative.dev/docs/environment-setup) (choose the "React Native CLI Quickstart").

---

## 1. Clone the Repository

```sh
git clone <your-repo-url>
cd CineBase
```

---

## 2. Install Dependencies

### JavaScript/TypeScript Packages

```sh
yarn install
# or
npm install
```

### Ruby Gems (for iOS/CocoaPods)

```sh
cd ios
bundle install
cd ..
```

---

## 3. Environment Variables

Create a `.env` file in the project root. Example:

```
API_URL=https://your.api.url
TOKEN=your_api_token
```

These are used for API requests. See `src/types/declarations.d.ts` for required variables.

---

## 4. iOS Setup & Running

### 4.1. Install CocoaPods

```sh
yarn pod:install
# or manually:
cd ios
bundle exec pod install
cd ..
```

### 4.2. Run on iOS Simulator

```sh
yarn ios
# or
npm run ios
```

- This will build and launch the app in the iOS Simulator.
- If you see build errors, ensure Xcode and CocoaPods are up to date.

### 4.3. Open in Xcode (Optional)

```sh
open ios/CineBase.xcworkspace
```

- You can build/run directly from Xcode for advanced debugging.

---

## 5. Android Setup & Running

### 5.1. Android Studio Setup

- Install Android Studio and set up an emulator or connect a device.
- Ensure `ANDROID_HOME` is set and platform tools are in your `PATH`.

### 5.2. Run on Android Emulator/Device

```sh
yarn android
# or
npm run android
```

- This will build and launch the app on the connected device/emulator.
- If you see build errors, ensure Java, Android SDK, and environment variables are set up.

---

## 6. Useful Scripts

- `yarn start` — Start the Metro bundler (required for both platforms)
- `yarn ios` — Build and run the app on iOS Simulator
- `yarn android` — Build and run the app on Android
- `yarn lint` — Run ESLint
- `yarn test` — Run Jest tests
- `yarn pod:install` — Install iOS pods via Bundler

---

## 7. Troubleshooting

### Common Issues

- **Metro not starting:** Run `yarn start` in a separate terminal.
- **Pod install errors:** Ensure you have the correct Ruby version and run `bundle install` before `pod install`.
- **Android build fails:** Check Java version, Android SDK, and that an emulator/device is running.
- **iOS build fails:** Open the workspace in Xcode and try building there for more detailed errors.
- **Environment variables not loaded:** Ensure `.env` exists and is correctly formatted.

### Clean Builds

- **iOS:**
  ```sh
  cd ios && xcodebuild clean && cd ..
  yarn pod:install
  yarn ios
  ```
- **Android:**
  ```sh
  cd android && ./gradlew clean && cd ..
  yarn android
  ```

---

## 8. Project Structure

```
CineBase/
├── App.tsx                # App entry point
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens (Home, MovieDetail, WatchList)
│   ├── redux/             # Redux store, slices, hooks
│   ├── services/          # API and data fetching logic
│   ├── types/             # TypeScript types and enums
│   └── assets/            # Images, icons, SVGs
├── ios/                   # iOS native project
├── android/               # Android native project
├── package.json           # JS/TS dependencies and scripts
├── Gemfile                # Ruby gems for iOS
├── README.md              # This file
└── ...
```

---

## Additional Notes

- **SVG Support:** SVGs are imported as React components (see `babel.config.js` and `declarations.d.ts`).
- **TypeScript:** The project uses TypeScript throughout.
- **Redux Toolkit:** State management is handled via Redux Toolkit.
- **Metro Config:** Custom Metro config for SVG support.

For more details, see the comments in the codebase and the official [React Native documentation](https://reactnative.dev/).
