// 서버 생성
// 1. 필요한 모듈 가져오기 (http)
// 2. 그 모듈로 서버 생성하기
// 3. 계속 듣고있을 입구 생성해주기 (포트번호 작성)

const http = require('http');
// post 방식으로 요청이 왔을 때 처리하는 방식
// 문자열을 queryString 형태로 변환


// 1. npm i querystring (터미널에)
// 2. require

const qs = require('querystring')


http
    .createServer((req, res)=>{
        console.log('서버 시작!')

        let body = ''

        // 1) 사용자가 입력한 값을 누적시켜줄 공간이 필요
        req.on('data', (data)=>{
            body += data;
            console.log(body)
        })

        // 2) 사용자가 입력한 데이터 수신 및 누적이 끝나면 데이터를 출력
        req.on('end', ()=>{
            let post = qs.parse(body)
            console.log(`제가 좋아하는 노래는 ${post.song}이며, 오늘 점심 메뉴는 ${post.menu} 입니다.`)

            // console에 뜬 문장을 html 문서로 나오도록 만들기
            // - 응답 (ex03.js 참고)
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write(`제가 좋아하는 노래는 ${post.song}이며, 오늘 점심 메뉴는 ${post.menu} 입니다.`)
            res.end()


        })


    })
    .listen(3333, ()=>{
        console.log('3333번 포트에서 대기 중 ..')
    })