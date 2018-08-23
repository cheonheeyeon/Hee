// multer 미들웨어 설치해서 파일 업로드하기. 멀티파트포맷을 이용하여 웹서버에 파일을 업로드 할 수 있다.
// Express 기본 모듈 불러오기
var express = require('express')
, http = require('http')
, path = require('path');

// Express의 미들웨어 불러오기(body parser, 오류핸들러, cookie parser등)
var bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, static = require('serve-static');
//, errorHandler = require('errorhandler');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler')

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

//클라이언트에서 ajax로 요청했을 때 CORS(다중서버접속) 지원
var cors = require('cors');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더와 uploads 폴더 오픈
app.use('/public', static(path.join(__dirname, 'public')));
//app.use(static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

// cookie-pasrer 미들웨어를 사용하도록 설정 : 요청 객체에 cookies속성이 추가됨
app.use(cookieParser());

app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

// 클라이언트에서 ajax로 요청했을 때 CORS(다중서버접속)지원
app.use(cors);

//multer 미들웨어 사용 : ****미들웨어 사용순서 중요 : body-parser->multer->router
//파일 제한 : 10개, 1G
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads')
    },
    filename: function(req, fine, callback){
        callback(null, file.orginalname + Date.now())
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function(req, res){
    console.log('/process/login 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    if(req.session.user){
        //이미 로그인 한 상태
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        
        res.redirect('/product.html');
    }else{
        //세션 저장
        req.session.user = {
            id:paramId,
            name:'소녀시대',
            authorized:true
        };
        
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write(" <br><br><a href = '/process/product'>상품 페이지로 이동하기</a>");
        res.end();
    }
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req, res){
    console.log('/process/logout 호출됨.');
    
    if(req.session.user){
        //로그인된 상태
        console.log('로그아웃합니다.');
        
        req.session.destroy(function(err){  // 세션제거
            if(err) {throw err;}
            
            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/login2.html');
        });
    }else{
        //로그인 안된 상태
        console.log('아직 로그인되어 있지 않습니다.');
        
        res.redirect('/login2.html');
    }
});

// 라우팅 함수 등록 - showCookie의 패스를 처리하는 콜백함수 등록
router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨.');
    
    res.send(req.cookies);
});

// 상품정보 라우팅 함수
router.route('/process/product').get(function(req, res){
    console.log('/process/product 호출됨.');
    
    if(req.session.user){   // 유저 세션이 있는지 먼저 확인을 한다.(사용자가 로그인을 한 상태))
        res.redirect('/product.html');
    }else{
        res.redirect('/login2.html');
    }
});

router.route('/process/photo').post(upload.array('photo', 1), function(req,res){
    console.log('/process/photo 호출됨.');
    
    try{
        var files = req.files;
        
        console.dir('#====== 업로드된 첫번째 파일 정보 =====#');
        console.dir(req.files[0]);
        console.dir('#=====#');
    
    // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;
    
        if(Array.isArray(files)){//배열에 들어가 있는 경우(설정에서 1개의 파일도 배열에 넣게 함}
            console.log("배열에 들어있는 파일 갯수 : %d", files.length);
        
            for(var index=0;index<files.length;index++){
                originalname = files[index].originalname;
                filename = files[index].name;
                mimetype = files[index].mimetype;
                size = files[index].size;
            }
        }else{ //배열에 들어가 있지 않은 경우(현재 설정에서는 해당 없음)
            console.log("파일 갯수 : 1");
        
            originalname = files[index].originalname;
            filename = files[index].name;
            mimetype = files[index].mimetype;
            size = files[index].size;
        }
    
        console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
    
        //클라이언트에 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h3>파일 업로드 성공</h3>');
        res.write('<hr/>');
        res.write('<p>원본 파일 이름 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
        res.write('<p>MIME TYPE : ' + mimetype + '</p>');
        res.write('<p>파일 크기 : ' + size + '</p>');
        res.end();
    
    }catch(err){
        console.dir(err.stack);
    }
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