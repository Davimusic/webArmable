let idElementoEnUso = '', arrLinks = [], referenciaColorPaso = 'color'

function modalAtributos(bloqueID){
    let llavePrincipal = buscarBloque(bloqueID)
    let tipo = "", arrTitulos = [], arrContenidos = []
    let diccTipos = {'img': 'imagen', 'text': 'texto', 'div': 'contendor', 'espacio': 'espacio', 'video': 'video'}

    let u = 0;
    for (tipoAUsar in diccionario[llavePrincipal]) {
        tipo = tipoAUsar
        actualizarBloqueEnUso(`${diccTipos[tipo]} con id ùnico ${bloqueID}`)
        for (tituloContenido in diccionario[llavePrincipal][tipoAUsar]) {
            arrTitulos.push(tituloContenido)
            arrContenidos.push([])
            for(contenidoFinal in diccionario[llavePrincipal][tipoAUsar][tituloContenido]){
                arrContenidos[u].push(diccionario[llavePrincipal][tipoAUsar][tituloContenido][contenidoFinal])
            }
            u += 1;
        }
    }

    
    let codArre = ``
    codArre += `
    <div style="margin: 2%; display:block; justify-content: space-between;"> 
            <div style="display:block;">`
        for (let u = 0; u < arrTitulos.length; u++) {

                let acc = "`", id= `${llavePrincipal}$${tipo}$${arrTitulos[u]}`, idItem = `${acc}${id}${acc}`, nombreDicPadre = `'${arrContenidos[0][0]}'`
                if(arrTitulos[u] != 'id'){// no me deja mostrar el ID ya que no tiene lògica que lo modifique 
                    codArre += `
                    <div id=${arrTitulos[u]}></div>
                    <div style="max-height: 300px; overflow-y: auto; padding-right: 1%; padding-left: 1%; padding-bottom: 1%; border-radius: 0.5em; background: #1e7070; color:white;">
                        <div style="position: sticky; top: 0; z-index: 1; padding-top:1%; background: #1e7070; display:flex; justify-content: space-between;">
                            <h3>${arrTitulos[u]}</h3>`
                        if(arrTitulos[u] != 'tipo' && arrTitulos[u] != 'eventos' && arrTitulos[u] != 'style' && arrTitulos[u] != 'crearNuevo'){
                            codArre += `
                            <img class='opcionSeleccionable' style="border-radius: 50%; width: 50px; height: 50px;" onclick="crearItem(${idItem}, ${nombreDicPadre})"  src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597776/nuevo_dwrcbu.png">`
                        }
                    codArre += `
                        </div>`
                    //console.log(arrTitulos);
                    //console.log(arrContenidos);
                    for (let i = 0; i < arrContenidos[u].length; i++) {
                        //console.log(arrContenidos[u][i]);
                        //console.log(arrContenidos[u]);
                        id= `${llavePrincipal}$${tipo}$${arrTitulos[u]}$${i}`
                        codArre += `
                        <div style="display:flex; justify-content: space-between; padding: 0.5%; border-radius: 0.5em; width:90%; background: #17555571;" id="contenido${id}">
                            ${decidirAccionDetallaOpciones(arrContenidos[u][i], arrTitulos[u], id, idItem, i, nombreDicPadre)}
                        </div>
                        <br>`
                    }
                    codArre += `
                    </div>
                    <br>`
                }
        }
		codArre += `
            </div>`
        codArre +=`
    </div>`
    //console.log(revisarModalCod());
    ActivarModal(codArre)
}

