//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let detenerMostrarSlideGalery = 'no'


function objetoSlideGalery(idSeccion, Imagenes, textos, eventosContenedor, estilosGenerales, clases, textEstilosImagenes, maximaCantidadImagenesMostrar, eventosImagenes){
    
    
    let eventosImagenesText = ''
    let ar = [], text = ''//, bandera = 0
    for (let u = 0; u < eventosImagenes.length; u++) {
        text += buscarCaracterParaReemplazar(eventosImagenes[u], ',', '')
    }

    console.log(text);


    let numMaxIma = parseInt(separarTextoPorPalabras(maximaCantidadImagenesMostrar, 'maximoimagenes:')[1]);
    
    let arreImagenes = retornarArregloAPartirDeCarater(Imagenes, '&')
    let arretextos = retornarArregloAPartirDeCarater(textos, '&')
    
    let alturaPantalla = window.innerHeight; //screen.height;
    let anchoPantalla = window.innerWidth; //screen.width;
    var divPadre = document.getElementById("porAhora");
    let anchoPantallaDisponible = (divPadre.offsetWidth / 100) * 80; // le restamos 4% de los 2% padding, tambièn le doy un pequeño margen de error
    let primeraReferencia = alturaPantalla/3.5

    let IdSeccionPaso = parseInt(separarTextoPorPalabras(idSeccion, 'slideGalery')[1]);

    //let contenedor =  document.getElementById(`slideGalery${IdSeccionPaso}`);

    let cod = ""
    let puntero = 0; 
    let arrePaso = []
    //let resaltarPerlota =  idActual[IdSeccionPaso]  //parseInt(arre[0][2]) 

    //inicio de creacion de div que se sobrepone para usar flechas y botones 
                                                         // relativo       gradiante
    cod += ` 
        <div id='slideGalery${IdSeccionPaso}' style='${estilosGenerales}' ${eventosContenedor} class="${clases}">                                                                                                       
            
        `
        cod += 
            `
            <div style='display: flex; align-items: center; justify-content: center;'>
            `
            for (let i = primeraReferencia; i < anchoPantallaDisponible && i < (i + primeraReferencia); i++) {
                puntero += 1
                i += alturaPantalla/3.5
            }

            /*let arre = []
            if(arrePadre[IdSeccionPaso] != undefined){
                arre = arrePadre[IdSeccionPaso]
            }*/

            for (let i = 0; i < arreImagenes.length; i++) {
                if(i < numMaxIma && ((alturaPantalla/3.5)* i) < divPadre.offsetWidth ){
                    //console.log(arreImagenes[i]);
                    cod += `
                            <div class="display: flex; align-items: center; justify-content: center;">
                                <img ${agregarEventosImagenes(idSeccion, `${IdSeccionPaso}imgSlide${i}`, eventosImagenes)} style='${textEstilosImagenes}' id="${IdSeccionPaso}imgSlide${i}" onmouseout="" onmouseover="" class="borde1 mano" style="height: ${alturaPantalla/3.5}px;" src="${arreImagenes[i]}" alt="">
                                <div id="${IdSeccionPaso}textSlide${i}"> ${arretextos[i]} </div>
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
            cod += 
            `
            <div>
                <div class="flex espacioEquilatero paddingSuperiorInferior contenedorGaleria">
                    <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="avanzarCatalogoSlideGalery('slideGalery${IdSeccionPaso}', 1)/detenerMostrarioSlideGalery()" src="https://res.cloudinary.com/dplncudbq/image/upload/v1676133407/mias/atras_lfyntg.png" alt=""  >
                    <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="avanzarCatalogoSlideGalery('slideGalery${IdSeccionPaso}', -1)/detenerMostrarioSlideGalery()" src="https://res.cloudinary.com/dplncudbq/image/upload/v1676133410/mias/adelante_ztqvpx.png" alt="" >
                
        `
        //calculo la cantidad de imagenes disponibles

        for (let i = 0; i < arreImagenes.length; i++) {
            let link = 'https://res.cloudinary.com/dplncudbq/image/upload/v1676133405/mias/circuloRelleno_dehcpk.png'
            if(i != 0){
                link = 'https://res.cloudinary.com/dplncudbq/image/upload/v1676133403/mias/circuloVacio_pfaat6.png'
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

     //Actualizar arreglo
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
    }

    //arre = arrePaso 
    //console.log('cod------');
    //console.log(cod);
    //contenedor.innerHTML = cod;
    return cod
}

function agregarEventosImagenes(idContenedor, idImagen, eventosImagenes){
    console.log(`idContenedor: ${idContenedor}`);
    console.log(`idImagen: ${idImagen}`);
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
                            console.log(`àrriba`);
                            nuevaCoordenada = coordenadaActual + 1
                        } else {
                            nuevaCoordenada = 0
                            console.log(`abajo`);
                        }
                    } else {
                        accion = 'derecho'
                        console.log(coordenadaActual - 1);
                        if(coordenadaActual - 1 >= 0){
                            nuevaCoordenada = coordenadaActual - 1
                        } else {
                            nuevaCoordenada = (largo - 1)
                        }
                    }
                    console.log(`nuevaCoordenada: ${nuevaCoordenada}`);
                    reorganizarContenido(id, nuevaCoordenada, accion)
                }
            }
            //arr = []
        //}
    }
}

//let numMirar = 2
function reorganizarContenido(id, coordenadaInicio, accion){
    //console.log(`reorganizarContenido, id: ${id}`);
    
    let arr = retornarReorganizadoDeLinkImagenesSlideGalery(id, 'linkSlideGalery', coordenadaInicio, accion)// []//, arreId = []
    
    //for (let u = 0; u < arreId.length; u++) {
        //for (let i = 0; i < arreId[u].length; i++) {
            let idTraducido = ''
            for (let e = 11; e < id.length; e++) {
                idTraducido += id[e]
            }
            //arreId[u] = tex
        //}
    //}

    console.log('idTraducido');
    console.log(idTraducido);
    console.log('arr');
    console.log(arr);

    //for (let e = 0; e < arreId.length; e++) {
        for (let u = 0; u < arr.length; u++) {
            console.log(`${idTraducido}imgSlide${u}`);
            console.log(arr[u][0]);
            document.getElementById(`${idTraducido}imgSlide${u}`).src = arr[u][0]
            document.getElementById(`${idTraducido}textSlide${u}`).innerText = arr[u][1]
        }

        for (let u = 0; u < arr.length; u++) {
            let link = ''
            if(u == parseInt(coordenadaInicio)){
                link = 'https://res.cloudinary.com/dplncudbq/image/upload/v1676133405/mias/circuloRelleno_dehcpk.png'
            } else {
                link = 'https://res.cloudinary.com/dplncudbq/image/upload/v1676133403/mias/circuloVacio_pfaat6.png'
            }
            document.getElementById(`${idTraducido}pelotaSlide${u}`).src = link
        }
    //}    
}

function retornarReorganizadoDeLinkImagenesSlideGalery(id, nombreLlave, coordenadaInicio, accion){
    let arr = []//, arreId = []
    for(u in diccionario){
        //if(Object.keys(diccionario[u])[0] == 'slideGalery'){
            for(i in diccionario[u]){
                //console.log(diccionario[u][i]['linkSlideGalery']);
                if(diccionario[u][i]['id'] == id){
                    //arreId.push(diccionario[u][i]['id'])
                    arr = diccionario[u][i][nombreLlave]
                    /* for (let e = 0; e < diccionario[u][i][nombreLlave].length; e++) {
                        arr.push(diccionario[u][i][nombreLlave][e])
                    }*/
                    
                    
                    /*console.log(arr);
                    console.log(`XDXDXDXDXD`);
                    console.log(retornarReorganizadoDesdeIndice(arr, coordenadaInicio, accion));*/
                    diccionario[u][i][nombreLlave] = retornarReorganizadoDesdeIndice(arr, coordenadaInicio, accion)
                    // solo para coordenadaInicio
                    diccionario[u][i]['coordenadaInicio'] = coordenadaInicio
                    //console.log(diccionario);
                
                
                
                }
            }
            //arr = []
        //}
    }
    return arr
}

function retornarReorganizadoDesdeIndice(arr, coordenadaDeInicio, accion) {
    let arrePaso = [], idUsados = []

        if(accion != 'invertir'){
            for (let u = 0; u < arr.length; u++) {
                if(parseInt(arr[u][2]) == parseInt(coordenadaDeInicio)){
                    arrePaso.push(arr[u])
                    idUsados.push(u)
                } 
            }
        }

        for (let u = 0; u < arr.length; u++) {
            let habilitado = 'si'
            for (let e = 0; e < idUsados.length; e++) {
                if(idUsados[e] == u){
                    habilitado = 'no'
                } 
            }
            if(habilitado == 'si' && parseInt(arr[u][2]) != parseInt(coordenadaDeInicio)){
                arrePaso.push(arr[u])
                idUsados.push(u)
            }
        } 
        
        if(accion == 'invertir'){
            for (let u = 0; u < arr.length; u++) {
                if(parseInt(arr[u][2]) == parseInt(coordenadaDeInicio)){
                    arrePaso.push(arr[u])
                    idUsados.push(u)
                } 
            }
        }
    
    console.log(arrePaso);

    return arrePaso
    
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
                console.log(`coor: ${coor}`);
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
    console.log(`mostrario reiniciado`);
    detenerMostrarSlideGalery = 'no'
}

//setInterval(recorrerObjetosSlideGalery, 2000)


const divParaObservar = document.getElementById('porAhora');

// Crear una instancia del objeto ResizeObserver
const observer = new ResizeObserver(entries => {
    traducirDiccionario('porAhora')
  // Esta función se ejecutará cuando haya cambios en el tamaño del div
    /*for (let u = 0; u < arrePadre.length; u++) {
        let text = `objetoSlideGalery('slideGalery${u}')`
        eval(text)
        //console.log(`entraaq`);
    }*/
});

// Iniciar la observación del div
observer.observe(divParaObservar);

