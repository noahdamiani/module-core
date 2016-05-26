// Define Container
App.container = $('#my-app');

// Makes modules sortable (sugar)
App.container.sortable();

// Startup the App
App.Core.startAll();
App.container.fadeIn('slow');
