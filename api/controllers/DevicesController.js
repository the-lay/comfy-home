/**
 * DevicesController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `DevicesController.index()`
   */
  index: function (req, res) {
    Node.find().sort('added DESC').populate('nodeConfiguration').done(function(err, nodes) {
      if (err) {
        res.redirect('/');
        return console.log(err);
      } else {
        console.log(nodes);
        return res.view('devices/index', { nodes: nodes });
      }
    });
  },


  /**
   * `DevicesController.details()`
   */
  details: function (req, res) {
    if (req.params.id) {
      Node.findOne(req.params.id).populate('nodeConfiguration').done(function(err, node) {
        if (err) {
          res.redirect('/devices/');
          return console.log(err);
        } else {
          return res.view('devices/details', { node: node });
        }
      });
    } else {
      return res.redirect('/devices/');
    }
  },


  /**
   * `DevicesController.add()`
   */
  add: function (req, res) {
    if (req.body) {
      Node.create({
        name: req.body.name
      }).done(function(err, nodeObject) {
        if (err) {
          console.log(err);
          return res.redirect('/devices/');
        }

        NodeConfiguration.create({
          forNode: nodeObject.id,
          nodeType: req.body.nodeType,
          unit: req.body.unit,
          updateInterval: req.body.updateInterval
        }).done(function(err, nodeCfgObject) {

          if (err) {
            console.log(err);
            return res.redirect('/devices/');
          }
          Node.update({
            id: nodeObject.id
          },{
            nodeConfiguration: nodeCfgObject.id
          }, function(err, bindedNode) {

            if (err) {
              console.log(err);
            }
            return res.redirect('/devices/');
          });
        });
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
        NodeConfiguration.destroy({
          id: removedNode.nodeConfiguration
        }).done(function(err, removedCfg) {
          if (err) {
            console.log(err);
          }
          return res.redirect('/devices/');
        })
      });
    } else {
      return res.redirect('/devices/');
    }
  }
};