function decidirAccionDetallaOpciones(opcionActual, text, id, idItem, i, nombreDicPadre){
    //console.log(`entra ` + text);
    let arrClases = [' ', 'opcionSeleccionable ', 'sombra ', 'anchoMinimo ', 'anchoMaximo ', 'alturaMinina ', 'alturaMaxima ', 'mi ', 'efectoResaltar ', 'organizarPorFilas ', 'organizarPorColumnas ', 'color ', 'girar90 ', 'centrar ', 'espacioEquilatero ']
    let arrTipos = ['p', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7' ]
    let arrDisplay = ['flex', 'block']
    let arrTexto = [' ', 'negrita', 'hiperLink']
    let arrOpcionConRelativo = ['pixeles', 'porcentajes', 'relativo']
    let arrOpcionSinRelativo = ['pixeles', 'porcentajes']
    let arreObjetosCreables = ['', 'contenedor', 'imagen', 'texto', 'video']
        
    let cod = ''
    if(text == 'class'){

        cod += `${retornarSelects(id, arrClases, 'onchange="actualizarDicc(this.id, this.value)"', opcionActual)}
                ${retornarBotonBorrar(`'${id}'`, i, nombreDicPadre, opcionActual)}`

    } else if(text == 'eventos'){
        
        let diccEventos = {'0': 'click', '1': 'pasar el mouse', '2': 'sacar el mouse'}   
        let arr = crearArreglo(id, '$') 
        //console.log(`diccEventos[arr[3]]: ${diccEventos[arr[3]]},\n opcionActual: ${opcionActual}`)
        cod += `<div style = 'display:block; width: 100%;'>
                    <h3>${diccEventos[arr[3]]}</h3>`
            for (let u = 0; u < opcionActual.length; u++) {
                if(u == 0){
                    cod += `${retornarOpcionesEventos(id, nombreDicPadre, i, u, diccEventos[arr[3]])}`
                }
                
                let idEventos = `${id}$${u}`, idEventosBorrar = "`" + idEventos + "`"
                if(i != 0 && u != 0  || u != 0){ // no deja mostrar la primera posicion del arreglo eventos click porque este es inyectado para poder usar el modal
                    cod += `<div style='display: flex;'>
                                ${retornarInput(opcionActual[u], idEventos)}
                                ${retornarBotonBorrar(`${idEventosBorrar}`, i, nombreDicPadre, opcionActual)}
                            </div>`
                }
            }
        cod += `</div>`    
        
    } else if(text == 'tipo') {
            
        cod += `${retornarSelects(id, arrTipos, 'onchange="actualizarDicc(this.id, this.value)"', opcionActual)}`
           // ${retornarBotonBorrar(`'${id}'`, i, nombreDicPadre, opcionActual)}

    } else if(text == 'style') {
        
        //cod += `<div style='display: flex; flex-wrap: wrap; justify-content: space-between;'>`
        //console.log(`estilos: opcionActual: ${opcionActual}, largo: ${opcionActual. length}`);
        for (let u = 0; u < opcionActual.length; u++) {
            if(u == 0){
            cod += `<h3>${opcionActual[0]}</h3>`
            } else {
                let palabras = separarPalabra(opcionActual[u], ':'), acc = "`"
                
                cod += `<div style='display: block;'>
                            <h4>${palabras[0]}</h4>`

                if(opcionActual[0] == 'margen' || opcionActual[0] == 'relleno'){

                    cod +=  `${retornarSelects(`${id}$filtarPaso`, arrOpcionSinRelativo, `onchange="actualizarSelect(${acc}${id}$${u}${acc}, this.value, ${acc}${palabras[0]}${acc})"`, retornarValorSelectStyle(palabras[1]))}
                            ${retornarSelects(`${id}$${u}`, retornarArregloSelectStyle(retornarValorSelectStyle(palabras[1])), `onchange="actualizarDicc(this.id, ${acc}${palabras[0]}${acc} + this.value)"`, palabras[1])}`
                
                } else if(opcionActual[0] == 'ancho'|| opcionActual[0] == 'alto'){
                    
                    cod +=  `${retornarSelects(`${id}$filtarPaso`, arrOpcionConRelativo, `onchange="actualizarSelect(${acc}${id}$${u}${acc}, this.value, ${acc}${palabras[0]}${acc})"`, retornarValorSelectStyle(palabras[1]))}
                            ${retornarSelects(`${id}$${u}`, retornarArregloSelectStyle(retornarValorSelectStyle(palabras[1])), `onchange="actualizarDicc(this.id, ${acc}${palabras[0]}${acc} + this.value)"`, palabras[1])}`
                
                } else if(opcionActual[0] == 'radio de borde'){
                    
                    cod += `${retornarSelects(`${id}$${u}`, retornarArregloConRangoNumerico(0, 1, 0.1, 'em'), `onchange="actualizarDicc(this.id, ${acc}${palabras[0]}${acc} + this.value)"`, palabras[1])}`
                
                } else if(opcionActual[0] == 'color letra'  || opcionActual[0] == 'fondo'){
                    
                    if(opcionActual[0] == 'fondo'){
                    cod += `${retornarSelects(`opcionesFondo${i}`, ['color', 'imagen'], `onchange= "actualizarOpcionFondo(this.value, ${u}, ${i})"`, 'color')}`    
                    }
                    let infColor = RgbaToHex(palabras[1])
                    cod += `<div id='contendorColor${u}${i}'>
                            <input class='inputColor' style='border-radius: 0.7em; border: none;' id='${id}$${u}$color' value='${infColor[0]}' type='color'>
                            <input class='inputRange' type="range" style="background: none;" id='${id}$${u}$transparencia' value='${infColor[1] * 10}' name="transparencia" min="0" max="10">
                            <img style="border-radius: 50%; width: 50px; height: 50px;" onclick="actualizarColor('${id}$${u}' , '${id}$${u}$color', '${id}$${u}$transparencia', '${palabras[0]}', '${i}', '${opcionActual[0]}')" src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597776/nuevo_dwrcbu.png">
                            </div>
                            <div id='contendorImagen${u}${i}'>
                            <input oninput="actualizarColor('${id}$${u}' , '${id}$${u}$color', '${id}$${u}$transparencia', '${palabras[0]}', '${i}', '${opcionActual[0]}')" style="border-radius:0.5em; border:none; width: 100%; height: 20px; margin-top: 15px; margin-right: 15px;" type="text" name="" placeholder='link de la imagen' value="" id="inputcontendorImagen${u}${i}">
                            </div>`
                } else if(opcionActual[0] == 'mostrar en modo'){
                    cod += `${retornarSelects(`${id}$${u}`, arrDisplay, `onchange="actualizarDicc(this.id, ${acc}${palabras[0]}${acc} + this.value)"`, palabras[1])}`
                }   
                
                cod += `</div>`        
            }
        }
        //cod += '</div>'
            
    } else if(text == 'texto'){
        //console.log(`texto, opcionActual: ${opcionActual}`);
        for (let u = 0; u < opcionActual.length; u++) {
            if(u == 0){
                console.log(`desde texto, opcionActual: ${opcionActual}, text: ${text}, id: ${id}, idItem: ${idItem}, i: ${i}, nombreDicPadre: ${nombreDicPadre}`);
                
                cod += retornarTextArea(agregarSaltosDeLinea(opcionActual[0], 'º', '\n'), `${id}$0`, i)
                cod += `<div style='margin-left: 3%; display: block;'>
                            <h4>Acciòn adicional</h4>`
                cod += `    ${retornarSelects(`${id}$1`, arrTexto, `onchange="actualizarDicc(this.id, this.value), activarInput('${`${id}$2`}', 'ingrese el link a usar', this.value)"`, opcionActual[1])}
                        </div>`
                cod += retornarInput('', `${id}$2`, 'esconder')
                cod += retornarBotonBorrar(`'${id}'`, i, nombreDicPadre, opcionActual, `'${text}'`)  
                arrLinks.push(`${id}`)    
            }
        }
                
    } else if(text == 'crearNuevo'){

        cod += `${retornarSelects(id, arreObjetosCreables, 'onchange="crearNuevoObjeto(this.id, this.value)"', opcionActual)}`

    } else if(text == 'borrar'){

        cod += `<img  style="border-radius: 50%; width: 50px; height: 50px; cursor:pointer;" onclick="borrarObjeto('${id}')" src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597775/borrar_yw19rd.png">`
    
    } else {
        cod += retornarInput(opcionActual, id)
        cod += retornarBotonBorrar(`'${id}'`, i, nombreDicPadre, opcionActual)
    }
    return cod
}

function actualizarOpcionFondo(valor, u, i){
    console.log(`actualizarOpcionFondo, valor: ${valor}, u: ${u}, i: ${i}`);
    let con = document.getElementById(`contendorColor${u}${i}`)
    if(valor == 'imagen'){
        referenciaColorPaso = 'imagen'
        con.style.display = 'none'
    } else {
        referenciaColorPaso = 'color'
        con.style.display = 'flex'
    }
}

function borrarObjeto(id){
    if(diccionario.length <= 1){
        alert('unico objeto disponible, no es posible borrarlo, debe haber minimo un existente!!!')
    } else {
        let arr = crearArreglo(id, '$')
        //alert(arr)
        let arrPaso = []
        for( i in diccionario){
            //console.log(diccionario[i]);
            if(i != arr[0]){
                arrPaso.push(diccionario[i])
            }
            
        }
        
        console.log(arrPaso);
        diccionario = arrPaso
        console.log(diccionario);
        traducirDiccionario('porAhora')
        desactivarModal()
        console.log(`borrarObjeto: diccionario:`);
        console.log(diccionario);
        avisoCorto(`se elminò el objeto con exito `)
    }
}

function crearNuevoObjeto(id, valor){
    if(valor != ''){
        console.log(diccionario);
        console.log(`crearNuevoObjeto, id: ${id}, valor: ${valor}`);
        let existente = 'no', incremento = 0, idPaso = ''

        while(existente == 'no'){
            idPaso = `${valor}${incremento}`
            console.log(`bucle, idPaso: ${idPaso}`);
            
            for(u in diccionario){
                for(i in diccionario[u]){
                    if(diccionario[u][i]['id'] == idPaso){
                        existente = 'si'
                    }
                }
            }

            if(existente == 'no'){
                break
            } else {
                existente = 'no'
            }
            incremento += 1
        }
        
        let cod = ''
        if(valor == 'imagen'){
            cod = {"img": {
                "id": [`${idPaso}`],
                "link": ["https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png"],
                "style": [['margen',"margin-top: 20px", "margin-right: 20px", "margin-left: 20px", "margin-bottom: 20px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: 150px"], ["alto", "height: 25%"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 1)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: flex']],
                "class": ["prueba"],
                "eventos": [[''], [''], ['']],
                "borrar": [''] 
            }}
        } else if(valor == 'texto'){
            cod = {"text": {
                "id": [`${idPaso}`],
                "texto": [["Lorem ipsum dolor sit amet.", "", ""]],
                "style": [['margen',"margin-top: 20px", "margin-right: 20px", "margin-left: 20px", "margin-bottom: 20px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: fit-content"], ["alto", "height: 50%"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: block']],
                "class": [""],
                "eventos": [[''], [''], ['']],
                "tipo": [`h1`],
                "borrar": [''] 
            }}
        } else if(valor == 'contenedor'){
            cod = {"div":{
                "id": [`${idPaso}`], 
                "crearNuevo": [''],
                "class": ["centrar ", 'organizarPorFilas '],
                "eventos": [[''], [''], ['']],
                "style": [['margen',"margin-top: 0px", "margin-right: 0px", "margin-left: 0px", "margin-bottom: 0px"], ['relleno',"padding-top: 20px", "padding-right: 20px", "padding-left: 20px", "padding-bottom: 20px"],  ["ancho", "width: 100%"], ["alto", "height: 80%"], ['radio de borde',"border-top-left-radius: 0em", "border-top-right-radius: 0em", "border-bottom-left-radius: 0em", "border-bottom-right-radius: 0em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(107, 107, 107, 1)'], ['mostrar en modo', 'display: flex']],
                "absorber": ["si"],
                "borrar": [''] 
            }}
        } else if(valor == 'video'){
            cod = {"video": {
                "id": [`${idPaso}`],
                "style": [['margen',"margin-top: 20px", "margin-right: 20px", "margin-left: 20px", "margin-bottom: 20px"], ['relleno',"padding-top: 40px", "padding-right: 40px", "padding-left: 40px", "padding-bottom: 40px"],  ["ancho", "width: 200px"], ["alto", "height: 200px"], ['radio de borde',"border-top-left-radius: 0.7em", "border-top-right-radius: 0.7em", "border-bottom-left-radius: 0.7em", "border-bottom-right-radius: 0.7em"], ['color letra', 'color: rgba(22, 45, 162, 0.52)'], ['fondo', 'background: rgba(207, 207, 207, 1)'], ['mostrar en modo', 'display: flex']],
                "class": [""],
                "eventos": [[''], [''], ['']],
                "link": ["https://res.cloudinary.com/dplncudbq/video/upload/v1657988513/mias/y1_b0pxvc.mp4"],
                "borrar": [''] 
            }}
        }
        

        console.log(cod);  

        let arre = crearArreglo(id, '$')  
        let arr = []
        for( i in diccionario){
            console.log(diccionario[i]);
            console.log(arre[0]);
            if(i == arre[0]){
                arr.push(cod)
            }
            arr.push(diccionario[i])
        }
        
        diccionario = arr
        console.log(diccionario);
        traducirDiccionario('porAhora')
        console.log(diccionario);
        avisoCorto(`se creò un ${valor}`)
    }
}

function retornarArregloSelectStyle(tipo) {
    let arr = []
    if(tipo == 'pixeles'){
        arr = retornarArregloConRangoNumerico(0, 500, 20, 'px')
    } else if(tipo == 'porcentajes'){
        arr = retornarArregloConRangoNumerico(2, 100, 1, '%')
    } else if(tipo == 'relativo') {
        arr = ['min-content', 'max-content', 'fit-content']
    }
    return arr
}

function retornarValorSelectStyle(text){
    let sel = ''//['pixeles', 'porcentajes', 'relativo]
    if(text.indexOf('px') != -1){
        sel = 'pixeles'
    } else if(text.indexOf('%') != -1){
        sel = 'porcentajes'
    } else if(text.indexOf('min-content') != -1 || text.indexOf('max-content') != -1 || text.indexOf('fit-content') != -1){
        sel = 'relativo'
    }
    //console.log(`retornarValorSelectStyle: ${text.indexOf('px')}`)
    return sel
}

function actualizarColor(idDicc, idColor, idTransparencia, palabra, i, accion){
    let acc = "`"
    let transparencia = 0.1 * parseInt(document.getElementById(idTransparencia).value)
    let color = hexToRgba(document.getElementById(idColor).value, transparencia)

    if(referenciaColorPaso == 'color'){
        let coordenada = crearArreglo(idDicc, '$')[3], ref = ''
        if(coordenada == '5'){
            ref = 'color: '
        } else if(coordenada == '6'){
            ref = 'background: '
        }
        console.log(`ref: ${ref}, color: ${color}`);
        actualizarDicc(idDicc, ref + color)
    } else {
        let prueba = `background-image: url(${acc}https://res.cloudinary.com/dplncudbq/image/upload/v1658433646/mias/piano-5353974_1_gwmq3l.jpg${acc})`
        actualizarDicc(idDicc, prueba)
    }
}

function hexToRgba(hex, transparencia) {
    console.log(`hex: ${hex}`);
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${transparencia.toFixed(1)})`;
}

function RgbaToHex(rgba){
    let text = separarPalabra(rgba, '(')
    text = separarPalabra(text[1], '(')
    text = removerUltimoCaracter(text[0])
    //console.log(text);
    let valores = text.split(",");
    //console.log(`valores: ${valores}`);
    let r = parseInt(valores[0]).toString(16);
    let g = parseInt(valores[1]).toString(16);
    let b = parseInt(valores[2]).toString(16);
    let a = valores[3];
    let colorHex = "#" + r + g + b;
    return [colorHex, a]
}

function retornarOpcionesEventos(id, nombreDicPadre, i, u, titulo){
    let arrEventos = [' ', `rotar`, `cambiarColor`, `cambiarColorLetra`, `opacidad`, `desplazar`, `cambiarTamano`]
    let idRuta = ``// en prueba aùn
    if(titulo == 'click'){// porque la opcion cero es inyectada para editar
        idRuta = `${id}$${u+1}`
    } else {
        idRuta = `${id}$${u}`
    }
    let idSelectPadreEventos = `padreSelectEventos${id}$${i}`
    let evento = `onchange="actualizarRequerimintosEventos('${idRuta}', this.value, ${nombreDicPadre}, '${id}', ${i}, '${idSelectPadreEventos}')"`
    let cod = `
    <div style='display: flex; flex-wrap: wrap; height: fit-content; margin: 2%; justify-content: space-around;'>
        ${retornarSelects(idSelectPadreEventos, arrEventos, evento )}
        <div id='${idRuta}' style='display: flex; padding-right: 5%; padding-left: 5%; padding-top: 2%; border-radius:0.5em; width: fit-content; height: fit-content; background: #175555c5;'></div>
    </div>`
    return cod    
}

function actualizarRequerimintosEventos(idRuta, evento, nombreDicPadre, id, i, idSelectPadreEventos){
    
    arrAccEventos = []
    let cod = ``, diccArr = {}, diccLabel = {}, diccOp = {}

    if(evento == 'rotar'){
        
        diccArr = {0: retornarArregloConRangoNumerico(0, 10, 1), 1: retornarArregloConRangoNumerico(-360, 360, 20)}
        diccLabel = {0: 'segundos', 1: 'grados'}
        diccOp = {0: 2, 1: 40}
        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, '')

    } else if(evento == 'cambiarColor'){
        
        diccArr = {0: retornarArregloConRangoNumerico(1, 10, 1)}
        diccLabel = {0: 'segundos', 1: 'color', 2: 'opacidad'}
        diccOp = {0: 2}
        console.log(`actualizarRequerimintosEventos, idRuta: ${idRuta}, evento: ${evento}, nombreDicPadre: ${nombreDicPadre}, id: ${id}, i: ${i}, idSelectPadreEventos: ${idSelectPadreEventos}`);
        codigoAdicional = `<div style='display: block; margin: 10px; justify-content: space-around;'>
                                <h3>Color</h3>
                                <input class='inputColor' style='border-radius: 0.7em; border: none;' id='op1$${i}' value='' type='color'>
                            </div>
                            <div style='display: block; margin: 10px; justify-content: space-around;'>
                                <h3>Opacidad</h3>
                                <input class='inputRange' type="range" id='op2$${i}' value='' name="transparencia" min="0" max="10">
                            </div>`

        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, codigoAdicional)
        //cod += `<img  style="border-radius: 50%; width: 50px; height: 50px;" onclick="crearNuevoEvento()"  src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597776/nuevo_dwrcbu.png">`
    } else if(evento == 'cambiarColorLetra'){
        
        diccArr = {0: retornarArregloConRangoNumerico(1, 10, 1)}
        diccLabel = {0: 'segundos', 1: 'color', 2: 'opacidad'}
        diccOp = {0: 2}
        console.log(`actualizarRequerimintosEventos, idRuta: ${idRuta}, evento: ${evento}, nombreDicPadre: ${nombreDicPadre}, id: ${id}, i: ${i}, idSelectPadreEventos: ${idSelectPadreEventos}`);
        codigoAdicional = `<div style='display: block; margin: 10px; justify-content: space-around;'>
                                <h3>Color</h3>
                                <input class='inputColor' style='border-radius: 0.7em; border: none;' id='op1$${i}' value='' type='color'>
                            </div>
                            <div style='display: block; margin: 10px; justify-content: space-around;'>
                                <h3>Opacidad</h3>
                                <input class='inputRange' type="range" id='op2$${i}' value='' name="transparencia" min="0" max="10">
                            </div>`

        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, codigoAdicional)
        //cod += `<img  style="border-radius: 50%; width: 50px; height: 50px;" onclick="crearNuevoEvento()"  src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597776/nuevo_dwrcbu.png">`
    } else if(evento == 'opacidad'){

        diccArr = {0: retornarArregloConRangoNumerico(0, 10, 1), 1: retornarArregloConRangoNumerico(0, 1, 0.2)}
        diccLabel = {0: 'segundos', 1: 'grado opacidad'}
        diccOp = {0: 2, 1: 0.8}
        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, '')

    } else if(evento == 'desplazar'){

        diccArr = {0: retornarArregloConRangoNumerico(0, 10, 1), 1: retornarArregloConRangoNumerico(0, 200, 10), 2: retornarArregloConRangoNumerico(0, 200, 10)}
        diccLabel = {0: 'segundos', 1: 'rango x', 2:  'rango y'}
        diccOp = {0: 2, 1: 50, 2: 50}
        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, '')

    } else if(evento == 'cambiarTamano'){

        diccArr = {0: retornarArregloConRangoNumerico(0, 10, 1), 1: ['width', 'height'], 2: retornarArregloConRangoNumerico(20, 300, 10)}
        diccLabel = {0: 'segundos', 1: 'especificacion', 2:  'tamano'}
        diccOp = {0: 2, 1: 'width', 2: 50}
        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, '')

    }

    let arr = crearArreglo(id, '$')
    let idU = eval(`diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}].length`)
    arrAccEventos.push(id, nombreDicPadre, idU, i, Object.keys(diccLabel).length)
    console.log(arrAccEventos); 
    document.getElementById(idRuta).innerHTML = cod
}

function retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, codigoAdicional){
    let cod = '', acc = ''
    cod += `<div style='display: flex; justify-content: space-around;'>`
        for (u in diccArr) {
            cod += `<div style='display: block; margin: 10px; justify-content: space-around;'>
                        <h3>${diccLabel[u]}</h3>
                        ${retornarSelects(`op${u}$${i}`, diccArr[u],  '', diccOp[u])}
                    </div>`
        }
    cod += codigoAdicional 
    cod += `    <img class='opcionSeleccionable'  style="border-radius: 50%; width: 50px; height: 50px;" onclick="crearNuevoEvento()"  src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597776/nuevo_dwrcbu.png">
            </div>`    
    return cod    
}

function crearNuevoEvento(){
    let id = arrAccEventos[0]
    let nombreDicPadre = arrAccEventos[1]
    let idU = arrAccEventos[2]
    let i = arrAccEventos[3]
    let largoAtributos = arrAccEventos[4]
    console.log(arrAccEventos);
    console.log(`id: ${id}, nombreDicPadre: ${nombreDicPadre}, idU: ${idU}, i: ${i}`);

    let animacion = document.getElementById(`padreSelectEventos${id}$${i}`).value
    let atributos = ''
    let acc = "`"
    for (let u = 0; u < largoAtributos; u++) {
        atributos += ` ${acc}${document.getElementById(`op${u}$${i}`).value}${acc},`
    }
    atributos = removerUltimoCaracter(atributos)
    console.log(atributos);
    
    let event = `${animacion}(${acc}${nombreDicPadre}${acc}, ${atributos})`
    console.log(event);
    crearItem(id, nombreDicPadre)
    actualizarDicc(`${id}$${idU}`, event)
    modalAtributos(nombreDicPadre)
    arrAccEventos = []
    console.log(arrAccEventos);
}

