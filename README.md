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
이 프로젝트는 디지털과 실물 책을 모두 즐기는 사람들을 위해 기획되었습니다. 현대 사회에서는 디지털 독서의 편리함을 누리는 사람들이 많지만, 여전히 실물 책을 선호하고 그 매력을 느끼는 사람들도 많습니다.<br>
우리는 매년 많은 책을 구매하지만, 일부는 한 번 읽고 더 이상 사용되지 않곤 합니다. 이 프로젝트는 그런 책들을 다시 활용하고 공유하는 것을 목적으로 합니다.<br>
책을 팔지 않고 공유하기, 공간 비우기, 재밌게 읽은 책 공유, 수익을 창출하여 다시 새 책 구매하는 즐거움을 얻을 수 있습니다.<br><br>

## 팀원 구성
| 이세인      | 이동명        |
| ------------ | ------------- |
|          |            |


## Technology
<h4>fornt</h4>
JSP CSS Swiper.js
<h4>back</h4>
Java 8 Servlet MySql ChatGPT JDBC Tomcat

## Contents
기간 : 2023.20.-2023.06.23 <br/>
내용 : 영화 스트리밍 사이트 구현(일반인 모드, 관리자 모드)



## ERD
영화, 사용자, 리뷰 테이블 중 영화, 사용자 테이블만 구현
(리뷰 추후 구현)
<img src="https://github.com/sesam-me/PlayData_BootCamp/assets/122416681/c76aa14a-d5c2-4ca2-8a25-a3abc5f7b410"  width="700" height="370"> <br/>
[ERD링크](https://www.erdcloud.com/d/Zjxy3xfjEpDhucjbk)


## Contributing
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

</div>
</details>

<details>
<summary>2. 영화 추천</summary>
<div markdown="1"> 
  
- 장르별 영화 추천
</div>
</details>


## Description
**function**

<ol>
  <li>로그인/로그아웃</li>
  <li>회원가입</li>
  <li>회원정보수정</li>
  <li>아이디 찾기, 비밀번호 재설정</li>
  <li>admin 메뉴 영화 추가</li>
  <li>admin 메뉴 배우 추가</li>
  <li>admin 메뉴 영화 출연진 추가</li>
  <li>ChatGpt를 이용한 AI에게 영화 추천 받기</li>
</ol>


## Feature Implementation

| Main 화면      | Login 화면        |
| ------------ | ------------- |
| ![GIFMaker_me](https://github.com/sesam-me/HTML_lesson/assets/122416681/b5aa6afa-9ce7-4685-972b-830ab5d4ab05)| ![MovieService login gif](https://github.com/sesam-me/HTML_lesson/assets/122416681/911bd4e9-a6ee-40df-b5f6-68698942d45a)  |

| Admin 화면     |
| ------------ |
| ![MovieService admin gif](https://github.com/sesam-me/HTML_lesson/assets/122416681/a100fb95-d0f1-423c-a539-8461dadb879b)|


## 느낀점
이번 프로젝트는 코드를 웹으로 구현했다는 것이다. 많은 데이터를 원하는 정보만 보기 좋게 보여주고 다른 사람에게 정보가 되어야 유의미한 프로젝트가 아닐까라는 생각이 들었다. 수요가 있어야 프로젝트가 쓸모가 있어질 테니..<br>
Servlet을 활용하여 클라이언트의 요청과 응답하는 동적인 웹컨텐츠를 생성했는데, Dto, Dao, Service 등의 관계와 흐름을 익힐 수 있었다. 그 동안 사용한 홈페이지들이 어떤 흐름으로 회원정보가 저장되고 사용되는지 알 수 있었다.<br>
- 개선해야 할 점
1. 아직 구현해보지 못한 자동로그인이 있는데 Cookie와 session을 활용해서 완성도를 높이고 싶다.
2. DB를 MySQL에서 직접 insert하였는데, 다음에는 통계청에서 주는 자료처럼 주어지는 큰 데이터를 활용해서 가공해보고 싶다.
3. Spring 접목해서 더 간단한 코드를 만들어 보고 싶다.


<br>
<br>
<br>
<br>

[맨위로 올라가기](#)
