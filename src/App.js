import Die from './components/Die'
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("you won")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const numArray = []
    for (let i = 0; i < 10; i++) {
      numArray.push(generateNewDie())
    }
    return numArray
  }

  function holdDice(id) {
    setDice(prevState => prevState.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
    } else {
      setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
        die :
        generateNewDie()
      }))
    }
  }

  const diceElements = dice.map(die=> <Die value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
          {diceElements}
        </div>
        <button
          className="btn-roll"
          onClick={rollDice}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
