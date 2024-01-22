const searchInput = document.getElementById('search__input')
const searchBtn = document.getElementById('search__btn')
const city = document.getElementById('city')
const timeIsNow = document.getElementById('time-is-now')
const imgIcon = document.getElementById('img-icon')
const temperature = document.getElementById('temperature')
const feelsLike = document.getElementById('feels_like')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const weatherMain = document.getElementById('weather-main')
const windSpeed = document.getElementById('wind-speed')
const time = new Date()

let value

searchInput.addEventListener('input', () => { value = searchInput.value })

searchBtn.addEventListener('click', () => { getWeather() })

async function getWeather() {
    try {
        searchInput.value = ''
        city.innerHTML = firstCharUp(value)
        city.style.color = '#333'
        timeIsNow.innerHTML = 'Последнее обновление: ' + time.toLocaleTimeString()
        const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value},Russia&APPID=aa35c943cb59788c0b051d77d4fe31d5`);
        const data = await url.json()
        const temp = data.main.temp - 273
        const feels = data.main.feels_like - 273
        const pressureCalc = data.main.pressure * 7.500616827041698 / 10

        temperature.innerHTML = temp.toFixed(0) + '℃'
        feelsLike.innerHTML = feels.toFixed(0)  + '℃'
        humidity.innerHTML = data.main.humidity + ' %'
        pressure.innerHTML = pressureCalc.toFixed(0) + ' мм рт. ст.'
        windSpeed.innerHTML = data.wind.speed + ' м/с'
        console.log(data)
        render()

        function render() {
            if (data.weather[0].description === 'scattered clouds') {
                weatherMain.innerHTML = 'Рассеянные облака'
                imgIcon.src = 'http://openweathermap.org/img/w/03n.png'
            }

            if (data.weather[0].description === 'few clouds') {
                weatherMain.innerHTML = 'Мало облачно'
                imgIcon.src = 'http://openweathermap.org/img/w/02n.png'
            }

            if (data.weather[0].description === 'overcast clouds') {
                weatherMain.innerHTML = 'Пасмурно'
                imgIcon.src = 'http://openweathermap.org/img/w/09n.png'
            }

            if (data.weather[0].description === 'clear sky') {
                weatherMain.innerHTML = 'Ясно'
                imgIcon.src = 'http://openweathermap.org/img/w/01n.png'
            }

            if (data.weather[0].description === 'broken clouds') {
                weatherMain.innerHTML = 'Разорванные облака'
                imgIcon.src = 'http://openweathermap.org/img/w/04n.png'
            }

            if (data.weather[0].description === 'shower rain') {
                weatherMain.innerHTML = 'Ливень'
                imgIcon.src = 'http://openweathermap.org/img/w/09n.png'
            }

            if (data.weather[0].description === 'rain') {
                weatherMain.innerHTML = 'Дождь'
                imgIcon.src = 'http://openweathermap.org/img/w/10n.png'
            }

            if (data.weather[0].description === 'thunderstorm') {
                weatherMain.innerHTML = 'Гроза'
                imgIcon.src = 'http://openweathermap.org/img/w/11n.png'
            }

            if (data.weather[0].description === 'snow') {
                weatherMain.innerHTML = 'Снег'
                imgIcon.src = 'http://openweathermap.org/img/w/13n.png'
            }

            if (data.weather[0].description === 'mist') {
                weatherMain.innerHTML = 'Туман'
                imgIcon.src = 'http://openweathermap.org/img/w/50n.png'
            }
        }
    } catch (err){
        city.innerHTML = err.message
        city.style.color = 'red'
    }   
}

function firstCharUp(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1)
}
