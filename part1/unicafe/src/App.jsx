import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>
const Button = (props) => <button onClick={props.onClick} >{props.text}</button>
const StatisticsHeader = (props) => <h1>{props.text}</h1>

const Statistics = (props) => {
  const good = props.count[0];
  const neutral = props.count[1];
  const bad = props.count[2];

  if (props.count[0]+props.count[1]+props.count[2]===0){
    return <p>No feedback given</p>
  }
  else if (props.count[0]+props.count[1]+props.count[2]===0) {
    return;
  }
  else {
    return(
      <table>
        <tbody>
          <StatisticLine text={props.text.good} count={good} percentage={props.percentage}/>
          <StatisticLine text={props.text.neutral} count={neutral} percentage={props.percentage}/>
          <StatisticLine text={props.text.bad} count={bad} percentage={props.percentage}/>

          <StatisticLine text="all" count={good+neutral+bad}/>
          <StatisticLine text="average" count={(good+bad*-1)/(good+neutral+bad)}/>
          <StatisticLine text="positive" percentage="%" count={good/(bad+neutral+good)}/>
          </tbody>
      </table>
    )
  }
}
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.count}{props.percentage}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0)
  let ratings = [good, neutral, bad];
  const rating = {
      good: "good",
      neutral: "neutral",
      bad: "bad"
  }

  const header = "Give Feedback";
  const statisticsHeader = "statistics";

  return (
    <div>
      <Header text={header}/>
      
      <Button text={rating.good} onClick={()=>setGood(good + 1)}/>
      <Button text={rating.neutral} onClick={()=>setNeutral(neutral + 1)}/>
      <Button text={rating.bad} onClick={()=>setBad(bad + 1)}/>

      <StatisticsHeader text={statisticsHeader}/>
      <Statistics text={rating} count={ratings}/>
      

    </div>
  )

}

export default App
