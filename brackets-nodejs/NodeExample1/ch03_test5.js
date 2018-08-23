// 객체의 속성으로 함수를 할당할 수 있다

var Person={};

Person['age']=20;
Person['name']='소녀시대';
Person.add=function(a,b){
    return a+b;
};

console.log('더하기 : %d', Person.add(10,10));