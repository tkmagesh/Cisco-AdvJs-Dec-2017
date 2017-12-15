var radio = (function(){

	function Radio(name){
		this.__name = name;
		this.__subscribers = [];
	}

	Radio.prototype.subscribe = function(callback) {
		if (typeof callback === 'function')
			this.__subscribers.push(callback);
		return this;
	};

	Radio.prototype.broadcast = function(data) {
		this.__subscribers.forEach(function(subscriber){
			subscriber(data);
		});
		return this;
	};

	Radio.prototype.unsubscribe = function(callback) {
		for(var index = this.__subscribers.length-1; index >=0; index--)
			if (this.__subscribers[index] === callback)
				this.__subscribers.splice(index, 1);
		return this;
	};

	var radios = {};

	return function(evtName){
		radios[evtName] = radios[evtName] || new Radio(evtName);
		return radios[evtName];
	}
})();