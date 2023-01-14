function arranque(){
    let divPadre = document.getElementById("root")
    divPadre.innerHTML = modal();
    traducirDiccionario('porAhora') // es el id del div a inyectar    
}

let habilitarUsoEvento = true
function eventoUnico(id, accion){
    if(habilitarUsoEvento == true){
        //console.log(`${id}, ${accion}`);
        habilitarUsoEvento = false;

        arre = accion.split('-'); 
        
        //console.log(arre);
        for (let u = 0; u < arre.length; u++) {
            //console.log(arre[u]);
            document.getElementById(id).addEventListener("click", eval(arre[u]))
        }
        setTimeout(rehabilitarUsoEventos, 500)
    } 
}

function rehabilitarUsoEventos(){
    //console.log(`rehabilitado uso de eventos anidados`);
    habilitarUsoEvento = true;
}

