console.log('argv 속성의 파라미터 수 : '+process.argv.length);
console.dir(process.argv);  // 2출력됨 -> 파일명, 경로 두개의 파라미터

if(process.argv.length>2){
    console.log('세 번째 파라미터의 값 : %s', process.argv[2]);
}

process.argv.forEach(function(item,index){
    console.log(index+':',item);
});