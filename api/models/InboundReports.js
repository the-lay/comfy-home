/**
 * InboundReports
 *
 * @module      :: Model
 * @description :: InboundReports model contains reading reports from nodes.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    fromNode: {
      model: 'node'
    },
    value: {
      type: 'float',
      required: true
    }
    
  }

};
