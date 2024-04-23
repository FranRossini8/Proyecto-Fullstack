const express = require("express");
const app = express();
app.use(express.json());
const http = require("http").createServer(app);
require(`dotenv`).config();
const PORT = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL;
const mongoose = require("mongoose");
/******/
const peluches = require("./Estructura_Proyecto/Controllers/peluches");
const user = require("./Estructura_Proyecto/Controllers/user");
const { send } = require("process");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Conectado');
  })
  .catch((err) => console.log(err))

app.post("/",(req,res) => {
    res.send("Llamada post");
})

//GET DE UN PELUCHE
app.get("/peluches/:nombre",async(req,res) => {
  let nomPel = req.params.nombre;
  try{
    pel = await peluches.getUnPeluche(nomPel);
    res.status(200).json(pel);
  }catch(error){
    console.log(error);
    res.status(500).send("Error");
  }
})

//GET TODOS LOS PELUCHES
app.get("/peluches",async (req,res) => {
    
  try{
    const result = await peluches.getTodosPeluches();
    res.status(200).json(result);
  }catch(error){
    console.log(error);
    res.status(500).send("Error al obtener todos los peluches");
  }
});

//CREAR PELUCHES
app.post("/peluches", async(req,res) => {
  let tipo = req.body.tipo;
  let accesorios = req.body.accesorios;
  let coloresDisponibles = req.body.coloresDisponibles;
  let nombre = req.body.nombre;
  try{
    const result = await peluches.addPeluche(tipo,accesorios,coloresDisponibles,nombre);
    if(result){
      res.status(201).send("Peluche creado!!");
    }
    }catch(error){
      console.log(error);
      res.status(500).send("Error al crear peluche");
    }
  });

//MODIFICO UN PELUCHE. CAMBIAR EL ID POR OTRO PARAMETRO 
app.put("/peluches/:_id", async(req,res) => {
  const peluche = { _id:req.params._id, ...req.body};
  
  try{
    const result = await peluches.editPeluche(peluche);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El peluche no existe");
    }
  }catch(error){
    res.status(500).send("Error");
  }
}); 

//ELIMINO UN PELUCHE.
app.delete("/peluches/:nombre",async(req,res) => {
  try{
    const result = await peluches.deletePeluche(req.params.nombre);
    if(result){
      res.status(200).send("Peluche borrado");
    }else{
      res.status(403).send("El peluche no existe");
    }
  }catch(error){
    console.log(error);
    res.status(500).send("Error");
  }
});

//CREAR USER
app.post("/user",async(req,res) => {
  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let isActive = req.body.isActive;
  let password =req.body.password;

  try{
    const result = await user.addUser(name,lastname,email,isActive,password);
    if(result){
      res.status(200).send("Usuario creado!!");
    }else{
      res.status(404).send("Error, el usuario que quieres crear ya existe");
    }
  }catch(error){
      console.log(error);
      res.status(500).send("Ha ocurrido un error");
    }
  });

//GET DE UN USER
app.get("/user/:id",async(req,res) => {
  let id = req.params.id;
  try{
    usuario = await user.getUser(id);
    res.status(200).send(usuario);
  }catch(error){
    res.status(500).send("Error al buscar el usuario");
  }
});

//GET DE TODOS LOS USERS
app.get("/user",async(req,res) => {
  try{
    const result = await user.getAllUsers();
    res.status(200).send(result);
  }catch(error){
    res.send(500).send("Error al obtener todos los usuarios");
  }
});

//EDITAR UN USUARIO
app.put("/user/:id",async(req,res) => {
  const usr = {_id: req.params.id, ...req.body };
  try{
    const result = await user.editUser(usr);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El usuario ingresado para modificar, no existe");
    }
  }catch(error){
    res.status(500).send("Ha ocurrido un error");
  }
});

//ELIMINAR UN USUARIO
app.delete("/user/:id",async(req,res) => {
  try{
    const result = await user.deleteUser(req.paramas.id);
    if(result){
      send.status(200).send("El usuario se ha borrado correctamente");
    }else{
      send.status(404).send("Error");
    }
  }catch(error){
    send.status(500).send("Ha ocurrido un error intentando borrar el usuario");
  }
});

app.listen(PORT,()=>{
    console.log(`servidor corriendo ${PORT}`);
})