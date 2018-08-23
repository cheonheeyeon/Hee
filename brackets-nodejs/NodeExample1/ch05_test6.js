// 서버 객체 생성 후, 클라이언트의 요청 이벤트 처리하기+클라이언트에 서버 응답 보내주기를 정해놓은 크기만큼 '그림'으로 해보기
var http = require('http');
var fs = require('fs');

var server = http.createServer();

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
    
    var filename = 'hanbi.jpeg';
    var infile = fs.createReadStream(filename, {flags: 'r'});
    var filelength = 0;
    var curlength = 0;
    
    fs.stat(filename, function(err, stats){ 
        filelength = stats.size;
    });
    
    // 헤더 쓰기
    res.writeHead(200, {"Conteint-Type" : "image/jpeg"});
    
    // 파일 내용을 스트림에서 읽어 본문 쓰기
    infile.on('readable', function(){
        var chunk;
        while(null != (chunk = infile.read())){
            console.log('읽어 들인 데이터 크기 : %d', chunk.length);
            curlength += chunk.length;
            res.write(chunk, 'utf8', function(err){
                console.log('파일 부분 쓰기 완료 : %d, 파일 크기 : %d', curlength, filelength);
                if(curlength>=filelength){
                    // 응답 전송하기
                    res.end();
                }
            });
        }
    });
    
    // 파이프로 연결하여 알아서 처리하도록 설정하기
    // 파일을 스트림으로 전송하고, 서버응답객체도 스트림으로 해서 pipe로 연결하면 밑에서처럼 별다른 함수처리, 콜백함수, 메소드 없이도 파일에 응답을 보낼 수 있다.
//    infile.pipe(res);
    
// 스트림단위가 아닌 경우 - 별다른 코드를 적어줘야 한다..
//    fs.readFile(filename, function(err, data){
//        res.writeHead(200, {"Content-Type" : "image/jpeg"});
//        res.write(data);
//        res.end();
//    });
});

//서버 종료 이벤트 처리
server.on('close', function(){
    console.log('서버가 종료됩니다.');
});