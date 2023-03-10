let historialStyleBody = [], tipoDeletra = 'Open Sans', fondoContenedorColorBody = '#ffffff', fondoContenedorImagenBody = '',  transparenciaFondoContenedorBody = 10
let congelarActualizacionPantalla = 'no', medidaAnchoPantallaPadre = 100, historial = [], numHistorialActual = 0
let arrAccEventos = []
let acc = "`", dede = []

let diccionario =  [   // todo objeto se le debe inyectar el  `eventoUnico(this.id, 'modalAtributos(${mirar[0]})')` para poder ser operado en el modal en la posicion 0
                    {"div":{
                        "id": ["contenedor0"],
                        "crearNuevo": [''], 
                        "codigoEmbebido": [''],
                        "class": ["centrar ", 'organizarPorFilas '],
                        "eventos": [[''], [''], ['']],
                        "style": [['margen',"margin-top: 0px", "margin-right: 0px", "margin-left: 0px", "margin-bottom: 0px"], ['relleno',"padding-top: 0px", "padding-right: 0px", "padding-left: 0px", "padding-bottom: 0px"],  ["ancho", "width: 100%"], ["alto", "min-height: 10px;"], ['radio de borde',"border-top-left-radius: 0em", "border-top-right-radius: 0em", "border-bottom-left-radius: 0em", "border-bottom-right-radius: 0em"], ['color letra', 'color: rgba(255, 255, 255, 1)'], ['fondo', 'background: rgba(207, 207, 207, 0)'], ['mostrar en modo', 'display: flex']],
                        "absorber": ["si"],
                        "borrar": [''] 
                    }}                  
            ] 
            
let detenerOnclickModal = "no"  
                

function traducirDiccionario(id){
    console.log(`detenerOnclickModal: ${detenerOnclickModal}`);
    console.log(`dragAndDropEnUso: ${dragAndDropEnUso}`);


    document.getElementById('enviarDicc').value = JSON.stringify(diccionario);
    actualizarDiccStyleBody()
    actualizarStyleBody(historialStyleBody[numHistorialActual])
    
    let codigoHTML = ""

    for (llavePadre in diccionario) {
        for (llaveHija in diccionario[llavePadre]){
            let dicc = diccionario[llavePadre][llaveHija]
            if(llaveHija == "div"){
                codigoHTML = decidirAccionArmadoComponents(llaveHija, dicc, codigoHTML)
                //console.log(codigoHTML);
            } 
        }
    }

    document.getElementById(id).innerHTML = codigoHTML 
}

function actualizarDiccStyleBody(){
    document.getElementById('styleBody').value = historialStyleBody[numHistorialActual];
}

function aderirHistorial(cod, acc){
    DiccStyleBody = {'tipoDeletra': tipoDeletra, 'fondoContenedorColorBody': fondoContenedorColorBody, 'transparenciaFondoContenedorBody': transparenciaFondoContenedorBody, 'fondoContenedorImagenBody': fondoContenedorImagenBody}
    historialStyleBody.push(JSON.stringify(DiccStyleBody))
    historial.push(JSON.stringify(cod))
    if(acc != 'arranque'){
        numHistorialActual += 1
    }
    //console.log(`numHistorialActual: ${numHistorialActual}`);
    //console.log(`historial: ${historial}`);
    //console.log(`historialStyleBody: ${historialStyleBody}`);
}

function historialDicc(acc){
    if(acc == 'adelante'){
        if(historial.length - 1 >= numHistorialActual + 1){
            numHistorialActual += 1
        } else {
            saludar('adelante, no hay mas')
        }
    } else if(acc == 'atras'){
        if(numHistorialActual - 1 >= 0){
            numHistorialActual -= 1
        } else {
            saludar('atras, no hay mas')
        }
    }
    
    diccionario = eval(historial[numHistorialActual])
    actualizarStyleBody(historialStyleBody[numHistorialActual])
    traducirDiccionario('porAhora')
}

async function actualizarAnchoContenedorPadre(valor){
    congelarActualizacionPantalla = 'si'
    let divPadre = document.getElementById('porAhora')
    divPadre.style.transition = '2s'

    anchuraEnPixeles = divPadre.offsetWidth;
    let anchuraEnPorcentajeEnPixeles = anchuraEnPixeles * (valor / 100);
    //let anchuraEnPorcentajeEnPorcentaje = (anchuraEnPorcentajeEnPixeles / anchuraEnPixeles) * 100;

    divPadre.style.width = `${valor}%`
    medidaAnchoPantallaPadre = valor

    let desicionMargin = ''
    console.log(estadoModal);
    if(estadoModal == 'activado'){
        desicionMargin = 'marginRight'
        divPadre.style.marginLeft = '0px';
    } else {
        desicionMargin = 'marginLeft'
        divPadre.style.marginRight = '0px';
    }
    eval(`divPadre.style.${desicionMargin} = '${(100 - parseInt(valor)) / 2}%'`)
    congelarActualizacionPantalla = 'no'
    await wait(3000)
    traducirDiccionario('porAhora')
}

