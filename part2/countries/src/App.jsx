import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countryService'

import Search from './components/search'
import SearchResults from './components/searchResults'
import SearchResultsSingle from './components/searchResultsSingle'

function App() {
  const [search, setSearch] = useState(null);
  const [countries, setCountries] = useState([])

const checkNumberOfCountries = () => {
    let countryCopy = [...countries]
    let filteredCountries = countryCopy.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  if (filteredCountries.length > 10 ) {
    return "Too many matching results, limit your search"
  }
  else if (filteredCountries.length == 1){
    return (<SearchResultsSingle countries={countries} search={search}/>) //{countries.filter(country=> country.name.common.toLowerCase()==(search.toLowerCase()))}/>)
  }
  else {
    
    return filteredCountries.map(country => <SearchResults key={country.cca2} countries={country} setSearch={setSearch}/>)
  }
}

  return (
    <>
      <Search 
        search={search} 
        setSearch={setSearch} 
        countries={countries} 
        setCountries={setCountries}/>
      <br/>
      {checkNumberOfCountries()}
    </>
  )
}

export default App
