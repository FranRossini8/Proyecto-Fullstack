
const botonCrear = document.querySelector('guardar');
    const token = sessionStorage.getItem('token');
    botonCrear.addEventListner('click', () => {
        console.log("entre");
        const tipos = document.querySelectorAll('input[class=radio]').value;
        const colores = document.querySelectorAll('input[class=radio1]').value;
        const accesorio = document.querySelectorAll('input[class=radio2]').value;
        tipos.forEach((div,index) => {
            if(tipos[index] === true){
                tipoPel = tipos[index];
            }
        })
        colores.forEach((div,index) => {
            if(colores[index] === true){
                colorPel = colores[index];
            }
        })
        accesorio.forEach((div,index) => {
            if(accesorio[index] === true){
                accesorioPel = accesorio[index];
            }
        })
        valores = {
            tipo:tipoPel,
            color:colorPel,
            accesorio:accesorioPel,
            nombre:document.querySelector('input[class=NomPel]').value
        }

fetch("http://localhost:8080/creacion",  {
    method:'POST',
    body:JSON.stringify(valores),
    mode:'cors',
    headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Authorization':`Bearer ${token}`,
        'Content-type':'application/json'
    })
})
.then(response => {
    const mensajeRegistro = document.getElementById('mensajeCreado');
        if(response.status === 201){
            mensajeRegistro.textContent = 'Peluche creado!!';
        }else{
            mensajeRegistro.textContent = 'Error';
        }
})
})
