const express = requiere('express');
const router = express.Router();
const bcrypt = requiere('bcrypt');
const jwt = requiere('jsonwebtoken');
const user = requiere('../Models/user');

//REGISTRO DE USER
router.get('/register', async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new user({
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const nuevoUser = await user.save();
        res.status(201).json(nuevoUser);
    }catch(err){
        res.status(400).json({ message:err.message});
    }
});

//INICIO DE SESION
router.post('/login', async(res, req) => {
    const user = await user.findOne({ email:req.body.email});
    if(user == null){
        return res.status(400).json({ message: 'No se puede encontrar el usuario'});
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            res.json({ token: token });
        } else {
            res.json({ message: 'Contraseña incorrecta'});
        }
    }
        catch {
            res.status(500).json({ message: err.message});
        }
});

//CERRAR SESION
router.post('/logout',(req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesion'});
        }
        res.status(200).json({ message: 'Sesion cerrada correctamente'}); 
    })
});

module.exports = router;