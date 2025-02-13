window.onload = function() {
    // El siguiente bloque de codigo se ejecuta cuando se carga la web
    var canciones;
    fetch("canciones.json")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(datos){
        canciones = datos
        let plantilla = document.querySelector("#cancion")
        let destino = document.querySelector("#canciones")
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

    // El siguiente bloque de codigo se usa para la funcionalidad del buscador
    let buscador = document.querySelector("#buscador")
    buscador.onkeyup = function() {
        document.querySelector("#canciones").innerHTML = ""
        console.log(canciones)
    }
}