const mongoose = require('mongoose');

//const User = require("./userModel.js");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // email: { 
    //     type: String, 
    //     required: true, 
    //     unique: true, 
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // },
    name:{type:String},
    description:{type:String},
    quantity:{type:Number},
    price: { type: Number },
    createdBy: {type:String, ref: 'User'}
});

module.exports = mongoose.model('Product', productSchema);