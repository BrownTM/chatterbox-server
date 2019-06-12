var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    setInterval(function() {
      $('#chats').empty();
      App.fetch();
    }, 10000);

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      console.log(data.results);
      MessagesView.takeInAllMessages(data.results);
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};

// heircharcy ->
// in app.fetch, we call filterMessages for each room and pass in data.results array
// in roomsView.js, we will take in some messages for a specific room

//when we run app.fetch,

