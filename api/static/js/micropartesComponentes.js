//son las posibilidades que permiten armar los componenentes

function texto(tipo, acc, text, colorYFondo, eventos, id, style){
    //console.log(`tipo: ${tipo}, acc: ${acc}, text: ${text}, colorYFondo: ${colorYFondo}, eventos: ${eventos}, id: ${id}`);
    let arreText = []
    for (let u = 0; u < text.length; u++) {
        for (let i = 0; i < text[u].length; i++) {
            arreText.push(text[u][i])
        }
    }

    let cantidadTextos = arreText.length / 3
    let textoPaso = ''
    let textoConcatenado = ''

    let numPaso = 0, bandera = 0
    for (let u = 0; u < cantidadTextos; u++) {
        textoPaso = agregarSaltosDeLinea(arreText[numPaso], 'º', '<br>')
        if(arreText[numPaso + 1] == 'hiperLink'){
            let linkFuncional = ''
            if(detenerOnclickModal == 'no'){
                linkFuncional = `#${arreText[numPaso + 2]}`
            } else {
                if(bandera == 0){
                    bandera = 1
                    alert(`antes de activar cualquier link, debes guardar la informaciòn, de lo contrario se perderìa!!!`)
                }
                linkFuncional = `${arreText[numPaso + 2]}`
            }                       // en este caso habrìa replica de id, quizas en un futuro arreglar
            textoConcatenado += `<a id='${id}' ${eventos} style='${colorYFondo}' href='${linkFuncional}'>${textoPaso}</a>`
        } else if(arreText[numPaso + 1] == 'negrita'){
            textoConcatenado += `<b> ${textoPaso} </b>`
        } else {
            textoConcatenado += `${textoPaso}`
        }
        numPaso += 3
    }

    //console.log(`textoPaso: ${textoPaso}`);
    //console.log(`textoConcatenado: ${textoConcatenado}`);
    //console.log(style);
    style = buscarCaracterParaReemplazar(style, '`', `'`)
    let cod = `
        <${tipo} ${acc} style="${style}">
            ${textoConcatenado}
        </${tipo}>
    `
    //console.log(cod);
    return cod;
}

function espacio(num){
    let cod = ""
    if(num == undefined){
        cod = `
        <br>
    ` 
    } else {
        for (let u = 0; u < num; u++) {
            //console.log("entra " + u);
            cod += `
            <br>
        ` 
        }
    }
    //console.log(cod);
    return cod;
}

function negrita(text){
    let cod = `
    <b> ${text} </b>
    `
    return cod;
}

function div(atributos, info, acc, id, style){

    let inicioDiv = 0, llegadaDiv = 0, bandera = 0
    for (let i = 0; i < diccionario.length; i++) {
        for(u in diccionario[i]){
            if(diccionario[i][u]['id'] == id){ 
                llegadaDiv = i
                bandera = 1
                //console.log(`si, id: ${id}`);
            }
        }
        let llave = Object.keys(diccionario[i])[0];
        if('div' == llave && bandera == 0){
            inicioDiv = i + 1
        }
    }
    //console.log(`inicioDiv: ${inicioDiv}, llegadaDiv: ${llegadaDiv}`);

    let code =''
    for (let i = inicioDiv; i < llegadaDiv; i++) {
        let llaveHija = Object.keys(diccionario[i])[0];
        let dicc = diccionario[i][llaveHija]
        //console.log(`llaveHija: ${llaveHija}, dicc:`);
        //console.log(dicc);
        code += decidirAccionArmadoComponents(llaveHija, dicc, code)
        //console.log(code);
    }

    let stylesFiltrados = buscarCaracterParaReemplazar(style, '`', `'`)
    
    let cod = `
            ${info}
            <div ${atributos}${stylesFiltrados}>
                ${code}
            </div>
        `


    /*console.log(`id: ${id}`);
    let cod = ""
    if(acc == "si"){
        cod = `
        <div ${atributos}>
            ${info}
        </div>
    `
    } else {
        cod = `
        ${info}
        <div ${atributos}>
        </div>
    `
    }*/
    
    //console.log(cod);
    return cod;
}

function video(aa, link){
    //console.log(`entrada video, aa: ${aa}, link: ${link}`);
    let cod = "";
    cod = `
    <video ${aa} controls>
    <source src="${link}" type="video/mp4">
    </video>
    `
    return cod;
}

function imagen(link, style, clas, events, id){
    let cod = `
    <img id="${id}" src="${link}" style="${buscarCaracterParaReemplazar(style, '`', `'`)}" class="${clas}" ${events} alt="">
    `
    return cod;
}

function slideGalery(id, eventosContenedor, clases, estilosGenerales, dicc){

    let arr = dicc['linkSlideGalery']
                let textArr = '', texto = ''
                for (let u = 0; u < arr.length; u++) {
                    textArr += arr[u][0] + '&'
                    texto += arr[u][1] + '&'
                }

    let estilosImagenes = dicc['styleImagenes'], textEstilosImagenes = ''
    for (let u = 0; u < (estilosImagenes.length - 1); u++) {
        for (let e = 1; e < estilosImagenes[u].length; e++) {
            textEstilosImagenes += estilosImagenes[u][e] + '; '
        }
    }
    
    estilosGenerales = buscarCaracterParaReemplazar(estilosGenerales, '`', `'`)
    
    return objetoSlideGalery(id, textArr, texto, eventosContenedor, estilosGenerales, clases, textEstilosImagenes, estilosImagenes[2][1], dicc['eventosImagenes'], dicc)
}

function mapa(){
    let alto = window.innerHeight, ancho = window.innerWidth;

    let cod = `
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe width="${ancho}" height="${alto}" id="gmap_canvas" src="https://maps.google.com/maps?q=colombia,%20san%20gil,%20kr%2021%20n.%2011%20-%2005&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            <a href="https://fmovies-online.net">fmovies</a><br><style>.mapouter{position:relative;text-align:right;height:${alto}px;width:${ancho}px;}</style>
            <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
            <style>.gmap_canvas {overflow:hidden;background:none!important;height:${alto}px;width:${ancho}px;}</style>    
        </div>
    </div>
    `
    console.log(`window.innerHeight: ${window.innerHeight}, window.innerWidth: ${window.innerWidth}`);
    return cod
}

function codEmbebido(id, eventos, clas, estilos, codigo){
    estilos = buscarCaracterParaReemplazar(estilos, '`', `'`)
    console.log(estilos);
    let code = `
    <div id = '${id}' class='${clas}' style="${estilos} overflow-x: auto; white-space: nowrap;" ${eventos}>
        ${codigo}
    </div>`
    return code
}

function anchoVentana(){
    return window.innerWidth;
}

function quitarComasDeArreglo(arr){
    let text = '';
    for (let u = 0; u < arr.length; u++) {
        text += arr[u]
    }
    //console.log(text);
    return text;
}

function buscarCaracterParaReemplazar(text, buscar, cambiar){
    let cod = ``
    for (let u = 0; u < text.length; u++) {
        if(text[u] == buscar){
            cod += cambiar
        } else {
            cod += text[u]
        }
    }
    return cod
}

function separarTextoPorPalabras(text, primerPalabra){
    let num = (primerPalabra.length - 1), arr = [], cod = ``
    for (let u = 0; u < text.length; u++) {
        cod += text[u]
        if(u == num){
            arr.push(cod)
            cod = ``
        } 
    }
    arr.push(cod)
    return arr
}

