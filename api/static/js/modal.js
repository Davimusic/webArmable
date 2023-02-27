let bloqueEnUso = "sin activar", estadoModal = 'desactivado;'

function actualizarBloqueEnUso(text){
    bloqueEnUso = text
    //console.log(`bloqueEnUso: ${bloqueEnUso}`);
}

function ActivarModal(contenido){
    if(bloqueEnUso == "sin activar"){
        alert("elija bloque")
    } else {
		if(contenido != undefined){
			document.getElementById("root").innerHTML = modal(contenido)
			setTimeout(activarInputs, 200)// esta funcion activa todo texto que tenga un link para que sea visible por le usuario
			setTimeout(actualizarModal, 100)
		} 
    }
}

function actualizarModal(){
	let idModal = document.getElementById("modala");
	idModal.style.display = "block";
    setTimeout(mostrarModal, 100)
}

function mostrarModal(){
	let idModal = document.getElementById("modala");
	idModal.style.boxShadow = "0px -1px 24px 0px rgba(0,0,0,0.75)";
	idModal.style.height = "fit-content";
	idModal.style.opacity = "1";
	idModal.style.transition = "1s";
}

function desactivarModal(){
	let idModal = document.getElementById("modala");
	idModal.style.transition = "1s";
	idModal.style.height = "0px";
	idModal.style.opacity = "0";
	estadoModal = 'desactivado'
	setTimeout(esconderModal, 500)
}

function esconderModal(){
	let idModal = document.getElementById("modala");
	idModal.style.display = "none";
}

function modal(contenido){
	estadoModal = 'activado'
	let conte = ""

	if(contenido != undefined){
		conte = contenido
	} 
	
	cod = `
	<div style = "background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(5px); display: none; padding: 2%; opacity: 0; height: 0px; width: 96%;" id="modala">
		<header style = "position: sticky; top: 0; z-index: 100; border-radius: 0.5em; color:white; padding: 1%; height:fit-content; background: #1e7070; display:flex; justify-content: space-between;">
			<div style="display:flex; justify-content: space-between;">
				<h3>Usando bloque de: ${bloqueEnUso}</h3>
			</div>
			<div style="justify-content: left;" onclick="desactivarModal()" >
				<h3 style='cursor: pointer;'>X</h3>
			</div>
		</header>
		<div class="">
				${retornarToast()}
                ${conte}
				<p>Agregar un mensaje</p>
				<img style = "width: 30px; height: 30px" src="https://res.cloudinary.com/dplncudbq/image/upload/v1657909273/mias/yooo_lafg9m.jpg" alt="">
		</div>
	</div>
	`
    return cod
}

function saludar(text){
	alert(text);
}

function crearArreglo(text, referencia){
	let arr = []
	let cod =  '';
	for (let u = 0; u < text.length; u++) {
		
		if(text[u] == referencia){
			arr.push(cod)
			cod = ''
		} else {
			cod += text[u]
		}
	}
	arr.push(cod)
	return arr
}

function actualizarDicc(idRuta, Valor){
	console.log(`actualizarDicc: idRuta: ${idRuta}, Valor: ${Valor}`);
	
	let nuevoValor = Valor
	
	if(nuevoValor == ''){
		//alert('ni idea')
	}	console.log(`actualizarDicc: nuevoValor: ${nuevoValor}`);

	let arr = crearArreglo(idRuta, '$')
	console.log(arr);
	if(arr.length == 4){
		console.log(`diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}] = '${nuevoValor}';`);
		eval(`diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}] = '${nuevoValor}';`)
	} else { // pensado para los que tienen arreglos en la parte final de el diccionario
		console.log(`diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}][${arr[4]}] = '${nuevoValor}';`);
		eval(`diccionario[${arr[0]}].${arr[1]}.${arr[2]}[${arr[3]}][${arr[4]}] = '${nuevoValor}';`)
	}


	console.log(diccionario);
	traducirDiccionario('porAhora')
}


function retornarToast(){
	let cod = `<H3 id='toast' style='display: none; color: black; background: white;'></H3>`
	return cod
}

function avisoCorto(mensaje){
	let toast = document.getElementById('toast')
	toast.style.display = 'flex'
	toast.innerText = mensaje
	setTimeout(cerraAviso, 1000)
}

function cerraAviso(){
	//console.log('entra');
	let toast = document.getElementById('toast')
	toast.style.display = 'none'
}

