# Getting Started

Follow the [official instructions](https://reactnative.dev/docs/environment-setup) to set up React Native for your environment. For this exercise it is not necessary to build for ios if you do not currently own a Mac, though if you do we will expect you to have already installed XCode (with cli utilities). Developing for Android on Mac, Windows or Linux  will require the Android toolchain and at least one SDK. 

# Installation
```bash
 git checkout RNU_0723
 npm install
 cd ios
 bundle install
 pod install --repo-update
 bundle exec pod install
```
## Running an Android build
Normally `npm run android` is sufficient in most build environments to launch a metro server, compile via gradle and launch the app in an emulator. Depending on your environment it may be necessary to launch metro in a separate window with `npm start` and then build the app.

## Running an iOS build
This requires a Mac and XCode, of course. `npm run ios` may be sufficient to build and launch an emulator, however it is sometimes necessary to open the `ios/xola_dev_rn.xcworkspace` project in XCode and allow it to build and launch from there.


# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
