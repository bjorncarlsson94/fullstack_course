import { useState } from 'react'

const PersonForm = ({persons, setPersons, phoneService, setErrorMessage}) => {
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
            let findId = persons.find(persons => persons.name===newName)
            phoneService.update(findId.id, newAdd)
              .then(returnedObject => { setPersons(persons.map(persons => persons.id !== findId.id ? persons : returnedObject))})
              .then (() => {
                setErrorMessage("Updated the number of " + newName)
                setTimeout(()=>{
                  setErrorMessage(null)}, 5000)
              })
              .catch(() => {setErrorMessage("Update of " + newName + " failed")
                setTimeout(()=>{
                  setErrorMessage(null)}, 5000)
            });
          }
          
          setnewName("");
          setNewNumber("");
        }
        else {
          phoneService.create(newAdd).then(returnedName => 
          setPersons(persons.concat(returnedName)))
            .then(setErrorMessage("Created " + newAdd.name))
            setTimeout(()=>{
              setErrorMessage(null)}, 5000);
              
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