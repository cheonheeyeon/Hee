var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Calc = function(){  // 생성자
    var self = this;
    
    this.on('stop', function(){     // 리스너 추가
        console.log('Calc에 stop event 전달됨.');
    });
};

util.inherits(Calc, EventEmitter);  //상속

Calc.prototype.add = function(a,b){     // 멤버함수추가
    return a + b;
}

module.exports = Calc;
module.exports.title = 'calculator';