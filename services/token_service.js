const axios = require('axios');
const { response } = require('../app');
const JWT = require('jsonwebtoken');
const { token } = require('morgan');
require('dotenv').config();



const create_token = (data)=>{
   return JWT.sign({
        token:data,
    },process.env.SECRET,{expiresIn:"2 days"});
}

const verify_token = (token)=>{
return JWT.verify(token,process.env.SECRET,(error,success)=>{
   if(error){
    return {message:error.message}
   }else{
    return {message:"User authenticated","token":success.token}
   }
});
}

module.exports = {
 create_token : create_token,
 verify_token : verify_token
}