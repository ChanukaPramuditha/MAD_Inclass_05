# My Profile — React Native mobile screen

A **React Native + Expo + TypeScript** implementation of the supplied mobile-app screenshot.

## Included

- Dark navy top bar with the heading **My Profile**.
- Centered, locally bundled illustrated avatar with a green check mark.
- Divider and profile details: **Name: Diluka**, **Email: diluka.w@nsbm.ac.lk**, **Points: 0**.
- Floating circular **+** button at the bottom-right.
- Working add-points demo: the + button opens a modal and adds the entered number to the score.
- Scrollable layout and notched-screen/safe-area handling.

> The screenshot does not show what the + button should do. The **Add Points** modal is a demo action. Points are in React state and reset when the app restarts. No server, database, or authentication is included.

## Requirements

- Node.js 20.19+ and npm
- Expo Go on your phone (or Android Studio emulator / iOS simulator)

## Run

```bash
# Extract the ZIP, then from this project folder:
npm install
npx expo start
```

Scan the QR code with **Expo Go** to view the app on your phone. For an Android emulator, press **a** after Expo starts. For iOS simulator (macOS only), press **i**.

If your phone cannot reach the computer through your Wi-Fi, try:

```bash
npx expo start --tunnel
```

## Main files

```text
MyProfileReactNative/
├── App.tsx                    # Full screen layout + Add Points modal
├── app.json                   # Expo configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript config
└── assets/
    ├── profile-avatar.png     # App avatar image
    ├── profile-avatar.svg     # Editable vector source for the avatar
    ├── icon.png               # Expo icon
    └── adaptive-icon.png      # Android launcher foreground
```

## Customize

Modify the name and email Text elements in `App.tsx`, and change the initial state (`useState(0)`) to set starting points. Styles are in the same file under `StyleSheet.create`.

## Create an APK (optional)

Expo's managed workflow can be built for Android using EAS Build. Install EAS CLI, sign in to Expo, and configure the project with `eas build:configure`. For a test APK, configure an Android `preview` build profile with `android.buildType: "apk"`, then run `eas build --platform android --profile preview`. The build requires an Expo account and is not included in this source ZIP.
