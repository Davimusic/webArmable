//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let detenerMostrarSlideGalery = 'no', diccBotonesOpciones = {}


function objetoSlideGalery(idSeccion, Imagenes, textos, eventosContenedor, estilosGenerales, clases, textEstilosImagenes, maximaCantidadImagenesMostrar, eventosImagenes, dicc){
    //console.log(estilosGenerales);

    /*let text = ''
    for (let u = 0; u < eventosImagenes.length; u++) {
        text += buscarCaracterParaReemplazar(eventosImagenes[u], ',', '')
    }*/

    let numMaxIma = parseInt(separarTextoPorPalabras(maximaCantidadImagenesMostrar, 'maximoimagenes:')[1]);
    
    let arreImagenes = retornarArregloAPartirDeCarater(Imagenes, '&')
    let arretextos = retornarArregloAPartirDeCarater(textos, '&')
    
    let alturaPantalla = window.innerHeight; //screen.height;
    //let anchoPantalla = window.innerWidth; //screen.width;
    var divPadre = document.getElementById("porAhora");
    let anchoPantallaDisponible = (divPadre.offsetWidth / 100) * 80; // le restamos 4% de los 2% padding, tambièn le doy un pequeño margen de error
    
    let primeraReferencia = parseInt(separarTextoPorPalabras(dicc['styleImagenes'][3][1], 'cuadrado:')[1])

    let IdSeccionPaso = parseInt(separarTextoPorPalabras(idSeccion, 'slideGalery')[1]);

    let display = dicc['style'][dicc['style'].length - 1][1]
    let widthOpciones = 200
    if(display == 'display: block'){
        widthOpciones = alturaPantalla/7
    }

    let cod = ""
    /*let puntero = 0; 
    let arrePaso = []*/

    for (let u = 0; u < dicc['linkBotonesOpciones'].length; u++) {
        diccBotonesOpciones[dicc['linkBotonesOpciones'][u][0]] = dicc['linkBotonesOpciones'][u][1]
    }

    //calculo las margin right y left de mi las imagenes internas
    let mi = []
    for (let u = 2; u < 4; u++) {
        mi.push(separarPalabra(dicc['styleImagenes'][0][u], ':'))
    }
    //console.log(mi);
    let medidas = []
    for (let u = 0; u < mi.length; u++) {
        let text = mi[u][1]
        text = buscarCaracterParaReemplazar(text, 'p', '')
        text = buscarCaracterParaReemplazar(text, 'x', '')
        medidas.push(text)
    }

    let ladosImagen = parseInt(medidas[0]) + parseInt(medidas[1])
    

    //inicio de creacion de div que se sobrepone para usar flechas y botones
    cod += ` 
        <div id='slideGalery${IdSeccionPaso}' style="${estilosGenerales}" ${eventosContenedor} class="${clases}">                                                                                                       
        `
        cod += 
            `
            <div style='display: flex; align-items: center; justify-content: center;'>
            `
            /*for (let i = primeraReferencia; i < anchoPantallaDisponible && i < (i + primeraReferencia); i++) {
                puntero += 1
                i += primeraReferencia
            }*/

            //console.log(`widthOpciones arriba: ${widthOpciones}`);
            let vecesPasadas = 0
            for (let i = 0; i < arreImagenes.length; i++) {
                if(i < numMaxIma && (((primeraReferencia * 2) * i) + widthOpciones + ladosImagen) < divPadre.offsetWidth ){
                    vecesPasadas += 1
                    cod += `
                            <div class="display: flex; align-items: center; justify-content: center;">
                                <img ${agregarEventosImagenes(idSeccion, `${IdSeccionPaso}imgSlide${i}`, eventosImagenes)} style='${textEstilosImagenes} width: ${primeraReferencia}px; height: ${primeraReferencia}px;' id="${IdSeccionPaso}imgSlide${i}" onmouseout="" onmouseover="" class="borde1 mano" src="${arreImagenes[i]}" alt="">
                                <div style="max-width: ${primeraReferencia}px; height: fit-content; overflow: visible;" id="${IdSeccionPaso}textSlide${i}"> ${arretextos[i]} </div>
                            </div>
                    ` 
                } else{
                    cod += `
                            <div style='display: none;'>
                                <img style='${textEstilosImagenes}' id="${IdSeccionPaso}imgSlide${i}" class="borde1 mano" style="height: ${alturaPantalla/3.5}px;" src="${arreImagenes[i]}" alt="">
                                <div id="${IdSeccionPaso}textSlide${i}"> ${arretextos[i]} </div>
                            </div>
                    ` 
                }
            }
            cod += 
            `
            </div>  
        `   
            if(display == 'display: block'){
                widthOpciones = (primeraReferencia * vecesPasadas) + ladosImagen
            }
            //console.log(`widthOpciones abajo: ${widthOpciones}, vecesPasadas: ${vecesPasadas}`);
            cod += 
            `
            <div>
                <div style='max-width: ${widthOpciones}px;
                ' class="flex espacioEquilatero paddingSuperiorInferior contenedorGaleria">
                    <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="avanzarCatalogoSlideGalery('slideGalery${IdSeccionPaso}', 1)/detenerMostrarioSlideGalery()" src="${diccBotonesOpciones['boton atras']}" alt=""  >
                    <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="avanzarCatalogoSlideGalery('slideGalery${IdSeccionPaso}', -1)/detenerMostrarioSlideGalery()" src="${diccBotonesOpciones['boton adelante']}" alt="" >
                
        `
        //calculo la cantidad de imagenes disponibles

        for (let i = 0; i < arreImagenes.length; i++) {
            let link = `${diccBotonesOpciones['item seleccionado']}`
            if(i != 0){
                link = `${diccBotonesOpciones['item no seleccionado']}`
            }
            cod += 
                    `
                    <img  id="${IdSeccionPaso}pelotaSlide${i}" class='mano' onclick="reorganizarContenido('slideGalery${IdSeccionPaso}', ${i})/detenerMostrarioSlideGalery()" style="height: 20px; width: 20px;  padding-right: 10px;  padding-left: 10px;" src="${link}" alt="" >
                    `
        }

        cod +=
            `        
                </div>    
            </div>
            `

            cod += 
            `
        </div>           
        `

     /*/Actualizar arreglo
    let pasos = 0
    while(pasos < arreImagenes.length){
        if(puntero < arreImagenes.length){
            arrePaso.push(arreImagenes[puntero])
        } else {
            puntero = 0
            arrePaso.push(arreImagenes[puntero])
        }
        puntero += 1
        pasos += 1
    }*/

    return cod
}

