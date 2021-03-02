let degreedContainer = document.querySelector('.temperature--degree--container');
let degreed = document.querySelector('.temperature--degree');
let simbol = document.querySelector('.simbol');
let timezone = document.querySelector('.location--timezone');
let description = document.querySelector('.temperature--description');
let body = document.querySelector('body');
let iconTemp = document.querySelector('.icon');
let today = new Date();
let time = today.getHours();
var latitude;
var longitude;

async function findIp(url) {
    const res = await fetch(url);
    return await res.json();
}

function getClientPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const api = 'http://api.weatherapi.com/v1/forecast.json?key=10b25c61254b42369dc31244210103&q=' + latitude + ',' + longitude + '&days=1&aqi=no&alerts=no';
    fetch(api).then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        const { temp_c } = data.current;
        const { icon, text } = data.current.condition;
        const { tz_id } = data.location;
        degreed.textContent = temp_c;
        timezone.textContent = tz_id;
        description.textContent = text;
        iconTemp.src = icon.replace('//cdn.weatherapi.com/weather/64x64', 'icon');

        const timeline = anime.timeline({
            duration: 750,
            easing: "easeOutExpo"
        });
        // Night Background
        if (time >= 19 || time <= 6) {
            timeline.add({
                targets: 'body',
                background: "linear-gradient(rgba(45,49,83,1) 0%, rgba(0,0,0,1) 72%)"
            });
        }
        // Heat Background
        else if (parseInt(temp_c) >= 23) {
            timeline.add({
                targets: 'body',
                background: "linear-gradient(rgb(218,146,82), rgb(255,107,0))"
            });
        }
    });
}

function geoAlternativeIp(position) {
    findIp("https://api.ipdata.co?api-key=54d1b4b585a368a01e8ae452579a8d64a87d21a95264e17142a95c70").then(address => {
        const api = "http://api.weatherapi.com/v1/current.json?key=10b25c61254b42369dc31244210103&q=" + address.ip + "&aqi=no";
        fetch(api).then(response => {
            return response.json()
        }).then(data => {
            const { temp_c } = data.current;
            const { icon, text } = data.current.condition;
            const { tz_id } = data.location;
            degreed.textContent = temp_c;
            timezone.textContent = tz_id;
            description.textContent = text;
            iconTemp.src = icon.replace('//cdn.weatherapi.com/weather/64x64', 'icon');

            const timeline = anime.timeline({
                duration: 750,
                easing: "easeOutExpo"
            });
            // Night Background
            if (time >= 19 || time <= 6) {
                timeline.add({
                    targets: 'body',
                    background: "linear-gradient(rgba(45,49,83,1) 0%, rgba(0,0,0,1) 72%)"
                });
            }
            // Heat Background
            else if (parseInt(temp_c) >= 23) {
                timeline.add({
                    targets: 'body',
                    background: "linear-gradient(rgb(218,146,82), rgb(255,107,0))"
                });
            }
        });
    });
}

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => getClientPosition(position), position => geoAlternativeIp(position));
    }
});

degreedContainer.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const api = 'http://api.weatherapi.com/v1/forecast.json?key=10b25c61254b42369dc31244210103&q=' + latitude + ',' + longitude + '&days=1&aqi=no&alerts=no';
        fetch(api).then(response => {
            return response.json()
        }).then(data => {
            const { temp_c } = data.current;
            const { temp_f } = data.current;
            if (simbol.textContent == '°C') {
                simbol.textContent = '°F';
                degreed.textContent = temp_f;
            }
            else {
                simbol.textContent = '°C';
                degreed.textContent = temp_c;
            }
        });
    }, position => {
        findIp("https://api.ipdata.co?api-key=54d1b4b585a368a01e8ae452579a8d64a87d21a95264e17142a95c70").then(address => {
            const api = "http://api.weatherapi.com/v1/current.json?key=10b25c61254b42369dc31244210103&q=" + address.ip + "&aqi=no";
            fetch(api).then(response => {
                return response.json()
            }).then(data => {
                const { temp_c } = data.current;
                const { temp_f } = data.current;
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
    });
});