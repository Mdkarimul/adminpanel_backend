const express = require("express");
const router = express.Router();
const dbService  = require("../services/db.service");


const create_category = async (request,response)=>{
  const form_data =  request.body;
  const categoryNameWithoutSpaces = await form_data.category_name.replace(/\s+/g, '');
  form_data.category_name = categoryNameWithoutSpaces.trim();

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
    const all_category = await dbService.getCategory();
      admin_response(response,all_category,200,"success",null); 
}

const update_category = async (request,response)=>{
  
  const update_res = await  dbService.update_category(request.body.category_id,{category_name : request.body.category_name,category_tags:request.body.category_tags});
  if(update_res){
    admin_response(response,"Category update successfully ",200,"success",null); 
  }else{
    admin_response(response,"Category failed to update ",401,"failed",null); 
  }
}

const deleteCategory = async (request,response)=>{
 const delete_res = dbService.deleteCategory(request.query);
  if(delete_res){
    admin_response(response,"Category delete successfully ",200,"success",null); 
  }else{
    admin_response(response,"Category failed to delete ",401,"failed",null); 
  }
}



  //send response to front-end
  const admin_response  = async (response,message,status,type,token_data="")=>{
    response.status(status);
    response.json({"notice":message,"res_type":type,"token":token_data});
    }




module.exports = {
  create_category :create_category,
  get_category : get_category,
  update_category : update_category,
  deleteCategory : deleteCategory
}