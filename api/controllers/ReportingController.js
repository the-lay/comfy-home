/**
 * ReportingController
 *
 * @description :: Server-side logic for managing pub/sub events.
 */

module.exports = {

  /**
   * `ReportingController.incoming()`
   */
  incoming: function(req, res) {
    if (req.body) {
      IncomingMessage.create({
        fromNode: req.body.fromNode,
        messageReason: req.body.messageReason,
        messageBody: req.body.messageBody
      }).done(function(err, message) {
        if (err) {
          console.log('IncomingMessage error', err);
          return res.send(302);
        } else {

          IncomingMessage.publishCreate({
            id: message.id,
            nodeId: req.body.fromNode,
            messageReason: message.messageReason,
            messageBody: message.messageBody,
            createdAt: message.createdAt

          });
          return res.send(200);
        }
      });
    } else {
      console.log('Error. Code 77');
      return res.send(302);
    }

  }

};
