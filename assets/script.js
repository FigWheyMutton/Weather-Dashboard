// var city = ('Los Angeles', 'Denver', 'San Fransisco', 'Houston', 'New York', 'Chicago', 'Miami', 'Seattle')
// var startSearch = document.getElementById('start-search')
// document.addEventListener('click', startSearch)

// function startSearch(event) {
//     var ApiKey = 'f06bbb5c970e4ceca2f445002832426b'
//     fetch('')
// }


var ApiKey = 'f06bbb5c970e4ceca2f445002832426b';
var cityName = ('Los Angeles', 'Denver', 'San Fransisco', 'Houston', 'New York', 'Chicago', 'Miami', 'Seattle')
var searchTermEl = document.getElementById('search-term');
var startSearchEl = document.getElementById('start-search');
startSearchEl.addEventListener('click', startSearch);

function startSearch(event) {
	event.preventDefault();
	var searchTerm = searchTermEl.value.trim();
 	// exit function if user input is blank
	if (!searchTerm) return;

	// otherwise fetch city coordinates
	fetchCityCoordinates(searchTerm);
    localStorageContent()
	// and reset input field
	searchTermEl.value = '';
}

function localStorageContent() {
    var userInput = document.getElementById('search-term').value;
    console.log(userInput)
    if (localStorage.getItem('data' == null)){
        localStorage.setItem('data', '[]');
    }
    var oldData = JSON.parse(localStorage.getItem('data'));
    oldData.push(userInput);
    localStorage.setItem('data', JSON.stringify(oldData));
    // let userInput = [];
    // localStorage.setItem('searched', JSON.stringify(searchTermEl))
    // userInput = JSON.parse(localStorage.getItem('searched'))
    // console.log(userInput)
}

function fetchCityCoordinates(cityName) {
	fetch(
		`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data);
			// exit if no data found
			if (!data[0]) return;
			// otherwise extract latitude and longitude and pass to fetchWeather function
			var latitude = data[0].lat;
			var longitude = data[0].lon;
            var temp = data.timezone
			fetchWeather(latitude, longitude);
		})
		.catch(function (error) {
			console.log(error);
		});
}

function fetchWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org//data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${ApiKey}`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// HERE IS YOUR DATA TO WORK WITH:
            var ChosenCity= document.getElementById('city-name')
            var temp = document.getElementById('city-temp')
            var wind = document.getElementById('city-wind')
            var humidity = document.getElementById('city-humidity')
            ChosenCity.innerHTML= data.city.name
            temp.innerHTML = 'Temp: ' + Number(data.list[0].main.temp)+ 'F'
            wind.innerHTML = 'Wind Speed: ' + Number(data.list[0].wind.speed)+ 'MPH'
            humidity.innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity)
            for(i=0; i<5; i++)
            document.getElementById("day"+(i+1)+'date').innerHTML = data.list[i].dt_txt
            for(i=0; i<5; i++)
            document.getElementById('image'+(i+1)).src= 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon+'.png'
            for(i=0; i<5; i++)
            document.getElementById("day"+(i+1)+'temp').innerHTML = "Temp: " + data.list[i].main.temp
            for(i=0; i<5; i++)
            document.getElementById("day"+(i+1)+'wind').innerHTML = "Wind: " +Number(data.list[i].wind.speed) + "MPH"
            for(i=0; i<5; i++)
            document.getElementById("day"+(i+1)+'humidity').innerHTML = "Humidity: " +data.list[i].main.humidity
            // var date= new Date(data.list[i].dt *1000)
            console.log(data);
		})
		.catch(function (error) {
			console.log(error);
		});
}