let mirar = ["`img1`", "`texto`", "`hijo`", "`video`", "`padreXD`", "`texto2`"]
let arrAccEventos = []
let acc = "`"
let diccionario =  [   // todo objeto se le debe inyectar el  `eventoUnico(this.id, 'modalAtributos(${mirar[0]})')` para poder ser operado en el modal en la posicion 0
                            {"img": {
                                "id": [`img1`],
                                "link": ["https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png"],
                                "style": [['margen',"margin-top: 20px", "margin-right: 20px", "margin-left: 20px", "margin-bottom: 20px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: 25%"], ["alto", "height: 25%"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 1)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: flex']],
                                "class": ["prueba"],
                                "eventos": [[''], [''], ['']],
                                "borrar": ['']
                            }},
                            {"text": {
                                "id": ["texto"],
                                "texto": [["Lorem ipsum dolor sit amet.", "", ""]],
                                "style": [['margen',"margin-top: 20px", "margin-right: 20px", "margin-left: 20px", "margin-bottom: 20px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: 50%"], ["alto", "height: 50%"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: block']],
                                "class": [""],
                                "eventos": [[''], [''], ['']],
                                "tipo": [`p`],
                                "borrar": ['']
                            }},
                            {"div":{
                                "id": ["hijo"], 
                                "class": [""],
                                "eventos": [[''], [''], ['']],
                                "style": [['margen',"margin-top: 0px", "margin-right: 0px", "margin-left: 0px", "margin-bottom: 0px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: 90%"], ["alto", "height: 80%"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: block']],
                                "absorber": ["si"],
                                "crearNuevo": [''],
                                "borrar": ['']
                            }},
                            {"espacio":{
                                "espacios": ["0"]
                            }},
                            {"text": {
                                "id": ["texto2"],
                                "texto": [["Lorem ipsum dolor sit amet 2 XD.", "", ""]],
                                "style": [['margen',"margin-top: 20px", "margin-right: 20px", "margin-left: 20px", "margin-bottom: 20px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: min-content"], ["alto", "height: min-content"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: block']],
                                "class": [""],
                                "eventos": [[''], [''], ['']],
                                "tipo": [`p`],
                                "borrar": ['']
                            }},
                            {"video": {
                                "id": ["video"],
                                "style": [['margen',"margin-top: 20px", "margin-right: 20px", "margin-left: 20px", "margin-bottom: 20px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: 200px"], ["alto", "height: 200px"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: flex']],
                                "class": [""],
                                "eventos": [[''], [''], ['']],
                                "link": ["https://res.cloudinary.com/dplncudbq/video/upload/v1657988513/mias/y1_b0pxvc.mp4"],
                                "borrar": ['']
                            }},
                            {"div":{
                                "id": ["padreXD"], 
                                "class": [""],
                                "eventos": [[''], [''], ['']],
                                "style": [['margen',"margin-top: 0px", "margin-right: 0px", "margin-left: 0px", "margin-bottom: 0px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: 100%"], ["alto", "height: 80%"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: block']],
                                "absorber": ["si"],
                                "crearNuevo": [''],
                                "borrar": [''] 
                            }},
                            
                    ]
let detenerOnclickModal = "no"                    

function traducirDiccionario(id){
    let codigoHTML = ""

    codigoHTML += retornarBotonDetenerOnclickModal()
    codigoHTML += retornarBotonDragAndDrop()

    for (llavePadre in diccionario) {
        for (llaveHija in diccionario[llavePadre]){
            let dicc = diccionario[llavePadre][llaveHija]
            if(llaveHija == "div"){
                codigoHTML = decidirAccionArmadoComponents(llaveHija, dicc, codigoHTML)
                //console.log(codigoHTML);
            } else {
                codigoHTML += decidirAccionArmadoComponents(llaveHija, dicc, codigoHTML)
                //console.log(codigoHTML);
            }  
        }
    }

    //console.log(codigoHTML);
    document.getElementById(id).innerHTML = codigoHTML
}

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
        //console.log(diccionario[0][llavePrincipal]);// el cero a futuro serà el id se cada seccion o componente

    }  
    //console.log(`${diccionario[0][llavePrincipal][llaveHija]}`);  
}

function decidirAccionArmadoComponents(llaveHija, dicc, codigoHTML){
    
    if(llaveHija == "div"){

        let concatenado = `id = "${dicc['id']}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))} style = "${quitarComasDeArreglo(unificarArreglos(dicc['style'], '; '))}"`
        return div(concatenado, codigoHTML,  dicc['absorber'])// pilas que en este el codigo inyectable anterior ya proviene junto con la funcion "div"
        //console.log(codigoInyectable);
    
    } else if(llaveHija == "img"){
        
        return imagen(dicc['link'], quitarComasDeArreglo(unificarArreglos(dicc['style'], '; ')), quitarComasDeArreglo(dicc['class']), quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id'])), dicc['id'])
    
    } else if(llaveHija == "video"){
        
        let concatenado = `id = "${dicc['id']}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))}  style = "${quitarComasDeArreglo(unificarArreglos(dicc['style'], '; '))}"`
        return video(concatenado, dicc['link'])
    
    } else if(llaveHija == "espacio"){

        return espacio(dicc['espacios'])

    } else if(llaveHija == "text"){
        
        let concatenado = `id = "${dicc['id']}" style = "${quitarComasDeArreglo(unificarArreglos(dicc['style'], '; '))}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))}`
        return texto(dicc['tipo'], concatenado, dicc['texto'], `${separarPalabra(dicc['style'][5], 'color letra')[1]}; ${separarPalabra(dicc['style'][6], 'fondo')[1]};`, `${quitarComasDeArreglo(agregarEventos(dicc['eventos'], dicc['id']))}`, `${dicc['id']}`)
        
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
                    colorFondoUSuario = separarPalabra(colorFondoUSuario, ':')[1]
                    colorLetraUsuario = separarPalabra(colorLetraUsuario, ':')[1]
                    
                    if(Object.keys(diccionario[i]) == 'div'){
                        colorFondoPaso = 'rgba(173, 33, 173, 0.5)'
                        colorLetraPaso = 'rgba(173, 33, 173, 0.5)'
                    } else if(Object.keys(diccionario[i]) == 'text'){
                        colorFondoPaso = 'rgba(33, 141, 173, 0.9)'
                        colorLetraPaso = 'rgba(255, 255, 255, 0.9)'
                    } else if(Object.keys(diccionario[i]) == 'img'){
                        colorFondoPaso = 'rgba(77, 173, 33, 0.9)'
                        colorLetraPaso = 'rgba(77, 173, 33, 0.9)'
                    } else if(Object.keys(diccionario[i]) == 'video'){
                        colorFondoPaso = 'rgba(221, 224, 11, 0.9)'
                        colorLetraPaso = 'rgba(221, 224, 11, 0.9)'
                    }
                }
            }
        }

        onclick += `modalAtributos(${acc}${id}${acc})/`
        
        onmouseover += `cambiarColor(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorFondoPaso}${acc})/
                        cambiarColorLetra(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorLetraPaso}${acc})/`

        onmouseout  += `cambiarColor(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorFondoUSuario}${acc})/
                        cambiarColorLetra(${acc}${id}${acc},  ${acc}1${acc}, ${acc}${colorLetraUsuario}${acc})/`

        estadoOnClick = 'usar', estadoOnMouseOver = 'usar', estadoOnMouseOut = 'usar'
    }

    for (let u = 0; u < arr.length; u++) {
        for (let e = 1; e < arr[u].length; e++) { // la posicion 0 de la e siempre serà para los eventos inyectados para edicion
                        
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
    let arreglo =  eval(ruta) //diccionario[1].text.texto
    
    let arre = []
    console.log(`text: ${text}`);
    if(text == 'texto'){
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
    //console.log(diccionario);
    traducirDiccionario('porAhora')
    modalAtributos(idPadre)
    idElementoEnUso = arr[2]
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
    if(arr[2] == 'texto'){
        contenido = `['', '', '']`
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



