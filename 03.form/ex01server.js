const http = require('http');
const u_url = require('url');

// 사용자가 요청한 URL을 분석하기 위해 사용하는 모듈
// 현재 넘어오는 요청 url => /?id=bb1234&pw=1234

http
    .createServer((req, res)=>{
        console.log('서버 시작!', req.url)

        // front에서 back으로 넘겨준 정보? request
        // 현재 가져온 url을 파싱 => 내가 사용하기 쉽게
        let query = u_url.parse(req.url, true).query
        console.log(query)

        // abc님 환영합니다!
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write('<h3>' + query.id + '님 환영합니다!</h3>')
        res.end()

    })
    .listen(3333, ()=>{
        console.log('3333번 포트에서 대기 중 ...')
    })