function agregarEventosImagenes(idContenedor, idImagen, eventosImagenes){
    //console.log(`idContenedor: ${idContenedor}`);
    //console.log(`idImagen: ${idImagen}`);
    let eventos = '', diccEntrada = {0: `onclick="eventoUnico(this.id, '`, 1: `onmouseover="`, 2: 'onmouseout="'}, diccSalida = {0: `')"`, 1: '"', 2: '"'}
    for (let u = 0; u < eventosImagenes.length; u++) {
        eventos += diccEntrada[u]
        for (let e = 0; e < eventosImagenes[u].length; e++) {
            if(eventosImagenes[u][e] != ''){
                let text = `${eventosImagenes[u][e]}/`
                eventos += text.replace(idContenedor, idImagen)
            }   
        }
        
        eventos = removerUltimoCaracter(eventos)
        eventos += diccSalida[u]
    }
    return eventos
}

function detenerMostrarioSlideGalery(){
    detenerMostrarSlideGalery = 'si'
}

function avanzarCatalogoSlideGalery(id, desicion){
    for(u in diccionario){
            for(i in diccionario[u]){
                //console.log(diccionario[u][i]['linkSlideGalery']);
                if(diccionario[u][i]['id'] == id){
                    const largo = diccionario[u][i]['linkSlideGalery'].length
                    const coordenadaActual = parseInt(diccionario[u][i]['coordenadaInicio'])
                    let nuevaCoordenada = 0, accion = ''
                    if(desicion == 1){
                        accion = 'invertir'
                        if(coordenadaActual + 1 <= (largo -1)){
                            //console.log(`àrriba`);
                            nuevaCoordenada = coordenadaActual + 1
                        } else {
                            nuevaCoordenada = 0
                            //console.log(`abajo`);
                        }
                    } else {
                        accion = 'derecho'
                        //console.log(coordenadaActual - 1);
                        if(coordenadaActual - 1 >= 0){
                            nuevaCoordenada = coordenadaActual - 1
                        } else {
                            nuevaCoordenada = (largo - 1)
                        }
                    }
                    //console.log(`nuevaCoordenada: ${nuevaCoordenada}`);
                    reorganizarContenido(id, nuevaCoordenada, accion)
                }
            }
            //arr = []
        //}
    }
}

