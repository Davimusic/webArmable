let dragAndDropEnUso = 'no', arrObjetos =[], banderaCambioUbicacion = 0

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

// async
function accionDagAndDrop(){
    //await wait(2000)
    console.log('empieza');
    arrObjetos = []
    if(dragAndDropEnUso == 'no'){
        dragAndDropEnUso = 'si'
        //alert('acti')
        textoBotonEdicion = 'modo edicion detenido', colorBotonEdicion = 'red', detenerOnclickModal = 'si'
        traducirDiccionario('porAhora')
        actBotonEditar()
        
        renderizarDicc()
        let arrColores = ['rgba(66, 5, 66, 0.5)', 'rgba(214, 15, 214, 0.5)'], num = 0
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
        //arrObjetos = []
        textoBotonEdicion = 'modo edicion activado', colorBotonEdicion = 'gren', detenerOnclickModal = 'no'
        
        traducirDiccionario('porAhora')
        document.getElementById('cambiarDragAndDrop').style.background = 'red'
        setTimeout(actBotonEditar, 80)
    } 
}

function cambioUbicacion(id){
    //console.log(arrObjetos);
    //console.log(banderaCambioUbicacion);

    if(banderaCambioUbicacion == 0){
        banderaCambioUbicacion = 1
        //console.log(`banderaCambioUbicacion: ${banderaCambioUbicacion}`);
        if(arrObjetos.length == 0){

            document.getElementById(id).style.transition = '1s';
            document.getElementById(id).style.background = 'black';
            document.getElementById(id).style.color = 'white';
            arrObjetos.push(id)
            //console.log(id)
            //console.log(arrObjetos);

        } else {

            arrObjetos.push(id)
            console.log(`arrObjetos[0]: ${arrObjetos[0]}, arrObjetos[1]: ${arrObjetos[1]}`);
            if(arrObjetos[0] != arrObjetos[1]){

                let num = 0, code = [], objMover = arrObjetos[0], obLlegada = arrObjetos[1]
                console.log(`objMover: ${objMover}, obLlegada: ${obLlegada}`);

                //para cuando es de div a otro div
                let arreObjetosPaso = [], arreDivs = [], arrIdDivs = []

                for(u in diccionario){//para cuando los 2 son contenedores div
                    if(objMover.includes('contenedor') && obLlegada.includes('contenedor')){
                        for(i in diccionario[u]){
                            if(i == 'div'){
                                arrIdDivs.push(u)
                                arreObjetosPaso.push(diccionario[u])
                                arreDivs.push(arreObjetosPaso)
                                arreObjetosPaso = []
                            } else {
                                arreObjetosPaso.push(diccionario[u])
                            }
                        }
                    } else {// este es para cuando son dos objetos que no sean divs, o que al menos 1 de los 2 lo sea
                        if(num == retornarPosicionDiccionario(obLlegada)){
                            code.push(diccionario[retornarPosicionDiccionario(objMover)])
                            code.push(diccionario[retornarPosicionDiccionario(obLlegada)])
                        } else if(num != retornarPosicionDiccionario(objMover)){
                            code.push(diccionario[num])
                        }
                        num += 1;
                    }
                }

                let arrPaso = []// todo estos bucles faltantes para cuando es de un div a otro div
                for (let u = 0; u < arrIdDivs.length; u++) {            
                    if(diccionario[arrIdDivs[u]]['div']['id'][0] == obLlegada){
                        for (let i = 0; i < arrIdDivs.length; i++) {
                            if(diccionario[arrIdDivs[i]]['div']['id'][0] == objMover){
                                arrPaso.push(arreDivs[i])
                            }
                        }
                        arrPaso.push(arreDivs[u])
                    } else if(diccionario[arrIdDivs[u]]['div']['id'][0] != objMover && diccionario[arrIdDivs[u]]['div']['id'][0] != obLlegada){
                        arrPaso.push(arreDivs[u])
                    }
                }

                if(objMover.includes('contenedor') && obLlegada.includes('contenedor')){
                    for (let u = 0; u < arrPaso.length; u++) {
                        for (let i = 0; i < arrPaso[u].length; i++) {
                            code.push(arrPaso[u][i])
                        }
                    }
                }

                //aqui se reubica objetos que puedan estar por debajo del ultimo div del arregloPadre, ya que de quedar ahì no serìan renderizados
                let largoDic = diccionario.length - 1
                for (let h = 0; h < largoDic; h++) {
                    let arrEvaluarReubicacion = []
                    for(u in code){
                        for(i in code[u]){
                            console.log('i: ' + i + 'code[' + u + '[');
                            console.log(code[u]);
                            if(u == largoDic && i != 'div'){
                                arrEvaluarReubicacion.push(code[code.length - 1])
                                for (let a = 0; a < (code.length - 1); a++) {
                                    arrEvaluarReubicacion.push(code[a])
                                }
                                code = arrEvaluarReubicacion
                                console.log(`ajuste code`);
                                console.log(code);
                            } 
                        }
                    }
                }

                // inyeccion del codigo
                console.log(code);
                diccionario = code
                console.log(diccionario);
            } 
            dragAndDropEnUso = 'no'
            accionDagAndDrop()
        }
    } 
    setTimeout(activarBanderaCambioUbicacion, 80)
}

function activarBanderaCambioUbicacion(){
    banderaCambioUbicacion = 0
    console.log(`activarBanderaCambioUbicacion, banderaCambioUbicacion: ${banderaCambioUbicacion}`);
}


function renderizarDicc(){
    //banderaCambioUbicacion = 0
        let cod = ''
        for(u in diccionario){
            for(i in diccionario[u]){
                cod += `document.getElementById('${diccionario[u][i]['id'][0]}').addEventListener("click",function() {
                    cambioUbicacion('${diccionario[u][i]['id'][0]}');
                }); `
            }
        }
        console.log(cod);
        eval(cod)
}