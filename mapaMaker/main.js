document.addEventListener('DOMContentLoaded', () => {
    const map = document.querySelector('.map')
    const matrix = []

    // Tamaño del mapa
    const size = 40

    // Cantidad de semillas iniciales
    const seed = 40

    // Tamaño de los Biomas generales
    const size_artico = size*0.1
    const size_desert = size*0.2
    const size_templeate = size*0.3

    // Constantes de Probabilidad de aparcicion 
    const subBiomes_probability = 10
    const resorce_probability = 3

    // Tipos de Biomas
    const biomes = {
        'oceano':[0,'url("img/titles/Oceano.png")'],
        'tierra':[1,'url("img/titles/Tierra.png")'],
        'costa':[2,'url("img/titles/Costa.png")'],
        'nieve':[3,'url("img/titles/Nieve.png")'],
        'desierto':[4,'url("img/titles/Desierto.png")'],

        'jungla':[5,'url("img/titles/Jungla.png")'],
        'bosque':[6,'url("img/titles/Bosque.png")'],

        'colina':[7,'url("img/titles/Colinas_Tierra.png")','url("img/titles/Colinas_Nieve.png")'],
        'dunas':[8,'url("img/titles/Dunas.png")'],

        'oasis':[9,'url("img/titles/Oasis.png")'],
        'montana':[10,'url("img/titles/Montana_Tierra.png")','url("img/titles/Montana_Nieve.png")'],

        'atolon':[11,'url("img/titles/Atolon.png")'],
        'iceberg':[12,'url("img/titles/Iceberg_Oceano.png")','url("img/titles/Iceberg_Costa.png")'],

        'plains':[13,'url("img/titles/Plains.png")'],
        'tundra':[14,'url("img/titles/Tundra.png")'],
    }

    // Tipos de resorces
    const resourses = {
        // 0 -> nada
        'ballena':['A','url("img/resource/Ballena.png")'],
        'caballo':['B','url("img/resource/Caballos.png")'],
        'marfil':['C','url("img/resource/Marfil.png")'],
        'peces':['D','url("img/resource/Peces.png")'],
        'ganado':['E','url("img/resource/Ganado.png")'],

        'maiz':['F','url("img/resource/Maiz.png")'],
        'trigo':['G','url("img/resource/Trigo.png")'],
        'azucar':['H','url("img/resource/Azucar.png")'],
        'fruta':['I','url("img/resource/Fruta.png")'],
        'cafe':['J','url("img/resource/Cafe.png")'],

        'oro':['K','url("img/resource/Oro.png")'],
        'joyas':['L','url("img/resource/Joyas.png")'],
        'plata':['M','url("img/resource/Plata.png")'],
        'metal':['N','url("img/resource/Metal.png")'],

        'petroleo':['O','url("img/resource/Petroleo.png")'],
        'gas':['P','url("img/resource/Gas.png")'],
        'uranio':['Q','url("img/resource/Uranio.png")'],
        'termal':['R','url("img/resource/Termal.png")'],
        'carbon':['S','url("img/resource/Carbon.png")'],
    }
    
    //Llena el mapa de casillas de oceano(blue) y llena la matrix de datos
    function fillMatrix(matrix){
        for (let i = 0; i < size; i++) {
            matrix[i] = []
            for (let j = 0; j < size; j++) {
                const title = document.createElement('div')
                title.setAttribute('id',biomes['oceano'][0])
                title.setAttribute('resorce',0)
                title.style.background = biomes['oceano'][1]
                
                map.appendChild(title)
                matrix[i][j] = title
            }
        }
    }

    //Coloca 7 title de tierra(verdes) y le cambia su id a 1
    function plantSeed(matrix){
        for (let i = 0; i < seed; i++) {
            let x = Math.floor(Math.random() * size)
            let y = Math.floor(Math.random() * size)
            matrix[y][x].style.background = biomes['tierra'][1]
            matrix[y][x].setAttribute('id',biomes['tierra'][0])
        }
    }
    
    //Busca las title de tierra-seed y envia xy a makeCircle()
    function makeEarth(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j].getAttribute('id')==biomes['tierra'][0]){
                    let x = j
                    let y = i
                    makeCircle(x,y,matrix)
                }
            }
        }
        trueEarth(matrix)
    }

    //Dado en punto xy de la seed, lo convierte en un circulo de tierra de 5x5
    function makeCircle(x,y,matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if ((j-x)**2 + (i-y)**2 < 25){
                    matrix[i][j].style.background = biomes['tierra'][1] 
                    matrix[i][j].setAttribute('id',3)
                }
            }
        }
    }

    //Resuelve el id auxiliar 2 colocado en makeCircle() pasandolo de 2 a 1->(tierra)
    function trueEarth(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j].getAttribute('id')==3){
                    matrix[i][j].setAttribute('id',biomes['tierra'][0])
                }
            }
        }
    }

    //Rodea la tierra(verde) de costa(azul claro)
    function makeCoast(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j].getAttribute('id')==biomes['oceano'][0]){
                    if(i-1 >= 0){
                        if (matrix[i-1][j].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i-1][j].style.background = biomes['costa'][1]
                            matrix[i-1][j].setAttribute('id',biomes['costa'][0])
                        }
                    }
                    if(i+1 < size){
                        if (matrix[i+1][j].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i+1][j].style.background = biomes['costa'][1] 
                            matrix[i+1][j].setAttribute('id',biomes['costa'][0])
                        }
                    }
                    if(j-1 >= 0){
                        if (matrix[i][j-1].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i][j-1].style.background = biomes['costa'][1] 
                            matrix[i][j-1].setAttribute('id',biomes['costa'][0])
                        }
                    }
                    if(j+1 < size){
                        if (matrix[i][j+1].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i][j+1].style.background = biomes['costa'][1] 
                            matrix[i][j+1].setAttribute('id',biomes['costa'][0])
                        }
                    }  
                    
                    if(i-1 >= 0 && j-1 >= 0){
                        if (matrix[i-1][j-1].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i-1][j-1].style.background = biomes['costa'][1] 
                            matrix[i-1][j-1].setAttribute('id',biomes['costa'][0])
                        }
                    }
                    if(i+1 < size && j-1 >= 0){
                        if (matrix[i+1][j-1].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i+1][j-1].style.background = biomes['costa'][1] 
                            matrix[i+1][j-1].setAttribute('id',biomes['costa'][0])
                        }
                    }
                    if(i-1 >= 0 && j+1 < size){
                        if (matrix[i-1][j+1].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i-1][j+1].style.background = biomes['costa'][1] 
                            matrix[i-1][j+1].setAttribute('id',biomes['costa'][0])
                        }
                    }
                    if(i+1 < size && j+1 < size){
                        if (matrix[i+1][j+1].getAttribute('id')==biomes['tierra'][0]){
                            matrix[i+1][j+1].style.background = biomes['costa'][1] 
                            matrix[i+1][j+1].setAttribute('id',biomes['costa'][0])
                        }
                    }
                }
            }
        } 
    }

    //Crear los biomas basicos (Artico, Tierra, Desierto)
    function makeBiomes(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j].getAttribute('id')==biomes['tierra'][0]){
                    if (i < size_artico || i >= size-size_artico){
                        matrix[i][j].style.background = biomes['nieve'][1] 
                        matrix[i][j].setAttribute('id',biomes['nieve'][0])
                    }
                    if (i == size_artico || i == size-size_artico-1){
                        let p = Math.floor(Math.random() * 99)
                        if (p > 50){
                            matrix[i][j].style.background = biomes['nieve'][1] 
                            matrix[i][j].setAttribute('id',biomes['nieve'][0])
                        }
                    }
                    if (i >= size_artico+size_templeate && i < size_artico+size_templeate+size_desert){
                        matrix[i][j].style.background = biomes['desierto'][1] 
                        matrix[i][j].setAttribute('id',biomes['desierto'][0] )
                    }
                    if (i == size_artico+size_templeate-1 || i == size_artico+size_templeate+size_desert){
                        let p = Math.floor(Math.random() * 99)
                        if (p > 50){
                            matrix[i][j].style.background = biomes['desierto'][1]  
                            matrix[i][j].setAttribute('id',biomes['desierto'][0])
                        }
                    }
                }
            }
        }
    }

    // Agrega todos los SubBiomas
    function makeSubBiomes(matrix){
        //SubBioma -> Tundra, Pradera
        makeSubBiomeTundraPlains(matrix)
        // SubBioma -> Colinas o Dunas 
        makeSubBiomeHill(matrix)
        // SubBioma -> Selva y Bosque
        makeSubBiomeJungleForest(matrix)
        // SubBioma -> Oasis o Montañas
        makeSubBiomeOasisMountain(matrix)
        // SubBioma -> Atolon o Iceberg
        makeSubBiomeAtolonIce(matrix)
    }

    // Agrega SubBiomas de Selva y Bosque 
    function makeSubBiomeJungleForest(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j].getAttribute('id')==biomes['tierra'][0] || matrix[i][j].getAttribute('id')==biomes['plains'][0]){
                    let p = Math.floor(Math.random() * 99)
                    if (p < subBiomes_probability*2){
                        // Jungle type
                        if (i > size/2){
                            matrix[i][j].style.background = biomes['jungla'][1]  
                            matrix[i][j].setAttribute('id',biomes['jungla'][0] )
                        }
                        // Forest type
                        else{
                            matrix[i][j].style.background = biomes['bosque'][1]  
                            matrix[i][j].setAttribute('id',biomes['bosque'][0] )
                        }
                    }
                }
            }
        }
    }

    // Agrega SubBiomas de Colinas o Dunas
    function makeSubBiomeHill(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let p = Math.floor(Math.random() * 99)
                if (p < subBiomes_probability){
                    // Dunas Type
                    if (matrix[i][j].getAttribute('id')==biomes['desierto'][0]){
                        matrix[i][j].style.background = biomes['dunas'][1] 
                        matrix[i][j].setAttribute('id',biomes['dunas'][0])
                    }
                    // Hill Type
                    else if (matrix[i][j].getAttribute('id')==biomes['tierra'][0]){
                        matrix[i][j].style.background = biomes['colina'][1]
                        matrix[i][j].setAttribute('id',biomes['colina'][0])
                    }
                    else if (matrix[i][j].getAttribute('id')==biomes['nieve'][0]){
                        matrix[i][j].style.background = biomes['colina'][2]
                        matrix[i][j].setAttribute('id',biomes['colina'][0])
                    }
                }   
            }
        }
    }

    // Agrega SubBiomas de Montana o Oasis
    function makeSubBiomeOasisMountain(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let p = Math.floor(Math.random() * 99)
                if (p < subBiomes_probability-1){
                    // Oasis Type
                    if (matrix[i][j].getAttribute('id')==biomes['desierto'][0]){
                        matrix[i][j].style.background = biomes['oasis'][1] 
                        matrix[i][j].setAttribute('id',biomes['oasis'][0])
                    }
                    // Montana Type
                    else if (matrix[i][j].getAttribute('id')==biomes['tierra'][0]){
                        matrix[i][j].style.background = biomes['montana'][1] 
                        matrix[i][j].setAttribute('id',biomes['montana'][0])
                    }
                    else if (matrix[i][j].getAttribute('id')== biomes['nieve'][0]){
                        matrix[i][j].style.background = biomes['montana'][2] 
                        matrix[i][j].setAttribute('id',biomes['montana'][0])
                    }
                }   
            }
        }
    }

    // Agrega SubBiomas de Atolon o Iceberg
    function makeSubBiomeAtolonIce(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j].getAttribute('id')==biomes['costa'][0]){
                    let p = Math.floor(Math.random() * 99)
                    if (p < subBiomes_probability){
                        // Atolon type
                        if (i > size_artico+1 && i < size-size_artico-1){
                            matrix[i][j].style.background = biomes['atolon'][1] 
                            matrix[i][j].setAttribute('id',biomes['atolon'][0])
                        }
                        // Iceberg type
                        else if (i < size_artico || i > size-size_artico){
                            matrix[i][j].style.background = biomes['iceberg'][2] 
                            matrix[i][j].setAttribute('id',biomes['iceberg'][0])
                        }
                    }
                } else if (matrix[i][j].getAttribute('id')==biomes['oceano'][0]){
                    let p = Math.floor(Math.random() * 99)
                    if (p < subBiomes_probability*3+15){
                        // Iceberg type
                        if (i < size_artico || i > size-size_artico){
                            matrix[i][j].style.background = biomes['iceberg'][1]
                            matrix[i][j].setAttribute('id',biomes['iceberg'][0])
                        }
                    }
                }
            }
        }
    }

    // Agrega SubBiomas de Tundra o Plains
    function makeSubBiomeTundraPlains(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let p = Math.floor(Math.random() * 99)
                if (p < subBiomes_probability*3){
                    // Tundra Type
                    if (matrix[i][j].getAttribute('id')==biomes['nieve'][0]){
                        matrix[i][j].style.background = biomes['tundra'][1] 
                        matrix[i][j].setAttribute('id',biomes['tundra'][0])
                    }
                    // Plains Type
                    else if (matrix[i][j].getAttribute('id')==1){
                        matrix[i][j].style.background = biomes['plains'][1]
                        matrix[i][j].setAttribute('id',biomes['plains'][0])
                    }
                }   
            }
        }
    }  
    
    // Agregar recursos
    function addResource(matrix){
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j].getAttribute('resorce') == '0'){
                    const resorce = document.createElement('div')
                    resorce.style.height = '30px'
                    resorce.style.width = '30px'
                    //  Oceano 
                    if (matrix[i][j].getAttribute('id') == biomes['oceano'][0]){
                        // -> Ballenas
                        if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['ballena'][0])
                            resorce.style.background = resourses['ballena'][1]
                        }
                        // -> Petroleo
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['petroleo'][0])
                            resorce.style.background = resourses['petroleo'][1]
                        }
                        // -> Gas
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['gas'][0])
                            resorce.style.background = resourses['gas'][1]
                        }
                        // -> Peces
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['peces'][0])
                            resorce.style.background = resourses['peces'][1]
                        }
                    }
                    // Tierra
                    if (matrix[i][j].getAttribute('id') == biomes['tierra'][0]){
                        // -> Caballos
                        if (Math.floor(Math.random() * 99) < resorce_probability+2){
                            matrix[i][j].setAttribute('resorce',resourses['caballo'][0])
                            resorce.style.background = resourses['caballo'][1]
                        }
                        // -> Ganado
                        else if (Math.floor(Math.random() * 99) < resorce_probability+2){
                            matrix[i][j].setAttribute('resorce',resourses['ganado'][0])
                            resorce.style.background = resourses['ganado'][1]
                        }
                        // -> Trigo
                        else if ((Math.floor(Math.random() * 99) < resorce_probability+2)&&(i < size/2)){
                            matrix[i][j].setAttribute('resorce',resourses['trigo'][0])
                            resorce.style.background = resourses['trigo'][1]
                        }
                        // -> Maiz
                        else if ((Math.floor(Math.random() * 99) < resorce_probability+2)&&(i > size/2)){
                            matrix[i][j].setAttribute('resorce',resourses['maiz'][0])
                            resorce.style.background = resourses['maiz'][1]
                        }
                        // -> Azucar
                        else if ((Math.floor(Math.random() * 99) < resorce_probability+2)){
                            matrix[i][j].setAttribute('resorce',resourses['azucar'][0])
                            resorce.style.background = resourses['azucar'][1]
                        }
                        // -> Fruta
                        else if ((Math.floor(Math.random() * 99) < resorce_probability+2)&&(i > size/2)){
                            matrix[i][j].setAttribute('resorce',resourses['fruta'][0])
                            resorce.style.background = resourses['fruta'][1]
                        }
                        // -> Cafe
                        else if ((Math.floor(Math.random() * 99) < resorce_probability+2)&&(i < size/2)){
                            matrix[i][j].setAttribute('resorce',resourses['cafe'][0])
                            resorce.style.background = resourses['cafe'][1]
                        }
                    }
                    //  Costa 
                    if (matrix[i][j].getAttribute('id') == biomes['costa'][0]){
                        // -> Ballenas
                        if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['ballena'][0])
                            resorce.style.background = resourses['ballena'][1]
                        }
                        // -> Peces
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['peces'][0])
                            resorce.style.background = resourses['peces'][1]
                        }
                    }
                    //  Nieve 
                    if (matrix[i][j].getAttribute('id') == biomes['nieve'][0]){
                        // -> Termal
                        if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['termal'][0])
                            resorce.style.background = resourses['termal'][1]
                        }
                        // -> Petroleo
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['petroleo'][0])
                            resorce.style.background = resourses['petroleo'][1]
                        }
                        // -> Gas
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['gas'][0])
                            resorce.style.background = resourses['gas'][1]
                        }
                        // -> uranio
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['uranio'][0])
                            resorce.style.background = resourses['uranio'][1]
                        }
                    }
                    //  Desierto 
                    if (matrix[i][j].getAttribute('id') == biomes['desierto'][0]){
                        // -> Marfil
                        if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['marfil'][0])
                            resorce.style.background = resourses['marfil'][1]
                        }
                        // -> Petroleo
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['petroleo'][0])
                            resorce.style.background = resourses['petroleo'][1]
                        }
                        // -> Gas
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['gas'][0])
                            resorce.style.background = resourses['gas'][1]
                        }
                        // -> uranio
                        else if (Math.floor(Math.random() * 99) < resorce_probability){
                            matrix[i][j].setAttribute('resorce',resourses['uranio'][0])
                            resorce.style.background = resourses['uranio'][1]
                        }
                    }
                    //  Jungla 
                    if (matrix[i][j].getAttribute('id') == biomes['jungla'][0]){
                        // -> Fruta
                        if ((Math.floor(Math.random() * 99) < resorce_probability+2)){
                            matrix[i][j].setAttribute('resorce',resourses['fruta'][0])
                            resorce.style.background = resourses['fruta'][1]
                        }
                    }
                    // -> Bosque 
                    if (matrix[i][j].getAttribute('id') == biomes['bosque'][0]){
                        // -> Caballos
                        if (Math.floor(Math.random() * 99) < resorce_probability+2){
                            matrix[i][j].setAttribute('resorce',resourses['caballo'][0])
                            resorce.style.background = resourses['caballo'][1]
                        }
                    }
                    // -> Colinas 
                    if (matrix[i][j].getAttribute('id') == biomes['colina'][0]){
                        // -> Oro
                        if (Math.floor(Math.random() * 99) < resorce_probability*2){
                            matrix[i][j].setAttribute('resorce',resourses['oro'][0])
                            resorce.style.background = resourses['oro'][1]
                        }
                        // -> Plata
                        else if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['plata'][0])
                            resorce.style.background = resourses['plata'][1]
                        }
                        // -> Joyas
                        else if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['joyas'][0])
                            resorce.style.background = resourses['joyas'][1]
                        }
                        // -> Metal
                        else if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['metal'][0])
                            resorce.style.background = resourses['metal'][1]
                        }
                        // -> Carbon
                        else if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['carbon'][0])
                            resorce.style.background = resourses['carbon'][1]
                        }
                        // -> uranio
                        else if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['uranio'][0])
                            resorce.style.background = resourses['uranio'][1]
                        }
                    }
                    // -> Dunas 
                    if (matrix[i][j].getAttribute('id') == biomes['dunas'][0]){
                        // -> Carbon
                        if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['carbon'][0])
                            resorce.style.background = resourses['carbon'][1]
                        }
                        // -> uranio
                        else if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['uranio'][0])
                            resorce.style.background = resourses['uranio'][1]
                        }
                    }
                    // -> Plains 
                    if (matrix[i][j].getAttribute('id') == biomes['plains'][0]){
                        // -> Ganado
                        if (Math.floor(Math.random() * 99) < resorce_probability*3){
                            matrix[i][j].setAttribute('resorce',resourses['ganado'][0])
                            resorce.style.background = resourses['ganado'][1]
                        }
                    }
                    matrix[i][j].appendChild(resorce)
                }
            }
        }
    }

    fillMatrix(matrix)
    plantSeed(matrix)
    makeEarth(matrix)
    makeCoast(matrix)
    makeBiomes(matrix)
    makeSubBiomes(matrix)
    addResource(matrix)

});