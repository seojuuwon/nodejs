const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send(`<h1>Main Page</h1>
    <a href="/user">user 페이지</a>
    <a href="/user/hhd">황해도 페이지</a>
    <a href="/user/jbk">정봉균 페이지</a>
    <a href="/user/syp">선영표 페이지</a>
    `)
})

router.get('/login', (req, res)=>{
    res.send('<h1>Login Page</h1>')
})
module.exports = router;