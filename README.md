# street-cat-fighter Server !!

# 실행방법

## 로컬 실행

```sh
$ npm run build && npm run start

또는

$ npm run start:w  // watch 기능
```

## 도커 실행

```sh
$ docker-compose up --build -d
```

위 명령어를 실행 후 `npm run db:push`를 실행 해야 db에 테이블이 생성됩니다.
