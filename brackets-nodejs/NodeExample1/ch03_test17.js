function add(a, b, callback){
    var result = a+b;
    callback(result);
    
    var count = 0;
    var history = function(){
        count++;
        return count + ' : ' + a + ' + ' + b + ' = ' + result;
    };
    return history;
}

var add_history = add(10,10,function(result){
    console.log('파라미터로 전달된 콜백 함수 호출됨.');
    console.log('더하기 (10,10)의 결과 : %d', result);
});

// 세개의 줄에서 각 줄의 함수 호출이 끝나면 이전 함수에서의 변수/메모리에 접근이 불가한데 함수안에서 변수에 함수를 새로 만들어 할당한 경우, 예외적으로 접근이 가능하다.
console.log('결과 값으로 받은 함수 실행 결과 : ' + add_history()); 
console.log('결과 값으로 받은 함수 실행 결과 : ' + add_history());
console.log('결과 값으로 받은 함수 실행 결과 : ' + add_history());