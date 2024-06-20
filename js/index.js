



var home = document.getElementById('home');
var searchInput = document.getElementById('city-search');
var searchBtn = document.getElementById('search-btn');


var searchInputValue;
var lat;
var lon;

navigator.geolocation.getCurrentPosition(function (e) {
    lat = (e.coords.latitude);
    lon = (e.coords.longitude);
    console.log(lat, lon);
});

function getcontry(city) {
    fetch(`https://pixabay.com/api/?key=44420507-a097c0d248be52df65a9f0d65&q=${city}`)
        .then(function (respons) {
            return respons.json();
        })
        .then(function (data) {
            console.log(data);
            displayBG(data.hits[0].largeImageURL);
            return fetch(`http://api.weatherapi.com/v1/current.json?key=dd984854cff940bea3b15415241706&q=${city}&days=3&q=lond${lon}&q=latd${lat}`);
        })
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            displayTemp(data);
            getDay(data.current.localtime);
            getDate(data.current.localtime);
            console.log(data)
        })
}


searchInput.addEventListener('input', function (e) {
    console.log(e)
    searchInputValue = searchInput.value;
});

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e)
    console.log(searchInputValue);
    getcontry(searchInputValue);
});


function displayTemp(data) {
    var box = ``;

    for (var i = 0; i < 3; i++) {
        box += `
    
        <div class="col-lg-4 item" id="item">
                    <div class="inner">
                        <div class="date">
                            <p>${getDay(data.current.localtime)}</p>
                            <p>${getDate(data.current.localtime)}</p>
                        </div>

                        <p>${data.location.name}</p>

                        <h3>${data.current.temp_c}&#8451</h3>
                        <div class="weather">
                            <p>${data.current.condition.text}</p>
                            <img src="${data.current.condition.icon}" alt="">
                        </div>
                        <ul>
                            <li><i class="fa-solid fa-water"></i><span>${data.current.humidity}%</span></li>
                            <li><i class="fa-solid fa-wind"></i><span>${data.current.wind_kph}km/h</span></li>
                            <li><i class="fa-solid fa-compass"></i><span>${data.current.wind_dir}</span></li>
                        </ul>
                    </div>
                </div>
    `
    }
    document.getElementById('card').innerHTML = box;

}


function displayBG(data) {
    home.style.cssText = ` background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)) , url(${data})`;
}

function getDate(now) {
    return Intl.DateTimeFormat('en-uk', {
        day: 'numeric',
        month: 'short',
    }).format(now)
}

function getDay(now) {
    return Intl.DateTimeFormat('en-uk', { weekday: 'long', }).format(now);
}




