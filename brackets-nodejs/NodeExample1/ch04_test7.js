var fs = require('fs');

//비동기식으로 파일쓰기
fs. writeFile('./output.txt', 'Hello World!', function(err){
    if(err){
        console.log('Error : ' + err);
    }
    console.log('output.txt 파일에 데이터 쓰기 완료.');
});

console.log('이게 먼저 나타나고 그다음 위의 함수가 실행된다~비동기최고');