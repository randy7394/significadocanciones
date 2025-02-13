window.onload = function() {
    // Variables globales
    var canciones;              // Creo un contenedor para las canciones
    let plantilla = document.querySelector("#cancion")  // Cargo la plantilla-template de HTML
    let destino = document.querySelector("#canciones")  // Cargo en memoria compartida el destino de las canciones

    // El siguiente bloque de codigo se ejecuta cuando se carga la web
    fetch("canciones.json")     // Llamo a un origen de datos
    .then(function(respuesta){  // Cuando obtengo respuesta
        return respuesta.json() // Convierto lal respuesta a JSON
    })
    .then(function(datos){
        canciones = datos   // Asigno la repuesta a la variable global canciones
        datos.forEach(function(datosIndividuales){  // Para cada una de las canciones
            let instancia = document.importNode(plantilla.content,true);    // Instancio la plantilla
            instancia.querySelector("h3").innerHTML = datosIndividuales.titulo; // Le adapto el titulo
            instancia.querySelector("h4").innerHTML = datosIndividuales.artista; // Le adapto el artista
            instancia.querySelector("h5").innerHTML = datosIndividuales.album; // Le adapto el album
            instancia.querySelector("h5").innerHTML = datosIndividuales.año; // Le adapto el año
            instancia.querySelector("p").innerHTML = datosIndividuales.significado; // Le adapto el significado
            destino.appendChild(instancia); // Y lo añado a la seccion (el destino)
        })
    })

    // El siguiente bloque de codigo se usa para la funcionalidad del buscador
    let buscador = document.querySelector("#buscador")  // Selecciono el buscado
    buscador.onkeyup = function() { // Cuando presiono y levanto una tecla
        document.querySelector("#canciones").innerHTML = "" // Vacia la seccion para mostrar el resultado
        let valor = this.value  // Atrapo del valor del input
        canciones.forEach(function(cancion){    // Para cada una de las canciones
            if(reemplazarTildes(cancion.titulo).toLowerCase().includes(reemplazarTildes(valor).toLowerCase()) || reemplazarTildes(cancion.artista).toLowerCase().includes(reemplazarTildes(valor).toLowerCase()) || reemplazarTildes(cancion.significado).toLowerCase().includes(reemplazarTildes(valor).toLowerCase()) ){    // Si el valor del input es igual al titulo o al artista
                let instancia = document.importNode(plantilla.content,true);    // Instancio la plantilla
                instancia.querySelector("h3").innerHTML = cancion.titulo; // Le adapto el titulo
                instancia.querySelector("h4").innerHTML = cancion.artista; // Le adapto el artista
                instancia.querySelector("h5").innerHTML = cancion.album; // Le adapto el album
                instancia.querySelector("h5").innerHTML = cancion.año; // Le adapto el año
                instancia.querySelector("p").innerHTML = cancion.significado; // Le adapto el significado
                destino.appendChild(instancia); // Y lo añado a la seccion (el destino)
            }
        })
    }   
}

function reemplazarTildes(sujeto){  // Esta funcion reemplaza las tildes para facilitar la busqueda
    resultado = sujeto.replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u").replace("ü","u")
    return resultado
}