function separarPalabra(palabra, referencia){
    let arr = [], text = ''
    for (let u = 0; u < palabra.length; u++) {
        if(palabra[u] != ' '){
            text += palabra[u]
        }
        
        if(palabra[u] == referencia){
            arr.push(text)
            text = ''
        } 
    }
    arr.push(text)
    //console.log(arr);
    return arr
}

function quitarSaltosDeLinea(text, id){
    console.log(`quitarSaltosDeLinea, text: ${text}, id: ${id} `);
    actualizarDicc(id, text.replace(/\n/g, "º"))
    ///document.getElementById(id).value = text.replace(/\n/g, "º")
}

function agregarSaltosDeLinea(text, buscar, cambiar){
    //console.log(`agregarSaltosDeLinea, ingresa: ${text}, buscar: ${buscar}, cambiar: ${cambiar}`)
    return text.replace(/\º/g, cambiar)  
}

function activarInput(id, placeHolder, valor, contenido){
    console.log(`id: ${id}`);
    let obj = document.getElementById(id)
    if(valor == 'hiperLink'){
        obj.style.display = 'flex';
        obj.placeholder= placeHolder;
        if(contenido != undefined){
            obj.value = contenido
        }
    } else {
        obj.style.display = 'none';
    }
}

function activarInputs(){
    //console.log(arrLinks);
    for (let u = 0; u < arrLinks.length; u++) {
        //let id = `${arrLinks[u]}$1`
        let arr = crearArreglo(`${arrLinks[u]}$1`, '$')
        //console.log(arr);
        ruta = `diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}]`
        //console.log(`ruta: ${ruta}`);
        let opcion = eval(`${ruta}`)
        //console.log(opcion);
        if(opcion[1] == 'hiperLink'){
            activarInput(`${arrLinks[u]}$${2}`,'','hiperLink', `${opcion[2]}`)
        }
    }
    arrLinks = []
}
