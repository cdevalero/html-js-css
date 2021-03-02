let degreedContainer = document.querySelector('.temperature--degree--container');
let degreed = document.querySelector('.temperature--degree');
let simbol = document.querySelector('.simbol');
var latitude;
var longitude;

window.addEventListener('load', () => {
    let timezone = document.querySelector('.location--timezone');
    let description = document.querySelector('.temperature--description');
    let body = document.querySelector('body');
    let iconTemp = document.querySelector('.icon');
    let today = new Date();
    let time = today.getHours();

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            const api = 'http://api.weatherapi.com/v1/forecast.json?key=10b25c61254b42369dc31244210103&q='+ latitude +','+ longitude +'&days=1&aqi=no&alerts=no';
            fetch(api).then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                const {temp_c} = data.current;
                const {icon, text} = data.current.condition;
                const {tz_id} = data.location;
                degreed.textContent = temp_c;
                timezone.textContent = tz_id;
                description.textContent = text;
                iconTemp.src = icon.replace('//cdn.weatherapi.com/weather/64x64', 'icon');

                const timeline = anime.timeline({
                    duration: 750,
                    easing: "easeOutExpo"
                });
                // Night Background
                if (false) {
                    timeline.add({
                        targets: 'body',
                        background: "linear-gradient(rgba(45,49,83,1) 0%, rgba(0,0,0,1) 72%)"
                    });
                }
                // Heat Background
                else if (parseInt(temp_c) >= 23){
                    timeline.add({
                        targets: 'body',
                        background: "linear-gradient(rgb(218,146,82), rgb(255,107,0))"
                    });
                }
            });
        });
    }
});

degreedContainer.addEventListener('click', () => {
    const api = 'http://api.weatherapi.com/v1/forecast.json?key=10b25c61254b42369dc31244210103&q='+ latitude +','+ longitude +'&days=1&aqi=no&alerts=no';
    fetch(api).then(response => {
        return response.json()
    }).then(data => {
        const {temp_c} = data.current;
        const {temp_f} = data.current;
        if (simbol.textContent == '°C') {
            simbol.textContent = '°F';
            degreed.textContent = temp_f;
        }
        else {
            simbol.textContent = '°C';
            degreed.textContent = temp_c;
        }
    });
});