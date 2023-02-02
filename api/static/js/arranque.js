function arranque(){
    let divPadre = document.getElementById("root")
    let cod =  modal()
    divPadre.innerHTML = cod //+ `${<script src="script.js"></script>}`
    traducirDiccionario('porAhora') // es el id del div a inyectar 
}

let habilitarUsoEvento = true
function eventoUnico(id, accion){
    if(habilitarUsoEvento == true){
        //console.log(`eventoUnico, id: ${id},accion: ${accion}`);
        habilitarUsoEvento = false;

        arre = accion.split('/'); 
        
        //console.log(arre);
        for (let u = 0; u < arre.length; u++) {
            //console.log(`arre[u]: ${arre[u]}, id: ${id}`);
            document.getElementById(id).addEventListener("click", eval(arre[u]))
        }
        setTimeout(rehabilitarUsoEventos, 500)
    } 
}

function rehabilitarUsoEventos(){
    //console.log(`rehabilitado uso de eventos anidados`);
    habilitarUsoEvento = true;
}

function retornarBotonDetenerOnclickModal(){
    return `<button type="button" id='cambiarEditar' onclick="eventoUnico(this.id, 'DetenerOnclickModal()')" style='border-radius: 0.5em; color: white; background: green; height: fit-content; width: fit-content;'>modo edicion activado</button>`
}

function retornarBotonDragAndDrop(){
    return `<button type="button" id='cambiarDragAndDrop' onclick="eventoUnico(this.id, 'renderizarDicc()')" style='border-radius: 0.5em; color: white; background: red; height: fit-content; width: fit-content;'>modo drag and drop activado</button>`
}

let textoBotonEdicion = '', colorBotonEdicion = ''
function DetenerOnclickModal(){
    
    if(detenerOnclickModal == 'no'){
        textoBotonEdicion = 'modo edicion detenido'
        colorBotonEdicion = 'red';
        detenerOnclickModal = 'si'  
    } else {
        textoBotonEdicion = 'modo edicion activado'
        colorBotonEdicion = 'green';
        detenerOnclickModal = 'no'
    }
    traducirDiccionario('porAhora')
    setTimeout(actBotonEditar, 80)
    console.log(`DetenerOnclickModal: ${detenerOnclickModal}`);
}

function actBotonEditar(){
    let bot = document.getElementById('cambiarEditar')
    bot.textContent = textoBotonEdicion
    bot.style.background = colorBotonEdicion
}
