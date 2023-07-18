const bcrypt = require('bcrypt');
const saltRounds = 10;


const encrypt = async (myPlaintextPassword)=>{
   const database_res = await  bcrypt.hash(myPlaintextPassword, saltRounds);
   return database_res;
    
};

module.exports = {
    encrypt : encrypt
}