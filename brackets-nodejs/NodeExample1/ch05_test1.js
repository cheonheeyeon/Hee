// 서버 객체 만들기
// http 모듈을 사용하여 createServer()메소드를 호출하면 서버객체를 만들 수 있다.
var http = require('http');

var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기한다.
//var port = 3000;
//server.listen(port, function(){
//    console.log('웹 서버가 시작되었습니다. : %d', port);
//});

//var host = '192.168.0.5'; // 교재에서 임의로 알려준 ip주소
var host = '127.0.0.1'; 
var port = 3000;
server.listen(port, host, '50000', function(){
    console.log('웹 서버가 시작되었습니다. : %s, %d', host, port);
});