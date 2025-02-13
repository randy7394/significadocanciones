window.onload = function() {
    // Variables globales
    let plantilla = document.querySelector("#cancion")
    let destino = document.querySelector("#canciones")
    var canciones;

    // El siguiente bloque de codigo se ejecuta cuando se carga la web
    fetch("canciones.json")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(datos){
        canciones = datos
        datos.forEach(function(datosIndividuales){
            let instancia = document.importNode(plantilla.content,true);
            instancia.querySelector("h3").innerHTML = datosIndividuales.titulo;
            instancia.querySelector("h4").innerHTML = datosIndividuales.artista;
            instancia.querySelector("h5").innerHTML = datosIndividuales.album;
            instancia.querySelector("h5").innerHTML = datosIndividuales.año;
            instancia.querySelector("p").innerHTML = datosIndividuales.significado;
            destino.appendChild(instancia);
        })
    })

    // El siguiente bloque de codigo se usa para la funcionalidad del buscador
    let buscador = document.querySelector("#buscador")
    buscador.onkeyup = function() {
        document.querySelector("#canciones").innerHTML = "" // Vacia la seccion para mostrar el resultado
        console.log(canciones)
        let valor = this.value
        canciones.forEach(function(cancion){
            if(valor == cancion.titulo || valor == cancion.artista){
                let instancia = document.importNode(plantilla.content,true);
                instancia.querySelector("h3").innerHTML = cancion.titulo;
                instancia.querySelector("h4").innerHTML = cancion.artista;
                instancia.querySelector("h5").innerHTML = cancion.album;
                instancia.querySelector("h5").innerHTML = cancion.año;
                instancia.querySelector("p").innerHTML = cancion.significado;
                destino.appendChild(instancia);
            }
        })
    }   
}