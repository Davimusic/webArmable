function arranque(dicc, stBody){
    if(dicc != ''){
        diccionario = eval(dicc)
        //diccionario = eval('(' + dicc + ')')
    }
    //document.getElementById("root").innerHTML = modal()
    document.getElementById('editor').innerHTML = retornarBotonesEdicion()
    actualizarStyleBody(stBody)
    aderirHistorial(diccionario, 'arranque')
    traducirDiccionario('porAhora') // es el id del div a inyectar 
}

function actualizarStyleBody(cod){
    //console.log(cod);
    //console.log(`--------`);
    let dicc = {}
    if(cod != '' && cod != undefined){
        bandera = 1
        dicc =  eval('(' + cod + ')')
        //dicc =  eval(`${cod}`)
        for(u in dicc){
            let paso = `${u} = '${dicc[u]}'` 
            //console.log(paso);
            eval(paso)
        }
    
        let idPanelEdicion = document.getElementById('editor')
        document.getElementById('porAhora').style.height = `${window.innerHeight - idPanelEdicion.offsetHeight}px`
        actualizarTipoDeLetra(tipoDeletra)
        actualizarFondoContenedorBody('color', fondoContenedorColorBody)
        //actualizarFondoContenedorBody('transparencia', transparenciaFondoContenedorBody)
        actualizarFondoContenedorBody('imagen', fondoContenedorImagenBody)
    } 
}

function retornarBotonesEdicion(){
    let style = ``, sin = `style="margin: 0px; padding: 0px;"`
    return  ` <div style='color: white; background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(79,79,82,0.6783088235294117) 100%);  z-index: 999; width: 100%; display: flex; justify-content: space-around; flex-wrap: wrap; border: none;'>
                <div>
                    <p ${sin}>Editores objetos</p>
                    ${retornarBotonDetenerOnclickModal()}
                    ${retornarBotonDragAndDrop()}
                </div>
                <div>
                    <p ${sin}>Tipo de letra</p>
                    ${retornarTipoDeLetra()}
                </div>
                <div>
                    <p ${sin}>Responsive</p>
                    <input onchange= "actualizarAnchoContenedorPadre(this.value)" class='inputRange' type="range" style="background: none; margin-top: 20px;" id='' value='${medidaAnchoPantallaPadre}' name="" min="20" max="100">
                </div>
                <div>
                    <p ${sin}>Fondo pantalla</p>
                    ${retornarCambioFondoContenedorBody()}
                </div>
                <div>
                    <p ${sin}>guardar</p>
                    <form method="POST" action="XD">
                        <input type="hidden" id='enviarDicc' name="infoDiccionario" value="">
                        <input type="hidden" id='styleBody'  name="infostyleBody" value="">
                        <button style='box-shadow: none !important; background: none; border: none; width: 25px; height: 25px; border-radius: 50%;' type="submit"><img class='efectoResaltar' style="width: width: 25px; height: 25px; border-radius: 50%;" src="https://res.cloudinary.com/dplncudbq/image/upload/v1677804971/mias/guardar_znpd3r.png" alt="editar pagina web"></button>
                    </form>
                </div>
                <div>
                    <p ${sin}>historial</p>
                    <button onclick="historialDicc('adelante')" style='box-shadow: none !important; background: none; border: none; width: 25px; height: 25px; border-radius: 50%;'><img class='efectoResaltar' style="width: 25px; height: 25px; border-radius: 50%;" src="https://res.cloudinary.com/dplncudbq/image/upload/v1676133410/mias/adelante_ztqvpx.png" alt="editar pagina web"></button>
                    <button onclick="historialDicc('atras')" style='box-shadow: none !important; background: none; border: none; width: 25px; height: 25px; border-radius: 50%;'><img class='efectoResaltar' style="width: 25px; height: 25px; border-radius: 50%;" src="https://res.cloudinary.com/dplncudbq/image/upload/v1676133407/mias/atras_lfyntg.png" alt="editar pagina web"></button>                    
                </div>
            </div> `
}

