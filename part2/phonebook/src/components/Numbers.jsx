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
            )
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