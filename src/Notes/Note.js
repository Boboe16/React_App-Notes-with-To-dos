import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import add_icon from './Green-Add-Button-PNG.png'
import delete_icon from './x-square-close-delete-icon-512x512-jzeyu3ut.png'
import './NoteStyle.css'

function Header() {
  return (
    <div id='Header'>
      <h1>Notepud</h1>
    </div>
  )
}

function Content() {
  let [showAdd, setShowAdd] = useState(false)
  
  let [showView, setShowView] = useState(false) 

  let [re_render ,setRe_RenderContent] = useState(0)
 
  function deleteNote(title) {
      localStorage.removeItem(`${title}`)
      localStorage.removeItem(`${title}-content`)
      setRe_RenderContent(re_render + 1)
  }

  let [originalNote, setOriginalNote] = useState()

  async function save(originalNote) { 
    /* The save function saves a note to local storage. It first gets the values of the title and content inputs from the form. If the title input is empty, the function doesn't save anything. If the client is editing an existing note, the function removes the old note from local storage by removing the key-value pairs for the old note's title and content. Then, it sets the new note's title and content as new key-value pairs in local storage. This function allows the client to save a new note or update an existing note in local storage. */
    let Title = document.querySelector('#Title-Input').value
    let Content = document.querySelector('#Note-Content-Input').value

    if (Title === '') {
      return
    }
    
    localStorage.removeItem(`${originalNote}`)
    let array = []
    for (let i = 0; i < localStorage.length; i++) {
      let pupo = localStorage.key(i)
      array.push(`${pupo}`)
    }
    let ihe = array.filter(element => element.includes(`${originalNote}-content`))
    localStorage.removeItem(`${ihe}`)
    console.log(originalNote)

    await localStorage.setItem(`${Title}`, `${Title}`)
    await localStorage.setItem(`${Title}-content`, `${Content}`)
  }

  let [title, setTitle] = useState();

  let [content, setContent] = useState()

  async function view(noteTitle) {
    /*The view function get the title of the selected note and set the state of Title, Content, and originalContent using it. It then set the state showView to false then true, after its true the showView ternary operator is executed and addViewEdit component is rendered with props Title, Content, and the save function with originalNote as argument.*/

    setOriginalNote(noteTitle)
    setTitle(noteTitle)
    let array = []
    for (let i = 0; i < localStorage.length; i++) {
      let pupo = localStorage.key(i)
      array.push(`${pupo}`)
    }
    let ihe = array.filter(element => element.includes(`${noteTitle}-content`))
    let bebe = localStorage.getItem(ihe)
    setContent(bebe)
    await setShowView(false)
    await setShowView(true)
    (showAdd ? setShowAdd(false) : null)
  }

  let keys = []
  for (let i = 0; i < localStorage.length; i++) {
    let localStorage_keys = localStorage.key(i)
    keys.push(localStorage_keys)
  }

  let filteredKeys = keys.filter(key => key.indexOf('-todo') === -1 && key.indexOf('-content') === -1);

  useEffect(() => {
    let noteTitle = document.getElementsByClassName('Note-Title');
    Array.from(noteTitle).forEach(title => {
      let string = title.innerText;
      if (title.innerText.length > 16) title.innerText = `${string.substring(0, 16) + "..."}`
    });
  }, []);

  function hideAndShow(id, id2, tagName, visibility) {
    document.getElementById(`${id}`).style.visibility = `${visibility}`
    document.getElementById(`${id2}`).style.visibility = `${visibility}`
    document.getElementsByTagName(`${tagName}`)[0].style.overflowY = `${visibility}`
  }

  try {
    showView ? hideAndShow('Navbar', 'Add', 'body', 'hidden') : hideAndShow('Navbar', 'body', 'visible')   
  } catch(error) { console.log(error) } 

  try {
    showAdd ? hideAndShow('Navbar', 'Add', 'body', 'hidden') : hideAndShow('Navbar', 'body', 'visible')
  } catch(error) { console.log(error) } 

  return (
    <>
    <div id='Content'>
      <ul>
       {filteredKeys.map(noteTitle => {
        return (
          <>
          <div className='Note'>
            <li className='Note-Title' onClick={() => view(noteTitle)} key={noteTitle}>{noteTitle}</li>
          </div>
          <img className='Note-Delete' src={delete_icon} onClick={() => deleteNote(noteTitle)} alt='delete-icon'/>
          </>
        )})}
      </ul>

      <img id='Add' src={add_icon} alt='add_icon' onClick={async () => {
        await setShowAdd(false)
        await setShowAdd(true)
        (showView ? setShowView(false) : null)
      }} />
      {showAdd && <AddViewEdit save={save} />}
      {showView && <AddViewEdit save={() => save(originalNote)} pee={title} poo={content} />}
      <ul id='Navbar'>
        <li><Link to={"/"}>Notes</Link></li>
        <li><Link to={"/Todos"}>To-dos</Link></li>
      </ul>
    </div>
    </>
  )
}

function AddViewEdit(props)  {
  return (
      <form id='Add_View_Edit' onSubmit={props.save}>
        <input type="text" id="Title-Input" placeholder="Title" defaultValue={props.pee}/>
        <textarea id="Note-Content-Input" cols="25" rows="2" placeholder="Note something down" defaultValue={props.poo}></textarea>
        <input type="submit" id="Save-Note" placeholder="Save" value='Save'/>
      </form>
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