/*function enviarDiccionarioBaseDedatos(){
    // Convertir el arreglo en una cadena separada por comas
var cadena = diccionario.join(",");

// Configurar las opciones de la solicitud
var opciones = {
    method: "POST",
    headers: {
    "Content-type": "text/plain"
    },
    body: cadena
};

// Enviar la solicitud al servidor con la cadena
fetch("XD", opciones)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}*/

function retornarCambioFondoContenedorBody(){
    let cod = `
    <div style='display: flex;'>
        ${retornarSelects(`opcionesFondoBody`, ['color', 'imagen'], `onchange= "edicionFondoBody(this.value)"`, 'color')}
        <div style='display: block' id='colorFondoBody'>
            <input onchange= "actualizarFondoContenedorBody('color', this.value, 'incrementarConteo')" style='background: none; padding: none; margin: none; margin-left: 5px; height: 25px; width: 25px; border-radius: 0.7em;' id='fondoColorBody' value='${fondoContenedorColorBody}' type='color'>
            <input onchange= "actualizarFondoContenedorBody('transparencia', this.value, 'incrementarConteo')" class='inputRange' type="range" style="background: none;" id='transparenciaFondoColorBody' value='${transparenciaFondoContenedorBody}' name="transparenciaFondoBody" min="0" max="10">
        </div>
        <div style='display: none' id='imagenFondoBody'>
            <input oninput="actualizarFondoContenedorBody('imagen', this.value, 'incrementarConteo')" style="border-radius:0.5em; border:none; width: 100%; height: 20px; margin-top: 15px; margin-right: 15px;" type="text" name="" placeholder='link de la imagen' value="${fondoContenedorImagenBody}" id="fondoImagenBody">
        </div>
    </div>` 
    return cod
}

function edicionFondoBody(text){
    let color = document.getElementById('colorFondoBody')
    let imagen = document.getElementById('imagenFondoBody')
    if(text == 'color'){
        color.style.display = 'block'
        imagen.style.display = 'none'
    } else {
        color.style.display = 'none'
        imagen.style.display = 'block'
    }
}

function actualizarFondoContenedorBody(acc, value, dec){
    conBody = document.getElementById('porAhora')
    conBody.style.transition = '2s'
    if(acc == 'color'){
        fondoContenedorColorBody = value
        document.getElementById('fondoColorBody').value = value
        transparenciaFondoContenedorBody = document.getElementById('transparenciaFondoColorBody').value
        conBody.style.background = hexToRgba(fondoContenedorColorBody, transparenciaFondoContenedorBody)
    } else if(acc == 'transparencia'){
        document.getElementById('transparenciaFondoColorBody').value = parseInt(value)
        transparenciaFondoContenedorBody = parseInt(value)
        fondoContenedorColorBody = document.getElementById('fondoColorBody').value
        conBody.style.background = hexToRgba(fondoContenedorColorBody, transparenciaFondoContenedorBody)
    } else {
        fondoContenedorImagenBody = value
        //console.log(value);
        conBody.style.backgroundImage = `url('${value}')`;
    }

    if(dec == 'incrementarConteo'){
        aderirHistorial(diccionario)
        console.log(historialStyleBody);
    }

    //console.log(historialStyleBody[numHistorialActual]);
    actualizarDiccStyleBody()
}

