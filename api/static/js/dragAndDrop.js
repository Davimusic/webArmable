function retornarPosicionDiccionario(id){
    let numId = 0
    for(u in diccionario){
        for(i in diccionario[u]){
            if(diccionario[u][i]['id'] == id){
                numId = u
            }
        }
    }
    return numId
}

let dragAndDropEnUso = 'no'
function accionDagAndDrop(){
    console.log(`dragAndDropEnUso`);
    console.log(dragAndDropEnUso);
    console.log(`dicc`);
    console.log(diccionario);
    if(dragAndDropEnUso == 'no'){
        dragAndDropEnUso = 'si'
        //alert('acti')
        textoBotonEdicion = 'modo edicion detenido', colorBotonEdicion = 'red', detenerOnclickModal = 'si'
        traducirDiccionario('porAhora')
        actBotonEditar()
        renderizarDicc()
        let arrColores = ['rgba(173, 33, 173, 0.5)', 'rgba(214, 15, 214, 0.5)'], num = 0
        for(u in diccionario){
            for(i in diccionario[u]){
                if(i == 'div'){
                    let id = diccionario[u][i]['id'][0]
                    document.getElementById(id).style.background = arrColores[num]
                    if(num == (arrColores.length - 1)){
                        num = 0
                    } else {
                        num += 1
                    }
                }
            }
        }
        document.getElementById('cambiarDragAndDrop').style.background = 'green'
    } else {
        dragAndDropEnUso = 'no'
        //alert('desacti')
        textoBotonEdicion = 'modo edicion activado', colorBotonEdicion = 'gren', detenerOnclickModal = 'no'
        
        traducirDiccionario('porAhora')
        document.getElementById('cambiarDragAndDrop').style.background = 'red'
        setTimeout(actBotonEditar, 80)
    } 
}

let arrObjetos =[], banderaCambioUbicacion = 0
function cambioUbicacion(id){
    if(banderaCambioUbicacion == 0){
        banderaCambioUbicacion = 1
        console.log(`banderaCambioUbicacion: ${banderaCambioUbicacion}`);
        if(arrObjetos.length == 0){
            document.getElementById(id).style.transition = '1s';
            document.getElementById(id).style.background = 'black';
            document.getElementById(id).style.color = 'white';
            arrObjetos.push(id)
            console.log(id)
            console.log(arrObjetos);
        } else {
            arrObjetos.push(id)
            let num = 0, code = [], objMover = arrObjetos[0], obLlegada = arrObjetos[1]
            console.log(`objMover: ${objMover}, obLlegada: ${obLlegada}`);

            for(u in diccionario){
                if(num == retornarPosicionDiccionario(obLlegada)){
                    //console.log(` arrbia, diccionario[retornarPosicionDiccionario('${objMover}')]: ${retornarPosicionDiccionario(objMover)}`);
                    //console.log(` arrbia, diccionario[retornarPosicionDiccionario('${obLlegada}')]: ${retornarPosicionDiccionario(obLlegada)}`);
                    //console.log(diccionario[retornarPosicionDiccionario(objMover)]);
                    code.push(diccionario[retornarPosicionDiccionario(objMover)])
                    code.push(diccionario[retornarPosicionDiccionario(obLlegada)])
                } else if(num != retornarPosicionDiccionario(objMover)){
                    //console.log(` abajo, diccionario[${num}]: ${diccionario[num]}`);
                    //console.log(diccionario[num]);
                    code.push(diccionario[num])
                }
                num += 1;
            }
            
            console.log(id)
            console.log(arrObjetos);
            console.log(code);
            diccionario = code
            traducirDiccionario('porAhora')
            arrObjetos = []
            if(dragAndDropEnUso == 'si'){
                dragAndDropEnUso = 'no';
                accionDagAndDrop()
            }
        }
        //alert(`arrObjetos.length: ${arrObjetos.length}, id: ${id}`);
    } else {
        setTimeout(activarBanderaCambioUbicacion, 62.5)
    }
    
}

function activarBanderaCambioUbicacion(){
    console.log(`activarBanderaCambioUbicacion, banderaCambioUbicacion: ${banderaCambioUbicacion}`);
    banderaCambioUbicacion = 0
}


function renderizarDicc(){
        let cod = ''
        for(u in diccionario){
            //console.log(diccionario);
            for(i in diccionario[u]){
                cod += `document.getElementById('${diccionario[u][i]['id'][0]}').addEventListener("click",function() {
                    cambioUbicacion('${diccionario[u][i]['id'][0]}');
                }); `
            }
        }
        console.log(cod);
        eval(cod)
}