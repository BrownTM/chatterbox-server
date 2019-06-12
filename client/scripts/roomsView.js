var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', Rooms.add);
    RoomsView.$select.on('change', RoomsView.changeCurrentRoom);
  },

  changeCurrentRoom: function() {
    FormView.currentRoom = this.value;
    $('#chats').empty();
    App.fetch();
  },

  filterRooms: function(messages) {
    messages.forEach(function(message) {
      if (Rooms.rooms[message.roomname] === undefined) {
        RoomsView.renderRoom(message.roomname);
        Rooms.rooms[message.roomname] = 1;
      }
    });
  },

  filterMessagesforEachRoom: function(message) {
    if (message.roomname === FormView.currentRoom) {
      MessagesView.renderMessage(message);
    }
  },

  renderRoom: function(room) {
    $(Rooms.render({room})).appendTo(this.$select);
  }

};
