require('mongoose');
const pel = require('../Models/peluches');

const addPeluche = async(tipo, accesorios, coloresDisponibles, nombre) => {
    const pelu = new pel(
        {
            tipo:tipo,
            accesorios:accesorios,
            coloresDisponibles:coloresDisponibles,
            nombre:nombre    
        }
    );

    let peluche = await pelu.save();
    console.log('Peluche nuevo');
    console.log(peluche);
    return{peluche};
}

const getTodosPeluches = async(req, res) => {
    const peluches = await pel.find();

    return peluches;
}

const getUnPeluche = async(nombre) => {
    const peluche = await pel.findOne({ nombre: nombre });
    
    return peluche;
}

const editPeluche = async(peluche) => { 
    try{
        const resultado = await pel.findByIdAndUpdate(peluche._id,peluche,{new:true});
        return resultado;
    }catch(error){
        res.send(error);
    }
}

const deletePeluche = async(nombre) => {
    const resultado = await pel.findOneAndDelete({ nombre:nombre });

    return resultado;
}

module.exports =  {addPeluche,getTodosPeluches,getUnPeluche,editPeluche,deletePeluche}