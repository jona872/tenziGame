import React from 'react';
import Die from '../Die/Die';
import Confetti from 'react-confetti'

import './App.css';

function App() {
   const [arrayNumbers, setArrayNumbers] = React.useState(initialSetup());
   const [tenzies, setTenzies] = React.useState(false)
   const [counter, setCounter] = React.useState(0);
   const width = 420;
   const height = 400;

   React.useEffect(() => {
      const allHeld = arrayNumbers.every(die => die.isHeld);
      const allSameValue = arrayNumbers.every(die => die.value === arrayNumbers[0].value);
      if (allHeld && allSameValue) {
         // alert("You Won!" + counter);
         setTenzies(true);
         // setCounter(0);
      }
   }, [arrayNumbers]);

   function initialSetup() {
      let resu = [];
      for (let i = 0; i < 10; i++) {
         resu.push(
            {
               key: i, id: i,
               value: randomNumber(),
               isHeld: false
            });
      }
      return resu;
   }


   function randomNumber() {
      return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
   }

   function rollDice() {
      if (!tenzies) {
         setCounter(prevState => prevState + 1);
         setArrayNumbers(prevState => prevState.map(die => {
            return (die.isHeld === true) ?
               die :
               {
                  ...die,
                  value: randomNumber()
               }
         }));
      } else {
         setCounter(0);
         setTenzies(false);
         setArrayNumbers(initialSetup());
      }
   }

   function toogler(id) {
      setArrayNumbers(prevState => prevState.map(die => {
         return (die.id === id) ?
            {
               ...die,
               isHeld: !die.isHeld
            }
            :
            die
      }))
   }

   const dies = arrayNumbers.map((die) => {
      return (<Die key={die.key} id={die.key}
         value={die.value} holded={die.isHeld}
         handleClick={() => toogler(die.id)} />
      )
   });


   return (
      <main className="container">

         <div className="app--title" >
            <p> Tenzies </p>
         </div>

         <div className="app--description">
            <p> Roll until all dice are the same. Click each die to freeze it at
               its current value between rolls. </p>
         </div>

         <h5>Counter: {counter}</h5>

         <div className="app--body">
            {dies}
         </div>
         
         <button className="app--button" onClick={rollDice} >
            {tenzies && <Confetti width={width} height={height} />}
            {tenzies ? "New Game" : "Roll"}
         </button>

      </main>
   );
}

export default App;
