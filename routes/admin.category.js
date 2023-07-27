const express = require("express");
const { route } = require(".");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const adminCategoryControl = require("../controller/admin.category");

router.post("/", adminController.check_bearer_token, (request,response)=>{
    adminCategoryControl.create_category(request,response);
});

module.exports = router;