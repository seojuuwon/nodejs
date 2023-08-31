/*
    쿠키 (Cookie) : 클라이언트 웹 브라우저에 저장되는 정보
    - 쿠키는 서버의 자원을 전혀 사용하지 않고, 오로지 클라이언트의 자원이다.
    - 놀이공원에서 자유이용권은 손님이 늘 가지고 다니는 것과 같은 이치
    - 쿠키는 사용자가 브라우저를 종료하더라도 그 기록이 남아 있음
    - 그 만료 시기 또한 지정 가능 (ex. 7일간 보지 않기, 오늘은 보지 않기, ... etc)
    - 장바구니, 자동로그인 등 기능들 사용 가능

    1) 설치 : npm i cookie-parser
    2) require
*/

const express = require('express')
const router = express.Router()

// 1) 쿠키 저장하기 : setCookie
router.get('/setCookie', (req, res)=>{
    console.log('set cookie router')

    // 응답.cookie(key, value)
    res.cookie('nickname', '춘식이')
    
    // 만료 설정 방법 1 : maxAge
    // - 쿠키의 수명을 밀리초단위로 설정 (1초 = 1000밀리초)
    res.cookie('menu', '바닐라라떼', {
        maxAge : 10000  // 만밀리초는 십초
    })

    // 만료 설정 방법 2 : expires
    // - 현재 날짜 + 초 * 분 * 시간 * 일수
    // - 쿠키의 수명을 만료 날짜로 설정
    res.cookie('song', '여름아 부탁해', {
        expires : new Date(Data.now() + 60*60*24*3)
    })
    
    res.send('쿠키 생성 완료!')
})

// 2) 쿠키 확인하기
router.get('/getcookie', (req, res)=>{
    console.log(req.cookies.nickname)
    res.send('닉네임은' + req.cookies.nickname + '입니다.')
})

// 3) 쿠키 삭제하기
router.get('/clearcookie', (req, res)=>{
    res.clearCookie('nickname')
    res.send('쿠키 삭제 완료!')
})

module.exports = router;