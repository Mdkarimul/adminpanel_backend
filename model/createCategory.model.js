const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model("Category",new Schema({

category_name : String,

}));