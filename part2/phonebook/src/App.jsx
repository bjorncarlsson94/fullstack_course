import { useState } from 'react'
import Number from './components/Numbers'
import PersonForm from './components/PersonForm'
import FilterPhonebook from './components/FilterPhonebook'

const App = () => {

  //States
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [search, setSearch] = useState();
  const [filterState, setFilterState] = useState(false);

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

  /*
    Check this function and how it works some more.
    Didn't work with filterVar set as "true" first with reversed ?/:
  
    Changed from filterVar to filterState as stateVariable -> works better.
    
    This can be moved into the filter component if e.g. search or filtered state
    is extended to account for the search string -> so filteredNumbers
    can be used in the component call below
    */
  const filteredNumbers = filterState
    ? persons.filter(persons => persons.name.includes(search) || persons.number.includes(search))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      
        <FilterPhonebook setFilterState={setFilterState} setSearch={setSearch}/>
      
      <h1>Add a new</h1>

        <PersonForm persons={persons} setPersons={setPersons}/>
      
      <h2>Numbers</h2>
      <div>
        {filteredNumbers.map(persons =>
        <Number key={persons.id}
          name={persons.name} number={persons.number}
        />)}
        </div>
    </div>
  )
}

export default App