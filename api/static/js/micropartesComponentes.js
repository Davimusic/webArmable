//son las posibilidades que permiten armar los componenentes

function texto(tipo, acc, text){
    //console.log(`tipo: ${tipo}, acc: ${acc}, text: ${text}`);
    let cod = `
        <${tipo} ${acc}>
            ${text}
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
    //console.log(aa);
    let cod = "";
    cod = `
    <video ${aa} controls>
    <source src="${link}" type="video/mp4">
    </video>
    `
    //console.log(`Cod: ${cod}`);
    return cod;
}

function imagen(link, style, clas, events, id, animation){
    //console.log(`link: ${link}, style: ${style}, clas: ${clas}, events: ${events}, id: ${id}, animation: ${animation}`);
    let cod = `
    <img id="${id}" ${animation} src="${link}" style="${style}" class="${clas}" ${events} alt="">
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