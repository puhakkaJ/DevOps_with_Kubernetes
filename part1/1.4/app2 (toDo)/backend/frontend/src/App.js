import React, { useState } from 'react'

const url = 'http://localhost:8081/dailyImage'


const App = () => {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState(["TODO 1", "TODO 2"])

  const handleSubmit = (event) => {
    event.preventDefault()
    setTodos([...todos, input]);
    setInput("");
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <div>
      <img alt="daily" src={url} style={{ width: 700, height: 700}} />
      <div>
        <input value={input} onChange={handleChange} />
        <button onClick={handleSubmit}>Create</button>
      </div>
      <br></br>
      <ul>
        {todos.map(todo => 
          <li key={todo}>{todo}</li> )}
      </ul>
    </div>
  )
}

export default App;