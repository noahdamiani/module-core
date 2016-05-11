App.Core.register('Todo', function(ch) {
	return {
		// Define Module DOM by ID or Class
		el: ch.dom.find('#module-1'),

		// Click events in format 'event selector': function(e) { }
		// "this" will reference module object, use $(e.currentTarget) to reference current event's selector
		events: {
			'click .todo-list li': function(e) {
				console.log($(e.currentTarget)); // $(.todo-list li);
				console.log(this); // parent object: return { }
				this.anotherFunction();
			}
		},

		init: function() {
			// Grab global module functions from Chassis: ch.globalFunction(this.el);
		},

		anotherFunction: function() {
			console.log('works');
		}
	};
});
