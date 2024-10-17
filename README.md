# Villion (우리 동네 도서 대여 플랫폼)
<p align="center">
  <img src="https://github.com/user-attachments/assets/c68d5357-a304-43d1-9e52-a159f927ae36" width="750"/>
</p>

배포 URI : http://villion.store

<br><br>

## Index
[1. 프로젝트 소개](#프로젝트-소개)<br>
[2. 팀원 구성](#팀원-구성)<br>
[3. 개발 환경](#개발-환경)<br>
[4. 프로젝트 구조](#프로젝트-구조)<br>
[5. 역할](#역할)<br>
[6. 개발 경험 및 주요 기능](#개발-경험-및-주요-기능)<br>
[7. 기능 설명 및 구현](#기능-설명-및-구현)<br>
[8. 느낀점](#느낀점)

<br><br>

## 프로젝트 소개
이 프로젝트는 디지털과 실물 책을 모두 즐기는 사람들을 위해 기획되었습니다.<br>
현대 사회에서는 디지털 독서의 편리함을 누리는 사람들이 많지만, 여전히 실물 책을 선호하고 그 매력을 느끼는 사람들도 많습니다.<br>
우리는 매년 많은 책을 구매하지만, 일부는 한 번 읽고 더 이상 사용되지 않곤 합니다.<br>
이 프로젝트는 그런 책들을 다시 활용하고 공유하는 것을 목적으로 합니다.<br>
책을 팔지 않고 공유하기, 공간 비우기, 재밌게 읽은 책 공유, 수익을 창출하여 다시 새 책 구매하는 즐거움을 얻을 수 있습니다.<br><br>

<br><br>

## 팀원 구성
|   이세인    |   이동명    |
|:-----------:|:-----------:|
| [@sesam_me](https://github.com/sesam-me) | [@dongmyoungLee](https://github.com/dongmyoungLee) |
|     PL      |     FE      |

<br><br>

## 개발환경
| Category       | Name                                                                                           |
|----------------|------------------------------------------------------------------------------------------------|
| Back-End       | • Java 17, Spring Boot 3.2.4, Spring Data JPA, RESTful API, MSA, Kafka, Docker<br> • MySQL, MongoDB, Redis|
| Front-End      | • React                                                                                         |
| Collaboration  | • GitHub, Notion                                                                                |
| Deployment     | • Google Cloud                                                                                  |

<br><br>

## 프로젝트구조
![어플리케이션 구성도](https://github.com/user-attachments/assets/35d9e52f-3939-44b5-bcc0-c8c4c82ebd11)
![흐름도](https://github.com/user-attachments/assets/1cf5ed3d-1abf-4856-bccd-7a4627b0285b)

```│          
├─public  
│      favicon.ico  
│      index.html  
│      manifest.json  
│      robots.txt  
│  
└─src  
    │  App.js  
    │  index.js  
    │  reportWebVitals.js  
    │  Router.js  
    │  
    ├─asset  
    │  ├─books  
    │  │      image 10.png  
    │  │      .  
    │  │      .  
    │  │      .  
    │  │      image 9.png  
    │  │  
    │  └─images  
    │          AddSky.png  
    │          .  
    │          .  
    │          .  
    │          user_icon.png  
    │  
    ├─common  
    │  │  AuthContext.js  
    │  │  CommonFunc.js  
    │  │  Menus.js  
    │  │  Reg.js  
    │  │  WebSocketComponent.js  
    │  │  
    │  └─api  
    │          ApiClient.js  
    │          ApiGetService.js  
    │          ApiPostService.js  
    │  
    ├─components  
    │  ├─atoms  
    │  │      Button.js  
    │  │      HomeBar.js  
    │  │      Input.js  
    │  │      Loading.js  
    │  │      Logo.js  
    │  │      SmallLogo.js  
    │  │  
    │  ├─blocks  
    │  │      AddProduct.js  
    │  │      CategorySelect.js  
    │  │      Center.js  
    │  │      Chatting.js  
    │  │      ConfirmPopup.js  
    │  │      Footer.js  
    │  │      Header.js  
    │  │      Home.js  
    │  │      LibEdit.js  
    │  │      Loading.js  
    │  │      Login.js  
    │  │      MainCover.js  
    │  │      Mbti2.js  
    │  │      MbtiStart.js  
    │  │      MsgPopup.js  
    │  │      Mybooks.js  
    │  │      MyCart.js  
    │  │      MyFolder.js  
    │  │      MyFolderList.js  
    │  │      NewFolder.js  
    │  │      PopupDom.js  
    │  │      ProductDetail.js  
    │  │      ProfileChange.js  
    │  │      Recommended.js  
    │  │      RentalConfirm.js  
    │  │      Search.js  
    │  │      Settings.js  
    │  │      SignUp.js  
    │  
    ├─chat  
    │  │      ChatModule.js  
    │  
    └─config  
    │          Responsive.js  
    │  
    ├─ducks  
    │      index.js  
    │      loginCheck.js  
    │  
    └─styles  
        ├─atoms  
        │      Button.module.css  
        │      HomeBar.module.css  
        │      Input.module.css  
        │      Loading.module.css  
        │      Logo.module.css  
        │      SmallLogo.module.css  
        │  
        ├─blocks  
        │      CategorySelect.module.css  
        │      Center.module.css  
        │      ChatPage.module.css  
        │      Chatting.css  
        │      Chatting.module.css  
        │      Footer.module.css  
        │      Header.module.css  
        │      Home.module.css  
        │      LibEdit.module.css  
        │      Loading.module.css  
        │      Login.module.css  
        │      MainCover.module.css  
        │      Mbti2.css  
        │      MbtiStart.module.css  
        │      MsgPopup.module.css  
        │      MyCart.module.css  
        │      ProductDetail.module.css  
        │      Recommended.module.css  
        │      RentalConfirm.module.css  
        │      Search.module.css  
        │      Settings.module.css  
        │      SignUp.module.css  
        │      swiper.css  
        │  
        └─common  
                reset.css  
```


<br><br>

## 역할
- 프로젝트 기획
- 백엔드
- 화면 작업

<br><br>

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

<br><br>

## 기능 설명 및 구현
| 메인      | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/0d4203e4-9d68-4aa9-b073-0c9060a80431" width="350" alt="메인" style="display:block; margin:auto;"> |

| 회원가입  |
| ------------ |
| - 이메일 주소와 비밀번호를 입력하면 유효성 검사가 즉시 진행됩니다. 검사를 통과하지 못할 경우, 알림 팝업이 표시됩니다.   |
| - 유효성 검사 기준 : 이메일 주소 형식 확인, 이미 가입된 이메일 여부 확인, 비밀번호는 8자 이상 25자 이하, 영문자, 특수문자(최소 1개), 숫자(최소 1개) 포함, 유효성 검사를 통과하면 빌리언 로그인 화면으로 이동합니다.   |
| - ID : test001@naver.com / PW : a12345678a!  |
| <img src="https://github.com/user-attachments/assets/d459b021-1555-4386-a98f-5e3d6d5c6036" width="350" alt="회원가입" style="display:block; margin:auto;"> |

| 로그인      | 
| ------------ | 
| - 이메일 주소와 비밀번호를 입력하면 유효성 검사 및 등록된 사용자 확인이 동시에 진행됩니다. 검사를 통과하지 못할 경우, 알림 팝업이 생성됩니다. |
| - 사용자의 정보는 Redux를 통해 LocalStorage에 저장됩니다. 이는 보안 취약성과 동기화 문제를 초래할 수 있지만, 개인 프로젝트의 특성상 빠른 접근과 성능 최적화, 페이지 새로 고침 시 데이터 유지를 위해 선택되었습니다. |
| - 로그인 성공 시, 빌리언 메인 화면이 나타납니다. |
| <img src="https://github.com/user-attachments/assets/10a74a8c-17df-4db7-9914-7db9198b6834" width="350" alt="로그인" style="display:block; margin:auto;"> |

| 홈 둘러보기 | 
| ------------ |
| - 메인 홈은 사용자 위치 지정, 도서 검색, 내 장바구니, 추천 도서 및 인기 도서 목록, 그리고 하단에 네비게이션 메뉴바가 배치되어 있습니다. 추천 도서는 사용자의 위치에 따라 다르게 제공되며, 인기 도서는 현재 가장 많이 판매되고 있는 책을 기준으로 선정됩니다. |
| - 이 과정에서 HTTPS로 서버와 통신할 때, 특정 브라우저에서 보안 경고 메시지가 발생할 수 있습니다. 이는 HTTPS를 통해 안전하게 정보를 전송하지 않으면, 지역 등록이 정상적으로 이루어지지 않기 때문입니다.|
| - 배포된 페이지는 HTTP프로토콜 이기 때문에 정상 작동하지 않을 수 있습니다.|
| <img src="https://github.com/user-attachments/assets/0bd8cc29-c4b5-4305-95f0-2ece6dbf1d71" width="350" alt="홈 둘러보기" style="display:block; margin:auto;"> |

| 지역 등록 | 
| ------------ |
| - 사용자의 위치 정보를 업데이트하고, 추천된 정보를 최신 상태로 유지하여 지역 정보를 갱신합니다.  |
| <img src="https://github.com/user-attachments/assets/0c81b17a-bb87-4025-8f46-c923c16c5b71" width="350" alt="지역 등록" style="display:block; margin:auto;"> |

| 도서 상세보기 | 
| ------------ |
| - 사용자가 선택한 도서의 상세 정보를 제공합니다. 상세보기에서는 해당 책을 등록한 다른 사용자 정보와 같은 카테고리의 책 목록을 확인할 수 있으며, 책을 찜 목록에 추가하거나 카트에 담고 대여 또는 구매를 진행할 수 있는 페이지입니다.   |
| <img src="https://github.com/user-attachments/assets/34f436a0-7a62-4fba-8a70-daf154bcc7ea" width="350" alt="도서 상세보기" style="display:block; margin:auto;"> |

| 책 등록 | 
| ------------ |
| - 사용자가 자신이 소유한 책을 판매하거나 대여하기 위해 등록할 수 있는 페이지입니다. 카테고리는 영어와 한국어로 드롭다운 메뉴를 제공하여 2가지 언어를 지원합니다.   |
| <img src="https://github.com/user-attachments/assets/850916c8-a195-46ab-b24e-a95238405935" width="350" alt="책 등록" style="display:block; margin:auto;"> |

| 책 검색 | 
| ------------ |
| - 책의 제목과 설명을 기반으로 일치하는 책을 검색합니다. 성능 향상과 검색 정확도를 위해 MySQL의 Full Text Index를 사용하였습니다.   |
| <img src="https://github.com/user-attachments/assets/27b1c8c1-2556-4116-823f-cff196f60c27" width="350" alt="책 검색" style="display:block; margin:auto;"> |

| 책 대여/구매(직거래 - 채팅) | 
| ------------ |
| - 사용자 간의 직거래를 위해 채팅 기능을 지원합니다. 유연한 데이터 모델링과 고속 읽기/쓰기 성능을 위해 관계형 데이터베이스 대신 MongoDB를 사용하였으며, 사용자1_사용자2 형식으로 데이터를 저장하여 1:1 대화를 지원합니다.   |
| <img src="https://github.com/user-attachments/assets/ad6b7845-21bc-4212-a255-80baee141d73" width="1150" alt="책 대여/구매(직거래 - 채팅)" style="display:block; margin:auto;"> |

| 책 대여/구매(택배) | 
| ------------ |
| - 사용자의 책 대여 및 구매 신청 페이지입니다. 정보를 입력하면 대여 및 구매 원장(db)에 기록됩니다.   |
| <img src="https://github.com/user-attachments/assets/0a4124b1-a028-48b7-9911-55169640e5bf" width="350" alt="책 대여/구매(택배)" style="display:block; margin:auto;"> |

| 프로필 변경 | 
| ------------ |
| - 사용자의 프로필 이미지를 업데이트하는 기능입니다. 프론트엔드에서 저장된 데이터와 서버의 사용자 정보를 동기화하여 수정합니다.   |
| <img src="https://github.com/user-attachments/assets/4e83f49f-c43a-4716-b47e-0175be79b309" width="350" alt="프로필 변경" style="display:block; margin:auto;"> |

| 연간 목표도서량 등록 | 
| ------------ |
| - 사용자가 설정한 연간 목표 도서량을 직관적으로 볼 수 있도록 게이지 형식으로 구현하였습니다. 도서량은 대여 및 구매를 통해 증가합니다.   |
| <img src="https://github.com/user-attachments/assets/a637460e-2073-4708-aa44-4133b293da13" width="350" alt="연간 목표도서량 등록" style="display:block; margin:auto;"> |

| MBTI 기반 책 추천 | 
| ------------ |
| - 간단한 설문조사를 통해 유저의 MBTI 를 조사하고 해당 MBTI에 맞는 책을 추천합니다.   |
| <img src="https://github.com/user-attachments/assets/d2d94268-4e5b-4134-9e62-ec9ca96406b4" width="350" alt="MBTI기반 책 추천" style="display:block; margin:auto;"> |

| 장바구니 | 
| ------------ |
| - 유저가 원하는 책을 장바구니에 담을 수 있습니다.   |
| <img src="https://github.com/user-attachments/assets/6a442177-fccb-4052-9ceb-8a461f17abfa" width="350" alt="장바구니" style="display:block; margin:auto;"> |

| 찜 도서 | 
| ------------ |
| - 유저가 원하는 도서를 내 찜목록에 담을 수 있습니다.   |
| <img src="https://github.com/user-attachments/assets/224dc7eb-ca11-4b6c-ae90-876618085cb1" width="350" alt="찜 도서" style="display:block; margin:auto;"> |

| 찜 도서(폴더 만들기) | 
| ------------ |
| - 유저가 원하는 도서를 담을 찜 폴더 목록을 커스텀 할 수 있습니다.   |
| <img src="https://github.com/user-attachments/assets/f4dccfa8-864c-44df-92dc-167c2547f8c2" width="350" alt="찜 도서(폴더 만들기)" style="display:block; margin:auto;"> |


<br><br>

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
