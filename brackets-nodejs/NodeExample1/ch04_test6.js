var fs = require('fs');

// 파일을 비동기식으로 읽어들임
fs.readFile('./package.json', 'utf8', function(err,data){
    console.log(data);
});

console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.');