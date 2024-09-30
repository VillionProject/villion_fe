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
| <img src="https://github.com/user-attachments/assets/d459b021-1555-4386-a98f-5e3d6d5c6036" width="350" alt="회원가입" style="display:block; margin:auto;"> |

| 로그인      | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/10a74a8c-17df-4db7-9914-7db9198b6834" width="350" alt="로그인" style="display:block; margin:auto;"> |

| 홈 둘러보기 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/0bd8cc29-c4b5-4305-95f0-2ece6dbf1d71" width="350" alt="홈 둘러보기" style="display:block; margin:auto;"> |

| 지역 등록 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/0c81b17a-bb87-4025-8f46-c923c16c5b71" width="350" alt="지역 등록" style="display:block; margin:auto;"> |

| 도서 상세보기 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/34f436a0-7a62-4fba-8a70-daf154bcc7ea" width="350" alt="도서 상세보기" style="display:block; margin:auto;"> |

| 책 등록 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/850916c8-a195-46ab-b24e-a95238405935" width="350" alt="책 등록" style="display:block; margin:auto;"> |

| 책 검색 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/27b1c8c1-2556-4116-823f-cff196f60c27" width="350" alt="책 검색" style="display:block; margin:auto;"> |

| 책 대여/구매(직거래 - 채팅) | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/ad6b7845-21bc-4212-a255-80baee141d73" width="1150" alt="책 대여/구매(직거래 - 채팅)" style="display:block; margin:auto;"> |

| 책 대여/구매(택배) | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/0a4124b1-a028-48b7-9911-55169640e5bf" width="350" alt="책 대여/구매(택배)" style="display:block; margin:auto;"> |

| 프로필 변경 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/4e83f49f-c43a-4716-b47e-0175be79b309" width="350" alt="프로필 변경" style="display:block; margin:auto;"> |

| 연간 목표도서량 등록 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/a637460e-2073-4708-aa44-4133b293da13" width="350" alt="연간 목표도서량 등록" style="display:block; margin:auto;"> |

| MBTI 기반 책 추천 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/d2d94268-4e5b-4134-9e62-ec9ca96406b4" width="350" alt="MBTI기반 책 추천" style="display:block; margin:auto;"> |

| 장바구니 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/6a442177-fccb-4052-9ceb-8a461f17abfa" width="350" alt="장바구니" style="display:block; margin:auto;"> |

| 찜 도서 | 
| ------------ | 
| <img src="https://github.com/user-attachments/assets/224dc7eb-ca11-4b6c-ae90-876618085cb1" width="350" alt="찜 도서" style="display:block; margin:auto;"> |

| 찜 도서(폴더 만들기) | 
| ------------ | 
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
