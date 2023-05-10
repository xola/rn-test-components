# React Native Components Sample

## Installation

Install project JS dependencies:

```bash
$ npm install
```
Follow the [official instructions](https://reactnative.dev/docs/environment-setup) to set up React Native for your environment. For this exercise it is not necessary to build for ios if you do not currently own a Mac, though if you do we will expect you to have already installed XCode (with cli utilities). Developing for Android on Mac, Windows or Linux  will require the Android toolchain and at least one SDK. Once your environment is configured, check out the repo, switch to your working directory and:

Install the React Native CLI tools:

```bash
$ npm install -g react-native-cli
```

Install pod files (for ios development):

```bash
$ cd ios
$ pod install
```

Copy and edit the default configuration file:

```bash
$ cp .env.example .env
$ nano .env
```

## Development

Run the iOS simulator by opening ios folder of the project in XCode and running it, or via command line by running:

```bash
$ react-native start-ios
```

Run the iOS simulator by opening ios folder of the project in XCode and running it, or via command line by running:

```bash
$ react-native start-android
```
