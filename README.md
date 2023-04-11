# React Native Sample Application

## Installation

Install project JS dependencies:

```bash
$ npm install
```

You will need XCode (with cli utilities) and Android (with at least one SDK) installed on your computer to develop Apple and Android builds respectively.

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
$ react-native start-ios
```

Run the iOS simulator by opening ios folder of the project in XCode and running it, or via command line by running:

```bash
$ react-native start-android
```