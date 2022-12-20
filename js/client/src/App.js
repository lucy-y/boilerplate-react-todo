import { useEffect, useState } from "react";
import axios from "axios";


const API_URL = 'http://localhost:4000/api/todo';
// fetch - default
// axios - library
function App() {
    const [todoList, setTodoList] = useState([]);

    const fetchData = async () => {

        const response = await axios.get(API_URL);
        setTodoList(response.data);

        // fetch('http://localhost:4000/api/todo')
        // .then((res)=> res.json())
        // .then((data) => setTodoList(data));
    }

    const deleteData = async (id) => {
        await axios.delete(API_URL+`/`+id);
        const response = await axios.get(API_URL);
        setTodoList(response.data);
    }

    useEffect(()=>{
        fetchData()
    }, []);

    const oneSubmitHandler = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        const done = e.target.text.checked;

        await axios.post(API_URL, {text, done});
        fetchData();

        // fetch('http://localhost:4000/api/todo', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         text,
        //         done,
        //     }),
        // }).then(() => fetchData())
    }

    const deleteHandler = async (e) => {
        e.preventDefault();
        deleteData(e.target.id);
        console.log(e);
    }

  return (
    <div className="App">
      <h1>TODO LIST</h1>

      <form onSubmit={oneSubmitHandler}>
        <input name="text"/>
        <input name="done" type="checkbox" />
        <input type="submit" value="Add"/>
      </form>

      {todoList.map(todo=>(
        <div key={todo.id} style={{ display: 'flex' }}>
            <p>{todo.id} </p>
            <p>{todo.text} </p>
            <p>{todo.done? 'Y' : 'N'}</p>
            <button id={todo.id} onClick={deleteHandler}>Del</button>
        </div>
      ))}
    </div>
  );
}

export default App;
