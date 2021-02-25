const moonPath = "M15.5 27.5C15.5 42.6878 27.5 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C27.5 0 15.5 12.3122 15.5 27.5Z";

const sunPath = "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";

const dackMode = document.querySelector('#darkMode');       //Se usa el # identificar un id

let toggle = false;

dackMode.addEventListener('click', () => {
    // Use anime.js
    // Aqui colocamos la linea de tiempo
    const timeline = anime.timeline({
        duration: 750,
        easing: "easeOutExpo"
    });
    // Agregar diferentes animaciones al timeline
    timeline.add({
        targets: '.sun',
        d:[{value: toggle ? sunPath : moonPath}]
    })
    .add({
        targets: '#darkMode',
        rotate: toggle ? 0 : 320
    }, "-=320") 
    .add ({
        targets: "section",
        // El operador ? funciono si => es True toma el primer valor; si es false toma el segundo valor 
        backgroundColor: toggle ? "rgb(172,216,230)" : "rgb(17,0,20)",
        color: toggle ? "rgb(0,0,0)" : "rgb(255,255,255)"
    }, "-=650");
    if (!toggle) {
        toggle = true;
    }else{
        toggle = false;
    }
});
