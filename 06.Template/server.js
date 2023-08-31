const express = require('express')
const app = express()

/*
    HTML은 정적인 언어이기때문에 1000개의 데이터를 넣고싶다면 하나하나 코딩해서 넣어야함
    그런데 JS 문법을 이용한다면? 반복문을 돌리면 된다
    ==> HTML 문서에서 JS 문법을 사용할 수 있도록 하자
        : 템플릿 엔진 (Template Engine)
        종류 = Nunjucks, EJS, PUG ... etc
        우리는 HTML 확장자를 사용할 수 있고, HTML과 가장 사용법이 유사한 
        Nunjucks 라는 엔진을 사용할 것!

    // npm i express nunjucks chokidar 띄어쓰기를 하면 여러개를 설치할 수 있음
    ** Numjucks 사용방법
    1) 설치 : npm i nunjucks chokidar
    2) require
*/
const nunjucks = require('nunjucks')

const indexRouter = require('./routes')

// 3) view 엔진을 html 확장자로 설정하겠다!
app.set('view engine', 'html')


// 4) nunjucks 사용
// configure 메소드의 첫번째 인자 : views 폴더의 경로
//                   두번째 인자 : 옵션이 담긴 객체
//                   -- express 속성 : express가 담겨있는 객체 연결
//                   -- watch 속성 : true일 때, html 파일이 변경되면 템플릿
//                                   엔진을 다시 렌더링 한다.
nunjucks.configure('views', {
    express: app,
    watch: true
})

// CORS 설정
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인에서 요청 허용
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



app.set('port', process.env.PORT || 3333)
app.use('/', indexRouter)


app.listen(app.get('port'));