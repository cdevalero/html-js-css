document.addEventListener('DOMContentLoaded', () => {

    // Constantes de juego base
    const grid = document.querySelector('.grid')
    const width = 8
    const squeres = []

    let score = 0

    // Colores de las fichas
    const colors = [
        'red',
        'yellow',
        'orange',
        'black',
        'purple',
        'blue'
    ]

    // Variables de movimiento de ficha
    let ColorSquereSelec
    let idSquereSelec
    let ColorSquereDrop
    let idSquereDrop

    // Funcion para crear el tablero
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const squere = document.createElement('div')

            //Hace que las fichas se puedan arrastrar
            squere.setAttribute('draggable', true)

            //Hace que se le asigne un ID a cada ficha
            squere.setAttribute('id', i)

            //squere.innerHTML = squere.getAttribute('id')

            // Hace que las fichas tengan un color random, de entre una lista de colores
            let randColor = Math.floor(Math.random() * colors.length)
            squere.style.backgroundColor = colors[randColor]
            squere.style.borderRadius = '50%'
            

            grid.appendChild(squere)
            squeres.push(squere)
        }
        tryMatch()
        cascade()
        score = 0
    }

    // Funciones de movimiento de ficha
    function dragStart() {
        // guarda su color e id
        ColorSquereSelec = this.style.backgroundColor
        idSquereSelec = parseInt(this.id)
    }
    function dragDrop() {
        // guarda su color e id
        ColorSquereDrop = this.style.backgroundColor
        idSquereDrop = parseInt(this.id)

        // Cambia el color de la ficha seleccionada con el de la ficha final
        /*squeres[idSquereSelec].style.backgroundColor = ColorSquereDrop
        this.style.backgroundColor = ColorSquereSelec*/
    }
    function dragOver(e) {
        e.preventDefault()
    }
    function dragEnter(e) {
        e.preventDefault()
    }
    function dragEnd() {
        // Definir movimientos validos
        let validSquere = [
            idSquereSelec - 1,
            idSquereSelec + 1,
            idSquereSelec - width,
            idSquereSelec + width
        ]
        // includes verifica si la ficha final esta dentros de los validSquere
        let validMove = validSquere.includes(idSquereDrop)


        // Si es un movimiento valido hace el cambio, sino elimina el 
        if (validMove) {
            squeres[idSquereDrop].style.backgroundColor = ColorSquereSelec
            squeres[idSquereSelec].style.backgroundColor = ColorSquereDrop
            // Comprueba si hay un MATCH 3
            tryMatch()
        }
        else if (!validMove) {
            idSquereDrop = null
        }
    }
    function dragLeave() {

    }

    // Funcion para verificar MATCH 3 row
    function checkMatchThreeRow() {
        // Se verifica solo 61 porque para los ultimos dos recuadros no existirian otros dos adelante
        for (let i = 0; i < (width * width) - 2; i++) {
            if (verifyIfRowThree(i)) {
                let rowOfThree = [i, i + 1, i + 2]
                let compareColor = squeres[i].style.backgroundColor
                // evita que se cree un bucle con las casillas que son blancas 
                const isBlank = squeres[i].style.backgroundColor === ''

                if (rowOfThree.every(index => squeres[index].style.backgroundColor === compareColor && !isBlank)) {
                    rowOfThree.forEach(index => squeres[index].style.backgroundColor = '')
                    score++
                    cascade()
                    tryMatch()
                }
            }
        }
    }

    // Funcion para verificar March 3 col
    function checkMatchThreeCol() {
        for (let i = 0; i < width * (width-2); i++) {
            let colOfThree = [i, i + width, i + (width*2)]
            let compareColor = squeres[i].style.backgroundColor
            // evita que se cree un bucle con las casillas que son blancas 
            const isBlank = squeres[i].style.backgroundColor === ''

            if (colOfThree.every(index => squeres[index].style.backgroundColor === compareColor && !isBlank)) {
                colOfThree.forEach(index => squeres[index].style.backgroundColor = '')
                score++
                cascade()
                tryMatch()
            }
        }
    }

    // funcion que solamente permite que se eliminen filas visuales, no tecnicas 
    function verifyIfRowThree(i) {
        if (i == 0) {
            return true
        }
        else if ((i + 1) % 8 == 0) {
            return false
        }
        else if ((i + 2) % 8 == 0) {
            return false
        }
        else {
            return true
        }
    }

    // funcion que verifica si existe algun match
    function tryMatch() {
        checkMatchThreeRow()
        checkMatchThreeCol()
    }

    // Funcion de cascada de ficha
    function cascade(){
        for (let i = 0; i < width*width; i++) {
            squareViewUp(i)
        }
    }

    function squareViewUp(i){
        if (squeres[i].style.backgroundColor == ''){
            if (i < width){
                let randColor = Math.floor(Math.random() * colors.length)
                squeres[i].style.backgroundColor = colors[randColor]
            }
            else {
                squeres[i].style.backgroundColor = squeres[i-width].style.backgroundColor
                squeres[i-width].style.backgroundColor = ''
                squareViewUp(i-width)
            }
        }
    }

    function viewScore(){
        let scoreView = document.querySelector('.score--num')
        scoreView.innerHTML = score
    }

    // Inicio de la Partida
    createBoard()

    // Mecanica de Drag
    squeres.forEach(squere => squere.addEventListener('dragstart', dragStart))
    squeres.forEach(squere => squere.addEventListener('drop', dragDrop))
    squeres.forEach(squere => squere.addEventListener('dragend', dragEnd))
    squeres.forEach(squere => squere.addEventListener('dragover', dragOver))
    squeres.forEach(squere => squere.addEventListener('dragenter', dragEnter))
    squeres.forEach(squere => squere.addEventListener('dragleave', dragLeave))

    window.setInterval(function(){
        tryMatch()
        viewScore()
    }, 100)
    

});