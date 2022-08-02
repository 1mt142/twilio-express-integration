var express = require("express");
var router = express.Router();

const A_SID = process.env.accountSid;
const A_AUTH = process.env.authToken;
const client = require("twilio")(A_SID, A_AUTH);
const sendSMSService = function (to, smsBody) {
  return client.messages.create({
    body: smsBody,
    from: process.env.fromNumber,
    to: to,
  });
};

router.post("/", function (req, res, next) {
  const to = req.body.to;
  const smsBody = req.body.smsBody;

  sendSMSService(to, smsBody)
    .then((resp) => {
      res.json({
        successMessage: resp,
      });
    })
    .catch((err) => {
      res.json({
        errorMessage: err,
      });
    });
});

module.exports = router;
