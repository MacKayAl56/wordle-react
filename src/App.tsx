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

    <Wordle/>
    </>
}

export default App
