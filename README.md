# Villion (우리 동네 도서 대여 플랫폼)
![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/c0612e3a-3a54-4d34-8e7c-0bef0543af6e/eea66066-cf34-46c3-94aa-4a33b374cf08/image.png)

배포 URI : http://villion.store

<br><br>

## Index
[1.Technology](#technology)<br>
[2.Contents](#contents)<br>
[3.ERD](#erd)<br>
[4.Contributing](#contributing)<br>
[5.Description](#description)<br>
[6.Feature Implementation](#feature-implementation)
[7.느낀점](#느낀점)

## 프로젝트 소개
이 프로젝트는 디지털과 실물 책을 모두 즐기는 사람들을 위해 기획되었습니다.<br>
현대 사회에서는 디지털 독서의 편리함을 누리는 사람들이 많지만, 여전히 실물 책을 선호하고 그 매력을 느끼는 사람들도 많습니다.<br>
우리는 매년 많은 책을 구매하지만, 일부는 한 번 읽고 더 이상 사용되지 않곤 합니다.<br>
이 프로젝트는 그런 책들을 다시 활용하고 공유하는 것을 목적으로 합니다.<br>
책을 팔지 않고 공유하기, 공간 비우기, 재밌게 읽은 책 공유, 수익을 창출하여 다시 새 책 구매하는 즐거움을 얻을 수 있습니다.<br><br>

## 팀원 구성
|   이세인    |   이동명    |
|:-----------:|:-----------:|
| [@sesam_me](https://github.com/sesam-me) | [@dongmyoungLee](https://github.com/dongmyoungLee) |
|     PL      |     FE      |


## 개발환경
| Category       | Name                                                                                           |
|----------------|------------------------------------------------------------------------------------------------|
| Back-End       | • Java 17, Spring Boot 3.2.4, Spring Data JPA, RESTful API, MSA, Kafka, Docker<br> • MySQL, MongoDB, Redis|
| Front-End      | • React                                                                                         |
| Collaboration  | • GitHub, Notion                                                                                |
| Deployment     | • Google Cloud                                                                                  |




## 프로젝트구조







## 역할
<details>
<summary>1. 로그인/로그아웃</summary>
<div markdown="1">
  
    1-1. id와 email 중 선택하여 로그인 가능
    1-2. 아이디 저장
          - 아이디 저장 체크 후에는 계속해서 체크박스 체크 상태 유지
          - 아이디 저장 체크 해체 후에는 계속해서 체크박스 해체 상태 유지
    1-3. 로그인 성공 후, head부분 로그인 버튼에서 로그아웃 버튼으로 변경
    1-4. 로그인 성공 후에만, MY페이지에서 회원정보 확인 및 수정 가능 / 실패 시, 로그인 화면으로 이동
    1-5. 관리자 외 접속 제한 : 관리자 계정 로그인 성공 시에만, 관리자 페이지 버튼 생성
    1-6. 로그아웃




## 개발 경험 및 주요 기능
| **개발 경험 및 주요 기능** |                                          |
|-----------------------------|------------------------------------------|
| **회원 관리**              | - 회원 가입/로그인                       |
| **상품 관리**              | - 상품 등록/조회/검색<br>- 위치 상품 조회  |
| **구매**                   | - 채팅 기능<br> - 구매 기능      |
| **찜 도서관**             | - 찜 도서관 목록 생성/수정/조회          |
| **장바구니**               | - 장바구니 담기/삭제/조회                 |
| **도서 추천**             | - MBTI 테스트                           |
| **검색**                   | - 도서 검색                             | 비밀번호 재설정</li>


## 기능 설명 및 구현

| Main 화면      | Login 화면        |
| ------------ | ------------- |
| ![GIFMaker_me](https://github.com/sesam-me/HTML_lesson/assets/122416681/b5aa6afa-9ce7-4685-972b-830ab5d4ab05)| ![MovieService login gif](https://github.com/sesam-me/HTML_lesson/assets/122416681/911bd4e9-a6ee-40df-b5f6-68698942d45a)  |

| Admin 화면     |
| ------------ |
| ![MovieService admin gif](https://github.com/sesam-me/HTML_lesson/assets/122416681/a100fb95-d0f1-423c-a539-8461dadb879b)|


## 느낀점
처음에는 API 문서화의 중요성을 간과했습니다. 기능이 적을 때는 문제가 없었지만, 서버 작업을 먼저 시작하면서 API 명세서에 주소만 기재한 것이 혼란을 일으켰습니다. 

어느 기능에 어떤 주소를 사용해야 하고, Request에 어떤 데이터를 보내야 하는지 명확하지 않다 보니 기능이 늘어날수록 혼동이 커졌습니다.

또한, 사용자 흐름을 파악하면서 Figma를 사용했지만, 몇몇 화면이 누락되었고, 프론트 담당자가 이해하기 어려운 흐름도 있었습니다. 

이러한 혼란은 기획 단계에서의 문서화와 정확한 사용자 흐름 파악이 미흡했기 때문에 발생했습니다. 이를 통해 **API 문서화**와 **사용자 흐름 설계**의 중요성을 절실히 느꼈습니다.

추가로, 장바구니 조회 기능을 직거래(구매/대여)와 직배송(구매/대여) 4개 섹터로 나누어 구현했으나, 프론트 작업 중 4개 기능을 동시에 조회하는 방식이 비효율적이라는 것을 깨달았습니다. 

프론트에서 전체 조회 기능 1개를 제공받아 나누는 방식이 더 효율적이라는 제안이 나왔고, 이를 받아들이면서 **프론트와의 소통**이 프로젝트의 원활한 진행에 얼마나 중요한지 체감했습니다.

<br>
<br>
<br>
<br>

[맨위로 올라가기](#)
