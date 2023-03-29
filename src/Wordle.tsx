import { ChangeEvent, useState } from "react";
export default function App(): JSX.Element {
  const [gameName] = useState("Wordle Clone");
  const [userWords, setUserWords] = useState<Array<string>>([]);
  const [currentWord, setCurrentWord] = useState("");

  function addNewWord() {
    setUserWords([...userWords, currentWord]);
    setCurrentWord("");
  }
  function removeWords() {
    setUserWords([]);
  }
  
  function updateInput(ev: ChangeEvent<HTMLInputElement>) {
    setCurrentWord(ev.target.value);
  }

  return (
    <>
      <p>Begin your work of {gameName} in this file</p>
      <ul>
        {userWords.map((w: string) => {
          return <li>{w}</li>;
        })}
      </ul>

      <input type="text" onChange={updateInput} value={currentWord} />
      <div>
        <button onClick={addNewWord}>Add Word</button>
        <button onClick={removeWords}>Clear </button>
      </div>
    </>
  );
}
