---
title: 'Rust로 cli 앱 만들기 - 2'
birth: '2021-01-17'
prevStep:
  - rust-cli-app-1
category:
  - project
tag:
  - rust
---

저번 글에서 CLI arguments를 파싱하는 것 까지 해보았다.

이번엔 파일을 읽고 특정 문자열을 포함하는 라인을 출력하도록 업그레이드를 해보자.

```rust
// src/main.rs
use structopt::StructOpt;

#[derive(Debug, StructOpt)]
struct Cli {
    pattern: String,
    #[structopt(parse(from_os_str))]
    path: std::path::PathBuf,
}

fn main() {
    let _args = Cli::from_args();
}

```

Rust에서는 `std::fs::read_to_string(filename)`으로 파일을 읽는다. (코드 맨 윗줄에 `use std::fs`을 추가하면 `std` 생략 가능)

사용자가 입력한 파일 경로를 이용해서 파일을 읽는 코드를 추가하면 아래와 같다.

```rust
// src/main.rs

...

fn main() {
    let _args = Cli::from_args();
    let result = std::fs::read_to_string(&_args.path).expect("could not read file");
}

```

`std::fs::read_to_string(&_args.path)`에서 `_args` 변수 앞의 `&`는 소유권과 관련된 것이다.

`result` 변수는 `lines()`라는 메소드를 가지는데, 읽은 파일을 한줄씩 나눠 iterator를 생성해주는 역할을 한다. 그 iterator를 가지고 아래처럼 사용할 수 있다.

```rust
// src/main.rs

...

fn main() {
    let _args = Cli::from_args();
    let result = std::fs::read_to_string(&_args.path).expect("could not read file");
    for line in result.lines() {
      if (line.contains(&_args.pattern)) {
          println!("{}", line);
      }
    }
}

```

파일을 읽고 특정 문자열을 포함하는 라인을 출력하도록 업그레이드를 끝냈으니 실행을 해보자.

```
~/Programming/rust_practice master ❯ cargo run -- main src/main.rs
   ...
fn main() {
```

`main`을 포함하는 줄인 `fn main() {`이 잘 출력되는 것을 확인할 수 있다.

# 에러 처리하기

이전 글에서 `expect`를 이용해 에러 처리를 했는데, 이번엔 다른 방법으로 에러처리를 해본다.

Rust에는 예외가 없기 때문에 가능한 모든 에러들은 함수 형태로 인코딩된다고 한다.

## Result

파일을 읽는 코드를 다시 보자.

```rust
let result = std::fs::read_to_string("src/test.txt");
```

여기서 `read_to_string`같은 함수는 문자열을 반환하는 게 아니라, `String`혹은 일부 유형의 오류를 포함하는 `Result`를 반환한다. (`read_to_string`같은 경우는, `std::io::Error`)

Rust는 예외가 없기 때문에 위의 파일을 읽는 코드에서 파일 읽기를 실패하면 JS처럼 try/catch문을 사용할 수 없다. 그럼 에러가 발생했는 지 어떻게 알 수 있을까?

`Result`는 `enum`타입이기 때문에 아래처럼 `match`문을 사용할 수 있다.

```rust
let result = std::fs::read_to_string("src/test.txt");
match result {
    Ok(content) => { println!("File content: {}", content); }
    Err(error) => { println!("Oh noes: {}", error); }
}

```

## Unwrapping

이제 파일 내용에 접근을 할 수 있지만, `match`가 끝나고 할 수 있는 것은 아무것도 없다. 왜냐하면 아직 에러 케이스를 다루지 못했기 때문이다. 문제는 `match`의 모든 갈래(`arm`)들이 같은 타입의 무언가를 반환하도록 해야한다. 파일을 성공적으로 읽었을 때(`Ok` 갈래)는 파일의 내용을 리턴하면 된다. 그렇다면 파일 읽기를 실패했을 때(`Err` 갈래)에는 무엇을 리턴해야할까? 아래와 같은 트릭을 사용할 수 있다.

```rust
let result = std::fs::read_to_string("src/test.txt");
let content = match result {
    Ok(content) => { content },
    Err(error) => { panic!("Can't deal with {}, just exit here", error); }
};
println!("file content: {}", content);
```

이렇게 하면 `match`문이 끝나면 우리는 `content`변수 안에 있는 파일 내용을 사용할 수 있다. 만약에 파일 읽기를 실패하는 경우에는 리턴할 파일 내용이 없다. 그런데 `content` 변수를 사용하기 전에 프로그램이 종료된다. 그렇기 때문에 `content` 변수에 파일 내용이 할당되었다고 생각할 수 있다.

만약에 프로그램이 파일을 반드시 읽어야하지만 파일이 없는 상황일 때, 프로그램을 종료하는 것은 괜찮은 전략이다. `Result`에는 이런 상황에서 사용할 수 있는 `unwrap`이라는 shortcut method가 있다.

```rust
let content = std::fs::read_to_string("test.txt").unwrap();
```

## panic을 사용할 필요는 없다.

프로그램을 종료하는 것만이 에러를 다루는 유일한 방법이 아니다. `panic!` 대신에 `return`을 사용할 수 있다.

> 🚨 기존에 작성하던 코드에서 `return Err(error.into())`로 바꾸면 에러가 발생한다. 에러가 없는 전체 예시는 나중에 나온다.

```rust
let result = std::fs::read_to_string("src/test.txt");
let _content = match result {
    Ok(content) => { content },
    Err(error) => { return Err(error.into()); }
};
```