function reorganizarContenido(id, coordenadaInicio, accion){
    let arr = retornarLinkImagenes(id, 'linkSlideGalery', coordenadaInicio, accion)
    arr = retornarReorganizadoDesdeIndice(arr, coordenadaInicio, accion)

            let idTraducido = ''
            for (let e = 11; e < id.length; e++) {
                idTraducido += id[e]
            }

    //console.log(arr);

        for (let u = 0; u < arr.length; u++) {
            document.getElementById(`${idTraducido}imgSlide${u}`).src = arr[u][0]
            document.getElementById(`${idTraducido}textSlide${u}`).innerText = arr[u][1]
        }

        for (let u = 0; u < arr.length; u++) {
            let link = ''
            if(u == parseInt(coordenadaInicio)){
                link = `${diccBotonesOpciones['item seleccionado']}`
            } else {
                link = `${diccBotonesOpciones['item no seleccionado']}`
            }
            document.getElementById(`${idTraducido}pelotaSlide${u}`).src = link
        }  
}

function retornarLinkImagenes(id, nombreLlave, coordenadaInicio, accion){
    let arr = []//, arreId = []
    for(u in diccionario){
        for(i in diccionario[u]){
            if(diccionario[u][i]['id'] == id){
                arr = diccionario[u][i][nombreLlave]
                diccionario[u][i]['coordenadaInicio'] = coordenadaInicio
                return diccionario[u][i][nombreLlave]
            }
        }
    }
    return arr
}

function retornarReorganizadoDesdeIndice(arr, coordenadaDeInicio, accion) {
    let arre = []

    for (let u = coordenadaDeInicio; u < arr.length; u++) {
        arre.push(arr[u])
    }

    for (let u = 0; u < coordenadaDeInicio; u++) {
        arre.push(arr[u])
    }

    return arre
    
}

function recorrerObjetosSlideGalery(){
    if(estadoModal == 'desactivado'){
        if(detenerMostrarSlideGalery == 'no'){
            let arrIdObjetos = [], arrCoordenadasInicio = [], arrLargoLinks = []
            for(u in diccionario){
                if(Object.keys(diccionario[u])[0] == 'slideGalery'){
                    for(i in diccionario[u]){
                        arrIdObjetos.push(diccionario[u][i]['id'])
                        arrCoordenadasInicio.push(diccionario[u][i]['coordenadaInicio'])
                        arrLargoLinks.push(diccionario[u][i]['linkSlideGalery'])
                    }
                }
            }

            for (let u = 0; u < arrIdObjetos.length; u++) {
                let coor = 0
                if(parseInt(arrCoordenadasInicio[u] + 1) < arrLargoLinks[u].length){
                    coor = arrCoordenadasInicio[u] + 1
                }  
                //console.log(`coor: ${coor}`);
                reorganizarContenido(arrIdObjetos[u][0], coor, 'derecho')
            }
        } else {
            reactivarMostrarioSlideGalery()
        }
    }
}

function retornarArregloAPartirDeCarater(texto, caracter){
    let arr = []
    let textPaso = ''
    for (let u = 0; u < texto.length; u++) {
        if(texto[u] == '&'){
            arr.push(textPaso)
            textPaso = ''
        } else {
            textPaso += texto[u]
        }      
    }
    return arr
}

async function reactivarMostrarioSlideGalery(){
    await wait(5000)
    //console.log(`mostrario reiniciado`);
    detenerMostrarSlideGalery = 'no'
}

setInterval(recorrerObjetosSlideGalery, 2000)


const divParaObservar = document.getElementById('porAhora');
//const padreBody =  document.body

// Crear una instancia del objeto ResizeObserver
const observer = new ResizeObserver(entries => {
    if(congelarActualizacionPantalla == 'si'){
        console.log('traduciendo diccionario');
        traducirDiccionario('porAhora')
    } else {
        //console.log(`congelado`);
    }
});


observer.observe(divParaObservar);
//observer.observe(padreBody)

