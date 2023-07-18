const axios = require('axios');
const { response } = require('../app');
const JWT = require('jsonwebtoken');
require('dotenv').config();
const create_token = (data)=>{
   return JWT.sign({
        token:data,
    },process.env.SECRET,{expiresIn:"2 days"});
}

module.exports = {
 create_token : create_token
}