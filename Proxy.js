var proxy = new Proxy({}, {
	get: function (target, property) {
		return 35;
	}
});




;

;


console.log(proxy.time)

console.log(proxy.name)

console.log(proxy.title)



多个拦截操作

var handler = {
	get: function (target, name) {
		if (name === 'prototype') {
			return Object.prototype;
		}
		return 'Hello,' + name;
	},

	apply: function (target, thisBinding, args) {
		return args[0];
	}

	// construct: function (target, args) {
	// 	return {value: args[1]};
	// }
};


var fproxy = new Proxy(function (x, y) {
	return x + y;
}, handler);


fproxy(1, 2)

console.log(fproxy(1, 2));

// console.log(new fproxy(1, 2));

console.log(fproxy.prototype == Object.prototype);


console.log(fproxy.foo === 'Hello, foo');


get() 方法  拦截读取操作

var person = {
	name: '张三'
};

var proxy = new Proxy(person, {
	get: function (target, property) {
		if (property in target) {
			return target[property];
		}else {
			throw new ReferenceError("Property \"" + property + "\" dees not exist");
		}
	}
});

console.log(proxy.name);

console.log(proxy.age);

function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c

console.log(arr[-1]);