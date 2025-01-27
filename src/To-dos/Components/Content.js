import React, { useEffect, useState } from 'react'
import AddTodos from './AddTodos'
import add_icon from './plus.png'
import delete_icon from './x-square-close-delete-icon-512x512-jzeyu3ut.png'

function Content() {
    let [re_render, setRe_RenderContent] = useState(0)
    
    let [showAddTodos, setShowAddTodos] = useState() 
  
    function save() { // This function retrieves the value of the input field for the new Todo, saves the Todo to local storage, and triggers a re-render of the component.
      let Todo = document.getElementById('Add-Todo-Input').value
      if (Todo === '') return setShowAddTodos(false)
      localStorage.setItem(`${Todo}-todo false`, `${Todo}`)
      setShowAddTodos(false)
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
  
    useEffect(() => fixedFilteredKeys3.forEach(key => saveCheckedorUnchecked2(key))) // This hook is used to trigger saveCheckedorUnchecked2() for every existing Todo in local storage when the component is first mounted.
  
    useEffect(() => {
      let todoTitle = document.getElementsByClassName('Todo-Title');
      Array.from(todoTitle).forEach(title => {
        let string = title.innerText;
        if (title.innerText.length > 16) title.innerText = `${string.substring(0, 16) + "..."}`;
      });
    }, []);
  
    return (
      <div id='Content' className='row'>
        <div id='Todos-Container' className='row-fluid'>
            {fixedFilteredKeys3.map(key => {
            return (
                <div id='Todos' className='row'>
                    <div id='Todos' className='col-7'>
                        <li key={key} className='Todo-Title' >{key}</li>
                    </div>
                    <div className='col-5'>
                      <div className='Clickers'>
                        <input id={key} type='checkbox' onClick={() => saveCheckedOrUnchecked(key)}/>
                        <img className='Todo-Delete' src={delete_icon} onClick={() => deleteTodo(key)} alt='Delete to-do'/>
                      </div>
                    </div>
                </div>
            )
            })}
        </div>
        
        <div className='row'>
          <div className='col d-flex align-items-center justify-content-center'>
            <img id='Add' className='d-block mx-auto' src={add_icon} alt='add_icon' onClick={async () => {
              await setShowAddTodos(true)
            }} />
          </div>
        </div>
    
        {showAddTodos ? <AddTodos submit={save}/> : null}
      </div>
    )
}

export default Content