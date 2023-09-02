const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const indexRouter = require('./routes')
const userRouter = require('./routes/user')

const app = express()
const session = require('express-session')
const fileStore = require('session-file-store')(session)


app.set('port', process.env.PORT || 3333); 
app.set('view engine', 'html')
app.use(bodyParser.urlencoded({extended : true}))

nunjucks.configure('views', {
   express : app, 
   watch : true
})

// 세션 미들웨어
app.use(session({
   httpOnly : true, // http 요청으로 온 것만 처리
   resave : false, // 세션을 항상 재 저장할지? 
   secret : "secret", // 암호화 할 때 쓰이는 키 
   store : new fileStore() // 세션을 저장하기위한 저장소
}))

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(app.get('port'))