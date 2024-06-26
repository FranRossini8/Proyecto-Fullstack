
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.misPelus');
    const token = sessionStorage.getItem('token');

fetch("http://localhost:8080/pelusUser",  {
    method:'GET',
    mode:'cors',
    headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Authorization':`Bearer ${token}`,
        'Content-type':'application/json'
    })
})
.then ((response)=> response.json())
.then(data => {
    console.log(data);
    const peluches = data.peluches;
    for(let peluche of peluches){
            const div = document.createElement('div');
            //div.classList.add('peluche-box');
            div.innerHTML =
                `
                <div class="peluche-item">
                    <div class="photo-item">
                        <img src="../Perfil/pelUser/${peluche.tipo}-${peluche.coloresDisponibles}.png">
                    </div>
                    <p>Nombre:${peluche.nombre}</p>
                    <div class="acce-item">
                        <p>Accesorio:</p>
                        <img src="../Perfil/pelUser/${peluche.accesorios}.png">
                    </div>
                    <div class="borrarPeluches">
                        <button class="eliminar">Borrar peluche</button>
                    </div> 
                </div>`;
                container.appendChild(div);
                const botonBorrar = div.querySelector('.eliminar');
                botonBorrar.addEventListener('click', () => {
                const nombrePeluche = peluche.nombre; // Obtén el nombre del peluche
                const pelucheData = {
                    nombre:nombrePeluche
                }; 
                fetch("http://localhost:8080/borrarPeluches",{
                    method:'DELETE',
                    body: JSON.stringify(pelucheData),
                    mode:'cors',
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                        'Authorization':`Bearer ${token}`,
                        'Content-type':'application/json'
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    location.reload();    
                }); 
            });
        };
    });  
});