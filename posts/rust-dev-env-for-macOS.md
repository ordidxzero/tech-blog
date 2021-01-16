---
title: 'Rust 개발 환경 구축하기 (for macOS)'
birth: '2021-01-13'
category:
  - project
tag:
  - rust
---

# Rust 컴파일러 및 패키지 매니저 설치

아래 명령어로 설치하면 된다. [참고: Rust 공식 가이드](https://www.rust-lang.org/tools/install)

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

# VSCode에 확장프로그램 설치하기

- `rust-analyzer`
  - 여러 글을 참고하면, [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer) 혹은 [Rust](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust) 중에 하나를 설치한다. 나는 두 개의 차이를 구글링하다가 [rust 레딧에 올라온 글](https://www.reddit.com/r/rust/comments/hf07lk/rls_vs_rustanalyzer_in_2020/?sort=confidence)의 댓글들을 보고 `rust-analyzer`를 설치하기로 결정했다. Rust 익스텐션의 기능은 `코드 자동완성`, `정의 체크`, `포맷팅`, `리팩토링`, `에러 포인팅`, `빌드` 등이 있는데, `rust-analyzer`와 비교대상인걸 보면 `rust-analyzer`도 위의 기능이 있을 것 같다.
- `CodeLLDB`
  - 디버깅을 위해 설치해야한다고 한다. (Xcode를 설치하면 lldb가 설치된다고 한다. 그런데 나는 잘 모르니까 일단 설치한다.)
- `TOML Language Support`
  - rust 프로젝트 폴더에 `Cargo.toml` 파일이 있다. 이 파일을 편하게 읽기 위해서 설치한다. [Better TOML](https://marketplace.visualstudio.com/items?itemName=bungcip.better-toml)을 설치한다는 글을 제일 많이 본 것 같은데, 평점을 보고 `TOML Language Support`를 설치했다.

# VSCode에 rust 프로젝트 생성하기

아래 명령어를 실행해서 프로젝트를 생성한다.

```
cargo new --bin hello_world
```

-- 추후 추가 --
