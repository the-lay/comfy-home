/**
 * NodeConfiguration
 *
 * @module      :: Model
 * @description :: NodeConfiguration contains configuration of specific node, for ex. update interval.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    forNode: {
      model: 'node'
    },
    nodeType: {
      type: 'string',
      required: true
    },
    unit: {
      type: 'string',
      required: true
    },
    updateInterval: {
      type: 'integer',
      defaultsTo: '300', //5min
      required: true
    }
    
  }

};
