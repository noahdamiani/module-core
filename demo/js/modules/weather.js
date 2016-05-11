App.Core.register('Weather', function(ch) {
	return {
		el: ch.dom.find('#module-2'),

		events: {
			'click .button': function(e) {
				var update = $('<div class="weather-update-alert">Weather has been updated</div>');
				this.getTodaysWeather();
				this.el.append(update);
				update.delay(2000).fadeOut('slow');
			}
		},

		init: function() {
			ch.toolbox(this.el);
			$weatherPanel = this.el.find('ul');
			this.getTodaysWeather();
		},

		appendWeather: function(data) {
			$weatherPanel.html('');
			for(key in data) {
				var weatherItem = $('<li>' + key + ': ' + data[key] + '</li>');
				$weatherPanel.append(weatherItem);
			}
		},

		getTodaysWeather: function() {
			var self = this;

			$.ajax({
				url: 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=9438d84dfeef9413bcc50fc5a4b17910',
				type: 'POST',
				success: function(data) {
					$weatherInfo = data.list[0].weather[0];
					self.appendWeather($weatherInfo);
				}
			});
		}
	};
});
