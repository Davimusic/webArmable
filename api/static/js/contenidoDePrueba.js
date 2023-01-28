//'nombre': 'color'     ${diccTra[u]} { 
    let arrNombre = ['color', 'girar90']    
    let diccClasesPropias = 
        [{'duracion': '2s', 'colorDeFondo': 'blue', 'despues': {'colorDeFondo':'green', 'colorDeLetra': 'white'}}, {'duracion': '3s', 'girar1': 'rotate(0deg)', 'despues':{'girar2': 'rotate(90deg)'}}]
    let diccTra =  [{'duracion': 'transition', 'colorDeFondo': 'background', 'colorDeLetra': 'color', 'despues': ':hover', 'girar1':'transform', 'girar2':'transform'}]  
    
    let cod = ''
    
    let bandera = 0
    for (let e = 0; e < arrNombre.length; e++){
        cod += ` .${arrNombre[e]}{ `
        for (let u in diccClasesPropias[e]) {
            if(typeof(diccClasesPropias[e][u]) != 'string'){
                for (let i in diccClasesPropias[e][u]) {
                    if(bandera == 0){
                        bandera = 1;
                        cod += `} .${arrNombre[e]}${diccTra[0]['despues']} {`
                    }
                    cod += ` ${diccTra[0][i]}: ${diccClasesPropias[e][u][i]}; `
                }
            } else {
                cod += `${diccTra[0][u]}: ${diccClasesPropias[e][u]}; `
            }
        }
        bandera = 0
        cod += `}`
    }
    
    console.log(cod);
    
    let style = document.createElement('style')
    style.innerHTML = cod
    document.head.appendChild(style);
    
    
    
    
    
    /**console.log(Object.keys(arreDiccClasesPropias[u]).length);
        for (i in arreDiccClasesPropias[u]) {
            console.log(arreDiccClasesPropias[u][i]);
        } */