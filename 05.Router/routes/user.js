const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('<h1>User Page</h1>')
})

/*
    라우트 매개변수
    - 문자 그대로의 /:id <- 라우트를 의미하는게 아니라,
      : 뒤에 있는 매개변수 안에는 내가 작성한 파라미터 값이 들어가게 됨.

    ex) localhost:3333/hhd
        /:id
        => req.params.id 안에 hhd라는 값이 들어가게 됨
    
    - 해당 객체는 req.params 안에 있음
    - 매개변수 없는 일반 라우터 보다 뒤쪽에 있어야 일반 라우터를 방해하지 않는다.
    
*/
router.get('/:id', (req, res)=>{
    console.log(req.params)
    res.send(req.params.id + '님 환영합니다~')
})


module.exports = router;