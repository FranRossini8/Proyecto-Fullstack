require('mongoose');
const Usr = require('../Models/user');
const pel = require('../Models/peluches');

const addUser = async (name,lastname,email,isActive,password) => {

    let existUser = await Usr.findOne({ email: email });
    console.log(existUser);
    if(!existUser) {

        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
        
        const usr = new Usr(
            {              
                name: name,
                lastname:lastname,
                email: email,
                isActive:isActive,
                password:cryptoPass,
                peluches:[]
            }
        );

        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 

    }else{
        return false;
    }
}

const getAllUsers = async (limit,offset) => {

    const users = await Usr.find();

    return users;
}

const getUser = async(id) => {

    const user = await Usr.findById(id);

    return user;
}

const editUser = async(req) => {
    console.log(req.user.email);
    const result = await Usr.findOneAndUpdate({ email:req.user.email },req.user,{new:true});

    return result;
}

const editRoles = async(roles,id) => {

    const result = await Usr.findByIdAndUpdate(id,{$set:{roles:roles}},{new:true});

    return result;
}

const deleteUser = async(id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}

const getUserByEmail = async(email,req,res) => {

    const user = await Usr.findOne({ email:email });

    return user;
}

const getPeluches = async(req,res) => {
    console.log(req.user.id);
    try{
        const user = await Usr.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        let peluches = [];
        for(let peluche of user.peluches){
            peluches.push(peluche);
        }
        return res.json({peluches:peluches});
    }
    catch(err){
        res.status(500).json({message:'Error del servidor'});
    }
}

const borrarPeluches = async(req,res) => {
    try{
        const nomPeluche = await pel.findOne(req.body);
        const usuario = await Usr.findById(req.user.id);
    
        if(!usuario){
            return res.status(404).json({message:"Usuario no encontrado"});
        }
        const peluches = usuario.peluches;
        console.log(peluches);
        let peluchesEncontrados = false;
        peluches.forEach((peluche,index) => {
            if(peluche.nombre === nomPeluche.nombre){
                peluches.splice(index,1);
                peluchesEncontrados = true;
            }    
        })
        console.log(peluchesEncontrados);
        if(peluchesEncontrados){
            await usuario.save();
            res.json({message:'Peluche eliminado con exito'});
        }else{
            res.status(404).json({message:"Peluche no encontrado"});
        }
    }catch{
        res.status(500).json({message:"Error del servidor"});
    }
}

module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser, getUserByEmail, getPeluches, borrarPeluches }