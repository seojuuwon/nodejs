const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const indexRouter = require('./routes');
const userRouter = require('./routes/user')

const cors = require('cors')

/*
    CORS 오류 발생!
    1) cors 설치 npm i cors
    2) require
    3) 미들웨어 등록
*/
app.use(express.json()) // json 변환할 때 필요한 미들웨어
app.use(cors())


// 1. port 번호 설정
app.set('port', process.env.PORT || 3333);

// 2. 동적인 페이지 설정 - nunjucks
app.set('view engine', 'html');
nunjucks.configure('views', {
    express : app,
    watch : true    // 재수정이 되었는지 계속 확인
})

// 3. post 방식으로 데이터를 넘겨줄 때 필요함
app.use(bodyParser.urlencoded({extended : true}))

// 4. 정적인 파일들 public에 접근
app.use(express.static(__dirname + '/public'))

// 5. 세션 저장소 관리
app.use(session({
    httpOnly : true,
    resave : false, // 재저장 할 건지 : ㄴㄴ
    secret : 'secret',
    store : new fileStore() // 새로운 파일 저장소 만들어서 저장
}))


// 6. 라우팅 처리
app.use('/', indexRouter)
app.use('/user', userRouter)


// app.listen은 가장 하단에 있어야함.
app.listen(app.get('port'), ()=>{
    console.log(app.get('port') + '번 포트에서 대기 중 ..')
})