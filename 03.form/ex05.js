/*
    ex05회원가입.html에서 받아온 정보들을 가지고
    본인을 소개하는 페이지를 만들어주세요.

    필수 포함 정보 : 이름, 취미, 생일, mbti, 하고싶은말(TALK)

    1. 서버 생성
    2. post 방식으로 넘어온 데이터를 누적
    3. 누적이 끝났을 때 데이터를 출력
    4. 내가 받아온 데이터를 기반으로 홈페이지를 응답해주자
    ** 응답하는 코드는 req.on('end', ()=>{}) <- 해당 콜백함수 안에 들어가있어야함

*/

const http = require('http');
const qs = require('querystring')


http
    .createServer((req, res)=>{
        console.log('서버 시작!')

        let body = ''

        // 1. 데이터 누적
        req.on('data', (data)=>{
            body += data;
            console.log(body)
        })

        // 2. 누적된 데이터 
        req.on('end', ()=>{
            let post = qs.parse(body)

            // console에 뜬 문장을 html 문서로 나오도록 만들기
            // - 응답 (ex03.js 참고)
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write(`이름 : ${post.name} <br> 취미 : ${post.hobby} <br> 생일 : ${post.birth} <br> mbti : ${post.mbti}`)
            res.end()


        })


    })
    .listen(3333, ()=>{
        console.log('3333번 포트에서 대기 중 ..')
    })