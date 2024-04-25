const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pelucheSchema = new Schema({
    nombre:{
        type:String,
        requiered:true
    },
    tipo:{
        type:String,
        requiered:true
    },
    accesorios:{
        type:String
  
    },
    coloresDisponibles:{
        type:String
    }
  
},{ timestamps:true }).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
}) 

const peluche = mongoose.model('peluche',pelucheSchema);
module.exports = peluche;
