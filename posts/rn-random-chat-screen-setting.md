---
title: 'RN으로 랜덤 채팅 앱 만들기 - 스크린 정하기'
birth: '2021-02-10'
prevStep:
  - rn-random-chat-dev-env
category:
  - project
tag:
  - reactjs
---

어젯밤에 RN 개발 환경을 설정하고 시뮬레이터를 실행하는 것까지 작업을 하고 마쳤다.
오늘은 스크린과 앱 디자인에 대해서 생각해보려고 한다.

일단은 프로젝트 디렉토리 구조를 조금 수정하였다.

`src` 폴더 안에서 작업을 하는 게 익숙하기 때문에 루트 디렉터리에 `src` 폴더를 만들고, `App.tsx` 파일과 `__test__` 폴더를 `src` 폴더 안으로 옮겼다.

# 필요한 스크린 생각해보기

- 인증을 위한 정보 입력 스크린
  로그인/회원가입이 아니라 인증이라고 정한 이유는 이 앱이 특정 집단 및 특정 기간동안만 사용될 이벤트성 앱이고, 유저가 그 집단에 속한다는 것만 인증이 되면 된다고 생각하기 때문이다.
- 휴대폰 인증 스크린
- 매칭 신청 스크린
- 채팅방 스크린
- 상대방 프로필 스크린(스크린이 아닌 Bottom Sheet 등으로 대체할 가능성이 높다)

생각보다 간단한 것 같다. 이 정도의 적은 스크린이면 Bottom Tab Navigation을 안써도 될 것 같다. 다크모드를 설정하는 기능을 넣고 싶은데 이 것 때문에 스크린을 따로 만들고 싶진 않다. 다크모드를 어디 놔야할 지 생각해봐야겠다.

# React Navigation 설정하기

```
npm install @react-navigation/native
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

지금 개발 OS가 macOS이고, 타겟 OS가 iOS이므로 아래 명령어를 추가로 실행해준다.

```
npx pod-install ios
```

그리고 `index.js`의 최상단에 아래 코드를 추가해주었다.

```
import 'react-native-gesture-handler';
```

# Stack Navigation 설치 및 설정하기

stack navigation을 설치한다.

```
npm install @react-navigation/stack
```

```typescript
// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ScreenComponent({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Other')}>
        <Text>Go To Other Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ScreenComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Stack Navigator에 `ScreenComponent`를 Stack Screen으로 넘겨주었다. 이렇게 하면 `ScreenComponent`에 navigation, route 프로퍼티가 있는 객체가 파라미터로 넘어온다. 여기에도 타입을 지정해주면 자동완성 기능을 사용할 수 있다.

```javascript
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ScreenComponent: undefined;
};

export type CustomStackScreenProp<RouteName extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, RouteName>;
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
};

```

`CustomStackScreenProp` type은 ScreenComponent에 사용할 타입이다.
`RootStackParamList` type은 createStackNavigator에서 사용할 수 있는 타입이다.

아래처럼 적용할 수 있다.

```typescript
// App.tsx

...

const Stack = createStackNavigator<RootStackParamList>();


function ScreenComponent({navigation}: CustomStackScreenProp<'ScreenComponent'>) {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Other')}>
        <Text>Go To Other Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ScreenComponent" component={ScreenComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

여기서 `CustomStackScreenProp`에 전달해주는 string은 typescript에 의해 자동완성을 지원하며, `Stack.Screen`의 name props에 들어가는 string 또한 자동완성을 지원한다.

추가로 스크린이 여러 개인 경우, RootStackParamList에 스크린 이름을 추가하면된다. undefined는 스크린에 전달될 데이터가 없다는 뜻이다. 전달할 데이터가 있는 경우, 그 데이터의 타입을 작성해주면 된다.

Stack Navigation의 기본적인 설정은 모두 끝났다.

이제 header의 설정을 변경하고, 기본적인 디자인을 해보자.

디자인을 하기 전에 다크모드를 위해서 Context API를 세팅하자.

# Context API 설정하기

Redux를 사용하지 않는 이유는 전역으로 공유해야하는 게 Theme밖에 없기 때문이다. 그래서 굳이 Redux를 사용하지 않는다.

내 계획은 DefaultTheme, DarkModeTheme 2개 만들어서 context api에 DefaultTheme를 초기값으로 설정하고, 사용자가 다크모드를 설정하면 DarkModeTheme으로 바꾸는 것이다. 두 테마 Object의 구조를 동일하게 작성할 것이므로 색상만 상수로 따로 분리해서 관리하면 될 것 같다.

아래는 context api를 설정한 코드이고 중요한 reducer와 state hook 빼고 전부 생략했다.

```javascript
// lib/context.tsx

...

function themeReducer(_: ThemeState, { payload, type }: Action): ThemeState {
  switch (type) {
    case 'TOGGLE_DARKMODE':
      return { darkMode: payload, theme: payload ? darkModeTheme : defaultTheme };
    default:
      throw new Error('Unhandled action');
  }
}

...

export function useThemeState() {
  const state = useContext(ThemeStateContext);
  if (!state) {
    throw new Error('ThemeProvider not found');
  }
  return state;
}

...

```

Reducer를 보면 boolean 타입의 payload에 따라 테마를 다르게 할당하고 있다. 또한 테마를 쉽게 사용하기 위해서 `useThemeState` hook을 만들었다. 기본 테마와 다크모드 테마 객체의 구조를 동일하게 작성했기 때문에 테마를 적용할 때 코드를 바꿀 필요가 없다. 색상을 바꾸고자 한다면 색상이 담긴 변수의 값만 변경하면 된다.

테마는 아래처럼 작성했다. 테마 객체를 작성할 때 구조가 굉장히 비효율적이라고 느꼈다. 하지만 코드를 작성할 때 통일성을 주기 위해서는 어쩔 수 없는 선택이었다.

```javascript
// lib/themes.ts
export const defaultTheme: CustomTheme = {
  input: {
    theme: StyleSheet.create({
      container: {
        backgroundColor: INPUT_BACKGROUND_COLOR,
      },
    }),
  },
};
```

이제 테마를 적용하는 코드를 보자. `styles.container`, `theme.container` 이렇게 깔끔하게 작성할 수 있다. theme이 없다면 `input.container` 처럼 작성해야하는데 의미가 바로 와닿지는 않는다.

```javascript
const Input = () => {
  const {
    theme: {
      input: { theme },
    },
  } = useThemeState();
  return (
    <TextInput
      style={[styles.container, theme.container]}
      ...
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.9,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
});
```

이제 신나게 컴포넌트를 만들면 된다.
