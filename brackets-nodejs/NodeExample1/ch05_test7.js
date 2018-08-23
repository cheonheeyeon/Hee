// 서버에서 다른 웹 사이트의 데이터를 가져와 응답하기 - 간단한 http클라이언트 만들고, get방식으로 데이터 요청하기
var http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res){  // options대로 get방식으로 데이터를 받아온다
    // 응답 처리
    var resData = '';
    res.on('data', function(chunk){ // 데이터를 받고있는 상태에서 처리되는 이벤트
        resData += chunk;   // 파일을 chunk로 받아 resData에 넣어주기
    });
    
    res.on('end', function(){   // 응답 데이터를 모두 받은 후에 처리되는 이벤트
        console.log(resData);   // resData를 화면에 뿌려준다.
    });
});

req.on('error', function(err){
    console.log("오류 발생 : " + err.message);
});