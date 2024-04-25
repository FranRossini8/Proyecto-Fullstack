const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Controllers/user');

//REGISTRO DE USER
exports.registrar = async(req, res) => {
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
};

//INICIO DE SESION
exports.logearse = async(req, res) => {
    
    const user = await User.getUserByEmail(req.body.email, req, res);
    
    if(user == null){
    
        return res.status(400).json({ message: 'No se puede encontrar el usuario'});
    }
    try{
        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(req.body.password)
        .digest('hex');
        if(cryptoPass === user.password) {
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.json({ token: token });
        } else {
            res.json({ message: 'Contraseña incorrecta'});
        }
    }
    catch(err) {
       res.status(500).json({ message: err.message});
    }
};

//CERRAR SESION
exports.cerrar = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesion'});
        }
        res.status(200).json({ message: 'Sesion cerrada correctamente'}); 
    })
};
