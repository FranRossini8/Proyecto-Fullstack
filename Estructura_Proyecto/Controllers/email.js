const express = requiere('express');
const router = express.Router();
const user = requiere('../Models/user');

//OBTENER LOS MAILS DE TODOS LOS USUARIOS
router.get('/', async(req, res) => {
    try{
        const usuarios = await user.find();
        res.json(usuarios.map(user => user.email));

    } catch(err){
        res.status(500).json({ message: err.message});
    }
});

//OBTENER UN USUARIO POR MAIL
router.get('/:email',getUserByEmail, (req, res) => {
    res.json(res.user);
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

module.exports = router;