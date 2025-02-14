//localStorage.setItem("usuario", "ranmo")
console.log(localStorage.getItem("usuario"))

window.onload = function () {
    console.log("Web cargada")

    // Global variables
    var plantilla = document.querySelector("#cancion")
    var destino = document.querySelector("#canciones")
    var canciones;

    // Page first load
    fetch("canciones.json")
        .then(function (response) {
            return response.json()
        })
        .then(function (datos) {
            canciones = datos
            console.log(datos)

            datos.forEach(function (cancion) {
                cargaCancion(cancion, plantilla, destino)
            })
        })

    // Finder
    let buscador = document.querySelector("#buscador")
    buscador.onkeyup = function () {
        document.querySelector("#canciones").innerHTML = ""
        let valor = this.value
        canciones.forEach(function (cancion) {
            if (
                reemplazaTildes(cancion.titulo).toLowerCase().includes(reemplazaTildes(valor).toLowerCase())
                ||
                reemplazaTildes(cancion.artista).toLowerCase().includes(reemplazaTildes(valor).toLowerCase())
                ||
                reemplazaTildes(cancion.significado).toLowerCase().includes(reemplazaTildes(valor).toLowerCase())
            ) {
                cargaCancion(cancion, plantilla, destino)
            }
        })
    }

    // New song button
    document.getElementById("nueva").onclick = function () {
        document.getElementById("modal").style.display = "block"
        document.getElementById("modal").classList.add("aparece")
        if (localStorage.getItem("usuario") == undefined) {
            document.getElementById("formularionuevacancion").style.display = "none"
            document.getElementById("formulariologin").style.display = "block"
        } else {
            document.getElementById("formularionuevacancion").style.display = "block"
            document.getElementById("formulariologin").style.display = "none"
        }
    }

    document.getElementById("enviar").onclick = function () {
        let titulo = document.getElementById("titulo").value
        let artista = document.getElementById("artista").value
        let significado = document.getElementById("significado").value
        fetch("./nuevacancion.php?titulo=" + encodeURI(titulo) + "&artista=" + encodeURI(artista) + "&significado=" + encodeURI(significado) + "&usuario=" + localStorage.getItem("usuario"))
            .then(function () {
                fetch("canciones.json")
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (datos) {
                        canciones = datos
                    })
                setTimeout(function () {
                    document.getElementById("modal").style.display = "none"
                }, 1000)
                document.getElementById("modal").classList.add("desaparece")
            })
    }

    // Login
    document.getElementById("login").onclick = function () {
        let usuario = document.getElementById("usuario").value
        let contrasena = document.getElementById("contrasena").value

        fetch("login.php?usuario=" + usuario + "&contrasena=" + contrasena)
            .then(function (response) {
                return response.json()
            })
            .then(function (datos) {
                if (datos.resultado == "ok") {
                    localStorage.setItem("usuario", datos.usuario);
                    document.getElementById("formularionuevacancion").style.display = "block"
                    document.getElementById("formulariologin").style.display = "none"
                } else {
                    document.getElementById("retroalimentacion").innerHTML = "Usuario o contraseña incorrectos"
                }
            })
    }
}

// Replace accents function
function reemplazaTildes(sujeto) {
    return sujeto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

// Load song function
function cargaCancion(cancion, plantilla, destino) {
    let instancia = document.importNode(plantilla.content, true);

    instancia.querySelector("h3").innerHTML = cancion.titulo
    instancia.querySelector("h4").innerHTML = cancion.artista
    instancia.querySelector("p").innerHTML = cancion.significado
    instancia.querySelector("h5").innerHTML = "Por: " + cancion.usuario

    instancia.querySelector("article").onclick = function () {
        let articulos = document.querySelectorAll("article")
        articulos.forEach(function (articulo) {
            articulo.style.display = "none"
        })
        this.style.display = "block"
        this.classList.add("alturacompleta")
    }
    destino.appendChild(instancia);
}