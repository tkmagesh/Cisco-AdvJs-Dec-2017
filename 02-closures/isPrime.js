/*
write a function 'isPrime' in such a way that the algo is not executed more than once for the given number
*/


var isPrime = (function(){
	var cache = {};
	function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		cache[n] = true;
		console.log('processing ', n);
		for(var index=2; index <= (n/2); index++)
			if (n % index === 0){
				cache[n] = false;
				break;
			}
		return cache[n];
	}
	return isPrime;
})();

var isOddOrEven = (function(){
	var cache = {};
	function isOddOrEven(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		
		console.log('processing ', n);
		cache[n] = n % 2 === 0 ? 'even' : 'odd';
		return cache[n];
	}
	return isOddOrEven;
})();


function memoize(fn){
	var cache = {};
	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		cache[n] = fn(n);
		return cache[n];
	}
}

var isOddOrEven = memoize(function(n){
	console.log('processing ', n);
	return n % 2 === 0 ? 'even' : 'odd';
});

var isPrime = memoize(function(n){
	console.log('processing ', n);
	for(var index = 2; index <= (n/2); index++)
		if(n % index === 0) return false;
	return true;
})


function memoize(fn){
	var cache = {};
	return function(){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] !== 'undefined')
			return cache[key];
		cache[key] = fn.apply(undefined, arguments);
		return cache[key];
	}
}