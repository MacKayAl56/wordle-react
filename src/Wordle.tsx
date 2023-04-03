import {ChangeEvent, useEffect, useState} from "react";
import words from "./wordles.txt";
import validGuesses from "./guesses.txt";

export default function App(): JSX.Element {
  const [userWords, setUserWords] = useState<Array<string>>([]);
  const [currentWord, setCurrentWord] = useState("");
  let [ secretWord, setSecretWord ] = useState<string>("")
  const [ wordList ] = useState<string[]>([]);
  const [ guessList ] = useState<string[]>([]);

    useEffect(() => {
        fetch(words)
            .then(response => response.text())
            .then(text => {
                const words = text.split("\n")
                wordList.push(...words)
                setSecretWord(setRandomWord());
            });

        fetch(validGuesses)
            .then(response => response.text())
            .then(text => {
                const guesses = text.split("\n")
                guessList.push(...guesses)
            });
    }, []);
  function displayWord(currentWord: string) {
    for (var i = 0; i < 5; i++){
      document.getElementsByClassName("box")[i].innerHTML = currentWord[i].toUpperCase();
    }
  }
  function addNewWord() {
    if (verifyWord(currentWord)) {
      setUserWords([...userWords, currentWord]);
      displayWord(currentWord);
    } else {
        alert("Invalid word: " + currentWord)
    }
    if (currentWord == secretWord) {
        alert("You win!")
    }
    setCurrentWord("");
  }
  function removeWords() {
    setUserWords([]);
    window.location.reload();
  }
  
  function updateInput(ev: ChangeEvent<HTMLInputElement>) {
    setCurrentWord(ev.target.value);
  }

  function verifyWord(word: string) {
    return guessList.includes(word)
  }

  function setRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    const randomWord = wordList[randomIndex];
    console.log("Secret word is: " + randomWord)
    return randomWord
  }

    function verifyMatch (secret: string, guess: string) {
        const matched = [false, false, false, false, false]
        const outcome = [".", ".", ".", ".", "."]
        let perfectMatchCount = 0
        for (let k = 0; k < 5; k++) {
            if (guess.charAt(k) == secret.charAt(k)) {
                matched[k] = true
                outcome[k] = "P" // perfect match
                perfectMatchCount++
            }
        }
        if (perfectMatchCount < 5) {
            for (let g = 0; g < 5; g++) {
                const guessLetter = guess.charAt(g)
                let hasMatch = false
                for (let s = 0; s < 5; s++) {
                    if (s == g) continue // don't do perfect match
                    if (matched[s]) continue
                    if (outcome[g] != '.') {
                        hasMatch = true
                        continue
                    }
                    const secretLetter = secret.charAt(s)
                    if (secretLetter == guessLetter) {
                        outcome[g] = "M"   // misplaced match
                        hasMatch = true
                        matched[s] = true
                        break
                    }
                }
                if (!hasMatch) outcome[g] = "N" // no match
            }
        }
        // Array outcome should encode the matching results
    }


    return (
    <>
      <ul>
        {userWords.map((w: string) => {
          return <li>{w}</li>;
        })}
      </ul>

      <input type="text" onChange={updateInput} value={currentWord} />
      <div>
        <button onClick={addNewWord}>Submit</button>
        <button onClick={removeWords}>New Game </button>
      </div>
    </>
  );
}
