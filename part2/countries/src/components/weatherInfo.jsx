const WeatherInfo = ({weather}) => {
    let imgSRC = "https://openweathermap.org/img/wn/"+ weather.weather[0].icon +".png";
    return (
        <div>
            <div>Temperature is {weather.main.temp} celsius</div>
            <img src={imgSRC}></img>
            <div> wind: {weather.wind.speed} m/s</div>
        </div>
    )
}

export default WeatherInfo