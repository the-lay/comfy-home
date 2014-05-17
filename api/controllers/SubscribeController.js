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
          Node.watch(req.socket);
          DiscoveredNode.watch(req.socket);
        
          return res.send(200);
        }
      });
    } else {
      return res.send(403);
    }

  },

  /**
   * `SubscribeController.subscribeDeviceReports()`
   * Subscription for new incoming messages
   */
   subscribeIncoming: function(req, res) {
    if (req.isSocket) {
      IncomingMessage.watch(req.socket);
    } else {
      return res.send(403);
    }
   }

};

