---
title: 'RN으로 랜덤 채팅 앱 만들기 - Firebase 연결하기'
birth: '2021-02-11'
prevStep:
  - rn-random-chat-screen-setting
category:
  - project
tag:
  - reactjs
  - firebase
---

이번에는 RN으로 만든 앱에다 Firebase를 연결해보자.

# Firebase 설치하기

```
npm install @react-native-firebase/app
```

```
cd ios
pod install
```

# Firebase Project 만들기

[여기](https://firebase.google.com/?hl=ko)에서 Firebase Project를 만들 수 있다. 나는 Google Analytics와의 연동을 하지 않고 프로젝트를 생성했다.

# iOS 설정하기

## Bundle ID 변경하기

`ios/[project name].xcworkspace`를 Xcode로 실행하고, 좌측 네비게이션에 자신의 프로젝트 이름으로 된 파일을 열면 아래와 같은 화면이 뜬다.
![](https://images.velog.io/images/ordidxzero/post/a91342fc-c560-4828-8f6f-a74e5e8cc141/Screen%20Shot%202021-02-10%20at%2012.58.30.png)

여기서 Bundle Identifier를 자신의 프로젝트에 알맞게 수정해주어야한다.

# Firebase Project Console

자신이 만든 프로젝트의 콘솔로 들어가면 아래와 같은 화면이 뜬다.
![](https://images.velog.io/images/ordidxzero/post/a515e788-4186-4a9a-846e-fc9f9f0002c8/Screen%20Shot%202021-02-10%20at%2013.01.28.png)

저 위의 앱 추가를 누르고 ios를 선택하면 아래와 같이 bundle id를 적는 input이 나오고 여기에 아까 설정한 bundle id를 넣어주면 된다.

![](https://images.velog.io/images/ordidxzero/post/950063a5-599a-4adf-8e5b-d18dec4a7465/Screen%20Shot%202021-02-10%20at%2013.03.57.png)

그 다음 앱 등록을 누르고나서 `GoogleService-Info.plist`를 다운 받고 `ios/[project name]` 폴더 안에 넣는다. (Info.plist가 있는 폴더에 넣는다.)
![](https://images.velog.io/images/ordidxzero/post/e51fa0eb-b933-4ffe-a3dd-82c94007129b/Screen%20Shot%202021-02-10%20at%2013.04.54.png)

> 🚨 VSCode가 아닌 Xcode에서 파일을 넣어야한다. VSCode에서 `ios/[project name]` 경로에 파일을 복사하면 나중에 앱 실행시 앱이 켜지지 않는다. Xcode로 파일을 넣을 경우 VSCode에서는 `GoogleService-Info.plist` 파일이 `ios/[project name]`이 아닌 `ios` 폴더에 들어간 걸로 나온다. VSCode에서는 `ios`, Xcode에서는 `ios/[project name]`로 파일을 넣어야하는 것 같다. (삽질만 10시간 했다..)

나는 Google Analytics와 연동을 하지 않기 대문에 Podfile에 코드를 추가할 필요는 없다.

![](https://images.velog.io/images/ordidxzero/post/6f2cb5a4-dbca-4ae5-b7e0-8d4d858c503c/Screen%20Shot%202021-02-10%20at%2013.06.13.png))

만약에 GoogleAnalytics를 연동한다면 아래처럼 Podfile에 코드를 추가하면 된다.

```
target 'randomchat' do
  config = use_native_modules!

  use_react_native!(:path => config["reactNativePath"])

  pod 'Firebase/Analytics' # 이 코드를 추가하세요.

  target 'randomchatTests' do
    inherit! :complete
    # Pods for testing
  end
```

> 🚨 다음 단계는 google의 Firebase 홈페이지와 [react native firebase 홈페이지](https://rnfirebase.io/#configure-firebase-with-ios-credentials)의 설정 방식에 차이가 있다. 나는 react native firebase 홈페이지 방식을 따르지만 스크린 샷은 google Firebase 설정 페이지이므로 헷갈리지 말 것.

마지막으로 `ios/[project name]/AppDelegate.m` 파일을 열어서 `#import <Firebase.h>`와 `[FIRApp configure];`를 추가한다.

![](https://images.velog.io/images/ordidxzero/post/4f128e1b-0bf0-4048-ad97-85b768fb151d/Screen%20Shot%202021-02-10%20at%2013.10.12.png)

```
#import <Firebase.h> // 추가한 코드

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
 // 추가한 코드 \/
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
 // 추가한 코드 /\
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
```
