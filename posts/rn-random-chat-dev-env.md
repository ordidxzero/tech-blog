---
title: 'RN으로 랜덤 채팅 앱 만들기 - 개발환경 설정'
birth: '2021-02-07'
category:
  - project
tag:
  - react
---

React Native와 Firebase를 이용하여 iOS용 랜덤 채팅앱을 만드는 프로젝트를 시작했다.

이전에 Expo를 이용하여 RN앱을 만든 경험이 있어서 이번에는 React Native CLI를 이용해보려고 한다.

구글링 + 공식 문서를 따라하면서 개발환경을 설정하였다.

- Development OS: macOS
- Target OS: iOS

# 필요한 과정

## NodeJS와 watchman 설치하기

```
brew install node // 현재 기준 가장 최신 버전인 15.8.0를 설치함.
brew install watchman
```

## Command Line Tools 설정하기

Xcode 또한 최신 버전으로 업데이트를 한 후, `Xcode Preferences` -> `Location` Tab에서 `Command Line Tools`를 `Xcode 12.4 (12D4e)`로 설정해주었다.

## CocoaPods 설치하기

CocoaPods는 Swift 및 Objective-C 코코아 프로젝트의 종속성 관리자라고 한다. nodejs의 npm이라고 생각하면 될 듯 하다.

```
sudo gem install cocoapods
```

## react-native-cli 삭제하기

만약 기존에 react-native나 react-native-cli가 전역으로 설치되어있다면 에러가 발생할 수 도 있으니 삭제해야한다.

# React Native 프로젝트 생성하기

나는 Typescript를 이용하여 개발을 할 것이기 때문에 typescript 템플릿을 사용할 것이다. Javascript로 개발을 한다면 `--template react-native-template-typescript`은 생략 가능하다.

```
npx react-native init randomchat --template react-native-template-typescript
```

# 실행해보기

```
cd randomchat && npx react-native run-ios
```

여기서 만약에 에러가 발생한다면, `ios/Podfile`를 수정을 해줘야한다.

**기존 Podfile에서 수정해야하는 부분**

```
use_flipper!
  post_install do |installer|
    flipper_post_install(installer)
  end
```

**수정한 Podfile**
(Flipper의 버전은 읽는 시점마다 달라질 수 있으므로 [여기](https://fbflipper.com/docs/getting-started/react-native#using-the-latest-flipper-sdk)에서 확인할 것)

```
use_flipper! ({'Flipper' => '0.74.0'}) # 여기를 업데이트한다.
  post_install do |installer|
    flipper_post_install(installer)
  end
```

`Podfile`을 수정했다면 `pod install` 명령어로 반영을 해주어야한다. nodejs의 `package.json`을 수동으로 변경하고나서 `npm install`를 실행해주는 것과 같다고 생각하면 될 것 같다.

주의해야할 점은 ios 폴더로 들어가서 `pod install`을 실행해야한다는 것이다.

```
~/randomchat/ios ❯ pod install
```

이제 ios 폴더에서 나와서 `npx react-native run-ios`를 실행하면 시뮬레이터에서 앱이 정상적으로 켜지는 것을 확인할 수 있다.
