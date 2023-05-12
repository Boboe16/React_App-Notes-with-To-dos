import React, {useEffect, useState, useCallback} from 'react'
import AddViewEdit from './AddViewEdit'
import add_icon from './Green-Add-Button-PNG.png'
import delete_icon from './x-square-close-delete-icon-512x512-jzeyu3ut.png'

function Content() {
  let [showAdd, setShowAdd] = useState(false)
  let [showNotes, setShowNotes] = useState(true)
  let [showView, setShowView] = useState(false) 
  let [re_render ,setRe_RenderContent] = useState(0)
 
  function deleteNote(title) {
      localStorage.removeItem(`${title}`)
      localStorage.removeItem(`${title}-content`)
      setRe_RenderContent(re_render + 1)
  }

  let [originalNote, setOriginalNote] = useState()

  let save = useCallback(async (originalNote) => { 
    /* The save function saves a note to local storage. It first gets the values of the title and content inputs from the form. If the title input is empty, the function doesn't save anything. If the client is editing an existing note, the function removes the old note from local storage by removing the key-value pairs for the old note's title and content. Then, it sets the new note's title and content as new key-value pairs in local storage. This function allows the client to save a new note or update an existing note in local storage. */
    let Title = document.querySelector('#Note-Title-Input').value
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
    await setShowNotes(true)
  }, [setShowNotes])
  

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

  function hideNotes() {
    setShowNotes(false)
    console.log('tae')
  }

  return (
    <>
      {showAdd && <AddViewEdit save={save} hideNotes={hideNotes}/>}
      {showView && <AddViewEdit save={() => save(originalNote)} pee={title} poo={content} hideNotes={hideNotes}/>}

      { showNotes && <div id='Content' className='row'>
        <div id='Notes-Container' className='row-fluid'>
        {filteredKeys.map(noteTitle => {
          return (
            <div id='Notes' className='row'>
              <div className='col-6'>
                <li className='Note-Title' onClick={() => view(noteTitle)} key={noteTitle}>{noteTitle}</li>
              </div>
              <div className='col-6'>
                <img className='Note-Delete' src={delete_icon} onClick={() => deleteNote(noteTitle)} alt='delete-icon'/>
              </div>
            </div>
          )})}
        </div>

        <div className='row'>
  <div className='col d-flex align-items-center justify-content-center'>
    <img id='Add' className='d-block mx-auto' src={add_icon} alt='add_icon' onClick={async () => {
      await setShowAdd(false)
      await setShowAdd(true)
      (showView ? setShowView(false) : null)
    }} />
  </div>
</div>

        {/* <img id='Add' className='d-block mx-auto' src={add_icon} alt='add_icon' onClick={async () => {
          await setShowAdd(false)
          await setShowAdd(true)
          (showView ? setShowView(false) : null)
        }} /> */}
      </div> }
    </>
  )
}

export default Content