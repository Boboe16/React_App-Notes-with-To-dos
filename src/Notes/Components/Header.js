import React from "react";
import {useNavigate} from 'react-router-dom'
import todosIcon from './GoToTo-dosIcon.png'

function Header() {
    let navigate = useNavigate()

    return (
      <div id='Header' className='row'>
        <h1 className="col-8">Notepud</h1>
        <div className="col-4">
          <img id="Todos-Icon" onClick={() =>navigate(`/Todos`)} src={todosIcon} alt="to-dos icon"/>
        </div>
      </div>
    )
  }

export default Header