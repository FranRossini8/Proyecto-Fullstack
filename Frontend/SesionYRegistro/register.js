

const form = document.querySelector('form[class="Registro"]')

form.addEventListener('submit', (e) => {
    console.log("Estoy en el script");
    e.preventDefault();
    const registro = {name:document.querySelector('input[class="NombreCuenta"]').value,
                      lastname:document.querySelector('input[class="ApellidoCuenta"]').value,
                      email:document.querySelector('input[class="EmailCuenta"]').value,
                      password:document.querySelector('input[class="PassCuenta"]').value
                    }
    console.log(registro);                
    fetch('http://localhost:8080/register', {
        method:'POST', 
        body:JSON.stringify(registro),
        mode:'cors',
        headers:new Headers({
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*',
        }),  
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            console.log("Usuario registrado");
        } else{
            console.log("Ocurrio un error");
        }
    })
})




