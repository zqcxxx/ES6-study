Promise 就是一个容器
三个状态  pending fulfilled rejected

function timeout(ms) {
	return new Promise((resolve, rejected)=>{
		setTimeout(resolve, ms, 'done');
	});
}

timeout(100).then((value)=>{
	console.log(value);
});



let promise = new Promise((resolve, rejected) => {
	console.log('Promise');
	resolve();
});

promise.then(function () {
	console.log('resolved.');
});

console.log('Hi ！');


Promise实现Ajax操作 

const getJSON = function (url) {
	const promise = new Promise((resolve, rejected) => {
		const handler =function () {
			if (this.readyState !== 4) {
			return;
			}
			if (this.status === 200) {
				resolve(this.response);
			}else {
				rejected(new Error(this.statusText));
			}
		};
		const client = new new XMLHttpRequest();
		client.open('GET', url);
		client.onreadystatechange = handler;
		client.responseType = 'json';
		client.setRequestHeader('Accept', 'application/json');
		client.send();
		
	});
	
	return promise;
};


getJSON('/posts.json').then(function (json) {
	console.log('Contents: '+ json);
}, function (error) {
	console.log('出错了', error)
});


