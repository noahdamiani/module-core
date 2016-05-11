var App = App || {};

App.container = $('#my-app');
App.container.sortable();

Sandbox = function(obj) {
	return {
		toolbox: function(el) {
			var self = this;

			// Close Module
			self.dom.click(el.find('.module-closer'), function() {
				self.dom.find(el).remove();
			});
		},
		dom: App.Core.dom
	}
}

App.Core = function($) {
	var moduleData = {};
	var _dom = {
		find: function(selector) {
			return $(selector);
		},
		wrap: function(element) {
			return $(element);
		},
		click: function(element, task) {
			return $(element).click(task);
		}
	}

	return {
		dom: _dom,

		register: function(moduleId, generator) {
			moduleData[moduleId] = {
				generator: generator,
				instance: null
			};
		},

		start: function(moduleId) {
			var self = this;
			moduleData[moduleId].instance = moduleData[moduleId].generator(new Sandbox(this));
			moduleData[moduleId].instance.init();
			this.eventMapper(moduleData[moduleId].instance);
		},

		startAll: function() {
			App.container.fadeIn('slow');
			for (var moduleId in moduleData) {
				if (moduleData.hasOwnProperty(moduleId)) {
					this.start(moduleId);
				}
			}
		},

		stop: function(moduleId) {
			var data = moduleData[moduleId];
			if (data.instance) {
				data.instance.destroy();
				data.instance = null;
			}
		},

		stopAll: function() {
			for (var moduleId in moduleData) {
				if (moduleData.hasOwnProperty(moduleId)) {
					this.stop(moduleId);
				}
			}
		},

		eventMapper: function(module) {
			var events = module.events,
				doc = this.dom.find(document);
			for (e in events) {
				var myEvent = e.substr(0, e.indexOf(' ')),
					second = e.substr(e.indexOf(' ')+1),
					selector = module.el.selector + ' ' + second;
				if(selector.length) {
					doc.on(myEvent, selector, $.proxy(events[e], module));
				} else {
					throw 'Could not find ' + selector + ' while trying to create ' + myEvent + ' event in module.';
				}
			}

		}
	};
}(jQuery);
