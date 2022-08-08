const express = require("express");
const router = express.Router();
const api_helper = require("../Helpers/APIHelper");

router.get("/:id", (req, res, next) => {
  console.log(req.params);
  const ID = req.params ? req.params.id : "";
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  api_helper
    .make_API_call(`${BASE_URL}/${ID}`)
    .then((response) => {
      res.json({
        message: "Post Data Found!",
        Data: response,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
