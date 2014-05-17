/**
 * Node
 *
 * @module      :: Model
 * @description :: Node model contains every node entity in the system.
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
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
      required: true
    }
    
  }

};
