const mongoose = require('mongoose');
require('dotenv').config();
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.db_string);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//require all model to execute here
const adminModel = require("../model/admin.model");
const createCategoryModel = require("../model/createCategory.model");
const { query } = require('express');
const createSubCategory = require("../model/createSubCategory.model");


const createAdmin = async (data)=>{
        const admin =  new adminModel(data);
        const sucess_res = await  admin.save();
        return sucess_res;
}

const checkAdmin = async (data)=>{
    const all_admin  =  adminModel;
    const data_res =  all_admin.findOne(data);
    return data_res;
}


//create category section
const createCategory = async (data)=>{
 const category = new createCategoryModel(data);
 const success_res = category.save();
}

//create sub category
const createsubCategory = async (data)=>{
const sub_category = new createSubCategory(data);
const success_res = sub_category.save();
}


const checkCategory = async (data)=>{
  const category_model = createCategoryModel;
  const data_res = await category_model.findOne(data);
   return data_res;
}

const getCategory = async ()=>{
  const category_model = createCategoryModel;
  const data_res = await category_model.find({});
   return data_res;
}

const update_category = async (id,data)=>{
  const category_model = createCategoryModel;
  const data_res = await category_model.findByIdAndUpdate(id,data);
  return data_res;
}

const deleteCategory = async (id)=>{
 const category_model = createCategoryModel;
 const data_res = await category_model.findByIdAndDelete(id);
 return data_res;
}


module.exports = {
    createAdmin : createAdmin,
    checkAdmin : checkAdmin,
    createCategory : createCategory,
    checkCategory : checkCategory,
    update_category:update_category,
    getCategory : getCategory,
    deleteCategory : deleteCategory,
    createsubCategory : createsubCategory

}



