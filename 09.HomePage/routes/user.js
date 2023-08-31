const express = require('express')
const router = express.Router()
const conn = require('../config/database')

// 회원가입 기능 라우터
router.post('/join', (req, res)=>{
    console.log('회원가입 기능 라우터')

    // 1. join.html 에서 받아온 id, pw, name, address를 각각의 변수에 저장
    let {id, pw, pw2, name, address} = req.body
    
    // 2. 비밀번호와, 비밀번호 확인 데이터가 같으면 회원가입 로직으로
    if (pw === pw2){

        // 3. DB 연결 작업 => insert into 테이블명 values (아이디, 비번, 이름, 주소)
        let sql = 'insert into home_member values(?, ?, ?, ?)'
        conn.query(sql, [id, pw, name, address], (err, rows)=>{

            // 4. 만약 회원가입에 성공하면 alert로 회원가입 성공! => 메인창 이동
            res.send(`<script>alert("회원가입 성공!😊");
                        location.href="http://localhost:3333/"</script>`) 
        })
    } else {
        // 5. 만약 회원가입에 실패하면 alert로 회원가입 실패..=> 회원가입 창으로 이동
        res.send(`<script>alert("회원가입 실패..😥");
                location.href="http://localhost:3333/join"</script>`) 
    }

    // ** 참고
    // 07.DB => 회원가입 로직
    // 07.DB 참고 끝났으면 바로바로 폴더 닫아주기 ★★★
})

// 로그인 기능 라우터
router.post('/login', (req, res)=>{
    console.log('로그인 기능 라우터')

    // 1. layout.html 에서 login Box 안의 데이터를 받아온다 (id, pw)
    // 2. 그 데이터들을 각각 id, pw 변수 안에 저장
    let {id, pw} = req.body;

    // 3. DB 연동해서 해당 id값과 pw값이 일치하는 데이터가 DB에 있는지 확인한다
    let sql = 'select * from home_member where id=? and pw=?'
    conn.query(sql, [id, pw], (err, rows)=>{
        console.log('결과', rows)

        // 4. 데이터가 존재한다면 로그인 성공
        //      4-2) 로그인이 성공했다면, 해당 유저의 정보를 세션에 저장 (id, nick, address)
        //      4-3) 환영합니다! alert => 메인으로 이동
        if(rows.length > 0){    // 배열 안에 데이터가 존재한다면
            
            req.session.user = rows[0]
            
            res.send(`<script>alert('환영합니다!');
            location.href="http://localhost:3333/"</script>`)
        } else {

            // 5. 데이터가 존재하지 않는다면 로그인 실패
            console.log('로그인 실패..')
            res.send(`<script>alert("잘못입력하셨습니다.");
                        location.href="http://localhost:3333/"</script>`)
        }
    })
})

// 로그아웃 기능 라우터
router.get('/logout', (req, res)=>{
    // 1. 세션 삭제
    req.session.destroy()   
    // destroy - undefined 모든 세션 삭제하기 때문에 이렇게 세션이 하나만 있을 때만 사용. 세션이 많이 있을 때 사용하면 다 없어짐

    // 2. 메인페이지에 다시 접근
    res.send(`<script>location.href="http://localhost:3333/"</script>`)
})

// 회원 정보 수정 기능 라우터 (JS fetch 와의 연동) ★★★★★
router.post('/modify', (req, res)=>{
    console.log('회원정보수정!', req.body)

    // 1. 내가 받아온 새 이름과 새 주소를 name, add라는 변수에 넣을 것
    let {name, address} = req.body;

    // 2. id 값? session에서 가져오기
    let id = req.session.user.id;

    // 3. DB 연동
    //  3-2) update set을 이용해서 DB값 변경
    //  3-3) 세션 안에 있는 값 변경 (이름, 주소 변경)
    let sql = 'update home_member set u_name = ?, address = ? where id = ?'
    conn.query(sql, [name, address, id], (err, rows)=>{
        // 4. consol.log('값 변경 성공!'), '값 변경 실패'
        //      => 페이지 이동 X
        if (rows.affectedRows > 0){
            console.log('값 변경 성공!')
            req.session.user.u_name = name;
            req.session.user.address = address;
            res.json({msg : 'success'})
        } else {
            console.log('값 변경 실패')
            res.json({msg : 'failed'})
        }
    })

    
})

module.exports = router;