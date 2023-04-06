import React, { useEffect, useState } from 'react'
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

  function save() { // This function retrieves the value of the input field for the new Todo, saves the Todo to local storage, and triggers a re-render of the component.
    let Todo = document.getElementById('To-do').value
    localStorage.setItem(`${Todo}-todo false`, `${Todo}`)
    setRe_RenderContent(re_render + 1)
  }

  function deleteTodo(Todo) { // This function removes the specified Todo from local storage and triggers a re-render of the component.
    localStorage.removeItem(`${Todo}-todo true`)
    localStorage.removeItem(`${Todo}-todo false`)
    setRe_RenderContent(re_render + 1)
  } 

  function saveCheckedOrUnchecked(key) { // This function checks the status of a specified Todo and saves its status (checked or unchecked) to local storage. It also triggers a re-render of the component.
    let toDo = document.getElementById(key).checked
    if(toDo === true) {
      localStorage.removeItem(`${key}-todo false`)
      localStorage.setItem(`${key}-todo true`, `${key}`)
    }
    else if(toDo === false) {
      localStorage.removeItem(`${key}-todo true`)
      localStorage.setItem(`${key}-todo false`, `${key}`)
    }
    setRe_RenderContent(re_render + 1)
  }

  function saveCheckedorUnchecked2(key) { // This function retrieves the status of a specified Todo from local storage and sets the corresponding checkbox to the appropriate status (checked or unchecked).
    let element = document.getElementById(key);
    if (element) {
      if (localStorage.getItem(`${key}-todo false`)) {
        element.checked = false;
      }
      if (localStorage.getItem(`${key}-todo true`)) {
        element.checked = true;
      }
    }
  }

  let keys = []
  for (let i = 0; i < localStorage.length; i++) {
    let localStorage_keys = localStorage.key(i)
    keys.push(localStorage_keys)
  }
  let filteredKeys = keys.filter(key => key.includes('-todo'))
  let fixedFilteredKeys = filteredKeys.map(key => key.replace('-todo', ''))
  let fixedFilteredKeys2 = fixedFilteredKeys.map(key => key.replace(' false', ''))
  let fixedFilteredKeys3 = fixedFilteredKeys2.map(key => key.replace(' true', ''))

  useEffect(() => fixedFilteredKeys3.forEach(key => saveCheckedorUnchecked2(key)), []) // This hook is used to trigger saveCheckedorUnchecked2() for every existing Todo in local storage when the component is first mounted.

  return (
    <div id='Content'>
    <ul>
    {fixedFilteredKeys3.map(key => {
    return (
      <div key={key}>
        <input id={key} type='checkbox' onClick={() => saveCheckedOrUnchecked(key)}/>
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