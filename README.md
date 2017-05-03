![Mizen Logo](/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png)
# mizen
### [Project Report](https://cdn.rawgit.com/colm2/mizen/33433319/project-report.pdf) (Note: 11mb PDF)

A cross-platform location-aware guidance app for the Final Year Project Open Day. My final year project for BSc Computer Science in UCC.

## Abstract
The Final Year Project (FYP) open day is an event attended by staff, students and industry professionals every year where around 75 students exhibit projects in different rooms in the Western Gateway Building. A booklet is produced every year listing the projects, but this is inefficient for many staff and visitors.

This project (Mizen) aimed to improve this experience by using a cross-platform mobile app that provides guidance for navigating the event with providing location-aware information, provided by Bluetooth beacons in each of the rooms. The information should be easy to search through, and provide the ability to bookmark projects or mark them as seen.

Mizen aimed also to explore the feasibility of creating similar applications for other uses, exploring the idea of beacon-driven applications for similar events such as trade shows and conferences, and the reliability of the beacon technology in applications such as the smart home.

Mizen also aims to explore the feasibility of developing an application for both major mobile platforms under the time constraint of being available before the FYP Open Day, using the React Native framework.

## Installing and running Mizen:
Follow the [React Native setup guidelines](https://facebook.github.io/react-native/docs/getting-started.html).
A brief summary follows:

### Requirements
[Android SDK](https://developer.android.com/studio/index.html) or [XCode](https://developer.apple.com/xcode/), [Node.js](https://nodejs.org/en/) with Node Package Manager, [Python2.7](https://www.python.org/downloads/).
  * If using Android SDK, [make sure the environment variable ANDROID_HOME is defined.](https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html#define-the-android-home-environment-variable)

### Running the app
* Navigate to this directory
* Run `npm install -g react-native-cli` - this will install react-native cli and put it on your PATH.
* Run `npm install --save` - this will fetch required libraries that I've included.
* To run on a configured Android emulator or an Android device with USB debugging enabled: `react-native run-android`
  * To build a release, change to the `android` directory and run `gradlew assembleRelease`
  * (possibly `./gradlew assembleRelease` depending on platform)
* To run on the iOS simulator: `react-native run-ios`
* To run on an iPhone: connect the iPhone, open ios/Mizen.xcodeproj in Xcode, and build to run with your iPhone as the target.

Alternatively: Mizen is still available on the Google Play Store: http://colm.cf/mizen


## Third-Party Licences & Acknowledgements

Mizen is licenced under the MIT Licence.

Mizen depends on React Native, and some other NPM packages. All of these implement the MIT licence with the exception of react-navigation which implements BSD-2-Clause. All bear the licence "Redistribution and use in source and binary forms, with or without modification, are permitted". These are specified in package.json so will be loaded when you run `npm install`, not included in the zip. They'll be found in a folder called node_modules.
