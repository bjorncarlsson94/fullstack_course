import axios from 'axios'

const SearchResults = ({countries, setSearch}) => {
    const selectCountry = () => {
        setSearch(countries.name.common)
    }
    
    return (
        <>
            <div>{countries.name.common} 
                <button onClick={selectCountry}>Select Country</button>
            </div>
        </>
    )
}

export default SearchResults