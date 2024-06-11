import { useState, useEffect } from 'react'
import Number from './components/Numbers'
import PersonForm from './components/PersonForm'
import FilterPhonebook from './components/FilterPhonebook'
import axios from 'axios'
import phoneService from './services/numbers'

const App = () => {

  //States
  const [persons, setPersons] = useState([]) 
  const [search, setSearch] = useState();
  const [filterState, setFilterState] = useState(false);

useEffect(() => {
    phoneService
      .getAll()
      .then(phoneBook => {
        setPersons(phoneBook);
      })
  }, [])

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

        <PersonForm persons={persons} setPersons={setPersons} phoneService={phoneService}/>
      
      <h2>Numbers</h2>
      <div>
        {filteredNumbers.map(person =>
        <Number key={person.id}
            id={person.id}
            name={person.name} 
            number={person.number} 
            phoneService={phoneService} 
            setPersons={setPersons}
            persons={persons}
        />)}
        </div>
    </div>
  )
}

export default App