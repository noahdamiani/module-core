App.Core.register('Clock', function(ch) {
	return {
		el: $('#module-3'),

		events: {
			'click .button': function(e) {
				var target = $(e.currentTarget);

				switch(target.text()) {
					case 'start clock':
						this.startClock(e);
						break;
					case 'stop clock':
						this.stopClock(e);
						break;
				}
			}
		},

		init: function() {
			$clock = this.el.find('.clock');
			this.startClock($('.button'));
		},

		startClock: function(e) {
			$(e.currentTarget).text('stop clock');
			$clock.text(new Date().toLocaleTimeString());
		    this.clock = setInterval(function(){
			    $clock.text(new Date().toLocaleTimeString());
			}, 1000);
		},

		stopClock: function(e) {
			clearInterval(this.clock);
			$(e.currentTarget).text('start clock');
		}
	};
});
