import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {
    const [newName, setnewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const onSubmitHandle = (event) => {
        event.preventDefault();
        const newAdd = {
          name: newName,
          number: newNumber,
          id: persons.length+1
        }
        if (persons.map(persons => persons.name).includes(newName)){
          alert(newName + " is already added to the phonebook");
        }
        else {
          setPersons(persons.concat(newAdd));
          setnewName("");
          setNewNumber("");
        }
      }
    
      const addName = (event) => {
        event.preventDefault()
        setnewName(event.target.value);
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