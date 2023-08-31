const express = require('express')
const router = express.Router()

// Main Page 열기
router.get('/', (req, res)=>{
    console.log('main page')
    console.log('현재 세션 : ', req.session.user )
    res.render('index', { obj : req.session.user })
    // => 'index.html' 을 렌더링 할 때, obj 라는 변수 안에 세션 user 값을 담아주겠다.
})

// 회원가입 페이지 열기
router.get('/join', (req, res)=>{
    res.render('join')
})

module.exports = router;