import React, {useState, useEffect} from 'react';

import './App.css';
import Header from './components/Header';
import Post from './components/Post';

function App() {
  // USE STATE
  // Para guardar las 20 tasks
  const [toDoList, setToDoList] = useState(null)
  // Para manipular los botones de filtrado 
  const [copia, setCopia] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  // Para traer las 20 tasks de las apis
  const [boton, setBoton] = useState("")

  // USE EFFECT
  useEffect( ()=>{
    const handleToDoList = async ()=>{
      const response = await fetch (
        "https://jsonplaceholder.typicode.com/todos"
      )
        const result= await response.json();
        const resultTodoList = result.slice(0,20)
        setToDoList(resultTodoList)
        setCopia(resultTodoList)
      }
      handleToDoList()
    },[]
  )

    // Para cambiar status en cada tarea (en copia)
    const changeStatus = id =>{
      // changeStatus se ejecuta cada que se presiona el checkbox en una tarea
      // entonces setIsLoades se cambia a true y se dispara el useEffect
      setIsLoaded(true)
       setToDoList(toDoList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )) 
      setCopia(
        toDoList.map(todo =>
          todo.id === id ? {...todo, completed: !todo.completed} : todo
        ))
    }
        // Para filtrar por boton de tareas hechas (en copia)
        const tasksDone = ()=>{
          setBoton("done")
          setCopia(toDoList.filter(todo => todo.completed))
        }
        // Para filtrar las tareas pendientes (en copia)
        const tasksPending = ()=>{
          setBoton("pending")
          setCopia(toDoList.filter(todo => !todo.completed))
        }
        // Para traer todas las tareas (en copia)
        const allTasks = () => {
          setBoton("all")
          setCopia(toDoList)
        }

    useEffect(() => {
      // si esto se dispara,entonces ejecuta el filtrado de tasksDone
      // y se muestran todas las tareas hechas
      setIsLoaded(true)
      if(boton === "pending" && isLoaded) {
        tasksPending()
      } else if (boton === "done") {
        tasksDone()
      } else if (boton === "all"){
        allTasks()
      }
      // esto va a estar pendiente del cambio hecho a toDolist en ChangeStatus
    }, [toDoList, allTasks, boton, isLoaded, tasksDone, tasksPending])


  return (
    <div className="App">
      <div className="general-container">
      <Header
      tasksPending={tasksPending}
      tasksDone={tasksDone}
      allTasks={allTasks}
      />
      <div className="container">
        {
          copia && copia.length > 0 ? (
          copia.map(task=>(
            <Post
              id={task.id}
              changeStatus={changeStatus}
              title={task.title}
              status={task.completed}
            />
          ))
          ) : null
        }
      </div>
      </div>
    </div>
  );
}

export default App;
