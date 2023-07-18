const express = require("express");
const { route } = require(".");
const router = express.Router();
const adminController = require("../controller/admin.controller");


router.get("/:query",async (request,response)=>{
    //  response.json("karimul");
        adminController.getAdmin(request,response);
});

module.exports = router;