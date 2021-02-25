document.querySelector(".tema").addEventListener("click", () => {
    if (document.querySelector(".tema.dark")) {
        document.getElementById("tema--img").src = "img/moon.png";
        document.querySelector('main').style.background = 'linear-gradient(to right top, #65dfc9, #6cdbeb)';
        document.querySelector('.glass').style.background = 'linear-gradient(to right bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.3))'
        document.querySelector('.tema').classList.toggle('dark')
    }
    else {
        document.getElementById("tema--img").src = "img/sun.png";
        document.querySelector('main').style.background = 'linear-gradient(to right top, rgba(40,72,96,0.9125915014443278), rgba(0,0,0,0.8565690924807423))';
        document.querySelector('.glass').style.background = 'linear-gradient(to right bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))'
        document.querySelector('h1').style.color = 'white';
        document.querySelector('.tema').classList.toggle('dark')
    }
});
