window.onload = function() {
    console.log("Web cargada");
    fetch("canciones.json")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(datos){
        console.log(datos)
    })
}