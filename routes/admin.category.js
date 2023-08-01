const express = require("express");
const { route } = require(".");
const router = express.Router();
const middleware = require("../middleware/index.middleware");
const adminController = require("../controller/admin.controller");
const adminCategoryControl = require("../controller/admin.category.controller");
const { request } = require("../app");

router.post("/", middleware.check_bearer_token, (request,response)=>{
    adminCategoryControl.create_category(request,response);
});

router.get("/", middleware.check_bearer_token, (request,response)=>{
    adminCategoryControl.get_category(request,response);
});

router.put("/", middleware.check_bearer_token, (request,response)=>{
    adminCategoryControl.update_category(request,response);
});

router.delete("/",middleware.check_bearer_token,(request,response)=>{
  adminCategoryControl.deleteCategory(request,response);
});



module.exports = router;