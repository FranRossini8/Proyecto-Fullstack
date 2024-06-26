

fetch('http://localhost:8080/ranking', {
    method:"GET",
    mode:'cors',
    headers: new Headers({
        'Access-Control-Allow-Origin': '*',
    })
    })
    .then(response => response.json())
    .then(data => {
        const imagenAnimal = document.getElementById('imagenContenedor');
        const rankingItems = document.querySelectorAll('div.rank');
        const animales = data;
        
        rankingItems.forEach((div, index) => {
            const imagen = document.createElement('img');
            imagen.src = `../Inicio/${animales[index].tipo}.jfif`
            const ventas = document.createElement('p');
            ventas.textContent = `Ventas: ${animales[index].ventas}`;
            div.appendChild(imagen);
            div.appendChild(ventas);
        }) 
    })    