import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import setting_icon from './1008927-200.png'
import add_icon from './Green-Add-Button-PNG.png'
import delete_icon from './x-square-close-delete-icon-512x512-jzeyu3ut.png'
import './TodoStyle.css'

function Header() {
    return (
      <div id='Header'>
        <h1>Notepud</h1>
        <img src={setting_icon} alt='setting_icon'/>
      </div>
    )
  }

function Content() {
  let [re_render, setRe_RenderContent] = useState(0)

  let [showAddTodos, setShowAddTodos] = useState() 

  function save() {
    let Todo = document.getElementById('To-do').value
    localStorage.setItem(`${Todo}-todo`, `${Todo}`)
    setRe_RenderContent(re_render + 1)
  }

  function deleteTodo(Todo) {
    localStorage.removeItem(`${Todo}-todo`)
    setRe_RenderContent(re_render + 1)
  } 

  let keys = []
  for (let i = 0; i < localStorage.length; i++) {
    let localStorage_keys = localStorage.key(i)
    keys.push(localStorage_keys)
  }
  let filteredKeys = keys.filter(key => key.includes('-todo'))
  let fixedFilteredKeys = filteredKeys.map(key => key.replace('-todo', ''))

  return (
    <div id='Content'>
    
    <ul>
      {fixedFilteredKeys.map(key => {
        return (
          <div>
            <input type='checkbox'/>
            <li key={key}>{key}</li>
            <img id='Delete' src={delete_icon} alt='delete' onClick={() => deleteTodo(key)}/>
          </div>
        )
      })}
    </ul>

    <img id='Add' src={add_icon} alt='add' onClick={async () => {
      await setShowAddTodos(false)
      await setShowAddTodos(true)
    }}/>

    <ul>
      <li><Link to={'/'}>Notes</Link></li>
      <li><Link to={'/Todos'}>Todos</Link></li>
    </ul>

    {showAddTodos ? <AddTodos submit={save}/> : null}
    </div>
  )
}

function AddTodos(props) {
  return (
    <div id='AddNote'>
      <form onSubmit={props.submit}>
        <img src={delete_icon} alt='exit' />
        <input type="text" id="To-do" placeholder="To-do"/>
        <input type='submit' id="Save" value="Save"/>
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