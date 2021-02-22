---
title: '[NestJS] Provider와 Module이란?'
birth: '2021-02-22'
prevStep:
  - nest-basic-concept
category:
  - project
  - theory
tag:
  - nestjs
---

# Provider

Provider는 Nest의 기본 개념이다. 대부분의 기본 Nest Class인 services, repositories, factories, helpers 등은 provider로 취급될 수 있다. provider는 단순히 `@Injectable()` 데코레이터가 달린 클래스이다.

[앞 포스트](https://velog.io/@ordidxzero/nestjs-basic-concept)에서 설명을 생략한 게 한 가지 있다. 바로 `@Injectable()` 데코레이터다. Provider 설명에 의하면 이 데코레이터가 달린 클래스는 provider다. 즉, `AppService`를 provider로 만들기 위해서 `@Injectable()`를 사용한 것이다.

`AppService`를 만들었고 이것을 `AppController`에서 사용한다.

```js
// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayHello(): string {
    return 'Hello Nest!';
  }
}
```

```js
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sayHello(): string {
    return this.appService.sayHello();
  }
}
```

`AppController`에서 `appService` 변수의 타입만 `AppService`로 지정해준 것 뿐인데 어떻게 `AppService` 안의 메소드를 사용할 수 있는 걸까?

**provider의 주요 아이디어는 dependencies를 inject할 수 있다는 것이다.**

dependencies를 inject할 수 있다. 언뜻 보기에는 어려워보이지만, NestJS에서는 타입스크립트를 사용하기 때문에 관리하는 게 굉장히 쉬워진다. 변수의 타입을 `AppService`로 지정해줌으로써 Nest Injector가 `appService` 변수를 `AppService`의 인스턴스로 만들어준다(인스턴스화한다).

내가 이해한 게 맞다면, "dependencies를 inject한다"와 "인스턴스화한다"는 같은 말이다.

[Dependency injection 참조](https://docs.nestjs.com/providers#dependency-injection)

# Module

NestJS에서는 모듈이 있다. `@Module()` 데코레이터로 모듈을 만들 수 있다. Nest 어플리케이션을 만들면 최소 하나의 모듈, 루트 모듈이 있다. 이 루트 모듈은 Nest가 Module 및 Provider relationships 및 dependencies를 해결하는 데 사용하는 내부 데이터 구조를 구축하는 시작점이다. 모듈을 만들면 루트 모듈과 연결되어야한다. 그리고 django에서 기능마다 app을 만드는 것처럼 기능을 최대한 분리해서 모듈로 만드는 것이 좋다.

`@Module()` 데코레이터는 하나의 객체를 인자로 가지며, 객체가 가질 수 있는 프로퍼티는 아래와 같다.

- `providers`: Nest injector에 의해 인스턴스화되고, 최소 현재 모듈에서 공유될 provider의 집합
- `controllers`: 인스턴스화해야 하는, 현재 모듈에 정의된 Controller의 집합
- `imports`: 현재 모듈에서 필요한 provider들을 export한 import된 모듈의 집합
- `exports`: 현재 모듈에 의해 제공되며 현재 모듈을 import하는 다른 모듈에서 사용할 수 있어야 하는 provider의 하위 집합

모듈은 기본적으로 provider를 캡슐화한다. 따라서, 현재 모듈의 `providers`에 등록되지않았거나 import한 모듈에서 export하지 않은 provider를 inject하는 것은 불가능하다.

## Feature Modules

Feature Module은 단순히 특정 기능과 관련된 코드로 구성되며 코드를 정리하고 명확한 경계를 설정한다.

아래 명령어를 실행하면 `CatsModule`이 생성되며 `app.module.ts`파일을 보면 `imports`에 `CatsModule`이 들어가 있다.

```
nest g mo cats
```

아래와 같이 루트 모듈에 직접 만든 모듈을 추가하는 작업은 Nest가 알아서 해준다. 명령어를 사용하여 모듈을 생성하는 경우에만 해당하며, 수동으로 파일을 생성할 경우 직접 추가해야한다.

```js
// app.module.ts

import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```
