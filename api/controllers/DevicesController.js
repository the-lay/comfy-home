/**
 * DevicesController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `DevicesController.index()`
   * Show list of discovered nodes and list of active nodes.
   * Discovered nodes should have links for pairing.
   */
  index: function (req, res) {

    async.parallel({
      nodes: function(cb) {
        Node.find().sort('added DESC')
          .done(function(err, nodes) {
            Node.subscribe(req.socket, nodes);
            cb(err, nodes);
          });
      },
      discoveredNodes: function(cb) {
        DiscoveredNode.find().sort('added ASC')
          .done(function(err, discNodes) {
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
   * Show details for the selected node and 
   * allows editing of configuration.
   */
  details: function (req, res) {
    if (req.params.id) {
      Node.findOne(req.params.id).done(function(err, node) {
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
   * `DevicesController.subscribe()`
   * Allows clients to subscribe to changes in 
   */
  subscribe: function(req, res) {
    async.parallel({
      nodes: function(cb) {
        Node.find().sort('added DESC')
          .done(function(err, nodes) {
            cb(err, nodes);
          });
      },
      discoveredNodes: function(cb) {
        DiscoveredNode.find().sort('added DESC')
          .done(function(err, discNodes) {
            cb(err, discNodes);
          });
      }
    }, function(err, results) {
      Node.watch(req.socket, results.nodes);

      DiscoveredNode.watch(req.socket, results.discoveredNodes);
    
      return res.send(200);
    });
  },


  /**
   * `DevicesController.add()`
   */
  add: function (req, res) {
    if (req.body) {

      Node.create({
        name: req.body.name,
        nodeType: req.body.nodeType,
        unit: req.body.unit,
        updateInterval: req.body.updateInterval
      }).done(function(err, nodeObject) {

        if (err) {
          if (err.ValidationError) {
            req.session.error = "Validation error!";
            return res.redirect('/devices/');
          }
          console.log(err);
          return res.redirect('/devices/');
        }

        Node.publishCreate({
          id: nodeObject.id,
          name: nodeObject.name,
          nodeType: nodeObject.nodeType,
          unit: nodeObject.unit,
          updateInterval: nodeObject.updateInterval
        });

        return res.redirect('/devices/');
      });
    } else {
      return res.redirect('/devices/');
    }
  },


  /**
   * `DevicesController.edit()`
   */
  edit: function (req, res) {
    if (req.body.id && req.params.id) {
      Node.findOne(req.params.id).done(function(err, user) {
        //update properties
      user.save(function(err) {
       return res.redirect('/devices/');
      });
    });
      //retrieve model
      //update
      //save
      //redirect to index
    } else {
      return res.redirect('/devices/');
    }
  },


  /**
   * `DevicesController.delete()`
   */
  delete: function (req, res) {
    if (req.params.id) {
      Node.destroy({
        id: req.params.id
      }).done(function(err, removedNode) {
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

