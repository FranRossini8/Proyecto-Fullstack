
const formulario = document.querySelector('form[class="inicioSesion"]')

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const info = {email:document.querySelector('input[class="EmailSesion"]').value,
                password:document.querySelector('input[class="PassSesion"]').value}
  
  fetch('http://localhost:8080/login', {
    method:'POST', 
    body:JSON.stringify(info),
    mode:'cors',
    headers:new Headers({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
    }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.token){
        sessionStorage.setItem('token',data.token);
        window.location.href = '../Perfil/pelus.html';
      }
    })
})

 

