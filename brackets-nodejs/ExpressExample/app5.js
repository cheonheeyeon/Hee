// 익스프레스의 메소드 redirect()이용해보기. 3000번 포트로 접속하면 바로 구글로 이동하게 된다.
var express = require('express')
, http = require('http');

var app = express();

// req : 요청객체, res : 응답객체
app.use(function(req, res, next){
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    res.redirect('http://google.co.kr');
//    res.send({name:'소녀시대', age:20});
//    req.user= 'mike';
//    
//    next(); // 반드시 써서 다음 미들웨어로 넘어갈 수 있도록 해야한다.
});

app.use('/', function(req, res, next){
    console.log('두 번째 미들웨어에서 요청을 처리함.');
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});