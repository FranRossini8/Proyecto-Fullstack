require('mongoose');
const peluche = require('../Models/peluches');
const pel = require('../Models/peluches');
const usr = require('../Models/user');

const addPeluche = async(tipo, accesorios, coloresDisponibles, nombre, req) => {
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

    const identificador = req.user.id;
    console.log(req.user.id);
    const existUser = await usr.findById(identificador);
    console.log(identificador);
    console.log(existUser);
    if (existUser) {
        // Si el usuario existe, añadir el peluche al array "peluches"
        existUser.peluches.push(peluche);
        await existUser.save();
        console.log('Peluche añadido al usuario');
    } else {
        console.log('Usuario no encontrado');
    }

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