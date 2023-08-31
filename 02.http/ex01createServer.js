// http 서버가 있어야 웹 브라우저 요청을 처리할 수 있다.
// http 모듈 : 현재 파일을 서버로 만들어주는 모듈
// 내 ip 주소 : 192.168.0.40
const http = require('http');
const ip = require('ip');

http
    .createServer((req, res)=>{
        // 첫번째 인자 req(request), 요청에 관한 정보들, 클라이언트가 주는 정보들
        // 두번째 인자 res(response), 응답에 관한 정보들, 서버가 제공하는 정보들


        console.log('create Sever!')
        let ip_res = ip.address()
        console.log('접근한 ip 주소는', ip_res)

        // vv 한국어로 바꿔줌.  200 -> 정상적으로 작동하는 홈페이지, content-type은 text/html 문서로 설정. writeHead태그로 적어야함.
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write('<h1>배고프다.. 오늘 뭐먹지? 연어 먹고싶네..</h1>')
        res.write('<p>접속한 사용자의 ip</p>' + ip_res)
        res.end()
    })
    .listen(3333, ()=>{
        console.log('3333번 포트에서 서버연결 대기 중입니다...')
    })