하지만 `return`을 사용하면 함수가 필요로하는 리턴 타입이 변경된다.
지금까지 모든 예시에서 숨겨져있던 게 있다. 바로 함수 시그니처다. 아래 예에서 `return`은 중요한 역할을 한다.

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let result = std::fs::read_to_string("src/test.txt");
    let content = match result {
        Ok(content) => { content },
        Err(error) => { return Err(error.into()); }
    };
    println!("file content: {}", content);
    Ok(())
}
```

위 함수의 리턴 타입은 `Result`다. 그렇기 때문에 `match`문의 두 번째 갈래에서 `return Err(error.into())`을 사용할 수 있다.
함수 제일 아래 `Ok(())`는 함수의 기본 리턴값이다.
`return Ok(())`로 작성하지 않은 이유는 Rust에서는 블럭의 마지막 표현식이 리턴값이기 때문이다. 그래서 `return`을 생략해도 Rust는 `Ok(())`가 리턴값인 걸 안다.

여기서 궁금증이 하나 생겼다.

```rust
fn main() -> Result<String, Box<dyn std::error::Error>> {
    ...

    Ok(content)
}
```

이렇게 하면 에러가 발생한다. 타입이 일치하는 데 왜 에러가 발생할까 몇시간동안 고민했는데 [이 글](https://stackoverflow.com/questions/24245276/why-does-rust-not-have-a-return-value-in-the-main-function-and-how-to-return-a)을 보고 힌트를 얻은 것 같다. 정확한 건 아니고 내가 짐작하기로는 `main`의 리턴 타입은 `Result<(), ...>` 이렇게 정해져있는 것 같다. 그래서 `Result<String, ...>` 이렇게 하지 못하는 것 같다. (함수의 이름만 바꾸면 에러가 사라진다.)

## Question Mark

`.unwrap()`은 error를 다루는 갈래에서 `panic!`을 사용하는 `match`문에 대한 shortcut이다.
error를 다루는 갈래에서 `return`을 하는 `match`에 대한 또 다른 shortcut이 있는데, 의문을 나타내는 `?`이다.

`Result` 타입의 값 뒤에 `?`를 붙일 수 있다. 그럼 Rust는 내부적으로 방금 우리가 작성한 `match`과 비슷하게 처리를 한다.

```rust

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let content = std::fs::read_to_string("src/test.txt")?;
    println!("file content: {}", content);
    Ok(())
}
```

`read_to_string`은 에러로 `std::io::error`를 발생시키는데, `?`를 사용하면 에러타입을 변환시킨다고 한다.

`Box<dyn std::error::Error>`는 흥미로운 타입이다. 표준 Error trait을 구현하는 모든 타입을 포함할 수 있는 Box다. 즉, 기본적으로 모든 오류를 이 Box에 넣을 수 있으므로 `Result`를 반환하는 모든 일반적인 함수에서 `?`을 사용할 수 있습니다.

## Providing Context

`main`에서 `?`를 사용했을 때 얻는 에러는 괜찮지만, 좋진 않다. 예를 들어 `std::fs::read_to_string("test.txt")?`를 실행했고, `test.txt` 파일이 없다면 아웃풋은 아래와 같다.

```
Error: Os { code: 2, kind: NotFound, message: "No such file or directory" }
```

에러 메세지에 파일 이름이 포함되어있지 않아, 어느 파일을 찾지 못한 건지 알아내기가 쉽지 않다. 이걸 해결하는 방법은 여러가지가 있다.

예를 들어서, custom error type을 만들어서 error message를 커스텀할 수 있다.

```rust
#[derive(Debug)]
struct CustomError(String);

fn main() -> Result<(), CustomError> {
    let path = "test.txt";
    let content = std::fs::read_to_string(path)
        .map_err(|err| CustomError(format!("Error reading `{}`: {}", path, err)))?;
    println!("file content: {}", content);
    Ok(())
}
```

코드를 실행하면 아래와 같이 커스텀 에러 메세지가 나온다.

```
Error: CustomError("Error reading `test.txt`: No such file or directory (os error 2)")
```

별로 예쁘지는 않지만 나중에 쉽게 debug output을 조정할 수 있다.
이런 패턴은 흔하지만, 한가지 문제점이 있다. original error가 아닌 error의 문자열 표현만 저장할 수 있다.
종종 사용되는 [`anyhow`](https://docs.rs/anyhow/1.0.38/anyhow/)라이브러리는 위 문제점에 대해 깔끔한 솔루션을 가지고 있다: 아까 만들었던 `CustomError`와 비슷하게, `Context` trait은 description을 추가할 때 사용되곤 한다. 추가적으로 `Context` trait은 original error를 보관하기 때문에, 근본적인 원인을 가르키는 에러 메세지 체인을 얻을 수 있다.

`Cargo.toml`의 `[dependencies]`에 `anyhow="1.0"`을 추가해서 `anyhow`를 임포트하자.

```rust
use anyhow::{Context, Result};

fn main() -> Result<()> {
    let path = "test.txt";
    let content = std::fs::read_to_string(path)
        .with_context(|| format!("could not read file `{}`", path))?;
    println!("file content: {}", content);
    Ok(())
}
```

위 코드를 실행하면 아래와 같이 깔끔하게 에러 메세지가 나온다.

```
Error: Error reading `test.txt`

Caused by:
    No such file or directory (os error 2)
```

# 공부해야할 것

- 소유권
- Box