let habilitarUsoEvento = true
function eventoUnico(id, accion){
    if(habilitarUsoEvento == true){
        //console.log(`eventoUnico, id: ${id},accion: ${accion}`);
        habilitarUsoEvento = false;
        //console.log(`eventoUnico: ${accion}`);
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
    return `<button type="button" id='cambiarEditar' onclick="eventoUnico(this.id, 'DetenerOnclickModal()')" style='border-radius: 50%; color: white; background: green; width: 25px; height: 25px; border: none;'><img style="width: 25px; height: 25px;" src="https://res.cloudinary.com/dplncudbq/image/upload/v1671157067/mias/esa_besl3z.png" alt="editar pagina web"></button>`
}

function retornarBotonDragAndDrop(){
    return `<button type="button" id='cambiarDragAndDrop' onclick="eventoUnico(this.id, 'accionDagAndDrop()')" style='border-radius: 50%; color: white; background: red; width: 25px; height: 25px; border: none;'><img style="width: 23px; height: 23px;" src="https://res.cloudinary.com/dplncudbq/image/upload/v1677804690/mias/flecha_xf9kw1.png" alt="editar pagina web"></button>`
}

//let textoBotonEdicion = '', 
let colorBotonEdicion = ''
function DetenerOnclickModal(){

    if(detenerOnclickModal == 'no'){
        //textoBotonEdicion = 'edicion'
        colorBotonEdicion = 'red';
        detenerOnclickModal = 'si' 
        //dragAndDropEnUso = 'si' 
        //document.getElementById('cambiarDragAndDrop').style.background = 'green'
    } else {
        //textoBotonEdicion = 'edicion'
        colorBotonEdicion = 'green';
        detenerOnclickModal = 'no'
        dragAndDropEnUso = 'no'
        document.getElementById('cambiarDragAndDrop').style.background = 'red'
    }
    traducirDiccionario('porAhora')
    setTimeout(actBotonEditar, 80)
    console.log(`DetenerOnclickModal: ${detenerOnclickModal}`);
}

function actBotonEditar(){
    console.log('entra.... color: ' + colorBotonEdicion);
    let bot = document.getElementById('cambiarEditar')
    //bot.textContent = textoBotonEdicion
    bot.style.background = colorBotonEdicion
}

function retornarTipoDeLetra(){
    let arr = [  "Open Sans",  "Roboto",  "Montserrat",  "Lato",  "Oswald",  "Slabo 27px",  "Raleway",  "PT Sans",  "Noto Sans",  "Source Sans Pro",  "Droid Sans",  "Bitter",  "Dosis",  "Exo 2",  "Francois One",  "Russo One",  "Unna",  "Arial",  "Verdana",  "Helvetica",  "Tahoma",  "Times New Roman",  "Courier New",  "Comic Sans MS",  "Impact",  "Lucida Sans Unicode",  "Trebuchet MS",  "Georgia",  "Palatino Linotype",  "Garamond",  "Bookman Old Style",  "Arial Black",  "Arial Narrow",  "Century Gothic",  "Franklin Gothic Medium",  "Lucida Console",  "MS Sans Serif",  "MS Serif",  "Andale Mono",  "Arial Rounded MT Bold",  "Baskerville",  "Bitstream Vera Sans",  "Calibri",  "Candara",  "Century Schoolbook",  "Consolas",  "Constantia",  "Corbel",  "Didot",  "Gill Sans",  "Hoefler Text",  "Lucida Bright",  "Lucida Grande",  "Palatino",  "Rockwell",  "Rockwell Extra Bold",  "Bodoni MT",  "Book Antiqua",  "Copperplate Gothic Light",  "DejaVu Sans",  "DejaVu Serif",  "Minion Pro",  "Myriad Pro",  "Goudy Old Style",  "Stencil",  "Goudy Stout",  "Bradley Hand ITC",  "MV Boli",  "Ink Free",  "Jokerman",  "Tempus Sans ITC",  "Wide Latin",  "Viner Hand ITC"];
    return retornarSelects('tipoLetra', arr, `oninput="actualizarTipoDeLetra(this.value, 'incrementarConteo')"`, tipoDeletra)
}

function actualizarTipoDeLetra(cod, acc){
    let ref = ''
    for (let u = 0; u < cod.length; u++) {
        if(cod[u] != ' '){
            ref += cod[u]
        } else {
            ref += '+'
        }
    }

    document.getElementById('linkLetra').innerHTML = `<link id="linkLetra" href='https://fonts.googleapis.com/css2?family=${ref}' rel='stylesheet'>`
    tipoDeletra = cod
    document.getElementById('tipoLetra').value = cod
    document.body.style.fontFamily = `'${tipoDeletra}', sans-serif`;

    if(acc == 'incrementarConteo'){
        aderirHistorial(diccionario)
    }
    
    //console.log(historialStyleBody[numHistorialActual]);
    actualizarDiccStyleBody()
}

window.onbeforeunload = function () {
    return "¿Está seguro de que desea salir sin guardar?";
};

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

