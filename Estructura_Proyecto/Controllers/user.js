require('mongoose');
const Usr = require('../Models/user');

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
                password:cryptoPass
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

const editUser = async(user) => {

    const result = await Usr.findByIdAndUpdate(user._id,user,{new:true});

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
/*

//OBTENER LOS MAILS DE TODOS LOS USUARIOS
router.get('/', async(req, res) => {
    try{
        const usuarios = await user.find();
        res.json(usuarios.map(user => user.email));

    } catch(err){
        res.status(500).json({ message: err.message});
    }
});

async function getUserByEmail(req, res, next){
    let user;
    
    try{
        user = await user.findOne({ email:req.params.email});
        if(user == null){
            return res.status(400).json({ message: 'No se puede encontrar el usuario' });
        }
    } catch(err){
        return res.status(500).json({ message: err.message});
    }
    res.user = user;
    next();
}

//OBTENER UN USUARIO POR MAIL
router.get('/:email',getUserByEmail, (req, res) => {
    res.json(res.user);
});*/





module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser }