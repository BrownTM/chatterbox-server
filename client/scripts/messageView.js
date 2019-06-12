var MessageView = {

  render: _.template(`
      <div class="chat">
        <!-- we want to pass in the specific friend clicked on... into Friends.js using .call or .apply   -->
        <div class="username <%- username%>" onclick="Friends.toggleStatus.apply(this)">
          <%- username%>
        </div>
        <div>
          <%- text%>
        </div>
      </div>
    `)

};

// for escaping, use     - as seen on line 6 and