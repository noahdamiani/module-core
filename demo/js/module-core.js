var App = App || {};

Chassis = function(obj) {
	return {
		sync: function(sync) {
			var xhr = new XMLHttpRequest();
			xhr.open(sync.method, encodeURI(sync.url), true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onload = function() {
			  if (xhr.status >= 200 && xhr.status < 400) {
			  	sync.success(JSON.parse(xhr.responseText));
			  }
			};
			if(sync.hasOwnProperty('content')) {
				xhr.send(JSON.stringify(sync.content));
			} else {
				xhr.send();
			}
		}
	}
};

App.Core = function() {
	var moduleData = {};

	return {

		register: function(moduleId, moduleView) {			
			moduleData[moduleId] = {
				generator: function(ch) {
					moduleView.ch = ch;
					return moduleView;
				},
				instance: null
			};
		},

		registerAll: function() {
			for (var view in App.views) {
				this.register(view, App.views[view]);
			}
		},

		start: function(moduleId) {
			var mi = moduleData[moduleId].instance;
			mi = moduleData[moduleId].generator(new Chassis(this));
			mi.init();
			this.eventMapper(mi);
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
			for (e in module.events) {
				var myEvent = e.substr(0, e.indexOf(' ')),
					second = e.substr(e.indexOf(' ')+1),
					selector = document.querySelectorAll(App.id + ' ' + module.el + ' ' + second);
				if(selector.length) {
					for (var i = 0; i < selector.length; i++) {
						selector[i].addEventListener(myEvent, module.events[e].bind(module));
					}
				} else {
					throw 'Could not find ' + selector + ' while trying to create ' + myEvent + ' event in module.';
				}
			}
		}
	};
}();

App.views = [];

App.run = function(container) {
	if (container.length) {	
		App.id = container;		
	}
	App.Core.registerAll();
	App.Core.startAll();
}

