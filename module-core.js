/*  Usage:

	Author: Noah Damiani
	
	Define your web app: App.container = $('#your-app-name');
	Define Modules, reference module-example.js
	Start module core: App.Core.startAll();
	
*/

var App = App || {};

Chassis = function(obj) {
	return {
		dom: App.Core.dom
	}
}

App.Core = function($) {
	var moduleData = {};
	var _dom = {
		find: function(selector) {
			return $(selector);
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
			moduleData[moduleId].instance = moduleData[moduleId].generator(new Chassis(this));
			moduleData[moduleId].instance.init();
			this.eventMapper(moduleData[moduleId].instance);
		},

		startAll: function() {
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
