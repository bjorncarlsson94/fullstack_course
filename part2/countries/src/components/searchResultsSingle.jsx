import CountryLanguages from "./countryLanguages";
import weatherService from "../services/weatherService";
import {useState} from 'react'
import WeatherInfo from "./weatherInfo";

const SearchResultsSingle = ({countries, search}) => {
    const [weather, setWeather] = useState()

    const countryFilter = () => {
        return (countries.find(countries => countries.name.common.toLowerCase().includes(search.toLowerCase())))
    };
    const filteredCountry = countryFilter();
    const languageArr = Object.values(filteredCountry.languages);
    

    const getWeather = () => {
        weatherService
            .getWeatherInfo(filteredCountry.capital)
            .then((response) => {setWeather(response)})
    }
    
    if (!weather){
        getWeather()
        return null;
    }
    return (
        <>
            <h1>{filteredCountry.name.common}</h1>
            <div>Capital is {filteredCountry.capital}</div>
            <div>Area is {filteredCountry.area}</div>
            <br/>
            <h2>Languages:</h2>
            <ul>
                    {languageArr.map(language => 
                        <CountryLanguages 
                            key={language} 
                            language={language}/>)
                    }
            </ul>
            <div>Flag:</div>
            <img src={filteredCountry.flags.png}></img>
            <h1>Weather in {filteredCountry.capital}</h1>
            {
            <WeatherInfo key={weather.id} weather={weather}/>
            }
        </>
    )
}

export default SearchResultsSingle