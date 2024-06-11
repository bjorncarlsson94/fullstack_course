import { useState } from 'react'

const PersonForm = ({persons, setPersons, phoneService}) => {
    const [newName, setnewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const onSubmitHandle = (event) => {
        event.preventDefault();
        const newAdd = {
          id: undefined,
          name: newName,
          number: newNumber,
        }
        if (persons.map(persons => persons.name).includes(newName)){

          if (window.confirm(newName + " is already added to the phonebook, do you want to update the phone number?")){
            let findId = persons.filter(persons => persons.name===newName)
            
            phoneService.update(findId[0].id, newAdd)
              .then(returnedObject => { setPersons(persons.map(persons => persons.id !== findId[0].id ? persons : returnedObject))});
          }
          setnewName("");
          setNewNumber("");
        }
        else {
          phoneService.create(newAdd).then(returnedName => 
          setPersons(persons.concat(returnedName)));
          setnewName("");
          setNewNumber("");
        }
      }
    
      const addName = (event) => {
        event.preventDefault()
        setnewName(event.target.value)
      }
    
      const addNumber = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value);
      }

    return (
        <form onSubmit={onSubmitHandle}>
            <table>
                <tbody>
                    <tr>
                        <td>name: </td>
                        <td><input onChange={addName} value={newName}/></td>
                    </tr>
                    <tr>
                        <td>number: </td>
                        <td><input onChange={addNumber} value={newNumber}/></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">add</button>
        </form>
      )
}


export default PersonForm