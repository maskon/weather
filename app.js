const searchInput = document.getElementById('search__input')
const searchBtn = document.getElementById('search__btn')
const city = document.getElementById('city')
const timeIsNow = document.getElementById('time-is-now')
//const imgIcon = document.getElementById('img-icon')
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
    searchInput.value = ''
    city.innerHTML = value
    timeIsNow.innerHTML = 'Текущее время: ' + time.toLocaleTimeString()
    const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value},Russia&APPID=aa35c943cb59788c0b051d77d4fe31d5`);
    const data = await url.json()
    const temp = data.main.temp - 273
    const feels = data.main.feels_like - 273
    const pressureCalc = data.main.pressure * 7.500616827041698 / 10
    
    temperature.innerHTML = temp.toFixed(0) + '℃'
    weatherMain.innerHTML = data.weather[0].description
    feelsLike.innerHTML = feels.toFixed(0)  + '℃'
    humidity.innerHTML = data.main.humidity + ' %'
    pressure.innerHTML = pressureCalc.toFixed(0) + ' мм рт. ст.'
    windSpeed.innerHTML = data.wind.speed + ' м/с'
    console.log(data)
    
}
