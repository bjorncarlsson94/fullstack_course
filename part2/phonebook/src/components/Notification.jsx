const Notification = ({message}) => {
    
    let errorStyle={
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null){
        return null
    }
    if (message.includes("failed") || message.includes("Deleted")){
        errorStyle.color = 'red';
    }
    return (
        <div style={errorStyle} className='error'>
            {message}
        </div>
    )
}

export default Notification