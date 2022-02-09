<img src="https://cdn.discordapp.com/attachments/880707219098853400/910538537483526195/unknown.png" width="600" height="150">
  


## COFFEE_STATION (Download) 🥤☕


## 팀원소개 

| Name         | 한 건                                                        | 허진녕                                                       | 김준영                                                       | 이정준                                                       | 이유진                                                       |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
|              | <img src="https://cdn.discordapp.com/attachments/808739638658596957/916021779338760213/unknown.png" width="200"> | <img src="https://cdn.discordapp.com/attachments/808739638658596957/916022043491844146/unknown.png" width="200"> | <img src="https://cdn.discordapp.com/attachments/808739638658596957/916022823292665946/unknown.png" width="200"> | <img src="https://cdn.discordapp.com/attachments/808739638658596957/916021961908453377/unknown.png" width="200"> | <img src="https://cdn.discordapp.com/attachments/808739638658596957/916021881952432138/unknown.png" width="200"> |
| **Position** | 팀장<br />Frontend<br />UI/UX                                | Frontend<br />UI/UX                                          | Backend<br />CI/CD                                           | Backend<br />                                                | Backend<br />                                                |



### 협업방식 / Convention

[Click here ✨](README_Cooperation.md)

| GitLab                                                    | JIRA                                                         | Jenkins                                                   | Swagger                                                      | Figma                                                        |
| --------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [gitlab Link](https://lab.ssafy.com/s05-final/S05P31B203) | [JIRA Link](https://jira.ssafy.com/projects/S05P31B203/summary) | [Jenkins Link](http://k5b203.p.ssafy.io:7777/job/Runner/) | [Swagger Link](http://k5b203.p.ssafy.io:8080/swagger-ui/index.html#) | [Figma Link](https://www.figma.com/file/Ga7BAfSNpEEQBctYCYPy3S/%EC%B9%B4%ED%8E%98%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%85%98%3F?node-id=0%3A1) |



---

## 프로젝트 개요

<img src="https://cdn.discordapp.com/attachments/898086737878855702/916013924132995112/unknown.png" width="700">
<img src="https://cdn.discordapp.com/attachments/898086737878855702/916013998904848414/unknown.png" width="700">
<img src="https://cdn.discordapp.com/attachments/898086737878855702/916014074964373614/unknown.png" width="700">
<img src="https://cdn.discordapp.com/attachments/898086737878855702/916014342057627708/unknown.png" width="700">



### [🎬소개영상 UCC ](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ff4f728c-0cdb-41ea-8d3a-8163fe5bf08a/%EC%9E%90%EC%9C%A8PJT_%EB%8C%80%EC%A0%842%EB%B0%98_B203_%ED%95%9C%EA%B1%B4.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211202T155655Z&X-Amz-Expires=86400&X-Amz-Signature=b793854e29590b6cbe5b789757737f487e9e1a8a78e3c67c3f9dac09032e6314&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25EC%259E%2590%25EC%259C%25A8PJT_%25EB%258C%2580%25EC%25A0%25842%25EB%25B0%2598_B203_%25ED%2595%259C%25EA%25B1%25B4.mp4%22&x-id=GetObject)


----

## 기술스택

### Backend 

`JAVA`, `Spring`, `JPA`, `Querydsl`

### Frontend

`Javascript`, `HTML`, `CSS`, `React-native`

### CI/CD

`EC2` `Docker`, `Jenkins`


---

## 아키텍처

<img src="https://cdn.discordapp.com/attachments/898086737878855702/917094667823235102/unknown.png">



---

## Install & Usage

**Backend Key 생성**

```
src
├── main
│   ├── java
│   └── resource
│       ├── firebase
|       |    └── firebase-notification-key.json
│       ├── application-API-KEY.properties
│       ├── ...
```

- firebase-notification-key.json

  firebase 앱 등록시 생성되는 notification-key 파일을 위치시킨다.

- application-API-KEY.properties

  ```properties
  kakao-admin= ...
  aws-accessKey= ...
  aws-secretKey= ...
  aws-s3-bucket= ...
  aws-s3-region= ...
  ```



**Frontend package install & Run**

```bash
npm install -g react-native-cli
npm install
npx react-native start
npx react-native run android
```



### Docker 이미지 생성/실행

**Backend**

```

```

**MySQL**

```
```







