const mongoose = require ("mongoose");
const Schema=mongoose.Schema;
const adminSchema=new Schema({
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },
    addedmovies:[{
        type:String,
    },
    ],
    
});
module.exports = mongoose.model("Admin", adminSchema);