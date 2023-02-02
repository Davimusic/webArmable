let dicc = {'div1': `<div style="background-color: aqua; width: 300px; height: 400px;" id="div1">`, 'div2': `<div style="background-color: rgb(255, 0, 255);  width: 200px; height: 200px;" id="div2">`, 'img': `<img style="width:150px; height:150px;" id="img" src="https://res.cloudinary.com/dplncudbq/image/upload/v1672767743/mias/salir_eyzxfp.png" alt="" srcset="">`}
let orden = ['div1', 'div2', 'img']

let isDragging = false;
let currentElement;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;


function dragStart(e) {
  //console.log(e.touches);
    initialX = e.touches[0].clientX;//e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY; //e.touches[0].clientY - yOffset;

    if (e.target === img1){
        //console.log(`initialX: ${initialX}, initialY: ${initialY}`);
        currentElement = img1;
    }

    isDragging = true;
}

function dragEnd(e) {
    //console.log(`dragEnd`);
    initialX = currentX;
    initialY = currentY;

    isDragging = false;

    checkOverlap();
}

function drag(e) {
    if (isDragging) {
        //console.log(`drag`);
        e.preventDefault();
        currentX = e.touches[0].clientX; //e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY;//e.touches[0].clientY - initialY;
        //console.log(`currentX: ${currentX}, currentY: ${currentY}`);

        /*xOffset = currentX;
        yOffset = currentY;*/

        setTranslate(currentX, currentY, currentElement);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function checkOverlap() {

    //const div1 = document.getElementById("div1");
    const div2 = document.getElementById("hijo");
    const img = document.getElementById('img1')
    //const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    const img1 = img.getBoundingClientRect();

    if (rect2.x < img1.x + img1.width &&
        rect2.x + rect2.width > img1.x &&
        rect2.y < img1.y + img1.height &&
        rect2.height + rect2.y > img1.y){
        
        console.log('solapado con div2');
        let cod = `${dicc['div1']} ${dicc['div2']} ${dicc['img']} </div> </div>`
        renderizarDicc(cod)

    } /*else if (rect1.x < img1.x + img1.width &&
        rect1.x + rect1.width > img1.x &&
        rect1.y < img1.y + img1.height &&
        rect1.height + rect1.y > img1.y){

        console.log('solapado con div1');
        let cod = `${dicc['div1']} ${dicc['img']} ${dicc['div2']} </div> </div>`
        renderizarDicc(cod)
    } */

}

function detectDevice() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
  
    return toMatch.some(function(reg) {
      return navigator.userAgent.match(reg);
    });
  }
  










function dragStart2(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  isDragging = true;
}

function dragEnd2(e) {
  isDragging = false;
}

function drag2(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, img1);
  }
}

function setTranslate2(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}




let bandera = 0, dragAndDropEnUso = 'no'
function renderizarDicc(){
    if(dragAndDropEnUso == 'no'){
        dragAndDropEnUso = 'si'
        //alert('acti')
        textoBotonEdicion = 'modo edicion detenido', colorBotonEdicion = 'red', detenerOnclickModal = 'si'
        traducirDiccionario('porAhora')
        document.getElementById('cambiarDragAndDrop').style.background = 'green'
        setTimeout(actBotonEditar, 80)
        const img = document.getElementById('img1')
        if (detectDevice()) {
            console.log("Es un dispositivo móvil");
            img.addEventListener("touchstart", dragStart);
            img.addEventListener("touchend", dragEnd);
            img.addEventListener("touchmove", drag);
        } else {
            console.log("Es una computadora");

            img.addEventListener("mousedown", dragStart2);
            img.addEventListener("mouseup", dragEnd2);
            img.addEventListener("mouseout", dragEnd2);
            img.addEventListener("mousemove", drag2);
        }

    } else {
        dragAndDropEnUso = 'no'
        //alert('desacti')
        textoBotonEdicion = 'modo edicion activado', colorBotonEdicion = 'gren', detenerOnclickModal = 'no'
        
        traducirDiccionario('porAhora')
        document.getElementById('cambiarDragAndDrop').style.background = 'red'
        setTimeout(actBotonEditar, 80)
    } 
    
    /*const padre = document.getElementById('padre')
    let cod = ''
        if(bandera == 0){
        bandera = 1
        for(i in diccionario){
            for(u in diccionario[i]){
            console.log(diccionario[i][u]['id']);
            }
        }
        padre.innerHTML = cod
        } else {
        padre.innerHTML = cod
        }*/

    
        

        /*img.addEventListener("dragstart", dragStart)
        img.addEventListener("dragover", dragEnd);
        img.addEventListener("drop", drag);*/
    

}