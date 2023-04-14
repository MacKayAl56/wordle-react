import {ChangeEvent, useEffect, useState} from "react";
import validGuesses from "./guesses.txt";

export default function App(): JSX.Element {
  const [userWords, setUserWords] = useState<Array<string>>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [ wordList ] = useState<string[]>([]);
  const [guessList] = useState<string[]>([]);
  let secretWord = ""
  
  type WordleResponse = {
    secret: string
  }

    useEffect(() => {

        fetch(validGuesses)
            .then(response => response.text())
            .then(text => {
                const guesses = text.split("\n")
                guessList.push(...guesses)
            });
    }, []);
  
  function getSecretWord() {
    axios.request({method: "GET", url: "http://localhost:8000/your_end_point_name"})
      .then((res:AxiosResponse) => res.data)
      .then((w: WorldResponse) => {
        console.log(`The secret word from server is ${w.secret}`)
        secretWord = w.secret;
  })
  }

  function displayWord(currentWord: string) {
      const match = verifyMatch(secretWord, currentWord)
    for (let i = 0; i < 5; i++){
      document.getElementsByClassName("box")[i + userWords.length * 5].innerHTML = currentWord[i].toUpperCase();
        document.getElementsByClassName("box")[i + userWords.length * 5].classList.add(match[i]);
    }
  }

  function displayAnswer() {
    document.getElementById("answer")!.innerHTML = secretWord.toUpperCase();
  
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
    getSecretWord([]);
    setUserWords([]);
    window.location.reload();
  }
  
  function updateInput(ev: ChangeEvent<HTMLInputElement>) {
    setCurrentWord(ev.target.value);
  }

  function verifyWord(word: string) {
    return guessList.includes(word)
  }


    function verifyMatch (secret: string, guess: string) {
        const matched = [false, false, false, false, false]
        const outcome = [".", ".", ".", ".", "."]
        let perfectMatchCount = 0
        for (let k = 0; k < 5; k++) {
            if (guess.charAt(k) == secret.charAt(k)) {
                matched[k] = true
                outcome[k] = "perfect" // perfect match
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
                        outcome[g] = "misplaced"   // misplaced match
                        hasMatch = true
                        matched[s] = true
                        break
                    }
                }
                if (!hasMatch) outcome[g] = "wrong" // no match
            }
        }
        // Array outcome should encode the matching results
        return outcome
    }


    return (
    <>
      <input type="text" onChange={updateInput} value={currentWord} />
      <div>
        <button onClick={addNewWord}>Submit</button>
        <button onClick={removeWords}>New Game </button>
        <button onClick={displayAnswer}>Get Answer</button>
        </div>
      <div>
        <h2 id="answer" className="header"></h2>
      </div>
    </>
  );
}
