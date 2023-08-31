// 서버를 만들어서 사용자가 입력한 두개의 숫자를 더해서
// 응답하는 페이지를 구축하시오


// 응답 페이지 : 
// 첫번째 숫자 : 15
// 두번째 숫자 : 15
// 연산 결과는 30입니다.

const http = require('http');   // 서버를 만들 때 필요한 모듈
const u_url = require('url');   // get 방식으로 url을 받아옴


http
    .createServer((req, res)=>{
        console.log('request url : ', req.url)
        let query = u_url.parse(req.url, true).query
        console.log('query : ', query)

        let result = "";

        if(query.cal === '+'){
            result = Number(query.num1) + Number(query.num2)
        } else if (query.cal === '-'){
            result = Number(query.num1) - Number(query.num2)
        } else if (query.cal === '*'){
            result = Number(query.num1) * Number(query.num2)
        } else if (query.cal === '/'){
            result = Number(query.num1) / Number(query.num2)
        }

        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write('<p>첫번째 숫자 : ' + query.num1 + '</p>')
        res.write('<p>두번째 숫자 : ' + query.num2 + '</p>')
        res.write('연산 결과는 ' + result + '입니다.')
        res.end()
    })
    .listen(3333, ()=>{
        console.log('3333번 포트에서 대기중')
    })