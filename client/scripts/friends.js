var Friends = {

  usersStorage: {
    // example
    // matt: false
    // josh: false
    // tehere: false
  },
  //messages is our data array
  addUsers: function(messages) {
    messages.forEach(function(message) {
      if (!Friends.usersStorage[message.username]) {
        Friends.usersStorage[message.username] = false;
      }
      if (Friends.usersStorage[message.username] === true) {
        $(`div.${message.username}`).addClass("friend");
      }
    });
  },

  toggleStatus: function() {
    //Josh's Notes:
    //change boolean value next to friend to true
    //inner text refers to     <%- username%>    on line 7 of the div from line 6-8
    var user = this.innerText;
    //if value of name property in usersStorage is true (aka that name is a friend)
    if (Friends.usersStorage[user]) {
      Friends.usersStorage[user] = false;
      $(`div.${user}`).removeClass("friend");
    } else {
      Friends.usersStorage[user] = true;
      $(`div.${user}`).addClass("friend");
    }
  }

};