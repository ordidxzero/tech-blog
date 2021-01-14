---
title: 'Rust로 cli 앱 만들기 - 1'
date: 2021-01-13
prevStep:
  - rust-dev-env-for-macOS
category:
  - project
tag:
  - rust
---

Rust에 관심이 생겨서 공부하기 시작했다.

사실 몇 개월 전에 [Rust 한글 번역](https://rinthel.github.io/rust-lang-book-ko/foreword.html)을 보면서 공부해봤다. 내가 멍청해서 그런지 소유권 개념에서 좀 막히기도 했고 재미도 없어서 공부를 안했다. 그래서 그냥 순차적으로 하기보단 Javascript를 처음 배울 때 todo list를 만드는 것 처럼 뭔가를 만들면서 삽질을 해야할 것 같다고 느껴서 cli 앱을 만들어보기로 했다.

[이 글](https://rust-cli.github.io/book/tutorial/index.html)을 따라 공부했고, 제가 작성하는 글은 원문의 목차와 전혀 관련이 없을 수 있습니다.

# 폴더 구조 및 표현법 정리

## 폴더 구조

```
├── src
│   ├── main.rs
│   └── test.txt
└── Cargo.toml
```

## 표현법 정리

- ⚠️ : 코드 맨 앞에 이 emoji가 있으면 예시를 위해 임의로 추가한 내용이며, cli 앱을 만들 때 들어가는 코드가 아님.

# 첫 번째 목표

```
$ cat test.txt
foo: 10
bar: 20
baz: 30
$ grrs foo test.txt
foo: 10
```

첫 번째로 만들 앱은 string과 file path를 주면, string을 포함하는 한 줄을 리턴하는 앱이다. 문서에서는 `grrs`(발음은 `grass`)라는 이름을 붙였다.

# CLI arguments 파싱하기

```
$ grrs foo test.txt
foo: 10
```

우리가 만드는 앱 이름(`grrs`) 뒤에 오는 값들(`foo`, `test.txt`)은 `command line arguments` 혹은 `command line flags`라고 불린다.

`grrs`를 만들기 위해서 가장 중요한 것은 `command line arguments`를 가져오는 것이다. 사용자에게 어떤 값이 필요한지, 어떤 형식으로 입력해야하는지도 알려줘야한다.

## 필요한 것 정리

1. `command line arguments` 가져오기
2. 사용자에게 필요한 값과 입력 형식에 대해 알려주기

## arguments 가져오기

표준 라이브러리에는 [`std::env::args()`](https://doc.rust-lang.org/1.39.0/std/env/fn.args.html)가 포함되어 있다.

`std::env::args()`는 사용자가 입력한 `arguments`의 [iterator](https://doc.rust-lang.org/1.39.0/std/iter/index.html)를 반환한다.

```rust
⚠️
// src/main.rs
fn main() {
    let test_args = std::env::args();
    println!("Result");
    println!("{:?}", test_args);
}
```

실행 결과

```
~/Programming/rust_practice master ❯ cargo run -- first second third 4

  (...)

Result
Args { inner: ["target/debug/rust_practice", "first", "second", "third", "4"] }
```

배열의 첫 번째는 실행된 프로그램이고, 그 뒤에는 사용자가 입력한 값들이 있다.

어떻게 `arguments`를 가져오는 지 알았으니 cli앱을 작성해보자.

```rust
// src/main.rs
fn main() {
    let pattern = std::env::args().nth(1).expect("no pattern given");
    let path = std::env::args().nth(2).expect("no path given");
}
```

`expect`는 에러처리를 위한 것으로 에러가 발생하면 넘겨준 string을 에러 메세지로 출력한다.

## 데이터 타입으로써 CLI arguments

사용자가 입력한 `arguments`를 텍스트의 집합보다 우리가 작성하는 프로그램의 입력을 나타내는 custom data type으로 생각하는 것이 좋다.

`grrs`에서 받을 두 인자는 아래처럼 생각할 수 있다.

- `pattern`: 찾고싶은 문자열
- `path`: 문자열을 찾아볼 파일

또 어떤 것이 있을까 생각해보면 두 인자 모두 필수며, 기본값을 설정해주지 않았기 때문에 두 인자 모두 사용자로부터 받아야하는 것들이다.

Rust에는 Typescript의 `interface`와 비슷하게 생긴 `struct`라는 게 있다.
두 인자에 대해서 생각한 것들을 Rust로 옮겨보면 다음과 같다.

```rust
struct Cli {
    pattern: String,
    path: std::path::PathBuf
}
```

데이터를 저장할 두 필드(`pattern`, `path`)를 가진 구조체를 선언했다.
`PathBuf`는 string과 비슷하지만, 크로스 플랫폼을 위해 사용하는 file system path이다.

`struct`를 cli 앱에 적용하면 아래와 같다.
아래는 OS로부터 얻어온 문자열 리스트를 수동으로 파싱하고, 구조도 직접 짠 코드이다.

```rust
// src/main.rs

struct Cli {
    pattern: String,
    path: std::path::PathBuf
}


fn main() {
    let pattern = std::env::args().nth(1).expect("no pattern given");
    let path = std::env::args().nth(2).expect("no path given");
    let _args = Cli {
        pattern: pattern,
        path: std::path::PathBuf::from(path)
    }
}
```

위 코드는 잘 작동하지만 편리한 코드는 아니다. 수동으로 파싱을 한다면 `--pattern foo` 또는 `--pattern=foo`는 어떻게 처리할까? 또 `--help`는 어떻게 구현할까?

## StructOpt를 이용해서 CLI arguments 파싱하기

수동으로 하는 것보다 수많은 라이브러리 중 하나를 사용하는 게 낫다. CLi arguments를 파싱하는 라이브러리 중 [clap](https://clap.rs/)이 인기가 많다.

여기선 [structopt](https://docs.rs/structopt/0.3.21/structopt/)을 사용할 것이다. `structopt`는 `clap`을 기반으로 설계되었다. `structopt`는 `struct`에 주석을 달기만 하면 arguments를 파싱하여 필드에 넣어주는 코드를 생성해준다.

아래처럼 `[dependencies]` 아래에 `structopt = "0.3.13"`를 추가해주면 빌드할 때 rust가 `structopt`를 import 해준다.

```toml
// Cargo.toml
[package]
name = "rust_practice"
version = "0.1.0"
authors = ["author <author@email.com>"]
edition = "2018"

[dependencies]
structopt = "0.3.13"
```

이제 `use structopt::StructOpt`를 작성할 수 있다. 그리고 아래처럼 코드를 수정해야한다.

```rust
// src/main.rs

use structopt::StructOpt;

#[derive(StructOpt)]
struct Cli {
    pattern: String,
    #[structopt(parse(from_os_str))]
    path: std::path::PathBuf,
}

fn main() {
  let _args = Cli::from_args();
}
```

만약에 `path`에 들어갈 값을 `-p=foo` 혹은 `--path=foo` 이런식으로 입력하게 하고 싶다면, `Cli`의 `path`위의 `#[structopt(parse(from_os_str))]`를 `#[structopt(short="p",long="path", parse(from_os_str))]`로 바꿔주면 된다.

`from_args()`는 `#[derive(StructOpt)]`에 의해 상속받은(?), 공유된(?) 메소드같다.

에러처리는 어떻게 할까? -> `clap`이 알아서 해준다. 어떤 필드에 어떤 형식으로 들어가야하는지도 알아서 해준다. `--help` 메세지도 자동으로 생성해준다.

## 실행해보기

```
~/Programming/rust_practice master ❯ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/rust_practice`
error: The following required arguments were not provided:
    <pattern>
    <path>

USAGE:
    rust_practice <pattern> <path>

For more information try --help
```

아무 인자도 넘기지 않으면 에러가 발생하고 프로그램이 종료된다. clap 최고다.

```
~/Programming/rust_practice master ❯ cargo run -- a b
    Finished dev [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/rust_practice a b`
```

`--` 뒤에 임의의 값을 두 개 넣어주면 정상작동한다.

## Exercise for the reader

### Make this program output its arguments

지금까지 완성된 코드는 아래와 같다. 이제 출력을 해보자.

```rust
// src/main.rs

#[derive(StructOpt)]
struct Cli {
    pattern: String,
    #[structopt(parse(from_os_str))]
    path: std::path::PathBuf,
}

fn main() {
    let _args = Cli::from_args();
}
```

#### 첫 번째 접근

```rust
// src/main.rs

...

fn main() {
   let _args = Cli::from_args();
   println!(_args);
}

```

![](https://images.velog.io/images/ordidxzero/post/5dc0029a-c1f1-4e54-97f9-b91415ba3d48/Screen%20Shot%202021-01-13%20at%2022.39.12.png)

이렇게 에러가 뜬다.

#### 두 번째 접근

`println!(_args)`를 `println!("{}",_args)`로 바꿔주었다.

```rust
// src/main.rs

...

fn main() {
   let _args = Cli::from_args();
   println!("{}", _args);
}

```

![](https://images.velog.io/images/ordidxzero/post/5b2c306e-8fae-4162-b383-f32157ec5800/Screen%20Shot%202021-01-13%20at%2022.40.26.png)

이번엔 이렇게 에러가 뜬다.

#### 세 번째 접근

`println!("{}",_args)`를 `println!("{:?}",_args)`로 바꿔주었다.

```rust
// src/main.rs

...

fn main() {
   let _args = Cli::from_args();
   println!("{:?}", _args);
}

```

![](https://images.velog.io/images/ordidxzero/post/8294e8d3-a4e4-4556-983b-a86307ea0dd5/Screen%20Shot%202021-01-13%20at%2022.41.32.png)

아직도 에러가 뜬다..

#### 네 번째 접근

`struct Cli` 위에 `#[derive(Debug)]`를 추가해주었다.

```rust
// src/main.rs

#[derive(Debug, StructOpt)]
struct Cli {
    pattern: String,
    #[structopt(parse(from_os_str))]
    path: std::path::PathBuf,
}

fn main() {
   let _args = Cli::from_args();
   println!("{:?}", _args);
}

```

정상적으로 작동한다.

### 정리

`struct`를 출력하기 위해서 해야하는 것

- `struct`위에 `#[derive(Debug)]`를 추가해야된다.
- 출력할 때에는 출력 포맷(?)을 `"{:?}"` 혹은 `"{:#?}"`을 사용해야한다.

# 공부해야하는 것

- `trait`: `#[derive(...)]`가 뭔지 찾아봤는데, trait 개념이 나온다.. 좀 더 구체적으로 찾아봐야할 것 같다.
