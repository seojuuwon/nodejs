const express = require('express')
const router = express.Router()
const conn = require('../config/database')


// 로그인 로직 
router.post('/handleLogin', (req,res)=>{

    let {id, pw} = req.body ;
   
    
    // 1. 위에서 가져온 id, pw 와 동일한 데이터가 DB 'member' 안에 있는지 확인하는 SQL 문을 작성해서, 변수 sql 안에 대입하기
    let sql = 'select * from member where id=? and pw=?'
    // 2. DB 와 연동하는 코드 작성하기   
    conn.query(sql, [id, pw], (err, rows)=>{
        if(rows.length > 0){
                res.send(`<script>alert('환영합니다~');
                        location.href="http://localhost:3333/main"</script>`)
                req.session.nick = rows[0].nick; 
        } else {
                res.send(`<script>
                        location.href="http://localhost:3333/login"</script>`)
        }

    })

        // 2-2. 연동 후, 응답하는 rows의 길이가 0 이상이면 로그인 성공, 그렇지 않으면 실패로 간주 
        // 2-3. 로그인을 위해 닉네임을 세션값에 저장 
        // 2-4. 로그인이 완료되면 메인창으로 이동 (파일명 : 'main')
        // 2-5. 로그인이 실패되면 다시 로그인 창으로 이동 (파일명 : 'login')
      


})


module.exports = router 