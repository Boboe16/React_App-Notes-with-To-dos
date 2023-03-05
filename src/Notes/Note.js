import React, { useState } from 'react'
import setting_icon from './1008927-200.png'
import add_icon from './Green-Add-Button-PNG.png'
import './NoteStyle.css'

function Header() {
  return (
    <div id='Header'>
      <h1>Notepud</h1>
      <img src={setting_icon} alt='setting_icon'/>
    </div>
  )
}

function Content() {
  let [State, SetState] = useState(false)

  let keys = []

  for (let i = 0; i < localStorage.length; i++) {
    let localStorage_keys = localStorage.key(i)
    keys.push(localStorage_keys)
  }

  let filtered_keys = keys.filter(key => !key.includes('-content'))

  return (
    <div id='Content'>
      <ul>
        {filtered_keys.map(key => <li key={key}>{key}</li>)}
      </ul>

      <img src={add_icon} alt='add_icon' onClick={async () => {
        await SetState(false)
        await SetState(true) 
      }} />
      {State ? <Add_View_Edit State={true} /> : null}
    </div>
  )
}

function Add_View_Edit(props)  {
  let [Visible, SetVisible] = useState(props.State)

  async function save(event) {
    event.preventDefault()
    let Title = document.querySelector('#Title').value
    let Content = document.querySelector('#Note-Content').value
    await localStorage.setItem(`${Title}`, `${Title}`)
    await localStorage.setItem(`${Title}-content`, `${Content}`)
    await SetVisible(false)
  }
  
  return (
    Visible && <div id='Add_View_Edit'>
     <form onSubmit={save}>
        <input type="text" id="Title" placeholder="Title"/>
        <textarea id="Note-Content" cols="25" rows="2" placeholder="Note something down"></textarea>
        <input type="submit" id="Save" placeholder="Save" value='Save'/>
      </form>
    </div>
  )
}

function UI() {
  return (
    <>
      <Header />
      <Content />
    </>
  )
}

export default UI