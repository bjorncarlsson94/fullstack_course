import axios from 'axios'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="

const weather_api_key = import.meta.env.VITE_weather_key;

const getWeatherInfo = (city) => {
    const request = axios.get(
        `${baseUrl}${city}&units=metric&APPID=${weather_api_key}`)                                
    return request.then(response=>response.data) 
}

export default {getWeatherInfo}