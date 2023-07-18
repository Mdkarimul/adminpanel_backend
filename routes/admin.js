const express  = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

router.get("/:query",(request,response)=>{
    adminController.getAdmin(request,response);
});

router.post("/",(request,response)=>{
     adminController.createAdmin(request,response);
});

router.put("/",(request,response,next)=>{
    response.send("karimul admin get route");
});

router.delete("/",(request,response,next)=>{
    response.send("karimul admin get route");
});

module.exports = router;