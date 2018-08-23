// 라우터 미들웨어 이용해보기. 클라이언트가 보낸 url에 포함된 문자열 중 일부를 서버에서 파라미터로 처리하기
// localhost:3000/login3.html
// Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
, static = require('serve-static');

// 라우터 객체 참조
var router = express.Router();

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(static(path.join(__dirname, 'public')));

// 라우팅 함수 등록
router.route('/process/login/:name').post(function(req,res){
    console.log('/process/login/:name 처리함.');
    
    var paramName = req.params.name;
    
    var paramId = req.body.id || req.query.id;  // 왼쪽이 post용, 오른쪽이 get용
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.write(" <br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});