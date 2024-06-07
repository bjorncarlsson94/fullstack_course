import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      
    </div>
  )
}

const MaxVotesComponent = (props) =>{
  if (props.vote>0) {
    return (
      <div>Has {props.vote} votes</div>
    )
  }
    return;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0});
  const [maxIndex, setMaxIndex] = useState();

  const setNewVote = (newVote) => {
    const pointscopy = { ...vote};
    pointscopy[newVote] += 1;
    setVote(pointscopy);
    setMaxIndex(findMax(pointscopy));
  }

  const findMax = (voteArr) => {
    let maxValueIndex = 0;
    let maxValue = 0;
    for (let i=0; i<anecdotes.length; i++){
      if (voteArr[i] > maxValue) {
        maxValue = voteArr[i];
        maxValueIndex = i;
      }
    }
   
    return maxValueIndex;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <Button text="Vote" onClick={()=>setNewVote(selected)}/>
      <Button text="Next Anecdote" onClick={()=>setSelected(Math.floor(Math.random()*anecdotes.length))}/>
      <h1>Anecdote with the most votes</h1>
      <div>{anecdotes[(maxIndex)]}</div>
      <MaxVotesComponent vote={vote[maxIndex]}/>
    </div>
  )
}
// Would probably be better to refactor this with Anecdotes as a separate component
// but as it's only text + is used in calculating other components it was easier to keep
// it in the App main component.

export default App
