import './App.css'
import Wordle from "./Wordle"
function App() {
  const index = [];
  for (let i = 0; i < 30; i++){
    index.push(i);
  }

  return <>
    <h1 className="header">Wordle Clone</h1>
    <h2 className="subheader">By: Kyle Smigelski and Alexandra MacKay</h2>
    <div className="field">
      <div className="grid">
      {
        index.map((pos:number) =>
        <div className="box" key="pos"></div>)
      }
      </div>
    </div>

    <Wordle />
    <div>
      <h1 className="header">Report</h1>
      <h2 className="subheader">In order to build the grid of letters, we first created a CSS flexbox
        and applied that class to a div to represent the empty grid. Inside the grid, we used the <code>.map</code> function to
        run 30 times and create each box in the grid. Then, to implement the submit word button, a series of functions 
        are called to store that word, and to display the word by looping through that string, and accessing each box
        with <code>document.getClassByName("box")[i]</code>and setting the <code>.innerHTML</code>to the correct letter.

      </h2>
    </div>
  </>
}

export default App
