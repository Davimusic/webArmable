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

function div(atributos, info, acc, id){

    let inicioDiv = 0, llegadaDiv = 0, bandera = 0
    for (let i = 0; i < diccionario.length; i++) {
        for(u in diccionario[i]){
            if(diccionario[i][u]['id'] == id){ 
                llegadaDiv = i
                bandera = 1
                console.log(`si, id: ${id}`);
            }
        }
        let llave = Object.keys(diccionario[i])[0];
        if('div' == llave && bandera == 0){
            inicioDiv = i + 1
        }
    }
    console.log(`inicioDiv: ${inicioDiv}, llegadaDiv: ${llegadaDiv}`);

    let code =''
    for (let i = inicioDiv; i < llegadaDiv; i++) {
        let llaveHija = Object.keys(diccionario[i])[0];
        let dicc = diccionario[i][llaveHija]
        console.log(`llaveHija: ${llaveHija}, dicc: ${dicc}`);
        code += decidirAccionArmadoComponents(llaveHija, dicc, code)
        console.log(code);
    }

    let cod = `
            ${info}
            <div ${atributos}>
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

function filterSections(input) {
    //console.log(input);
    let sections = [];
    let startIndex = 0;
    while (true) {
        startIndex = input.indexOf('<div', startIndex);
        //console.log(startIndex);
        if (startIndex === -1) break;
        let endIndex = input.indexOf('</div>', startIndex);
        //console.log(endIndex);
        if (endIndex === -1) break;
        sections.push(input.slice(startIndex, endIndex + 6));
        startIndex = endIndex + 6;
    }
    //console.log(sections.length);
    for (let u = 0; u < sections.length; u++) {
        //console.log(sections[u]);
    }
    return sections;
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

let t= ` <div la a la la la >
            conte1
            <div 2 la a la la la > 
                conte2 
                <div 3la a la la la > 
                    conte3
                    <div 4la a la la la > 
                        conte4
                    </div> 
                </div>  
            </div> 
            imagen 
        </div>`


let z= ` <div la a la la la > <div 2 la a la la la > </div> <div 3la a la la la > </div>  </div>`
//filtrarSecciones(t)
//filtrar2(t)
function filtrar2(cod){
    console.log(cod);
    let arr = [], text = '', arrCerrarDiv = []
    for (let u = 0; u < cod.length; u++) {
        let referencia = `${cod[u]}${cod[u+1]}${cod[u+2]}${cod[u+3]}${cod[u+4]}${cod[u+5]}`
        if(referencia == ' <div '){
            arr.push(u) 
        } else if(referencia == '</div>'){
            arrCerrarDiv.push(u + 6)// el 6 es por el largo de caractereces de la palabra que se compara con referencia
        }
    }
    
    let conteo = 0
    console.log(arr);
    console.log(arrCerrarDiv);
    arr.push(arrCerrarDiv[0])
    let numCola = arrCerrarDiv.length - 1
    while(conteo < (arr.length - 1)){
        let inicio = arr[conteo], final = arr[conteo + 1]
        for (let u = inicio; u < final; u++) {
            text += cod[u]
        }
        inicio = arrCerrarDiv[numCola - 1], final = arrCerrarDiv[numCola]
        //console.log(`inicio: ${inicio}, final: ${final}`);
        for (let u = inicio; u < final; u++) {
            text += cod[u]
        }
        conteo += 1
        numCola -= 1
    }

    //console.log(text);
    return text
}

function filtrarSecciones(cod){
    let inicio = 0, final = 0, arr = [], text = ``, s = ''
    s = cod
    console.log(s);
    for (let u = 0; u < s.length; u++) {
        let referencia = `${s[u]}${s[u+1]}${s[u+2]}${s[u+3]}${s[u+4]}${s[u+5]}`
        console.log(referencia);
        if(referencia == ' <div '){
            inicio = u
            console.log('entra <div , inicio: ' + inicio );
        } else if(referencia == '</div>'){
            final = u+6
            arr.push([inicio, final])
            inicio = 0
            final = 0
        }

        console.log(arr);
        console.log(`largo: ${arr.length}`);

        let num = 0
        for (let u = 0; u < arr.length; u++) {
            for (let i = arr[num][0]; i < arr[num][1]; i++) {
                text += `${s[i]}`
            }  
            num += 1      
        }
    }
    console.log(text);
    //return text
}
