import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [resultMsg, setResultMsg] = useState("");
  const [showResult, setShowResult] = useState(false);

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = (guess) => {
    let arr = [];
    guess.split("").forEach((i, index) => {
      let obj = {};
      let thisLetter = i.toUpperCase();
      obj.key = thisLetter;
      if (solution.toUpperCase().split("").includes(thisLetter)) {
        // find out all occurances of thisLetter in the solution
        const indices = [];
        const array = solution.toUpperCase().split("");
        const element = thisLetter;
        let idx = array.indexOf(element);
        while (idx !== -1) {
          indices.push(idx);
          idx = array.indexOf(element, idx + 1);
        }
        if (indices.includes(index)) {
          obj.color = "lightgreen";
        } else {
          obj.color = "goldenrod";
        }
      } else {
        obj.color = "gray";
      }

      arr.push(obj);
    });
    return arr;
  };

  const addNewGuess = (guess) => {
    setHistory((prev) => [...prev, guess]);
    setGuesses((prev) => [...prev, formatGuess(guess)]);
    setCurrentGuess("");
    setTurn((p) => p + 1);
    if (turn === 5) {
      setResultMsg("🙁 The word was " + solution.toUpperCase());
      setShowResult(true);
    }
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = (e) => {
    const { key } = e;

    if (key === "Enter") {
      if (turn >= 6) {
        alert("0 attempts left!");
        setCurrentGuess("");
        return;
      }
      if (currentGuess.length === 5) {
        addNewGuess(currentGuess);
      }
      if (currentGuess.toUpperCase() === solution.toUpperCase()) {
        setResultMsg("Yay! You Won! 🏅");
        setShowResult(true);
        setTurn(6);
      }
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    // if (/^[A-Za-z]$/.test(key)) {
    if (e.code.slice(0, 3) === "Key") {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return {
    turn,
    currentGuess,
    history,
    guesses,
    handleKeyup,
    showResult,
    resultMsg,
  };
};

export default useWordle;
