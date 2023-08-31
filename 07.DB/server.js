/*
    server.js : 서버, 미들웨어..
    필요한거
    1) express
    2) router 경로 구성
    3) 넌적스
    4) post 방식 데이터 주고 받을 때? body-parser
    5) 포트번호 설정
*/

const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const indexRouter = require('./routes')
const userRouter = require('./routes/user')

const app = express()

// 세션
const session = require('express-session')
const fileStore = require('session-file-store')(session)

app.use(session({
    httpOnly : true,
    resave : false,
    secret : "secret",
    store : new fileStore()
}))

// ---------------------------------------------------

app.set('port', process.env.PORT || 3333)
app.set('view engine', 'html')
app.use(bodyParser.urlencoded({extended : true}))


nunjucks.configure('views', {
    express : app,
    watch : true
})
app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(app.get('port'))