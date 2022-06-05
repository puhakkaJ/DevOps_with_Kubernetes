import React, { useState, useEffect} from 'react'
import axios from 'axios'

const url = 'http://localhost:8082/image'
console.log("running77")

const App = () => {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios
      .post('http://localhost:8082/todos', { new: input})
      .then(() => console.log('Todo Created'))
      .catch(err => {
        console.error(err);
      });
    
    setInput("")
    await axios
      .get('http://localhost:8082/todos')
      .then(response => {
        console.log('promise fulfilled2')
        setTodos(response.data)
      })
  }
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:8082/todos')
      .then(response => {
        console.log('promise fulfilled')
        setTodos(response.data)
      })
  }, [])


  const handleChange = (event) => {
    setInput(event.target.value)
  }


  return (
    <div>
      <img alt="daily" src={url} style={{ width: 700, height: 700}} />
      <div>
        <form method="POST" onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange}/>
          <button variant="contained" type="submit" >
            Save
          </button>
        </form>
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