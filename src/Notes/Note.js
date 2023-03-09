import React, {createContext, useState} from 'react'
import setting_icon from './1008927-200.png'
import add_icon from './Green-Add-Button-PNG.png'
import delete_icon from './x-square-close-delete-icon-512x512-jzeyu3ut.png'
import './NoteStyle.css'

function Header() {
  return (
    <div id='Header'>
      <h1>Notepud</h1>
      <img src={setting_icon} alt='setting_icon'/>
    </div>
  )
}

let context = createContext(true)

function Content() {
  let [showAddViewEdit, setShowAddViewEdit] = useState(false)
  
  let [nothing] = useState(true)

  let [Re_render,setRe_renderContent] = useState(true)

  async function delete_note(title) {
    localStorage.removeItem(`${title}`)
    localStorage.removeItem(`${title}-content`)
    await setRe_renderContent(false)
    await setRe_renderContent(true)
    // await setVisible(false)
  } 

  let keys = []

  for (let i = 0; i < localStorage.length; i++) {
    let localStorage_keys = localStorage.key(i)
    keys.push(localStorage_keys)
  }

  let filtered_keys = keys.filter(key => !key.includes('-content'))

  //

  async function save() {
    let Title = document.querySelector('#Title').value
    let Content = document.querySelector('#Note-Content').value
    await localStorage.setItem(`${Title}`, `${Title}`)
    await localStorage.setItem(`${Title}-content`, `${Content}`)
    await setRe_renderContent(false) 
    await setRe_renderContent(true)
    // await setVisible(false)
  }

  return (
    <div id='Content'>
      <ul>
       {filtered_keys.map(key => {
        return (
          <div>
            <li key={key}>{key}</li>
            <img id='Delete' src={delete_icon} onClick={() => delete_note(key)} alt='delete-icon'/>
          </div>
        )})}
      </ul>

      <img id='Add' src={add_icon} alt='add_icon' onClick={async () => {
        await setShowAddViewEdit(false)
        await setShowAddViewEdit(true)
      }} />
      {showAddViewEdit && <AddViewEdit Visibility={true} hallo={nothing} save={save}/>}
    </div>
  )
}

function AddViewEdit(props)  {
  
  // let [visible, setVisible] = useState(props.Visibility)
  
  // let [tae , setRe_renderContent] = useState(props.hallo)
  
  return (
     <div id='Add_View_Edit'>
        <form onSubmit={props.save}>
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