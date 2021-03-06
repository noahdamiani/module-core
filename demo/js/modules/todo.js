App.views.TodoView = {
	el: '#module-1',

	init: function() {
		this.$list = $(this.el).find('.todo-list');
	},

	events: {
		'click .todo-list li': function(e) {
			var self = $(e.currentTarget);
			this.editTodo(self);
		},
		'click .button': function(e) {
			this.addTodo();
		}
	},

	addTodo: function() {
		var self = this;
		var input = $('<input type="text">')
		self.$list.append(input);
		input.keypress(function (e) {
		  if (e.which == 13) {
		    self.updateTodo(input);
		    return false;
		  }
		});
	},

	editTodo: function(todo) {
		var self = this;
		var input = $('<input type="text" value="' + todo.text() + '">');
		todo.replaceWith(input);
		input.focus(function(){
			this.selectionStart = this.selectionEnd = this.value.length;
		});
		input.focus();
		input.keypress(function (e) {
		  if (e.which == 13) {
		    self.updateTodo(input);
		    return false;
		  }
		});
	},

	updateTodo: function(todoInput) {
		var updatedTodo = $('<li>' + todoInput.val() + '</li>');
		todoInput.replaceWith(updatedTodo);
	}
};
