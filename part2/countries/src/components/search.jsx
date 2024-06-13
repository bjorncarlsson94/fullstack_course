import countryService from "../services/countryService";

const Search = ({search, setSearch, countries, setCountries}) => {

    const onChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value)
        if (event.target.value != null && event.target.value.length<2) {
            getAllCountries()
        }
    }
    const getAllCountries = () => {
        countryService.getAll()
            .then(responseCountries => {
                setCountries(responseCountries)
        });
    }

    return (
        <div>
            <form>
                find countries <input onChange={onChange}></input>
            </form>
        </div>
    )
}

export default Search