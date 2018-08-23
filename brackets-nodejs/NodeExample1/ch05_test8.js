// 다른 서버로부터 데이터를 post방식으로 요청하기
var http = require('http');

var opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {}
};

var resData = '';
var req = http.request(opts, function(res){ // get, post가 아닌 request메소드 사용.
    //응답처리 - get과 같다. resData의 초기화는 왜 메소드 밖에서 해주는걸까?
    res.on('data', function(chunk){
        resData+=chunk;
    });
    res.on('end', function(){
        console.log(resData);
    });
});

opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = "q=actor";
opts.headers['Content-Length'] = req.data.length;

req.on('error', function(err){
    console.log("오류 발생 : "+err.message);
});

//요청 전송
req.write(req.data);
req.end();