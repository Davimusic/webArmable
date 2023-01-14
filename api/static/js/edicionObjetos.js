let arrClases = [' ', 'opcionSeleccionable ', 'sombra ', 'anchoMinimo ', 'anchoMaximo ', 'alturaMinina ', 'alturaMaxima ', 'mi ', 'efectoResaltar ', 'organizarPorFilas ', 'organizarPorColumnas ', 'color ', 'girar90 ']
let arrEventos = [' ', `rotar`, `cambiarColor`, `opacidad`, `desplazar`, `cambiarTamano`]
let idElementoEnUso = ''

function modalAtributos(bloqueID){
    let llavePrincipal = buscarBloque(bloqueID)
    actualizarBloqueEnUso(bloqueID)

    let tipo = "", arrTitulos = [], arrContenidos = []

    let u = 0;
    for (tipoAUsar in diccionario[llavePrincipal]) {
        tipo = tipoAUsar
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
                    <div style="max-height: 400px; overflow-y: auto; padding-right: 1%; padding-left: 1%; padding-bottom: 1%; border-radius: 0.5em; background: #1e7070; color:white;">
                        <div style="position: sticky; top: 0; z-index: 1; padding-top:1%; background: #1e7070; display:flex; justify-content: space-between;">
                            <h3>${arrTitulos[u]}</h3>`
                        if(arrTitulos[u] != 'eventos'){
                            codArre += `
                            <img  style="border-radius: 50%; width: 50px; height: 50px;" onclick="crearItem(${idItem}, ${nombreDicPadre})"  src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597776/nuevo_dwrcbu.png">`
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

function decidirAccionDetallaOpciones(opcionActual, text, id, idItem, i, nombreDicPadre ){
    let cod = ''
    if(text == 'class'){
        cod += `${retornarSelects(id, arrClases, 'onchange="actualizarDicc(this.id, this.value)"', opcionActual)}
                ${retornarBotonBorrar(`'${id}'`, i, nombreDicPadre, opcionActual)}`
    } else {
        if(text == 'eventos'){
            //console.log(opcionActual);
        let diccEventos = {'0': 'click', '1': 'pasar el mouse', '2': 'sacar el mouse'}   
        let arr = crearArreglo(id, '$') 
        cod += `<div style = 'display:block; width: 100%;'>
                    <h3>${diccEventos[arr[3]]}</h3>
                    ${retornarOpcionesEventos(id, nombreDicPadre, i)}`
            for (let u = 0; u < opcionActual.length; u++) {
                let idEventos = `${id}$${u}`, idEventosBorrar = "`" + idEventos + "`"
                if(i != 0 && u != 0  || u != 0){ // no deja mostrar la primera posicion del arreglo eventos click porque este es inyectado para poder usar el modal
                    cod += `<div style='display: flex;'>
                                ${retornarInput(opcionActual[u], idEventos)}
                                ${retornarBotonBorrar(`${idEventosBorrar}`, i, nombreDicPadre, opcionActual)}
                            </div>`
                }
            }
        cod += `</div>`    

        } else {
            cod += retornarInput(opcionActual, id)
            cod += retornarBotonBorrar(`'${id}'`, i, nombreDicPadre, opcionActual)
        }
    }
    return cod
}

function retornarOpcionesEventos(id, nombreDicPadre, i){
    let idOpciones = `opcionesEvento${id}${i}`
    let idSelectPadreEventos = `padreSelectEventos${id}$${i}`
    let evento = `onchange="actualizarRequerimintosEventos('${idOpciones}', this.value, ${nombreDicPadre}, '${id}', ${i}, '${idSelectPadreEventos}')"`
    let cod = `
    <div style='display: flex; flex-wrap: wrap; height: fit-content; margin: 2%; justify-content: space-around;'>
        ${retornarSelects(idSelectPadreEventos, arrEventos, evento )}
        <div id='${idOpciones}' style='border-radius:0.5em; width: fit-content; height: fit-content; background: gray;'></div>
    </div>`
    return cod    
}

function actualizarRequerimintosEventos(idOpciones, evento, nombreDicPadre, id, i, idSelectPadreEventos){
    arrAccEventos = []
    let cod = ``, diccArr = {}, diccLabel = {}, diccOp = {}

    if(evento == 'rotar'){
        
        diccArr = {0: retornarArregloConRangoNumerico(0, 10, 1), 1: retornarArregloConRangoNumerico(-360, 360, 20)}
        diccLabel = {0: 'segundos', 1: 'grados'}
        diccOp = {0: 2, 1: 40}
        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, '')

    } else if(evento == 'cambiarColor'){
        
        diccArr = {0: retornarArregloConRangoNumerico(1, 10, 1)}
        diccLabel = {0: 'segundos', 1: 'color'}
        diccOp = {0: 2}
        codigoAdicional = `<div style='display: block; margin: 10px; justify-content: space-around;'>
                                <h3>Color</h3>
                                <input id='op1$${i}' type="color">
                            </div>`
        cod += retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, codigoAdicional)
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
    document.getElementById(idOpciones).innerHTML = cod
}

function retornarOpcionesDetalladasEventos(diccArr, diccLabel, diccOp, i, codigoAdicional){
    let cod = ''
    cod += `<div style='display: flex; justify-content: space-around;'>`
        for (u in diccArr) {
            cod += `<div style='display: block; margin: 10px; justify-content: space-around;'>
                        <h3>${diccLabel[u]}</h3>
                        ${retornarSelects(`op${u}$${i}`, diccArr[u],  '', diccOp[u])}
                    </div>`
        }
    cod += codigoAdicional    
    cod += `    <img  style="border-radius: 50%; width: 50px; height: 50px;" onclick="crearNuevoEvento()"  src="https://res.cloudinary.com/dplncudbq/image/upload/v1669597776/nuevo_dwrcbu.png">
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
    //console.log(atributos);
    
    let event = `${animacion}(${acc}${nombreDicPadre}${acc}, ${atributos})`
    console.log(event);
    crearItem(id, nombreDicPadre)
    actualizarDicc(`${id}$${idU}`, event)
    modalAtributos(nombreDicPadre)
    arrAccEventos = []
    console.log(arrAccEventos);
}