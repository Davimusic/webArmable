let mirar = ["`img1`", "`texto`", "`hijo`", "`video`", "`padreXD`", "`texto2`"]
let arrAccEventos = []
let acc = "`"
let diccionario =  [   // todo objeto se le debe inyectar el  `eventoUnico(this.id, 'modalAtributos(${mirar[0]})')` para poder ser operado en el modal en la posicion 0
                            {"img": {
                                "id": [`img1`],
                                "link": ["https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png"],
                                "style": ["cursor: pointer;", "height: 100px;", "width: 100px;"],
                                "class": ["prueba"],
                                "eventos": [[`modalAtributos(${mirar[0]})`], [``], [``]],
                                "animacion": [""]//pilas con el id, se le agrega un espacio de mas
                            }},
                            {"text": {
                                "id": ["texto"],
                                "texto": ["Lorem ipsum dolor sit amet."],
                                "style": ["cursor: pointer;", "padding: 2%;", "border-radius: 0.5em;", "color: white;"],
                                "class": [""],
                                "eventos": [[`modalAtributos(${mirar[1]})`], [``], [``]],
                                "animacion": [""],
                                "tipo": [`h1`]
                            }},
                            {"div":{
                                "id": ["hijo"], 
                                "class": [""],
                                "eventos": [[`modalAtributos(${mirar[2]})`], [``], [``]],
                                "style": ["cursor: pointer;", "background: #17555571;", "border-radius: 0.5em;", "padding: 2%;", "height: min-content;", "width: 96%;"],
                                "animacion": [``],
                                "absorber": ["si"] 
                            }},
                            {"espacio":{
                                "id": ["espacio1"], //lo puse de prueba
                                "espacios": ["2"]
                            }},
                            {"text": {
                                "id": ["texto2"],
                                "texto": ["texto 2......w.w.w.w.w"],
                                "style": ["cursor: pointer;", "padding: 2%;", "border-radius: 0.5em;", "color: white;"],
                                "class": [""],
                                "eventos": [[`modalAtributos(${mirar[5]})`], [``], [``]],
                                "animacion": [""],
                                "tipo": [`h1`]
                            }},
                            {"video": {
                                "id": ["video"],
                                "style": ["border-radius: 0.5em;", "height: 200px;", "width: 200px;"],
                                "class": [""],
                                "eventos": [[`modalAtributos(${mirar[3]})`], [``], [``]],
                                "animacion": [""],
                                "link": ["https://res.cloudinary.com/dplncudbq/video/upload/v1657988513/mias/y1_b0pxvc.mp4"]
                            }},
                            {"div":{
                                "id": ["padreXD"], 
                                "class": [""],
                                "eventos": [[`modalAtributos(${mirar[4]})`], [``], [``]],
                                "style": ["cursor: pointer;", "background: #17555571;", "border-radius: 0.5em;", "padding: 2%;", "height: min-content;", "width: 96%;"],
                                "animacion": [``],
                                "absorber": ["si"] 
                            }},
                            
                    ]

function traducirDiccionario(id){
    let codigoHTML = ""

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

        let concatenado = `id = "${dicc['id']}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos']))} style = "${quitarComasDeArreglo(dicc['style'])}" ${dicc['animacion']}`
        return div(concatenado, codigoHTML,  dicc['absorber'])// pilas que en este el codigo inyectable anterior ya proviene junto con la funcion "div"
        //console.log(codigoInyectable);
    
    } else if(llaveHija == "img"){
        
        return imagen(dicc['link'], quitarComasDeArreglo(dicc['style']), quitarComasDeArreglo(dicc['class']), quitarComasDeArreglo(agregarEventos(dicc['eventos'])), dicc['id'], dicc['animacion'])
    
    } else if(llaveHija == "video"){
        
        let concatenado = `id = "${dicc['id']}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos']))}  style = "${quitarComasDeArreglo(quitarComasDeArreglo(dicc['style']))}" ${dicc['animacion']}`
        return video(concatenado, dicc['link'])
    
    } else if(llaveHija == "espacio"){

        return espacio(dicc['espacios'])

    } else if(llaveHija == "text"){
        
        let concatenado = `id = "${dicc['id']}" style = "${quitarComasDeArreglo(dicc['style'])}" class = "${quitarComasDeArreglo(dicc['class'])}" ${quitarComasDeArreglo(agregarEventos(dicc['eventos']))} ${dicc['animacion']}`
        return texto(dicc['tipo'], concatenado, quitarComasDeArreglo(dicc['texto']))
        
    }
}

