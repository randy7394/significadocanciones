<?php

    if($_GET['usuario'] == "ranmo" && $_GET['contrasena'] == "ranmo") {
        echo '{"resultado":"ok","usuario":"ranmo"}';
    } else {
        echo '{"resultado":"ko"}';
    }
    
?>