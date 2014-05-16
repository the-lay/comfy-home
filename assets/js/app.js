(function (io) {
  var socket = io.connect();

  socket.on('connect', function socketConnected() {

    socket.get('/subscribe/devices', function gotResponse (response) {
      // subscribing
      console.log('Subscribed to new nodes and new discovered nodes.');
      console.log(response);
    });

/*TODO: acceptable table appending*/
    socket.on('node', function mes(message) {
      console.log(message);
      if (message.data && message.verb === 'created') {
        // console.log(message);
        $('#nodesTbody').append('<tr>'+
          '<td>'+message.data.id+'</td>'+
          '<td>'+message.data.name+'</td>'+
          '<td>'+message.data.nodeType+'</td>'+
          '<td>'+message.data.unit+'</td>'+
          '<td>'+message.data.updateInterval+'</td>'+
          '<td><a href="#"><span class="glyphicon glyphicon-pencil"></span></a>'+
          '<a href="#"><span class="glyphicon glyphicon-trash"></span></a>'+
          '</td>'+
          '</tr>');
      }
    });

    socket.on('discoverednode', function mes(message) {
      console.log(message);
      if (message.data && message.verb === 'created') {
        // console.log(message);
        $('#discNodesTbody').append('<tr>'+
          '<td>'+message.data.id+'</td>'+
          '<td>'+message.data.name+'</td>'+
          '<td><a href="#"><span'+
          ' class="glyphicon glyphicon-plus"></span></a></td>'+
          '</tr>');
      }
    });
  });
  window.socket = socket;
  
})(window.io);
