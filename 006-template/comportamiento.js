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
            destino.appendChild(instancia);
        })
    })
}