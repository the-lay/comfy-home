/**
 * InboundMessages
 *
 * @module      :: Model
 * @description :: InboundMessages model contains message from system's nodes that will be treated as 
 *           events scheduled for some kind of processing. Example: alert that temperature is too low.
 */

module.exports = {

  attributes: {

    fromNode: {
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
