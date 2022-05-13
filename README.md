# Xola Kiosk Native App

## Installation

Install project JS dependencies:

```bash
$ npm install
```

For iOS development, you need to have XCode installed on your computer.

Install React Native CLI tools:

```bash
$ npm install -g react-native-cli
```

Install pod files:

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
$ npm run simulator
```

# Notes on Android

1. iOS specific settings bundle does not work on Android
2. react-native-start-io10 requires 4* okhttp version, react v0.63 provides 3.12 which is not compatible. There is a patch that monkey patch the package. After upgrade to last react version this approach needs to be reevaluated and potentially removed
