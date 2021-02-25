// Aqui asosiamos el class game--status a statusDispaly
const stautsPartida = document.querySelector('.game--status');

const contadorX = document.querySelector('.der--number');
const contadorY = document.querySelector('.izq--number');

// Esta variable la usamos para saber si el juego esta en pausa
let statusJuego = true;

// Esta variable se usa para saber cual es el jugador en turno
let jugador = "X";

let color = 'blue';

let valorX = 0;
let valorY = 0;

//Para saber como avanza el juego lo guardaremos en un array
let estadoJuego = ["", "", "", "", "", "", "", "", ""];

//Condicion de victria
const victoriaSi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Mensajes para que el usuario vea el estatus
// Estas son un tipo de funciones
const mensajeGanar = () => `El jugador ${jugador} a ganado!`;
const mensajeEmpate = () => `Empate >:(`;
const mensajeTurnoJugador = () => `Turno del jugador ${jugador}`;

const mensajeX = () => `${valorX}`;
const mensajeY = () => `${valorY}`;

function cellJugador(cellClick, cellIndex) {
    estadoJuego[cellIndex] = jugador; // Guarda el turno del jugador en memoria
    cellClick.innerHTML = jugador; // Altera el elemento HTML para que muestre la marca del jugador
    cellClick.style.color = color; // Asigna color al objeto HTML; los style vienen del CSS
}

function cambioJugador() {
    jugador = jugador === "X" ? "O" : "X";
    color = color === 'blue' ? 'red': 'blue';
    stautsPartida.innerHTML = mensajeTurnoJugador();
}

function contadorGanado (ganadorPunto) {
    if (ganadorPunto === 'X') {
        valorX = valorX + 1;
        contadorX.innerHTML = mensajeX();
    }
    if (ganadorPunto === 'O') {
        valorY = valorY + 1;
        contadorY.innerHTML = mensajeY();
    }
    
}

function validarResultados() {
    let ganador = false;
    for (let i = 0; i <= 7; i++){
        const prueba = victoriaSi[i];
        let a = estadoJuego[prueba[0]];
        let b = estadoJuego[prueba[1]];
        let c = estadoJuego[prueba[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b === c){
            ganador = true;
            contadorGanado(a);
            break
        }
    }
    if (ganador){
        stautsPartida.innerHTML = mensajeGanar();
        statusJuego = false;
        return;
    }
    let pruebaEmpate = !estadoJuego.includes("");
    if (pruebaEmpate) {
        stautsPartida.innerHTML = mensajeEmpate();
        statusJuego = false;
        return;
    }
    cambioJugador();
}

function clickJugador(click) {
    const cellClick = click.target; // Guarda el elemento HTML al que se le dio click
    const cellIndex = parseInt(cellClick.getAttribute('data-cell-index')); // obtiene el atributo index
    if (estadoJuego[cellIndex] != "" || !statusJuego) {  //Comprueba si el juego empezo o esta en pausa
        return;
    }
    cellJugador(cellClick, cellIndex);
    validarResultados();
}


function reinicioJuego() {
    statusJuego = true;
    estadoJuego = ["", "", "", "", "", "", "", "", ""];
    stautsPartida.innerHTML = mensajeTurnoJugador();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//Mensaje inicio de partida
stautsPartida.innerHTML = mensajeTurnoJugador();
contadorX.innerHTML = mensajeX();
contadorY.innerHTML = mensajeY();


/* .addEventListener es una funcion que debido a una accion HTML DOM Events (ejm: click)
    da como resultado una funcion (ejmp: clickJugador) */
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickJugador));
document.querySelector('.game--restart').addEventListener('click', reinicioJuego); 