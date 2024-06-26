const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Controllers/user');
const usr = require('../Models/user');

//REGISTRO DE USER
exports.registrar = async(req, res) => {
    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(req.body.password)
        .digest('hex');
    const user = new usr({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: cryptoPass
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
        console.log(user);
        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(req.body.password)
        .digest('hex');
        console.log(cryptoPass);
        console.log(user.password);
        //console.log(user.email);
        if(cryptoPass === user.password) {
            const token = jwt.sign({user:user,id:user._id}, process.env.JWT_SECRET);
            res.json({ token: token });
        } else {
            res.json({ message: 'Contraseña incorrecta'});
        }
    }
    catch(err) {
        console.log(err);
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
