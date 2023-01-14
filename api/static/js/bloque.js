function ordenar(id){
    let divPadre = document.getElementById("root")
    let cod = ""
    divPadre.innerHTML = cod;
}

function insertarBloque(){
    console.log(bloqueEnUso);
}

function nuevaOpcionModal(id){
    console.log(`${id} activado`);
    actualizarBloqueEnUso(id)
    ActivarModal()
}

