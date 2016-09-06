App.views.ClockView = {
	el: '#module-3',

	init: function() {
		$clock = $(this.el).find('.clock');
		this.startClock($('.button'));
	},

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
