// 객체를 선언함과 동시에 속성 할당해주기

var Person={
    age : 20,
    name : '소녀시대',
    add : function(a, b){
        return a+b;
    }
};

console.log('더하기 : %d', Person.add(10,10));