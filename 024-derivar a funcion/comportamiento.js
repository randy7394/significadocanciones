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
        document.getElementById("formularionuevacancion").style.display = "block"
        document.getElementById("formularionuevacancion").classList.add("aparece")
    }

    document.getElementById("enviar").onclick = function () {
        let titulo = document.getElementById("titulo").value
        let artista = document.getElementById("artista").value
        let significado = document.getElementById("significado").value
        fetch("./nuevacancion.php?titulo=" + encodeURI(titulo) + "&artista=" + encodeURI(artista) + "&significado=" + encodeURI(significado))
            .then(function () {
                fetch("canciones.json")
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (datos) {
                        canciones = datos
                    })
                setTimeout(function () {
                    document.getElementById("formularionuevacancion").style.display = "none"
                }, 1000)
                document.getElementById("formularionuevacancion").classList.add("desaparece")
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