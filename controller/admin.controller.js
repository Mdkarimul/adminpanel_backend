const dbService = require("../services/db.service");
const bcryptService = require("../services/crypto.service");
const tokenService = require("../services/token_service");




const createAdmin = async (request,response)=>{
    const form_data = request.body;
    const hash = await bcryptService.encrypt(form_data.password);
     form_data.password = hash;
       // GET request for remote image in node.js
     const check_user = await check_admin(form_data.admin_username);
      //response send
 
     if(check_user){

      admin_response(response,"User already exit",200,"failed");
     
     }else{

        const database_res = await dbService.createAdmin(form_data);
      const token= await tokenService.create_token(database_res);
      database_res ? admin_response(response,"Signup success",200,"success",token) : admin_response(response,"Failed to register",401,"failed");

     }   
}


const loginAdmin =async (request,response)=>{

          const form_data = request.body;
         const username_check = await check_admin(form_data.admin_username_login);
         if(username_check){
         const check_pass = await bcryptService.compare_password(form_data.password_login,username_check.password)
          if(check_pass){
             
             const token= await tokenService.create_token({admin_username:username_check.admin_username,company_name:username_check.company_name});
            admin_response(response,"Login success",200,"success",token);

          }else{
            admin_response(response,"Wrong password",401,"failed");
          }
      
         }else{
          admin_response(response,"User not found",404,"failed");
         }
      
          
}


  //check admin
   check_admin = async (username)=>{
    const query = {
          "admin_username": username
           }
      const check_user = await  dbService.checkAdmin(query);
      return check_user;
      // check_user != null ? (username ?   "karimul" : : admin_register();
    }

    //send response to front-end
    const admin_response  = async (response,message,status,type,token_data="")=>{
      response.status(status);
      response.json({"notice":message,"res_type":type,"token":token_data});
      }


const verify_user = async (request,response)=>{

  
         const  token_response = await tokenService.verify_token(request.token);
          if(token_response.message=="invalid token"){
             response.json({message:"User not authenticated !"});
             response.status(401);
           }
           else if(token_response.message=="User authenticated"){
               const new_token_response = await tokenService.create_token(token_response.token);
               response.json({message:"User authenticated !",token:new_token_response}).status(200);
          }
       
}


function check_bearer_token (request,response,next){
       
   const bearerHerder = request.headers.authorization;
  if(typeof bearerHerder !== 'undefined'){

  const bearer = bearerHerder.split(' ');
  const bearerToken = bearer[1];
  request.token = bearerToken;
   next();
}else{
  response.json({message:"User not authenticated !"});
  response.status(403);
} 

}


const getAdmin  = async (request,response)=>{
       
}








module.exports = { 
    createAdmin : createAdmin,
    verify_user :verify_user,
    loginAdmin:loginAdmin,
    getAdmin : getAdmin,
    check_bearer_token:check_bearer_token
}