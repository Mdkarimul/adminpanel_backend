const mongoose = require('mongoose');
require('dotenv').config();
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.db_string);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//require all model to execute here
const adminModel = require("../model/admin.model");




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


module.exports = {
    createAdmin : createAdmin,
    checkAdmin : checkAdmin
}



