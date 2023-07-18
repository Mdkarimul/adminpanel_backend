const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model("Admin",new Schema({

company_name : String,
admin_username : String,
password : String,


}));