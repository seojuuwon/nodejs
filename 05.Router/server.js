const express = require('express')
const app = express();

// ./routes/index.js 에서 index.js는 생략 가능함 (기본값이라서)
const indexRouter = require('./routes')
const userRouter = require('./routes/user')

// Routing (라우팅) : 사용자 요청에 맞는 응답을 경로 기준으로 구분하여 처리하는 것

app.use('/', indexRouter) // 큰 입구라고 생각하면 됨.
app.use('/user', userRouter) // ex) /user/login, /user/join, /user/setting 기능별로 나누ㅓ놓으면 유지보수가 쉬워짐

app.set('port', process.env.PORT || 3333)
app.listen(app.get('port'))