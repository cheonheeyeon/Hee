// 토큰과 함께 요청한 정보 처리하기
// localhost:3000/process/users/2
// Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
, static = require('serve-static');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

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
router.route('/process/users/:id').get(function(req,res){
    console.log('/process/users/:id 처리함.');
    
    // url 파라미터 확인
    var paramId = req.params.id;
    
    console.log('/process/users와 토큰 %s를 이용해 처리함.', paramId);
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.end();
})

//router.route('/process/login').post(function(req,res){
//    console.log('/process/login 처리함.');
//    
//    var paramId = req.body.id || req.query.id;  // 왼쪽이 post용, 오른쪽이 get용
//    var paramPassword = req.body.password || req.query.password;
//    
//    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
//    res.write('<div><p>Param id : ' + paramId + '</p></div>');
//    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
//    res.write(" <br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
//    res.end();
//});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 모든 router처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

// 등록되지 않은 패스에 대해 페이지 오류 응답 - 책에서는 이 부분 코드를 주석처리를 하지 않았지만, 등록되지 않은 모든 패스에 대해서 아래의 html코드가 적용되어 나타나기 때문에 이번 실습파일의 404.html이 적용되지 않는 것 같으므로 주석처리.
//app.all('*', function(req,res){
//    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
//});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});