import React from "react";
import todosIcon from './todos.png'

function Header() {
    return (
      <div id='Header' className='row'>
        <h1 className="col-8">Notepud</h1>
        <div className="col-4"><img id="Todos-Icon"  src={todosIcon} alt="to-dos icon"/></div>
      </div>
    )
  }

export default Header