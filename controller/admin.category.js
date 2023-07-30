const express = require("express");
const router = express.Router();
const dbService  = require("../services/db.service");


const create_category = async (request,response)=>{
  const form_data =  request.body;
  const categoryNameWithoutSpaces = await form_data.category_name.replace(/\s+/g, '');
  form_data.category_name = categoryNameWithoutSpaces;

  const check_category = await dbService.checkCategory({category_name:form_data.category_name})
   if(check_category){

    admin_response(response,"Category name already exit ",401,"failed",null);
     
   }else{
    try {
      const db_res = await dbService.createCategory(form_data);
      admin_response(response,"Category created successfully ",200,"success",null); 
    }catch(error){
      admin_response(response,"Category not created ",401,"failed",null);
    }
   }
}


const get_category = async (request,response)=>{
    

    const all_category =await dbService.getCategory();
      admin_response(response,all_category,200,"success",null); 
  
   
}



  //send response to front-end
  const admin_response  = async (response,message,status,type,token_data="")=>{
    response.status(status);
    response.json({"notice":message,"res_type":type,"token":token_data});
    }




module.exports = {
  create_category :create_category,
  get_category : get_category
}