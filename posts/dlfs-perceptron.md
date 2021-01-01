---
title: '[밑바닥부터 시작하는 딥러닝] 퍼셉트론'
path: dlfs-perceptron
prevStep:
  - prevent-error
category:
  - theory
tags:
  - ai
  - python
---

한빛미디어의 **밑바닥부터 시작하는 딥러닝 1**을 공부하고 정리한 내용입니다.

# 퍼셉트론이란?

퍼셉트론이란 프랑크 로젠블라트가 1957년에 고안한 알고리즘이다.

퍼셉트론은 다수의 입력을 입력으로 받아 하나의 신호(0 혹은 1)를 출력한다.

> 🚨 이 글에서의 퍼셉트론은 **단순 퍼셉트론, 단층 퍼셉트론**을 의미합니다.

![](https://images.velog.io/images/ordidxzero/post/bca38b80-29df-4625-9017-fdf46709a5e9/perceptron.png)

`x1`, `x2`는 **입력 신호**, `w1`, `w2`는 **가중치**, `y`는 **출력 신호**를 뜻한다.

입력신호가 뉴런(노드라고도 불림, 위 그림의 원)에 보내질 때에는 각각 가중치가 곱해진다. (`x1w1`, `x2w2`)

이렇게 넘어온 신호의 총합(여기선 `x1w1` + `x2w2`)이 정해진 한계를 넘을 때만 1이 출력된다. 이 때, 정해진 한계를 임계값이라 하며 `𝜽` (세타, theta)로 표현한다. 이러한 개념을 수식으로 표현하면 아래와 같다.

$$
y =
\begin{cases}
   0 \enspace (x_1w_1 + x_2w_2 \le \theta ) \\
   1 \enspace (x_1w_1 + x_2w_2 \gt \theta )
\end{cases}
\enspace
···\enspace식①
$$

퍼셉트론은 각각의 입력신호에 고유한 가중치를 부여한다. **가중치는 각 신호가 결과에 주는 영향력을 조절하는 요소이다. 가중치가 클수록 해당 신호의 중요도는 높다**.

# 퍼셉트론으로 단순한 논리 회로 구현하기

`AND`, `NAND`, `OR` 게이트는 두 개의 입력과 하나의 출력을 가지므로 퍼셉트론을 연습하기에 최적이다.

## AND 게이트

```python
def AND(x1, x2):
  w1, w2, theta = 0.5, 0.5, 0.7
  tmp = x1*w1 + x2*w2
  if tmp <= theta:
    return 0
  else:
    return 1

AND(0, 0) # 0
AND(0, 1) # 0
AND(1, 0) # 0
AND(1, 1) # 1
```

## 편향 도입하기 및 AND 게이트 리팩토링

앞으로를 위해서 식①의 `𝜽`를 `-b`로 치환하자. 그럼 식①을 아래 식처럼 쓸 수 있다.

$$
b = -\theta
$$

$$
y =
\begin{cases}
   0 \enspace (b + x_1w_1 + x_2w_2 \le 0 ) \\
   1 \enspace (b + x_1w_1 + x_2w_2 \gt 0 )
\end{cases}
\enspace
···\enspace식②
$$

식①과 식②의 의미는 같다. 여기서 `b`를 편향이라고 부른다. 편향은 가중치와 기능이 다르다.
앞서 말했듯이 가중치는 각 입력 신호가 결과에 주는 영향력을 조절하는 매개변수이고, 편향은 뉴련이 얼마나 쉽게 활성화하느냐를 조정하는 매개변수이다.

임계값(`𝜽`) 대신 편향을 이용해서 AND 게이트를 리팩터링해보자.
`np`는 numpy를 의미한다.

```python
def AND(x1, x2):
  x = np.array([x1, x2])
  w = np.array([0.5, 0.5])
  b = -0.7
  tmp = np.sum(w*x)+b
  if tmp <= 0:
    return 0
  else:
    return 1

AND(0, 0) # 0
AND(0, 1) # 0
AND(1, 0) # 0
AND(1, 1) # 1
```

이제 NAND와 OR 게이트를 구현해보자.

## NAND

```python
def NAND(x1, x2):
  x = np.array([x1, x2])
  w = np.array([-0.5, -0.5])
  b = 0.7
  tmp = np.sum(w*x)+b
  if tmp <= 0:
    return 0
  else:
    return 1

NAND(0, 0) # 1
NAND(0, 1) # 1
NAND(1, 0) # 1
NAND(1, 1) # 0
```

## OR

```python
def OR(x1, x2):
  x = np.array([x1, x2])
  w = np.array([0.5, 0.5])
  b = -0.3
  tmp = np.sum(w*x)+b
  if tmp <= 0:
    return 0
  else:
    return 1

OR(0, 0) # 0
OR(0, 1) # 1
OR(1, 0) # 1
OR(1, 1) # 1
```

# 퍼셉트론의 한계

## XOR 게이트

XOR 게이트는 배타적 논리합이라는 논리 회로다. 퍼셉트론으로 XOR 게이트를 구현해보자.

사실 퍼셉트론으로 XOR 게이트를 구현할 수 없다. 아래 그림을 보자.

●은 0, ▲은 1을 의미한다.

![](https://images.velog.io/images/ordidxzero/post/f2474bab-c41c-42d4-99dc-f7e68f8308ce/logic_gate_graph.png)

앞서 구현한 `AND`, `NAND`, `OR` 게이트는 ●과 ▲를 **직선**으로 나눌 수 있다. 그런데 XOR은 **직선**으로 ●과 ▲를 나눌 수 없다.

> 퍼셉트론은 직선 하나로 나눈 영역만 표현할 수 있는 한계가 있다.

# 출동! 다층 퍼셉트론

퍼셉트론으로 XOR 게이트를 구현할 수 없다. 하지만 층을 쌓아 다층 퍼셉트론을 만들어서 XOR 게이트를 구현할 수 있다. 어떻게 층을 쌓을까?

## 기존 게이트들을 조합해서 XOR 구현하기

XOR 게이트는 `NAND`, `OR`, `AND` 게이트를 조합해서 만들 수 있다. (빨간 선은 `x1`, `x2`를 구분하기 위한 의도일 뿐이며, 다른 의미는 없다.)

![](https://images.velog.io/images/ordidxzero/post/d3e9e51f-1c9c-4aa1-aa3f-171c85b1bb8e/Screen%20Shot%202021-01-01%20at%2019.20.11.png)

## 파이썬 코드로 XOR 구현하기

위의 그림이 있으면 파이썬 코드로 XOR 게이트를 구현하는 것은 굉장히 간단하다.

```python
def XOR(x1: int, x2: int) -> int:
    s1 = NAND(x1, x2)
    s2 = OR(x1, x2)
    y = AND(s1, s2)
    return y

XOR(0, 0) # 0
XOR(0, 1) # 1
XOR(1, 0) # 1
XOR(1, 1) # 0
```

## XOR의 퍼셉트론

![](https://images.velog.io/images/ordidxzero/post/0085e6e9-c9c1-4d4b-88cd-0ebf3b412df8/Screen%20Shot%202021-01-01%20at%2019.34.47.png)

# 정리

1. 퍼셉트론은 입출력을 갖춘 알고리즘이다. 입력을 주면 정해진 규칙에 따른 값을 출력한다.
2. 퍼셉트론에서는 `가중치`와 `편향`을 매개변수로 설정한다.
3. 단층 퍼셉트론은 선형 영역만 표현할 수 있고, 다층 퍼셉트론은 비선형 영역도 표현할 수 있다.
