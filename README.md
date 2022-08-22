# wanted_pre_onboarding

wanted_pre_onboarding 사전 기술과제 </br>
기업 채용공고 페이지 관련 API구현
- 포스팅
- 수정
- 삭제
- 리스트
- 상세페이지
- 채용공고지원

# 사용기술 스택

- node.js
- express
- sequelize
- mysql

# Project Structure

```bash
.
├── README.md
├── src
│   ├── database
│   │   ├── config
│   │   │   └── config.js
│   │   ├── models
│   │   │   ├── index.js
│   │   │   └── resources.js
│   │   ├── migrations
│   │   └── seeders
│   ├── controllers
│   │   ├── index.js
│   │   └── resourcesController.js
│   ├── models
│   │   └── resourcesDao.js
│   ├── routes
│   │   ├── index.js
│   │   └── resourcesRouter.js
│   ├── services
│   │   └── resourcesService.js
│   ├── utils
│   │   ├── exceptions.js
│   │   └── validators.js
│   ├── middlewares
│   │   ├── exceptions.js
│   │   └── validators.js
│   ├── app.js
│   └── server.js
├── .gitignore
├── package-lock.json
└── package.json
```

- server.js : 포트지정 및 http 서버를 여는 역할을 합니다.
- app.js : 서버를 열때 필요한 각종 소스코드와 미들웨어들을 조합합니다.
- src/database : sequelize Model 과 셋팅파일 들을 모아놓는 곳 입니다.
- utils : 의존성없는 모듈들이 모여있습니다.(Error class 파일, validators파일)
- middlewares : 컨트롤러에 닿기 전에 반복되는 로직을 모듈화 해 놓은 폴더입니다.(Error로거 & 핸들러, 토큰검사기)
- routes : 라우팅 로직을 담당합니다.
    - routes/index.js 에서 각 리소스별 Router파일로 분기합니다
- controllers : 요청과 응답만을 담당하며 각리소스에 해당하는 services 파일로 연결합니다.
- services : 프로젝트의 서비스로직을 구현하며 Dao에 필요한 데이터를 전달하며 응답할 데이터를 controller에게 전달합니다.
- models : ORM을 사용하여 DB와 통신합니다.

# Project ERD
<img width="1233" alt="스크린샷 2022-08-22 오전 12 32 48" src="https://user-images.githubusercontent.com/100751719/185801404-1b43fa0e-22ce-48ad-bb22-95f274aed89c.png">


- Company와 user 는 1:1관계입니다. (한 회사의 회사계정은 하나만 허용합니다.)

# End-points

_채용공고 포스팅 요청_

```bash
headers = { Authrization : jwt token }
```

```bash
http -v POST http://127.0.0.1:8000/job-postings
```

_채용공고 수정 요청_

```bash
headers = { Authrization : jwt token }
```

```bash
http -v PATCH http://127.0.0.1:8000/job-postings/:jobPostingId
```

_채용공고 삭제 요청_

```bash
headers = { Authrization : jwt token }
```

```bash
http -v DELETE http://127.0.0.1:8000/job-postings?job-posting-ids=[1,2,3]
```

_채용공고 리스트 조회 요청_

```bash
http -v GET http://127.0.0.1:8000/job-postings?offset=0&limit=10&company-name=원티드&technology_stack_name=python&order-key=created-at
```

_채용공고 상세페이지 조회 요청_

```bash
http -v GET http://127.0.0.1:8000/job-postings/:jobPostingId
```

_채용공고 지원 요청_

```bash
headers = { Authrization : jwt token }
```

```bash
http -v POST http://127.0.0.1:8000/applies
```

# 기능 구현 사항

## 1._채용공고 포스팅 요청_

1. 토큰을 통해 유저의 정보와 권한을 확인합니다 (company 권한이 있는 유저만 포스팅이 가능합니다.)
2. 채용등록하는 회사정보는 토큰의 유저정보에서 가져옵니다
3. 채용포지션의 id, 채용보상금, 채용공고내용, 기술스택 id를 클라이언트가 body값에 담아 요청을 보냅니다.
4. 채용포지션과 기술스택의 경우 채용공고 등록페이지에서 리스트를 제공하며 해당 리스트에 id값이 담겨있습니다.
5. content는 채용공고의 질을 위하여 200자 이상으로 제한합니다.
6. 한 회사가 동일한 포지션에 대한 채용공고를 올릴 수 없습니다.
7. 채용보상금은 음수값을 허용하지 않습니다.

## 2._채용공고 수정 요청_

1. 모든 데이터의 유효성검사와 데이터 전달방식은 포스팅요청과 동일합니다.
2. PathParams로 받은 id로 데이터베이스를 조회해 포스팅이 존재하지 않으면 에러를 반환합니다.
3. 다른회사의 채용공고를 수정할 수 없습니다.

## 3._채용공고 삭제 요청_

1. QueryParams로 요소가 int형태인 객체를 받아옵니다.
2. 다른 회사의 채용공고를 삭제할 수 없습니다.
3. 요청받은 id중 하나라도 데이터베이스에 존재하지않으면 에러를 반환합니다.

## 4._채용공고 리스트 조회 요청_

1. QueryParams로 아래의 기능을 사용할 수 있습니다.
   1. offset,limit 키로 pageNation이 가능합니다.(default offset=0,limit=20)
   2. order-key로 최신순,오래된순,채용보상금 높은순,낮은순 정렬이 가능합니다.(default 최신순)
   3. 회사이름 별로 조회가 가능합니다.
   4. 사용기술 별로 조회가 가능합니다.
2. 아래의 데이터를 반환합니다.
   1. 채용공고id
   2. 채용포지션
   3. 채용보상금
   4. 공고 등록일
   5. 회사이름
   6. 회사지역
   7. 회사국가
   8. 사용기술 스택

## 5._채용공고 상세페이지 조회 요청_

1. PathParams로 채용공고 id를 받아 조회합니다.
2. 데이터베이스에 존재하지않는 id가 들어오면 에러를 반환합니다.
3. 채용공고 리스트와 동일한 데이터를 반환한하며 같은회사의 다른 채용공고의 id,포지션,등록일시를 배열형대로 같이 반환합니다.
4. 같은회사의 다른 채용공고는 정보노출을 다양하게 하기위해 랜덤으로 데이터를 반환합니다.

## 6._채용공고 지원 요청_

1. body값으로 채용공고의 id를 받아와 토큰에 담긴 유저 id와 함께 데이터를 저장합니다.
2. 회사계정으로는 지원할 수 없으며 일반 사용자만 지원 가능합니다.
3. 같은 채용공고에 여러번 지원할 수 없습니다.

# API DOCS

[Link](https://documenter.getpostman.com/view/21516218/VUqpsxXp)
