import React from "react"
import { useNavigate } from "react-router-dom"
import noteIcon from './GoToNotesIcon.png'

function Header() {
    let navigate = useNavigate()

    return (
      <div id='Header' className="row">
        <h1 className="col-8">Notepud</h1>
        <div className="col-4">
            <img src={noteIcon} onClick={() => navigate(-1)} alt="note-icon" />
        </div>
      </div>
    )
}

export default Header