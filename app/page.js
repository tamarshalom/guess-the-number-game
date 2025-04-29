'use client'; //clinet-side component by letting the interactive page use buttons, timers, ect. 
import confetti from 'canvas-confetti'; // confettie tool
import { useEffect, useState } from 'react'; //React's smart tool
//useEffect : runs the code right away when something happens
//useState : creates and updates variables that react watches 
import'./shake.css';

export default function Home() {
  const [guess, setGuess] = useState(''); // updates setGuess with the value the user intputed into the guess box. Uses empty string to start since there is no guess in the beginning 
  const [message, setMessage] = useState(''); // updates setMessage with the feedback message to show. Also starts with an empty string since there is no message on the start. 
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1); // Resets setNumber when restarting the game, number is the computer generated number 1-100. 
  const [attempts, setAttempts] = useState(0); // function to increase the attempt count Starts at 0 = no guesses
  const [time, setTime] = useState(0);// how many seconds have passed, setTime function to increase time by 1 second starting at 0:00
  const [isRunning, setIsRunning] = useState(true); //to see if timer is still running, setIsRunning to stop/start timer
  const [guesses, setGuesses] = useState([]); //keeps track of all the guesses
  const [shake, setShake] = useState(false); // Tracks whether the input box should "shake" 
  const handleCheck = () => { //runs when user clicks check 
    const userGuess = Number(guess); //turns useer input into a real number from string input 
    if (!Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100) { //when user inputs a decimal #, a # <1 or > 100 it send invalid message error
      setMessage('❌ Invalid input! Please enter an integer between 1 and 100.');
      triggerShake(); //trigger shake animation
      return; // Stop checking further
    }
    setAttempts(attempts + 1); //increases # if attemots by 1 each try 
    setGuesses((prevGuesses) => [...prevGuesses, userGuess]); //shows number of guesses 
    if (userGuess > number) { //if user input is too high then message sent "too high"
      setMessage('Too high! Try again! ');
      triggerShake(); //trigger shake animation
    } else if (userGuess < number) { //if user input is too low then message sent "too low"
      setMessage('Too low! Try again!');
      triggerShake(); //trigger shake animation
    } else { 
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} tries!`); //if user input = target # number then message sent "correct!"
      setIsRunning(false); //stops the timer 
      confetti({ // shoots confetti if won
        particleCount: 150,
        spread:70,
        origin: {y:0.6}
      })
    }   
  };
  const triggerShake = () => { //triggerShake helper function
    setShake(true); //starts the shake annimation 
    setTimeout(() => {
      setShake(false); //stops shake after 0.5 s
    }, 500);
  };  

  const handleRestart = () => { //handleReset helper function
    setNumber(Math.floor(Math.random() * 100) + 1); // new computer generated number 1-100
    setGuess(''); //resets the guess box from the previous guess
    setMessage(''); // removes the message from the previous round 
    setAttempts(0); //resets number of attempts back to 0
    setTime(0); //reset timer
  setIsRunning(true); // timer starts 
  };
  useEffect(() => { //runs when setIsRunning is also changes 
    let interval; // stores the ID of the timer
    if (isRunning) { 
      interval = setInterval(() => { //Start a timer that fires every (1 second) (corresponds to below).
        setTime((prevTime) => prevTime + 1); // add 1 ro whatever the time is 
      }, 1000); // update every second
    }
    return () => clearInterval(interval);//stops when isRunning becomes false
  }, [isRunning]); //useEffect is dependent on isRunning and if it changes or not.


  return ( /*
      flex flex-col ➔ Stack everything vertically
      items-center ➔ Center all items horizontally
      justify-center ➔ Center all items vertically
      min-h-screen ➔ Take up the full height of the screen
      p-6 ➔ Padding (spacing inside the edges)
      bg-gradient-to-br from-blue-50 to-indigo-100 ➔ Light blue → light indigo gradient background
      text-5xl ➔ Very large font size
      font-extrabold ➔ Super bold font weight
      text-indigo-500 ➔ Dark indigo text color
      mb-8 ➔ Margin below it 
      drop-shadow-lg ➔ shadow under the text 
    */
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">  
     <h1 className="text-5xl font-extrabold text-indigo-500 mb-8 drop-shadow-lg">
  🎯 Guess the Number!
      </h1>

      <input
        type="number" //only allows numbers to be typed 
        value={guess} //controlled input
        onChange={(e) => setGuess(e.target.value)} //updates setGuess whenever the user inputs something
        placeholder="Enter a number 1–100" //whats typed into the box to let player know what to do
        className={`p-3 w-48 border-2 border-indigo-300 rounded-lg mb-6 text-center text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${shake ? 'animate-shake' : ''}`} //// Dynamically add shake class only if shake state is true
      /> 
       <p className="mb-4 text-gray-600">⏳ Time Elapsed:{Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}s  </p> 

       {message && (
        <p className="text-lg text-indigo-500 font-medium mb-4">{message}</p> //shows <p> if message is not empty, designs and <p> displays the feedback 
      )}

      <button //chck button
        onClick={handleCheck} //calls handleCheck
        className="p-3 w-48 mb-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all" //the design of the check button
      >
      
        Check 
      </button> 

      
      {message.includes('Correct') && guesses.length > 0 && (
  <div className="text-center text-indigo-600 mb-6">
    <h2 className="text-lg font-bold mb-2">Your Guesses:</h2>
    <p>{guesses.join(', ')}</p>
  </div>
)}
      <button //restart button
        onClick={handleRestart} //calls the handleRestart function
        className="p-3 w-48 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all" //design of the button
      >
        Restart 
      </button>
    </main> 
    
  );
}
