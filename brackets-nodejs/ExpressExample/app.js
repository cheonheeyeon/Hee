// Express 기본 모듈 불러오기 
// express객체를 http메소드인 createserver의 파라미터로 전달하여 서버를 시작한다.
var express = require('express')
, http = require('http');

// 익스프레스 객체 생성
var app = express();

// 기본 포트를 app 객체에 속성으로 설정 - env는 서버모드를 설정하게 해준다.
app.set('port', process.env.PORT || 3000);  // process.env에 포트번호가 있으면 그포트로, 없으면 3000으로 사용한다

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});