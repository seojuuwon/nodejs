const express = require('express');
const router = express.Router();
const path = require('path'); // 맥이랑 윈도우랑 파일 경로 적는게 달라서 path.join을 해줘야함


// 메인창으로 왔을 때 어떤 창을 실행시켜 준다.
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..' , 'public/ex02login.html'))
})

router.post('/postLogin', (req,res)=>{
    console.log('login Router')
 
    if (req.body.id == "admin" && req.body.pw == 1234) {
      res.render("loginResult", {msg : "성공!!!😊", id : req.body.id});
    } else {
      res.render("loginResult", {msg : '실패...😥'});
    }
 
 
 })


module.exports = router;