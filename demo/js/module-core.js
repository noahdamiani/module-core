var App = App || {};

Chassis = function(obj) {
	return {
		getData: function(ajax) {
			var request = new XMLHttpRequest();
			request.open(ajax.type, ajax.url, true);
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			  	ajax.success(JSON.parse(request.responseText));
			  }
			};
			request.send();
		}
	}
};

App.Core = function() {
	var moduleData = {};

	return {

		register: function(moduleId, generator) {
			moduleData[moduleId] = {
				generator: generator,
				instance: null
			};
		},

		start: function(moduleId) {
			var mi = moduleData[moduleId].instance;
			mi = moduleData[moduleId].generator(new Chassis(this));
			mi.elString = mi.el;
			mi.el = document.querySelector(mi.el);
			mi.init();
			this.eventMapper(mi);
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
			var events = module.events;
			for (e in events) {
				var myEvent = e.substr(0, e.indexOf(' ')),
					second = e.substr(e.indexOf(' ')+1),
					selector = document.querySelectorAll(module.elString + ' ' + second);
				if(selector.length) {
					for (var i = 0; i < selector.length; i++) {
						selector[i].addEventListener(myEvent, events[e].bind(module));
					}
				} else {
					throw 'Could not find ' + selector + ' while trying to create ' + myEvent + ' event in module.';
				}
			}
		}
	};
}();
