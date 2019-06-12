var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  takeInAllMessages: function(messages) {
    Friends.addUsers(messages);
    RoomsView.filterRooms(messages);
    messages.forEach((message) => {
      if (message.username !== undefined && message.text !== undefined) {
        if (message.roomname === undefined) {
          message.roomname = 'lobby';
        }
        RoomsView.filterMessagesforEachRoom(message);
      }
    });
  },

  renderMessage: function(message) {
    var $message = $(MessageView.render(message));
    if (Friends.usersStorage[message.username] === true) {
      $message.addClass("friend");
    }
    $message.appendTo(MessagesView.$chats);
  }

};