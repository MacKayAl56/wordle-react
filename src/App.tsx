import './App.css'
import Wordle from "./Wordle"
function App() {
  const index = [];
  var i = 0;
  for (i = 0; i < 30; i++){
    index.push(i);
  }

  return <>
    <h1 className="header">Wordle Clone</h1>
    <h2 className="subheader">By: Kyle Smigelski and Alexandra MacKay</h2>
    <div className="field">
      <div className="grid">
      {
        index.map((pos:number) =>
        <div className="box"></div>)
      }

      </div>
    </div>

    <Wordle/>
    </>
}

export default App
