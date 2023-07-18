const dbService = require("../services/db.service");
const bcryptService = require("../services/crypto.service");
const tokenService = require("../services/token_service");
const { response } = require("../app");

const check_user_array = [];
const createAdmin = async (request,response)=>{
    const form_data = request.body;
    const hash = await bcryptService.encrypt(form_data.password);
     form_data.password = hash;
       // GET request for remote image in node.js
     
  //check admin already register or not
  const admin_register = async ()=>{
    const database_res = await dbService.createAdmin(form_data);
    console.log(database_res);
   const token= tokenService.create_token(database_res);
    database_res ? admin_response("Signup success",200,"success",token) : admin_response("Failed to register",401,"failed");
    
  }
  //response send
  const admin_response = (message,status,type,token_data="")=>{
  response.status(status);
  response.json({"notice":message,"res_type":type,"token":token_data});
  }
  //check admin
  const check_admin = async ()=>{
  const query = {
        "admin_username": form_data.admin_username
     }
    const check_user = await  dbService.checkAdmin(query);
    check_user != null ? admin_response("User already exit",200,"failed") : admin_register();
  }
  check_admin();
}








module.exports = { 
    createAdmin : createAdmin,
}