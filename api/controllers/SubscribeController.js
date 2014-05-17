/**
 * SubscribeController
 *
 * @description :: Server-side logic for managing pub/sub events.
 */

module.exports = {

  /**
   * `SubscribeController.subscribeDiscoveredDevices()`
   * Allows clients to subscribe for publish events.
   * Used on index page - to monitor new discovered devices.
   */
  subscribeDiscoveredDevices: function(req, res) {
    if (req.isSocket) {
      console.log('new socket client connected: ', req.socket.id);
      async.parallel({
        nodes: function(cb) {
          Node.find().sort('added DESC')
            .exec(function(err, nodes) {
              cb(err, nodes);
            });
        },
        discoveredNodes: function(cb) {
          DiscoveredNode.find().sort('added DESC')
            .exec(function(err, discNodes) {
              cb(err, discNodes);
            });
        }
      }, function(err, results) {
        if (err) {
          console.log(err);
          return res.send(500);
        } else {
          Node.watch(req.socket, results.nodes);
          DiscoveredNode.watch(req.socket, results.discoveredNodes);
        
          return res.json(results);
        }
      });
    } else {
      return res.send(403);
    }

  }

};

