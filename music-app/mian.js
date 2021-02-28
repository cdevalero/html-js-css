// Esto significa que despues que la ventana cargue ('load') lo que esta dentro de la funcion empezara
window.addEventListener('load', () =>{
    const sounds = document.querySelectorAll('.sound');
    const pads = document.querySelectorAll('.pads div');

    const visual = document.querySelector('.visual');
    const colors = [
        'purple',
        'grey',
        'yellow',
        'red',
        'black',
        'blue'
    ];

    //Activar sonidos
    pads.forEach((pad, index) =>{
        pad.addEventListener('click', function(){
            sounds[index].currentTime = 0;
            sounds[index].play();

            createbubbles(index);
        });
    });

    //Animacion de burbuja
    const createbubbles = index => {
        const bubble = document.createElement('div');
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[index];
        bubble.style.animation = 'jump 1s ease';
        bubble.addEventListener('animationend', function() {
            visual.removeChild(this);
        })
    }
});