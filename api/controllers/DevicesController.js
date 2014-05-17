/**
 * DevicesController
 *
 * @description :: Server-side logic for managing devices
 */

module.exports = {
	
  /**
   * `DevicesController.index()`
   * Shows list of discovered nodes and list of active nodes.
   */
  index: function (req, res) {

    async.parallel({
      nodes: function(cb) {
        Node.find().sort('added DESC')
          .exec(function(err, nodes) {
            Node.subscribe(req.socket, nodes);
            cb(err, nodes);
          });
      },
      discoveredNodes: function(cb) {
        DiscoveredNode.find().sort('added ASC')
          .exec(function(err, discNodes) {
            cb(err, discNodes);
          });
      }
    }, function(err, results) {
      var sessionError = req.session.error;
      req.session.error = null;
      if (err) {
        console.log(err);
      }
      return res.view('devices/index', {
        nodes: results.nodes,
        discoveredNodes: results.discoveredNodes,
        errorMessage: sessionError
      });
    });

  },


  /**
   * `DevicesController.details()`
   * Show details for the selected node.
   */
  details: function (req, res) {
    if (req.params.id) {
      Node.findOne(req.params.id).exec(function(err, node) {
        if (err || !node) {
          req.session.error = "No device with such ID found";
          return res.redirect('/devices/');
        } else {
          return res.view('devices/details', { node: node });
        }
      });
    } else {
      req.session.error = "This should not have happened! Code 1.";
      return res.redirect('/devices/');
    }

  },

  /**
   * `DevicesController.found()`
   * When C daemon get broadcast from a new device, it
   * should use this endpoint.
   */
  found: function (req, res) {
    if (req.body.name) {

      DiscoveredNode.find({
        name: req.body.name,
        hwId: req.body.hwId
      }).exec(function(err, discNode) {
        console.log('found node: ', discNode);
        if (err) {
          console.log(err);
          return res.send(500);
        } else if (discNode.length > 0) {
          console.log('Duplicate discovered node');
          return res.send(301);
        } else {

          DiscoveredNode.create({
            name: req.body.name,
            hwId: req.body.hwId,
            paired: false
          }).exec(function(err, newNode) {
            if (err) {
              console.log(err);
              return res.send(500);
            } else {
              DiscoveredNode.publishCreate({
                id: newNode.id,
                name: newNode.name
              });

              return res.send(200);
            }
          });
        
        }
      });

    } else {
      return res.send(403);
    }

  },

  /**
   * `DevicesController.checkPairing()`
   * To ensure that it's indeed user's device
   * user must enter hwId that should be written on
   * device.
   * Will be accessible as an AJAX endpoint
   */
  checkPairing: function(req, res) {
    if (req.body) {
      DiscoveredNode.findOne(req.body.id)
        .exec(function(err, discNode) {

          if (err) {
            console.log(err);
            return res.send(500);
          } else {
            //check entered hwId and the one that device sent
            if (req.body.hwId === discNode.hwId) {
              discNode.paired = true;
              return res.send(200);
            } else {
              return res.send(302);
            }
          }

        });
    } else {
      return res.send(500);
    }

  },


  /**
   * `DevicesController.setupIndex()`
   * Interactive device setup page.
   */
  setupIndex: function(req, res) {
    if (req.params.id) {
      DiscoveredNode.findOne(req.params.id).exec(function(err, node) {
        return res.view('devices/setup', {
          deviceId: req.params.id,
          node: node
        });
      });
    } else {
      return res.redirect('/devices/');
    }

  },


  /**
   * `DevicesController.setup()`
   * Confirmation of setup - moving the discovered device
   * to active devices.
   */
  setup: function(req, res) {
    if (req.params.id && req.body) {

      async.parallel({
        nodes: function(cb) {

          Node.create({
            id: req.params.id,
            name: req.body.name,
            nodeType: req.body.nodeType,
            unit: req.body.unit,
            updateInterval: req.body.updateInterval
          }).exec(function(err, node) { 
            cb(err, node);
          });

        },
        discoveredNodes: function(cb) {

          DiscoveredNode.destroy({
            id: req.params.id
          }).exec(function(err) {
            cb(err, null);
          });

        }
      }, function(err, results) {
        if (err) {
          console.log(err);
        }
        req.session.error = "Your device was added to the system!";
        return res.redirect('/devices/');
      });

    } else {
      return res.redirect('/devices/');
    }

  },


  /**
   * `DevicesController.editIndex()`
   * Rendering edit form.
   */
  editIndex: function (req, res) {
    if (req.params.id) {
      Node.findOne(req.params.id).exec(function(err, node) {
        return res.view('devices/edit', {
          node: node
        });
      });
    } else {
      req.session.error = "This should not have happened. Code 2.";
      return res.redirect('/devices/');
    }

  },


  /**
   * `DevicesController.edit()`
   * Actually editing the node instance.
   */
  edit: function (req, res) {
    if (req.body && req.params.id) {

      Node.update({
        id: req.params.id
      }, {
        name: req.body.name,
        nodeType: req.body.nodeType,
        unit: req.body.unit,
        updateInterval: req.body.updateInterval
      }, function(err, node) {
        if (err) {
          req.session.error = "This should not have happened. Code 3.";
          console.log(err);
          return res.redirect('/devices/');
        } else {
          return res.redirect('/devices/'+req.params.id);
        }

      });

    } else {
      return res.redirect('/devices/');
    }

  },


  /**
   * `DevicesController.delete()`
   * Handling deletion of active devices.
   */
  delete: function (req, res) {
    if (req.params.id) {
      Node.destroy({
        id: req.params.id
      }).exec(function(err, removedNode) {
        if (err) {
          console.log(err);
        }
        return res.redirect('/devices/');
      });
    } else {
      return res.redirect('/devices/');
    }
  }
};

