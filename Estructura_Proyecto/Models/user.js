const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usrSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        requiered:true
    },
    lastname:{
        type:String,
        requiered:true
    },
    isActive:{
        type:String,
        requiered:true
    },
    roles:{
        type:String,
        requiered:true,
        default:'user'
    },
    password:{
        type:String,
        requiered:true
    }
   
},{ timestamps:true }).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
})

const Usr = mongoose.model('usr',usrSchema);
module.exports = Usr;


