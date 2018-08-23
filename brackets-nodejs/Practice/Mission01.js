// 파일의 내용을 한 줄씩 읽어 들여 화면에 출력하는 기능 만들기
// 모듈 두 개 사용
var fs = require('fs');
var readline = require('readline');

function processFile(filename){
    var instream = fs.createReadStream(filename);   // 읽기스트림 생성
    var reader = readline.createInterface(instream, process.stdout);    // 읽기스트림을 스탠다드 아웃풋으로 읽게하는 인터페이스 생성...?
    
    var count = 0;
    
    reader.on('line', function(line){
        console.log('한 줄 읽음 : ' + line);    // 라인단위로 읽어서 한 줄 전체를 한 번 읽고,
        
        count += 1;
        
        var tokens = line.split(' ');   // 공백으로 구분해서 맨 첫 단어만 변수에 집어넣는다
        
        if(tokens != undefined && tokens.length > 0){
            console.log('#' + count + ' -> ' + tokens[0]);  // 첫 단어만 출력
        }
    });
    
    reader.on('close', function(line){  // function수행 후 파일을 닫는다.
        console.log('파일을 모두 읽음');
    });
}

var filename = './Mission01.txt';   // 변수에 외부 파일을 넣은 뒤
processFile(filename);              // 위에서 정의한 함수를 호출한다.