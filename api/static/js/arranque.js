function arranque(){
    let divPadre = document.getElementById("root")
    let cod =  modal()
    divPadre.innerHTML = cod //+ `${<script src="script.js"></script>}`
    traducirDiccionario('porAhora') // es el id del div a inyectar 
    actualizarTipoDeLetra('Open Sans')
}

let habilitarUsoEvento = true
function eventoUnico(id, accion){
    if(habilitarUsoEvento == true){
        //console.log(`eventoUnico, id: ${id},accion: ${accion}`);
        habilitarUsoEvento = false;
        console.log(`eventoUnico: ${accion}`);
        arre = accion.split('/'); 
        
        //console.log(arre);
        for (let u = 0; u < arre.length; u++) {
            console.log(`arre[u]: ${arre[u]}, id: ${id}`);
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
    return `<button type="button" id='cambiarEditar' onclick="eventoUnico(this.id, 'DetenerOnclickModal()')" style='border-radius: 0.5em; color: white; background: green; height: fit-content; width: fit-content; margin: 10px;'>modo edicion activado</button>`
}

function retornarBotonDragAndDrop(){
    return `<button type="button" id='cambiarDragAndDrop' onclick="eventoUnico(this.id, 'accionDagAndDrop()')" style='border-radius: 0.5em; color: white; background: red; height: fit-content; width: max-content; margin: 10px;'>modo drag and drop activado</button>`
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

function retornarTipoDeLetra(){
    let arr = [  "Open Sans",  "Roboto",  "Montserrat",  "Lato",  "Oswald",  "Slabo 27px",  "Raleway",  "PT Sans",  "Noto Sans",  "Source Sans Pro",  "Droid Sans",  "Bitter",  "Dosis",  "Exo 2",  "Francois One",  "Russo One",  "Unna",  "Arial",  "Verdana",  "Helvetica",  "Tahoma",  "Times New Roman",  "Courier New",  "Comic Sans MS",  "Impact",  "Lucida Sans Unicode",  "Trebuchet MS",  "Georgia",  "Palatino Linotype",  "Garamond",  "Bookman Old Style",  "Arial Black",  "Arial Narrow",  "Century Gothic",  "Franklin Gothic Medium",  "Lucida Console",  "MS Sans Serif",  "MS Serif",  "Andale Mono",  "Arial Rounded MT Bold",  "Baskerville",  "Bitstream Vera Sans",  "Calibri",  "Candara",  "Century Schoolbook",  "Consolas",  "Constantia",  "Corbel",  "Didot",  "Gill Sans",  "Hoefler Text",  "Lucida Bright",  "Lucida Grande",  "Palatino",  "Rockwell",  "Rockwell Extra Bold",  "Bodoni MT",  "Book Antiqua",  "Copperplate Gothic Light",  "DejaVu Sans",  "DejaVu Serif",  "Minion Pro",  "Myriad Pro",  "Goudy Old Style",  "Stencil",  "Goudy Stout",  "Bradley Hand ITC",  "MV Boli",  "Ink Free",  "Jokerman",  "Tempus Sans ITC",  "Wide Latin",  "Viner Hand ITC"];
    return retornarSelects('tipoLetra', arr, `oninput="actualizarTipoDeLetra(this.value)"`, 'Open Sans')
}

function actualizarTipoDeLetra(cod){
    let ref = ''
    for (let u = 0; u < cod.length; u++) {
        if(cod[u] != ' '){
            ref += cod[u]
        } else {
            ref += '+'
        }
    }
    //console.log(ref);
    document.getElementById('linkLetra').innerHTML = `<link id="linkLetra" href='https://fonts.googleapis.com/css2?family=${ref}' rel='stylesheet'>`
    //console.log(`actualizarTipoDeLetra: ` + `'${cod}', sans-serif`);
    document.body.style.fontFamily = `'${cod}', sans-serif`;
}

window.onbeforeunload = function () {
    return "¿Está seguro de que desea salir sin guardar?";
};

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}