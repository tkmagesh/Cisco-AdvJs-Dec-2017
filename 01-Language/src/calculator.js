function add(x,y){
	function parseArg(n){
		if (Array.isArray(n)) return add.apply(undefined, n);
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n,10);	
	}
	return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add([].slice.call(arguments, 1));
}

/*
this -> invocation context

When a function is
	- invoked as a method of an object (obj)
		this -> obj
	- invoked as a function
		this -> global scope (window in the browser)
	- invoked using the 'call' method of the function

	- invoked using the 'apply' method of the function
*/