function Spinner(){
	var counter = 0;

	this.up = function(){
		return ++counter;
	};
	this.down = function(){
		return --counter;
	};
}




class Spinner{
	__counter__ = 0;
	constructor(){
		//this.__counter__ = 0;
    }
	up(){
		return ++this.__counter__;
    }
	down(){
		return --this.__counter__;
    }
}