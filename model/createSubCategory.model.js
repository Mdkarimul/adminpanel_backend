const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model("SubCategory",new Schema({

main_category : String,
category_name:String,


}));