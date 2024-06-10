const FilterPhonebook = ({setFilterState, setSearch}) => {

    const addFilter = (event) => {
        event.preventDefault()
          if (event.target.value != "") {
            setFilterState(true);
          }
          else {
            setFilterState(false);
          }
        setSearch(event.target.value);
      }

    return (
        <div>
          Filter shown with: <input onChange={addFilter}/>
        </div>
    )
}

export default  FilterPhonebook