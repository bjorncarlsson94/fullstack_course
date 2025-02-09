const Part = (props) => {
  if (props.name === 'total') {
    return (
      <div>
        {props.name} of {props.exercises} exercises
      </div>
    )
  } else {
    return (
      <div>
        {props.name} {props.exercises}
      </div>
    )
  }
}

export default Part
