import React from "react";
import "../styles/header.css"


const Header = ({allTasks,tasksDone,tasksPending}) => {
    return(
        <>
      <div className="header">
        <h1>ToDo List</h1>
    </div>
        <div className="menu">
            <button className="btn-menu" onClick={()=> allTasks()}>My Tasks</button>
            <button className="btn-menu" onClick={()=> tasksPending()}>To Do</button>
            <button className="btn-menu" onClick={()=> tasksDone()}>Executed</button>
        </div>
        </>
    )
}

export default Header