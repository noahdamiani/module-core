App.views.WeatherView = {
	el: '#module-2',

	init: function() {
		$weatherPanel = $(this.el).find('ul');
		this.getTodaysWeather();
		this.ch.sync({
			url: 'http://jsonplaceholder.typicode.com/posts',
			method: 'POST',
			content: this.fixtures,
			success: function(data) {
				console.log(data);
			}.bind(this)
		});
	},

	events: {
		'click .button': function(e) {
			var update = $('<div class="weather-update-alert">Weather has been updated</div>');
			this.getTodaysWeather($('.city').val());
			$(this.el).append(update);
			update.delay(2000).fadeOut('slow');
		}
	},

	fixtures: {
		name: 'Test User',
		email: 'testuser@mail.com',
		post: 'I really love modules.'
	},

	appendWeather: function(data) {
		var template = '<li>City: ' + data.name + '</li>' +
		'<li>Wind Speed: ' + data.wind.speed + '</li>' +
		'<li>Humidity: ' + data.main.humidity + '</li>' + 
		'<li>Country: ' + data.sys.country + '</li>'; 
		$weatherPanel.html('');
		$weatherPanel.append(template);
	},

	getTodaysWeather: function(city) {
		var city = city || 'London',
			appId = '&APPID=9438d84dfeef9413bcc50fc5a4b17910';

		this.ch.sync({
			url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + appId, 
			method: 'GET',
			success: this.updateSuccess.bind(this)
		});
	},

	updateSuccess: function(data) {
		this.appendWeather(data);
	}
};
