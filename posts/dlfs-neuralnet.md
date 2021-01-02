---
title: '[밑바닥부터 시작하는 딥러닝] 신경망'
description: 신경망 기본 개념에 대해서 알아보았다.
path: dlfs-neuralnet
prevStep:
  - dlfs-perceptron
category:
  - theory
tag:
  - ai
  - python
---

한빛미디어의 **밑바닥부터 시작하는 딥러닝 1**을 공부하고 정리한 내용입니다.

퍼셉트론은 가중치를 설정하는 작업을 사람이 수동으로 해야한다는 단점을 가지고 있다. 신경망은 이 퍼셉트론의 단점을 해결해준다. 신경망은 데이터로부터 적절한 가중치의 값을 학습하는 중요한 성질을 가지고 있다.

# 퍼셉트론에서 신경망으로

## 신경망의 예

![](https://images.velog.io/images/ordidxzero/post/4856c1f7-fc55-43bb-b34d-ba3ed42efcaa/Screen%20Shot%202021-01-02%20at%2019.55.17.png)

뉴런이 연결되는 방식은 퍼셉트론과 다른 게 없다.

## 퍼셉트론 복습

![](https://images.velog.io/images/ordidxzero/post/653f1eed-d8a5-4153-b138-d186964372fb/Screen%20Shot%202021-01-02%20at%2020.02.52.png)

$$
y =
\begin{cases}
   0 \enspace (b + x_1w_1 + x_2w_2 \le 0 ) \\
   1 \enspace (b + x_1w_1 + x_2w_2 \gt 0 )
\end{cases}
\enspace
···\enspace식①
$$

식①에 x가 0을 넘으면 1을 출력하고 그렇지 않으면 0을 출력하는 함수 h(x)를 추가해보자. 그럼 아래처럼 표현이 가능하다.

$$
y = h(b + x_1w_1 + x_2w_2)
\enspace
···\enspace식②
$$

$$
h(x) =
\begin{cases}
   0 \enspace (x \le 0 ) \\
   1 \enspace (x \gt 0 )
\end{cases}
\enspace
···\enspace식③
$$

입력 신호의 총합이 함수 h(x)를 거쳐 y를 출력하고 있다.

이 때 h(x)를 **활성화 함수**라고 한다. 활성화 함수란 입력 신호의 총합을 출력 신호로 변환하는 함수를 말한다. 활성화 함수는 입력 신호의 총합이 활성화를 일으키는지를 정하는 역할을 한다.

식②를 두 단계로 나눠서 다시 쓰면 아래 두 식과 같다.

$$
a = b + x_1w_1 + x_2w_2
\enspace
···\enspace식④
$$

$$
y = h(a)
\enspace
···\enspace식⑤
$$

그림으로 나타내면 아래와 같다.

![](https://images.velog.io/images/ordidxzero/post/a4f39391-1b1e-41fd-9f7b-afee8bbaba52/Screen%20Shot%202021-01-02%20at%2020.16.38.png)

# 활성화 함수

식③처럼 임계값을 경계로 출력이 바뀌는 함수를 **계단 함수**라 한다.
퍼셉트론에서는 활성화 함수로 계단함수를 사용한다고 말할 수 있다.
신경망에서는 활성화 함수로 계단 함수가 아닌 다른 함수를 사용한다.

## 시그모이드 함수

$$
h(x) = \frac{1}{1+e^{-x}}
\enspace
···\enspace식⑥
$$

## ReLU 함수

$$
h(x) =
\begin{cases}
   x \enspace (x \gt 0 ) \\
   0 \enspace (x \le 0 )
\end{cases}
\enspace
···\enspace식⑦
$$

퍼셉트론과 신경망의 주된 차이는 활성화 함수뿐이다.

## 비선형 함수

신경망에서는 활성화 함수로 비선형 함수를 이용해야한다. 왜냐하면 활성화 함수로 선형 함수($f(x) = ax + b$)를 사용하면 네트워크의 층을 깊게 만들어도 **은닉층 없는 네트워크**로 똑같은 기능을 구현할 수 있기 때문이다. 층을 쌓아 얻을 수 있는 혜택이 없기 때문에 선형 함수를 활성화 함수로 사용하지 않는다.

### 계단함수를 왜 안쓸까?

앞서 신경망에서는 활성화 함수로 계단 함수가 아닌 다른 함수를 사용한다고 했다. 왜일까?
계단함수도 비선형함수인데 굳이 왜 시그모이드 함수를 쓰는 지 궁금증이 생겼다. 구글링을 해보니 아래와 같은 답을 얻었다.

> 계단함수는 데이터가 극적으로 변하는 모양새이기 때문에 데이터의 손실이 일어날 가능성이 있기 때문에 딥러닝에서는 사용되지 않는 활성화함수이다. 매우 간단한 분류같은 것은 계단함수로도 어느정도 가능하겠지만, 딥러닝이 필요한 데이터는 매우 다양한 데이터가 있기 때문에 계단함수로 구현할 경우 낮은 성능을 보여주게 될 것이다.
> 출처: [자비스가 필요해](https://needjarvis.tistory.com/564)

그래서인지 계단 함수가 아닌 다른 활성화 함수들은 매끈하게 변화하는 특징을 가지고 있다.

# 다차원 배열의 계산

가중치를 곱한 입력 신호의 총합을 행렬로 계산할 수 있기 때문에 넘파이를 이용한 다차원 배열 계산법을 숙달하면 신경망을 구현하는 데 많은 도움이 된다.

![](https://images.velog.io/images/ordidxzero/post/4ddea752-a292-48d2-9708-82dd67313119/Screen%20Shot%202021-01-02%20at%2021.03.10.png)

y1, y2, y3에 각각 들어갈 입력신호들의 총합은 아래와 같을 것이다.

$$
y_1 = 1x_1 + 2x_2
$$

$$
y_2 = 3x_1 + 4x_2
$$

$$
y_3 = 5x_1 + 6x_2
$$

위의 결과를 행렬 곱으로 표현할 수 있다.

$$
\begin{pmatrix}
   x_1 & x_2
\end{pmatrix}
\enspace
●
\enspace
\begin{pmatrix}
   1 & 3 & 5 \\
   2 & 4 & 6
\end{pmatrix}
\enspace
=
\enspace
\begin{pmatrix}
   1x_1 + 2x_2 & 3x_1 + 4x_2 & 5x_1 + 6x_2
\end{pmatrix}
$$

# 출력층 설계하기

출력층의 활성화 함수는 풀고자하는 문제의 성질에 맞게 정한다.

회귀 문제에는 항등 함수, 2클래스 분류에는 시그모이드 함수, 다중 클래스 분류에는 소프트맥스 함수를 사용하는 게 일반적이다.

항등 함수, 시그모이드 함수는 간단하거나 앞서 언급된 함수이기 때문에 생략하고 소프트맥스 함수의 식은 아래와 같다. exp(x)는 $e^x$를 나타낸다.

## 소프트맥스 함수

$$
y_k = \frac{exp(a_k)}{\displaystyle\sum_{i=1}^nexp(a_i)}
$$

위의 식 그대로 컴퓨터로 계산하면 오버플로우 문제가 발생할 수 있다. C라는 임의의 정수를 소프트맥스 함수 분모, 분자에 곱하고 식을 변형시키면 아래와 같은 식이 도출된다.

$$
y_k = \frac{exp(a_k+C')}{\displaystyle\sum_{i=1}^nexp(a_i+C')}
$$

위의 식이 말하고자하는 것은 소프트맥스 함수의 지수 함수를 계산할 때 어떤 정수를 더하거나 빼도 결과는 바뀌지 않는다는 것이다. $C'$에는 일반적으로 입력 신호 중 최댓값을 대입한다.

소프트맥스 함수의 결과는 **확률**로 해석할 수 있다.