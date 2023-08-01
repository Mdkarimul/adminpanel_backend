const express  = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const middleware = require("../middleware/index.middleware");

router.get("/:query",(request,response)=>{
    response.json("karimul");
    adminController.getAdmin(request,response);
});

router.post("/signup",(request,response)=>{
     adminController.createAdmin(request,response);
});

router.post("/login",(request,response)=>{
    adminController.loginAdmin(request,response);
});

router.post("/verify", middleware.check_bearer_token, (request,response)=>{
    adminController.verify_user(request,response);
});

router.put("/",(request,response,next)=>{
    response.send("karimul admin get route");
});

router.delete("/",(request,response,next)=>{
    response.send("karimul admin get route");
});

module.exports = router;