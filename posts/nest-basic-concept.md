---
title: '[NestJS] 기초 개념'
birth: '2021-01-27'
category:
  - project
  - theory
tag:
  - nestjs
---

**NestJS**는 효율적이고 확장 가능한 NodeJS Server-Side 어플리케이션을 만들기 위한 프레임워크이다. 내부적으로 ExpressJS를 사용하며, 초기 설정을 통해서 Fastify를 사용할 수 도 있다.

# NestJS의 철학

NodeJS(및 server side JavaScript)를 위한 수많은 우수한 library, helper 및 도구들이 존재하지만, **아키텍처** 문제를 효과적으로 해결한 라이브러리는 없다. 이를 위해서 NestJS는 개발자와 팀이, 테스트 가능하고 확장 가능하며 느슨하게 결합되어 유지 관리가 용이한 애플리케이션을 만들 수 있는 아키텍처를 제공한다. 아키텍처는 Angular로부터 많은 영감을 받았다.

# 설치

CLI를 이용해서 설치한다.

```
$ npm i -g @nestjs/cli
$ nest new nest_practice
```

# src 내부 파일

`nest new nest_practice` 명령어를 통해서 새로운 Nest 어플리케이션을 만들면 `node_modules`, `src` 등과 `eslint`, `tsconfig`, `prettier` 등 설정과 관련된 파일들이 생성된다. 먼저 `src` 내부에는 어떤 파일들이 있는지 확인해보자.

```
src
├ app.controller.ts
├ app.controller.spec.ts
├ app.module.ts
├ app.service.ts
⎣ main.ts
```

- `app.controller.ts`: 하나의 경로(여기서는 "/")를 가진 기본 컨트롤러
- `app.controller.spec.ts`: 컨트롤러에 대한 유닛 테스트
- `app.module.ts`: Nest 어플리케이션의 루트 모듈. 모든 Nest 모듈은 이 모듈에 연결되어야한다.
- `app.service.ts`: 하나의 메소드를 가진 기본 서비스
- `main.ts`: . Nest application instance를 생성하는 함수`NestFactory`를 사용하는, Nest 어플리케이션의 엔트리 파일

# Express

Nest를 빠르고 쉽게 이해하기 위해서는 Express 코드와의 비교가 필요하다.

아래 코드는 express에서 controller와 router를 분리해서 사용하는 예시다.

```javascript
// controller.js
export function sayHello (req, res) {
  res.send('Hello Express');
}

// router.js
const router = express.Router();
router.get('/', sayHello);

export default router;

// app.js

app.use('/', router);

// http://localhost:3000/

Hello Express
```

# Controller

Nest에서 Controller는 express에서의 router라고 생각하면 된다. (`Service`는 바로 다음에 다룬다.)

```javascript
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

// http://localhost:3000/

Hello Nest

```

`@Controller()`는 express의 `app.use('/', router)` 에서 `'/'`와 같은 역할을 한다. `@Controller('say')` 이렇게 인자로 string을 넘겨주면 express에서 `app.use('/say', router)`처럼 코드를 작성한 것과 같다.

`@Get()`은 express의 `router.get('/', sayHello)`에서 `'/'`와 같은 역할을 한다. `@Get('hello')` 이렇게 인자로 string을 넘겨주면 express에서 `router.get('/hello', sayHello)`처럼 코드를 작성한 것과 같다.

`AppController` 코드를 해석해보면 `루트경로로 GET 요청이 들어오면 appService 안의 sayHello 함수를 실행하고 결과를 리턴해라`이다. 추가적으로 `Get`말고도 `Post`, `Delete` 등 다른 HTTP 요청 메소드 데코레이터가 있다.

# Service

Nest에서 Service는 express에서의 controller라고 생각하면 된다. Nest의 Controller와 비지니스 로직을 분리하기 위해 Service가 존재한다.

```javascript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayHello(): string {
    return 'Hello Nest!';
  }
}
```

위와 같이 메소드를 정의하고 `AppModule`에서 provider로 등록을 하면 Controller에서 사용할 수 있다.

```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
