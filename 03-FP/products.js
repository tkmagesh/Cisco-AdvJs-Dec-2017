var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'},
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Initial list of products', function(){
	console.table(products);
});
/*
sort
filter
groupBy
*/

describe('Sort', function(){
	describe('Default sort [products by id]', function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	})
	describe('Sort any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe('Products by name', function(){
			sort(products, 'name');
			console.table(products);
		});

		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});
	});
	describe('Sort any list by any comparer', function(){
		function sort(list, comparer){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++){
					var compareResult = comparer(list[i], list[j])
					if (compareResult > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}
		describe('Products by value [ cost * units ]', function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0;
			}
			sort(products, productComparerByValue);
			console.table(products);
		})
	});
});

describe('Filter', function(){
	describe('All stationary products', function(){
		function filterStationaryProducts(){
			var result = [];
			for(var i=0; i < products.length; i++)
				if (products[i].category === 'stationary')
					result.push(products[i]);
			return result;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});
	describe('Any list by any criteria', function(){
		function filter(list, criteria){
			var result = [];
			for(var i=0; i < list.length; i++)
				if (criteria(list[i]))
					result.push(list[i]);
			return result;
		}
		function negate(criteria){
			return function(){
				return !criteria.apply(undefined, arguments);
			}
		}
		describe('Products By Cost', function(){
			var costlyProductCriteria = function(product){
				return product.cost > 50;
			};
			describe('Costly products [ cost > 50 ]', function(){
				
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts)
			});
			/*describe('Affordable products [ cost <= 50 ]', function(){
				var affordableProductCriteria = function(product){
					return product.cost <= 50;
				};
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});*/
			describe('Affordable products [ ! costly product ]', function(){
				/*var affordableProductCriteria = function(product){
					return !costlyProductCriteria(product);
				};*/
				var affordableProductCriteria = negate(costlyProductCriteria);
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});
		});
		describe('Products By units', function(){
			var underStockedProductCriteria = function(product){
				return product.units < 50;
			};
			describe('Under stocked products [units < 50 ]', function(){
				var underStockedProducts = filter(products, underStockedProductCriteria);
				console.table(underStockedProducts);
			});
			describe('Well stocked products [!underStockedProducts] ', function(){
				/*var wellStockedProductCriteria = function(product){
					return !underStockedProductCriteria(product);
				};*/
				var wellStockedProductCriteria = negate(underStockedProductCriteria);
				var wellStockedProducts = filter(products, wellStockedProductCriteria);
				console.table(wellStockedProducts);
			});
		});
	});
});