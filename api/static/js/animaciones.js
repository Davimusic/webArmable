function rotar(id, segundos, grados){
    console.log(`id: ${id}, segundos: ${segundos}, grados: ${grados}`);
    let objeto = document.getElementById(id)
    objeto.style.transition =  `${segundos}s`
    objeto.style.transform = `rotate(${grados}deg)`
}

function rotar3d(id, segundos, grados){
    let objeto = document.getElementById(id)
    objeto.style.transition =  `${segundos}s`
    objeto.style.transformStyle = 'preserve-3d'
    objeto.style.webkitBackfaceVisibility = "hidden";
    objeto.style.backfaceVisibility = "hidden";
    eval(`objeto.style.transform = 'rotateY(${grados}deg)'`)
}

function cambiarColor(id, segundos, color){
    let objeto = document.getElementById(id)
    objeto.style.transition =  `${segundos}s`
    objeto.style.background = `${color}`
}

function opacidad(id, segundos, porcentaje){
    let objeto = document.getElementById(id)
    objeto.style.transition =  `${segundos}s`
    objeto.style.opacity = `${porcentaje}`
}

function desplazar(id, segundos, x, y){
    let objeto = document.getElementById(id)
    objeto.style.transition =  `${segundos}s`
    eval(`objeto.style.transform = 'translate(${x}px, ${y}px)'`)
}

function cambiarTamano(id, segundos, especificacion, tamano){
    let objeto = document.getElementById(id)
    objeto.style.transition =  `${segundos}s`
    eval(`objeto.style.${especificacion} = '${tamano}px'`)
}

function activarEventosScroll(arr){
    for (let u = 0; u < arr.length; u++) {
        eventoScroll(arr[u][0], arr[u][1])
    }
}

//activarEventosScroll([['miDiv1', [`rotar('miDiv1', 2, -360)`,`rotar('miDiv1', 2, 360)`, `desplazar('miDiv1', 2, 10, 120)`, `desplazar('miDiv1', 2, 0, 0)`]], ['miDiv2', [`rotar('miDiv2', 2, -360)`,`rotar('miDiv2', 2, 360)`, `desplazar('miDiv2', 2, 10, 120)`, `desplazar('miDiv2', 2, 0, 0)`]]])

let bander = 0
function eventoScroll(id, events){
    let eventos = events, numEve = 0;
    var miID = document.getElementById(id);
    console.log(id);
    window.addEventListener("scroll", function() {
        var rect = miID.getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0) {
            if(bander == 0){
                bander = 1
                eval(eventos[numEve])
                if(numEve >= eventos.length){
                    numEve = 0
                } else {
                    numEve += 1
                }
                this.console.log('va la madre ' +  id + ' ' + numEve)
                this.setTimeout(rehabilitarBandera, 3000)
            }
        }
    });
}

function rehabilitarBandera(){
    console.log('bander = 0');
    bander = 0
}    