/*function mirar(arr){
    for (let u = 0; u < arr.length; u++) {
        eval(arr[u])
    }
    wait(1000)
    DetenerOnclickModal()
}*/

/*async function activarObjectoComplejo(nombreFuncion, arr, textos, id, delay) {
    //console.log(`activarObjectoComplejo, nombreFuncion: ${nombreFuncion}, arr: ${arr}, id: ${id}, delay: ${delay}`);
    //console.log(arr);
    await wait(delay);
    //console.log(`arranca`);
    let text = `${nombreFuncion}('${id}', '${arr}', '${textos}')`
    //console.log(text);
    //let arree = ['https://res.cloudinary.com/dplncudbq/image/upload/v1676134057/mias/3-3_k4rrwz.jpg', 'https://res.cloudinary.com/dplncudbq/image/upload/v1676134057/mias/3-3_k4rrwz.jpg', 'https://res.cloudinary.com/dplncudbq/image/upload/v1676134057/mias/3-3_k4rrwz.jpg']
    eval(text)
}*/

function buscarBloque(bloqueID){
    //console.log(`desde buscarBloque, id: ${bloqueID}`);
    for (llavePrincipal in diccionario) {
        //console.log(llavePrincipal);
        for (llaveHija in diccionario[llavePrincipal]) {
            //console.log(diccionario[llavePrincipal][llaveHija]);
            //console.log(llaveHija);
            for (contenidoFinal in diccionario[llavePrincipal][llaveHija]) {
                //console.log(contenidoFinal);
                //console.log(diccionario[llavePrincipal][llaveHija][contenidoFinal]);
                if(diccionario[llavePrincipal][llaveHija][contenidoFinal] == bloqueID){
                    //console.log("entra");
                    //console.log(llavePrincipal);
                    return llavePrincipal
                }
            }
        }
    }
}

function usarInformacion(llavePrincipal, llaveHija, acc, info){  
    if(acc == "retornar solo"){
        //console.log(`${diccionario[0][llavePrincipal][llaveHija]}`);
    } else if(acc == "agregar"){
        diccionario[0][llavePrincipal][llaveHija].push(info)
    } else if(acc == "borrar"){
        let arre = diccionario[0][llavePrincipal][llaveHija]
        for (let u = 0; u < arre.length; u++) {
            if(arre[u] == info){
                arre[u] = ""// buscar que lo borre, mas no lo reescriba
            }
        }
    } else if(acc == "retornar todo"){
        //console.log("entra");
        //console.log(diccionario[0][llavePrincipal]);// el cero a futuro ser?? el id se cada seccion o componente

    }  
    //console.log(`${diccionario[0][llavePrincipal][llaveHija]}`);  
}

