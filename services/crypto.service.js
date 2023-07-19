const bcrypt = require('bcrypt');
const saltRounds = 10;


const encrypt = async (myPlaintextPassword)=>{
   const database_res = await  bcrypt.hash(myPlaintextPassword, saltRounds);
   return database_res;
    
};

const compare_password = async (myPlaintextPassword,hash)=>{
   return bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
        return result;
    });
}

module.exports = {
    encrypt : encrypt,
    compare_password : compare_password
}