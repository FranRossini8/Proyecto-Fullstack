require('mongoose');
const fs = require('fs');
const pel = require('../Controllers/peluches');

exports.ranking = async(req,res) => {
    let contadores = {
        oso:0,
        perro:0,
        gato:0,
        conejo:0,
        mapache:0
    };

    const peluches = await pel.getTodosPeluches(); 

    for(let Peluche of peluches){
        if(contadores[Peluche.tipo] !== undefined){
            contadores[Peluche.tipo]++;
        }
    }

    let pares = Object.entries(contadores);
    pares.sort((a,b) => b[1] - a[1]);
    let top3 = pares.slice(0,3);
    let resultado = Object.fromEntries(top3);

    fs.writeFile('resultado.json', JSON.stringify(resultado,null,2), err => {
        if(err) throw err;
        console.log('Contadores guardados correctamente en resultados.json');
    })

    res.json(resultado);
}