function decidirAccionArmadoComponents(llaveHija, dicc, codigoHTML){
    
    if(llaveHija == "div"){
        
        let concatenado = `id = "${dicc['id']}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))}`
        return div(concatenado, codigoHTML,  dicc['absorber'], dicc['id'], `style = "${quitarComasDeArreglo(unificarArreglos(dicc['style'], '; '))}"`)// pilas que en este el codigo inyectable anterior ya proviene junto con la funcion "div"
        //console.log(codigoInyectable);
    
    } else if(llaveHija == "img"){
        
        return imagen(dicc['link'], quitarComasDeArreglo(unificarArreglos(dicc['style'], '; ')), quitarComasDeArreglo(dicc['class']), quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id'])), dicc['id'])
    
    } else if(llaveHija == "video"){
        
        let concatenado = `id = "${dicc['id']}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))}  style = "${quitarComasDeArreglo(unificarArreglos(dicc['style'], '; '))}"`
        return video(concatenado, dicc['link'])
    
    } else if(llaveHija == "espacio"){

        return espacio(dicc['espacios'])

    } else if(llaveHija == "text"){
        
        let concatenado = `id = "${dicc['id']}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))}`
        return texto(dicc['tipo'], concatenado, dicc['texto'], `${separarPalabra(dicc['style'][5], 'color letra')[1]}; ${separarPalabra(dicc['style'][6], 'fondo')[1]};`, `${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))}`, `${dicc['id']}`, `${quitarComasDeArreglo(unificarArreglos(dicc['style'], '; '))}`)
        
    } else if(llaveHija == 'slideGalery'){

        return slideGalery(dicc['id'][0], quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id'])), quitarComasDeArreglo(dicc['class']), quitarComasDeArreglo(unificarArreglos(dicc['style'], '; ')), dicc)
    
    } else if(llaveHija == "codEmbebido"){
        
        return codEmbebido(dicc['id'][0], quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id'])), quitarComasDeArreglo(dicc['class']), quitarComasDeArreglo(unificarArreglos(dicc['style'], '; ')), dicc['codigo'][0])
        
    }
}

function unificarArreglos(arre, textoAdicional){
    let arr = []; text = ''
    if(textoAdicional != undefined){
        text = textoAdicional
    }
    for (let u = 0; u < arre.length; u++) {
        for (let e = 1; e < arre[u].length; e++) {
            arr.push(arre[u][e] + text)
        }
    }
    return arr
}

function agregarEventos(arr, id){
    //console.log(arr);
    //console.log(id);
    let onclick =  `onclick="eventoUnico(this.id, '`, onmouseover = `onmouseover="`, onmouseout = `onmouseout="`;
    let estadoOnClick = 'borrar',  estadoOnMouseOver = 'borrar', estadoOnMouseOut = 'borrar'; 
    
    //console.log(`detenerOnclickModal: ${detenerOnclickModal}`);
    if(detenerOnclickModal == 'no'){
        let acc = '`', colorLetraUsuario = '', colorFondoUSuario = '', colorLetraPaso = '', colorFondoPaso = ''

        for(i in diccionario){
            for(u in diccionario[i]){
                if(diccionario[i][u]['id'] == id){
                    colorLetraUsuario = diccionario[i][u]['style'][5][1]
                    colorFondoUSuario = diccionario[i][u]['style'][6][1]
                    tipoFondoUsuario = separarPalabra(colorFondoUSuario, ':')[0]
                    
                    //console.log(`tipoFondoUsuario: ${tipoFondoUsuario}`);
                    if(tipoFondoUsuario == 'background:'){
                        tipoFondoUsuario = 'cambiarColor'
                    } else {
                        tipoFondoUsuario = 'cambiarImagen'
                    }
                    
                    if(tipoFondoUsuario == 'cambiarColor'){
                        colorFondoUSuario = separarPalabra(colorFondoUSuario, ':')[1]
                    } else {
                        colorFondoUSuario = buscarCaracterParaReemplazar(diccionario[i][u]['style'][6][1], '`', `'`)
                    }

                    colorLetraUsuario = separarPalabra(colorLetraUsuario, ':')[1]
                    
                    if(Object.keys(diccionario[i]) == 'div'){
                        colorFondoPaso = 'rgba(173, 33, 173, 1)'
                        colorLetraPaso = 'rgba(173, 33, 173, 1)'
                    } else if(Object.keys(diccionario[i]) == 'text'){
                        colorFondoPaso = 'rgba(33, 141, 173, 1)'
                        colorLetraPaso = 'rgba(255, 255, 255, 1)'
                    } else if(Object.keys(diccionario[i]) == 'img'){
                        colorFondoPaso = 'rgba(77, 173, 33, 1)'
                        colorLetraPaso = 'rgba(77, 173, 33, 1)'
                    } else if(Object.keys(diccionario[i]) == 'video'){
                        colorFondoPaso = 'rgba(221, 224, 11, 1)'
                        colorLetraPaso = 'rgba(221, 224, 11, 1)'
                    } else if(Object.keys(diccionario[i]) == 'slideGalery'){
                        colorFondoPaso = 'rgba(50, 50, 11, 1)'
                        colorLetraPaso = 'rgba(221, 224, 11, 1)'
                    } else if(Object.keys(diccionario[i]) == 'codEmbebido'){
                        colorFondoPaso = 'rgba(20, 75, 61, 1)'
                        colorLetraPaso = 'rgba(0, 146, 110, 1)'
                    }

                }
            }
        }

        onclick += `modalAtributos(${acc}${id}${acc})/`
        
        onmouseover += `cambiarColor(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorFondoPaso}${acc})/
                        cambiarColorLetra(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorLetraPaso}${acc})/`

        if(tipoFondoUsuario == 'cambiarImagen'){
            onmouseout  += `cambiarColor(${acc}${id}${acc},  ${acc}1${acc}, ${acc}'rgba(0, 146, 110, 0)'${acc})/`
        }                 

        onmouseout  += `${tipoFondoUsuario}(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorFondoUSuario}${acc})/
                        cambiarColorLetra(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorLetraUsuario}${acc})/`

        estadoOnClick = 'usar', estadoOnMouseOver = 'usar', estadoOnMouseOut = 'usar'
    }

    for (let u = 0; u < arr.length; u++) {
        for (let e = 1; e < arr[u].length; e++) { // la posicion 0 de la e siempre ser?? para los eventos inyectados para edicion
                        
            if(u == 0){
                if(arr[u][e] != '') {
                    onclick += `${arr[u][e]}/`
                    estadoOnClick = 'usar'
                }

            } else if(u == 1){
                if(arr[u][e] != ''){
                    onmouseover += `${arr[u][e]}/`
                    estadoOnMouseOver = 'usar'
                } 
                
            } else if(u == 2){
                if(arr[u][e] != ''){
                    onmouseout += `${arr[u][e]}/`
                    estadoOnMouseOut = 'usar'
                } 
            }
        }
    }
    onclick = removerUltimoCaracter(onclick)
    onmouseover = removerUltimoCaracter(onmouseover)
    onmouseout = removerUltimoCaracter(onmouseout)

    onclick +=     `')" `
    onmouseover += `" `
    onmouseout +=  `" `

    if(estadoOnClick == 'borrar'){
        onclick = ''
    }
    if(estadoOnMouseOver == 'borrar'){
        onmouseover = ''
    }
    if(estadoOnMouseOut == 'borrar'){
        onmouseout = ''
    }

    let text = `${onmouseover} ${onmouseout} ${onclick}`
    //console.log(text);
    return text
}

function removerUltimoCaracter(texto){
    let text = ''
    for (let u = 0; u < (texto.length - 1); u++) {
        text += texto[u]
    }
    return text
}

function actualizarSelect(id, valor, estilo){
    console.log(`id: ${id}, valor: ${valor}`);
    let obj = document.getElementById(id)
    let arr = retornarArregloSelectStyle(valor), cod = '', sel = ''

    if(valor == 'porcentajes'){
        sel = '5%'
    } else if(valor == 'pixeles'){
        sel = '20px'
    } else if(valor == 'relativo'){
        sel = 'fit-content'
    } 

    for (let u = 0; u < arr.length; u++) {
        let select = ''
        if(sel == arr[u]){
            select = 'selected'
        }
        cod += `<option ${select} value='${arr[u]}'>${arr[u]}</option>`
    }

    obj.innerHTML = cod

    actualizarDicc(id, estilo + sel)
}

function retornarSelects(id, arr, evento, opcionActual){
    //console.log(`opcionActual:${opcionActual}, arr: ${arr}, id: ${id}`);
    let cod = ``
        cod += `
        <select style="border-radius:0.5em; border:none; width: fit-content; height: 20px;" ${evento} name="${id}" id="${id}">`
        for (let u = 0; u < arr.length; u++) {
            let sel = ''
            if(opcionActual == arr[u]){
                sel = 'selected'
            }
            cod += `
            <option ${sel} value="${arr[u]}">${arr[u]}</option>`
        }
    cod += `
        </select>`
    return cod 
}

function retornarInput(opcionActual, id, esconder){
    let cod = '', acc = ''
    if(esconder == 'esconder'){
        acc = `display: none;`
    }
    cod = `<input oninput="actualizarDicc(this.id, this.value)" style="${acc} border-radius:0.5em; border:none; width: 100%; height: 20px; margin-top: 15px; margin-right: 15px;" type="text" name="" value="${opcionActual}" id="${id}">`
    return cod;
}
                                           //referenciaFinal
function retornarTextArea(opcionActual, id, i){
    /*let ref = ''
    if(referenciaFinal != undefined){
        ref = referenciaFinal
    }                                                       //+ '${ref}'*/
    return `<textarea oninput="quitarSaltosDeLinea(this.value , '${id}')" style="background: white; width:100%; height: 80%; border-radius: 0.7em;" name="" id="textArea${i}" cols="30" rows="10">${agregarSaltosDeLinea(opcionActual)}</textarea>`

}

function retornarBotonBorrar(id, i, nombreDicPadre, opcionActual, text){
    let cod = ''
    //if(opcionActual != ''){
        cod = ` <div style="display: flex; justify-content: space-between;">
                    <img  style="border-radius: 50%; width: 50px; height: 50px; cursor:pointer;" onclick="borrarItem(${id}, ${i}, ${nombreDicPadre}, ${text})" src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597775/borrar_yw19rd.png">
                </div>`
    //}
    return cod;            
}

function borrarItem(id, codItem, idPadre, text){
    let arr = crearArreglo(id, '$')
	console.log(arr);
    let ruta = ''
    let coordenada = 0

    if(arr.length == 4){
        ruta = `diccionario[${arr[0]}].${arr[1]}.${arr[2]}`
        coordenada = codItem
    } else {
        ruta = `diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}]`
        coordenada = arr[4]
    }
    
    console.log(`ruta: ${ruta}, id: ${id}, codItem: ${codItem}, Idpadre: ${idPadre}, arr: ${arr}, coordenada: ${coordenada}`);
    
    console.log('antes de borrar');
    console.log(diccionario);
    let arreglo =  eval(ruta) //diccionario[1].text.texto
    
    console.log(arreglo);
    
    let arre = []
    console.log(`text: ${text}`);
    if(text == 'texto'  || text == 'linkSlideGalery'  ){
        for (let u = 0; u < arreglo.length; u++) {
            if(u != coordenada){
                let tex = '['
                for (let i = 0; i < arreglo[u].length; i++) {
                    tex += ` '${arreglo[u][i]}',`
                }
                tex = removerUltimoCaracter(tex)
                tex += ']'
                arre.push(tex)
            }
        }
    } else {
        for (let u = 0; u < arreglo.length; u++) {
            if(u != coordenada){
                arre.push(`'${arreglo[u]}'`)
            }
        }
    }

    console.log(arre);
    console.log(`${ruta} = [${arre}]`);
    eval(`${ruta} = [${arre}]`)
    console.log('despues de borrar');
    console.log(diccionario);
    traducirDiccionario('porAhora')
    modalAtributos(idPadre)
    idElementoEnUso = arr[2]
    aderirHistorial(diccionario)
    setTimeout(reubicar, 1000)
}

function crearItem(id, idPadre){
    //console.log(idPadre);
    let arr = crearArreglo(id, '$')
    console.log(arr);
    let ruta = ''
    if(arr.length == 3){//estaba 4
        ruta = `diccionario[${arr[0]}].${arr[1]}.${arr[2]}`
    } else {
        ruta = `diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}]`
    }
    
    console.log(`crearItem, id: ${id}, idPadre: ${idPadre}, arr: ${arr}, ruta: ${ruta}`);
    
    let contenido = ''
    console.log(arr[2]);
    if(arr[2] == 'texto'){
        contenido = `['', '', '']`
    } else if(arr[2] == 'linkSlideGalery'){
        let num = parseInt(eval(`${ruta}.length`))
        contenido = `['https://res.cloudinary.com/dplncudbq/image/upload/v1676134087/mias/n3_hsowfh.jpg', 'lorem ipsum', '${num}']`
    } else {
        contenido = `''`
    }
    console.log(`arr[2]: ${arr[2]}`);
    console.log(`${ruta}.push(${contenido})`);
    eval(`${ruta}.push(${contenido})`)

    
    traducirDiccionario('porAhora')
    modalAtributos(idPadre)
    idElementoEnUso = arr[2]
    setTimeout(reubicar, 1000)
    aderirHistorial(diccionario)
    console.log(diccionario);
}

function reubicar(){
    if(idElementoEnUso != 'texto'){
        //console.log(idElementoEnUso);
        let miObj = document.getElementById(idElementoEnUso);
        miObj.style.paddingTop = "100px";
        location.hash = `#`
        location.hash = `#${idElementoEnUso}`//"#eventos"
        idElementoEnUso = ''
    }
}

function retornarArregloConRangoNumerico(minimo, maximo, incremento, textoAdicional){
    let arr = [], text = ''
    if(textoAdicional != undefined){
        text = textoAdicional
    }
    for (let u = minimo; u <= maximo; u += incremento) {
        let numPaso = u
        if(buscarCaracter(u, '.')){
            //console.log(`tiene ${u}`);
            numPaso = u.toFixed(1)
        } 
        arr.push(`${numPaso}${text}`)
    }
    return arr
}

function buscarCaracter(text, ref){
    //console.log(`buscarCaracter, text: ${text}, ref: ${ref}`);
    let tex = text + ""
    let res = false
    for (let u = 0; u < tex.length; u++) {
        if(tex[u] == ref){
            res = true
        }
    }
    //console.log(`buscarCaracter, res: ${res}`);
    return res
}



