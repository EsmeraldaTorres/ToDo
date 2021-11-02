import React from "react";
import "../styles/post.css"

const Post = ({title,status,id,changeStatus})=>{

return(
    <div className={status === false ? "complete" : "reset"}>
        <span class="checkmark">{title}</span>
        <input type="checkbox"         
        checked={status}
        onChange={() => changeStatus(id)}/>
    </div>
)
}

export default Post