function agregarEventos(arr){
    console.log(arr);
    let onclick =  `onclick="eventoUnico(this.id, '`, onmouseover = `onmouseover="`, onmouseout = `onmouseout="`;
    let estadoOnClick = 'borrar',  estadoOnMouseOver = 'borrar', estadoOnMouseOut = 'borrar'; 
    for (let u = 0; u < arr.length; u++) {
        for (let e = 0; e < arr[u].length; e++) {
            if(u == 0){
                onclick += `${arr[u][e]}-`
            } else if(u == 1){
                if(arr[u][e] != ''){
                    onmouseover += `${arr[u][e]}-`
                    estadoOnMouseOver = 'usar'
                } 
                
            } else if(u == 2){
                if(arr[u][e] != ''){
                    onmouseout += `${arr[u][e]}-`
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
    if(estadoOnMouseOver == 'borrar'){
        onmouseover = ''
    }
    if(estadoOnMouseOut == 'borrar'){
        onmouseout = ''
    }
    let text = `${onmouseover} ${onmouseout} ${onclick}`
    return text
}

function removerUltimoCaracter(texto){
    let text = ''
    for (let u = 0; u < (texto.length - 1); u++) {
        text += texto[u]
    }
    return text
}

function retornarSelects(id, arr, evento, opcionActual){
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

function retornarInput(opcionActual, id){
    let cod = ''
    //if(opcionActual != ''){
        cod = `<input oninput="actualizarDicc(this.id, this.value)" style="border-radius:0.5em; border:none; width: 100%; height: 20px; margin-top: 15px; margin-right: 15px;" type="text" name="" value="${opcionActual}" id="${id}">`
    //} 
    return cod;
}

function retornarBotonBorrar(id, i, nombreDicPadre, opcionActual){
    let cod = ''
    //if(opcionActual != ''){
        cod = ` <div style="display: flex; justify-content: space-between;">
                    <img  style="border-radius: 50%; width: 50px; height: 50px; cursor:pointer;" onclick="borrarItem(${id}, ${i}, ${nombreDicPadre})" src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597775/borrar_yw19rd.png">
                </div>`
    //}
    return cod;            
}

function borrarItem(id, codItem, idPadre){
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
    
    console.log(`ruta: ${ruta}, id: ${id}, codItem: ${codItem}, Idpadre: ${idPadre}, arr: ${arr}`);
    let arreglo =  eval(ruta) //diccionario[1].text.texto
    console.log(arreglo);

    let arre = []
    for (let u = 0; u < arreglo.length; u++) {
        if(u != coordenada){
            arre.push(`'${arreglo[u]}'`)
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
    
    eval(`${ruta}.push('')`)
    traducirDiccionario('porAhora')
    modalAtributos(idPadre)
    idElementoEnUso = arr[2]
    setTimeout(reubicar, 1000)
}

function reubicar(){
    console.log(idElementoEnUso);
    let miObj = document.getElementById(idElementoEnUso);
    miObj.style.paddingTop = "100px";
    location.hash = `#`
    location.hash = `#${idElementoEnUso}`//"#eventos"
    idElementoEnUso = ''
}

function retornarArregloConRangoNumerico(minimo, maximo, incremento){
    let arr = []
    for (let u = minimo; u <= maximo; u += incremento) {
        arr.push(u)
    }
    return arr
}


//'nombre': 'color'     ${diccTra[u]} { 
let arrNombre = ['color', 'girar90']    
let diccClasesPropias = 
    [{'duracion': '2s', 'colorDeFondo': 'blue', 'despues': {'colorDeFondo':'green', 'colorDeLetra': 'white'}}, {'duracion': '3s', 'girar1': 'rotate(0deg)', 'despues':{'girar2': 'rotate(90deg)'}}]
let diccTra =  [{'duracion': 'transition', 'colorDeFondo': 'background', 'colorDeLetra': 'color', 'despues': ':hover', 'girar1':'transform', 'girar2':'transform'}]  

let cod = ''

let bandera = 0
for (let e = 0; e < arrNombre.length; e++){
    cod += ` .${arrNombre[e]}{ `
    for (let u in diccClasesPropias[e]) {
        if(typeof(diccClasesPropias[e][u]) != 'string'){
            for (let i in diccClasesPropias[e][u]) {
                if(bandera == 0){
                    bandera = 1;
                    cod += `} .${arrNombre[e]}${diccTra[0]['despues']} {`
                }
                cod += ` ${diccTra[0][i]}: ${diccClasesPropias[e][u][i]}; `
            }
        } else {
            cod += `${diccTra[0][u]}: ${diccClasesPropias[e][u]}; `
        }
    }
    bandera = 0
    cod += `}`
}

console.log(cod);

let style = document.createElement('style')
style.innerHTML = cod
document.head.appendChild(style);





/**console.log(Object.keys(arreDiccClasesPropias[u]).length);
    for (i in arreDiccClasesPropias[u]) {
        console.log(arreDiccClasesPropias[u][i]);
    } */