// 서버 생성, 사용자가 원하는 구구단 출력
// table로 출력

const http = require('http');
const u_url = require('url');

http
    .createServer((req, res)=>{
        console.log('서버 시작!', req.url)
        let query = u_url.parse(req.url, true).query
        console.log('query : ', query)

        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write('<table border="1px solid black">')
        for(let i=1; i<=9; i++){
            res.write(`<tr><td> ${query.num} * ${i} = ${query.num * i}</td></tr>`)
            // res.write('<tr><td>' + Number(query.num) + '*' + i + "=" + result + '</tr></td>')
        };
        res.write('</table>')
        res.end()
    })
    .listen(3333, ()=>{})