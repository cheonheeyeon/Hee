var Users = [{name:'소녀시대', age:20},{name:'걸스데이', age:22},{name:'티아라', age:23}];
console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d', Users.length);

delete Users[1];
console.log('delete 키워드로 배열 요소 삭제 후');
console.dir(Users);
// 공간은 빈공간으로 없어지지 않고 남아있다. 그러므로 배열의 길이는 여전히 3.

// splice를 통해 공간자체를 없애기
// splice(수행할 인덱스, 수행할 갯수(0인경우 해당인덱스에 추가되는듯하다))
Users.splice(1,0, {name:'애프터스쿨', age:25});
console.log('splice()로 요소를 인덱스 1에 추가한 후');
console.dir(Users);

Users.splice(2,1);
console.log('splice()로 인덱스 2에 요소를 1개 삭제한 후');
console.dir(Users);
