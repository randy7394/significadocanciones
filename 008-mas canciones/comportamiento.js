window.onload = function() {
    console.log("Web cargada");
    fetch("canciones.json")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(datos){
        console.log(datos)
        let plantilla = document.querySelector("#cancion")
        let destino = document.querySelector("main")
        datos.forEach(function(datos){
            let instancia = document.importNode(plantilla.content,true);
            instancia.querySelector("h3").innerHTML = datos.titulo;
            instancia.querySelector("h4").innerHTML = datos.artista;
            instancia.querySelector("h5").innerHTML = datos.album;
            instancia.querySelector("h5").innerHTML = datos.año;
            instancia.querySelector("p").innerHTML = datos.significado;
            destino.appendChild(instancia);
        })
    })
}