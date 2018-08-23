// cookie parser 미들웨어 사용하기 - 사용자의 로그인 상태여부를 클라이언트 웹브라우저에서 확인하기
// localhost:3000/process/setUserCookie
// Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

// Express의 미들웨어 불러오기(body parser, 오류핸들러, cookie parser등)
var bodyParser = require('body-parser')
, static = require('serve-static')
, expressErrorHandler = require('express-error-handler')
, cookieParser = require('cookie-parser');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(static(path.join(__dirname, 'public')));

// cookie-pasrer 미들웨어를 사용하도록 설정 : 요청 객체에 cookies속성이 추가됨
app.use(cookieParser());

// 라우터 객체 참조
var router = express.Router();

// 라우팅 함수 등록 - showCookie의 패스를 처리하는 콜백함수 등록
router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨.');
    
    res.send(req.cookies);
});

// 라우팅 함수 등록 - setUserCookie의 패스를 처리하는 콜백함수 등록
router.route('/process/setUserCookie').get(function(req,res){ 
    console.log('/process/setUserCookie 호출됨.');
    
    // 쿠키 설정 : 응답객체의 cookie()메소드로 user쿠키를 추가함.
    res.cookie('user', {
        id: 'mike',
        name: '소녀시대',
        authorized: true
    });
    
    // redirect로 응답(사용자가 응잡 문서를 조회할 때 쿠키문서를 볼 수 있도록 함)
    res.redirect('/process/showCookie');
});

app.use('/', router);

// 모든 router처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});