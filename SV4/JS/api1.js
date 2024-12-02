document.getElementById("formJi").addEventListener("submit", async function (event) {
    event.preventDefault(); 
    const email = document.getElementById("valiEmail").value;
    const password = document.getElementById("validar").value;

    if (!email || !password) {
        document.getElementById("mensaje").textContent = "Por favor, completa todos los campos.";
        document.getElementById("mensaje").style.color = "red";
        return;
    }

    const url = `${"http://localhost:5076"}/api/Estudiantes/login`; // Reemplaza con la URL base de tu API

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
            }),
        });


        if (response.ok) {
            // Inicio de sesión exitoso
            document.getElementById("mensaje").textContent = "Inicio de sesión exitoso. Redirigiendo...";
            document.getElementById("mensaje").style.color = "green";

            // Guardar información en sessionStorage
            sessionStorage.setItem("correoEstudiante", email);

            // Redirigir mapa.html
            setTimeout(() => {
                window.location.href = "mapa.html";
            }, 2000);
        } else {
            document.getElementById("mensaje").textContent = "Correo o contraseña no existe, intente nuevamente";
            document.getElementById("mensaje").style.color = "red";
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        document.getElementById("mensaje").innerHTML = "Error al iniciar sesión.Intenta nuevamente<br>Dirijase a matrícula si no puede loguearse";
        document.getElementById("mensaje").style.color = "red";
    }
});
