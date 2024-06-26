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
        type:Boolean,
        requiered:true,
        default:true
    },
    roles:{
        type:Array,
        requiered:true,
        default:['user']
    },
    password:{
        type:String,
        requiered:true
    },
    peluches:[{
        nombre:{type:String},
        tipo:{type:String},
        accesorios:{type:String},
        coloresDisponibles:{type:String}
    }]
    
},{ timestamps:true }).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
})

const Usr = mongoose.model('usr',usrSchema);
module.exports = Usr;


