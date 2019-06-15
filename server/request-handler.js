/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, x-parse-application-id, x-parse-rest-api-key',
  'access-control-max-age': 10
};
defaultCorsHeaders['Content-Type'] = 'application/json';

var messages = [];
// {
//   text: "this is the nerd server",
//   username: "Batman"
// }

var sendResponse = function(statusCode, response) {
  response.writeHead(statusCode, defaultCorsHeaders);
  // response.write();
  response.end(JSON.stringify({results: messages}));

};

var collectDataFunc = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data = data + chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  })
}

var requestHandler = function(request, response) {

  var nerdServer = url.parse(request.url);

  if (request.method === 'GET' && nerdServer.pathname === '/classes/messages') {
    sendResponse(200, response);
  } else if (request.method === 'POST' && nerdServer.pathname === '/classes/messages') {
    collectDataFunc(request, function(message) {
      messages.push(message);
      sendResponse(201, response);
    })
    // messages.push(request._postData);
  } else if (request.method === 'OPTIONS' && nerdServer.pathname === '/classes/messages') {
    sendResponse(200, response);
  } else {
    sendResponse(404, response);
  }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // var statusCode = 200;

  // var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'text/plain';
  //'application/json'

  // response.writeHead(statusCode, headers);

  // response.end('Hello, World!');
};

module.exports.requestHandler = requestHandler;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

/*
send parsable stringified JSON
send back an object
send back an object with a 'results' array
accept POST request to /classes/messages
respond with previous messages
status code = 404 when endpoint doesn't exist

*/