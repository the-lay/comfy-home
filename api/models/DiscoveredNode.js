/**
 * DiscoveredNode
 *
 * @module      :: Model
 * @description :: Model for new discovered nodes that are not paired to any network yet.
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    hwId: {
      type: 'string',
      required: true
    },
    paired: {
      type: 'string'
    }
  }

};
