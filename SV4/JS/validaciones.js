
function RedireccionarAlMapa() {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        window.location.href = 'mapa.html'; 
    });
}

/*function validarEmail() {
    const email = document.getElementById('valiEmail').value;
    const mensaje = document.getElementById('mensaje');
    var input = document.getElementById("validar").value;

    if ((email.endsWith('@utp.ac.pa') || email == " ") && (input == " " || input.length > 4)) {
        RedireccionarAlMapa();
    } else {
        mensaje.textContent = 'Ha ocurrido un error, ingrese nuevamente';
        mensaje.className = 'error';
        return false;
    }return true;
}*/

//funcion es para que salga de la pagina y se redirija al google jejeje
function redirigir() {
    window.location.href = "https://www.google.com";
    setTimeout(redirigir, 1000);
}

function rediMatricula(){
    window.location.href = "https://matricula.utp.ac.pa/session/cuenta/validar/kTmVjgniPlThcTmYPmiTZZm$TUkO";
    setTimeout(redirigir, 1000);
}