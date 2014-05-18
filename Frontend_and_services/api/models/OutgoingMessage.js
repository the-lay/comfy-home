/**
 * OutboundMessages
 *
 * @module      :: Model
 * @description :: OutboundMessages model contains message to system's nodes. 
 *                 Ex.: refresh value, send new configuration.
 */

module.exports = {

  attributes: {

    toNode: {
      model: 'node'
    },
    messageReason: {
      type: 'string',
      required: true
    },
    messageBody: {
      type: 'string',
      required: true
    },
    processed: {
      type: 'boolean',
      defaultsTo: 'false'
    }

  }

};
