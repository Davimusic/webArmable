//son las posibilidades que permiten armar los componenentes

function texto(tipo, acc, text, colorYFondo, eventos, id){
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

    let cod = `
        <${tipo} ${acc}>
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

function div(atributos, info, acc){
    //console.log(`${atributos} ${info} ${acc}`);
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
    }
    
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
    //console.log(`salida video, aa: ${aa}, link: ${link}`);
    return cod;
}

function imagen(link, style, clas, events, id){
    //console.log(`link: ${link}, style: ${style}, clas: ${clas}, events: ${events}, id: ${id}, animation: ${animation}`);
    let cod = `
    <img id="${id}" src="${link}" style="${style}" class="${clas}" ${events} alt="">
    `
    //console.log(cod);
    return cod;
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