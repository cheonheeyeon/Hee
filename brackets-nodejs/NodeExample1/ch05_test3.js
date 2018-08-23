// 서버 객체 생성 후, 클라이언트의 요청 이벤트 처리하기+클라이언트에 서버 응답 보내주기
var http = require('http');

// http 모듈을 사용하여 createServer()메소드를 호출하면 서버객체를 만들 수 있다.
var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기한다.
var port = 3000;
server.listen(port, function(){
    console.log('웹 서버가 시작되었습니다. : %d', port);
});

//클라이언트 연결 이벤트 처리
server.on('connection', function(socket){
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

//클라이언트 요청 이벤트 처리
server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    
    // html코드를 적어 클라이언트에 응답을 보낸다.
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write(" <head>");
    res.write("     <title>응답 페이지</title>");
    res.write(" </head>");
    res.write(" <body>");
    res.write("     <h1>노드제이에스로부터의 응답 페이지</h1>");
    res.write(" </body>");
    res.write("</html>");
    res.end();
});

//서버 종료 이벤트 처리
server.on('close', function(){
    console.log('서버가 종료됩니다.');
});