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
		return cache[n]
	}
	return isPrime;
})();