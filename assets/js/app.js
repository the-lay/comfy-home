(function (io) {
  var socket = io.connect();

  socket.on('connect', function socketConnected() {

    socket.get('/subscribe/devices', function gotResponse (responsee) {
      // subscribing
    });

    socket.on('node', function mes(message) {
      if (message.data && message.data.verb === 'created') {
        console.log(message);
        $('#nodesTbody').append('<tr>'+
          '<td>'+message.data.id+'</td>'+
          '<td>'+message.data.name+'</td>'+
          '<td>'+message.data.nodeType+'</td>'+
          '<td>'+message.data.unit+'</td>'+
          '<td>'+message.data.updateInterval+'</td>'+
          '</tr>');
      }
    });

    socket.on('discoveredNode', function mes(message) {
      if (message.data && message.data.verb === 'created') {
        console.log('got something!');
        $('#discNodesTbody').append('<tr>'+
          '<td>'+message.data.id+'</td>'+
          '<td>'+message.data.name+'</td>'+
          '</tr>');
      }
    });
  });
  window.socket = socket;
  
})(window.io);
