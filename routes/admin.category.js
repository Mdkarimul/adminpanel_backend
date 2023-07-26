const express = require("express");
const { route } = require(".");
const router = express.Router();
const adminController = require("../controller/admin.controller");


router.post("/", adminController.check_bearer_token, (request,response)=>{
  console.log(request);
  response.json("karimul category");
});

module.exports = router;