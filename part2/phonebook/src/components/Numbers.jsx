const Number = (props) => {
    const deleteNumber = () => {
        console.log("persons: ", props.persons)
        if (window.confirm(`Do you really want to delete ${props.name}?`)) {
            props.phoneService
                .deleteNumber(props.id)
                .then(
                    props.setPersons(
                    props.persons
                    .filter(person => person.id !== props.id))
            ).then (() => {
                props.setErrorMessage("Deleted contact " + props.name)
                setTimeout(()=>{
                  props.setErrorMessage(null)}, 5000)
              })
              .catch(()=> {props.setErrorMessage("Deletion of " + props.name + " failed")
              setTimeout(()=>{
                props.setErrorMessage(null)}, 5000)
            });
        }   
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {props.name} {props.number} 
                        </td>
                        <td>    
                            <button onClick={deleteNumber}> Delete </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </>
    )
}

export default Number