import React, {useEffect, useState} from 'react'
import AddViewEdit from './AddViewEdit'
import add_icon from './Green-Add-Button-PNG.png'
import delete_icon from './x-square-close-delete-icon-512x512-jzeyu3ut.png'

function Content() {
  let [showAdd, setShowAdd] = useState(false)
  let [showNotes, setShowNotes] = useState(true)
  let [showView, setShowView] = useState(false) 
  let [re_render ,setRe_RenderContent] = useState(0)
 
  function deleteNote(title) { // **deleteNote(title)**: This function is called when the delete icon is clicked for a note. It removes the note and its corresponding content from the local storage. It uses the `localStorage.removeItem` method to remove the note and content based on the provided `title`. After removing the items, it updates the state variable `re_render` by incrementing its value by 1 using the `setRe_RenderContent` function.
      localStorage.removeItem(`${title}`)
      localStorage.removeItem(`${title}-content`)
      setRe_RenderContent(re_render + 1)
  }

  let [originalNote, setOriginalNote] = useState()

  async function save() {  // **save()**: This function is called when the save button is clicked in the `AddViewEdit` component. It retrieves the values of the note title and content from the input fields. If the `Title` is empty, it sets the state variables `showAdd` and `showNotes` to `false` and returns early. Otherwise, it removes the original note and its content from the local storage using `localStorage.removeItem`. It then sets the new note title and content in the local storage using `localStorage.setItem`. Finally, it sets the state variables `showAdd`, `showView`, and `showNotes` to control the visibility of different components.
    let Title = document.querySelector('#Note-Title-Input').value
    let Content = document.querySelector('#Note-Content-Input').value
  
    if (Title === '') {
      await setShowAdd(false)
      await setShowNotes(true)
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
    await setShowAdd(false)
    await setShowView(false)
    await setShowNotes(true)
  }

  let [title, setTitle] = useState();

  let [content, setContent] = useState()

  async function view(noteTitle) {  // **view(noteTitle)**: This function is called when a note title is clicked in the list of notes. It retrieves the corresponding note content from the local storage based on the `noteTitle`. It sets the state variables `originalNote`, `title`, and `content` to control the view mode in the `AddViewEdit` component. Additionally, it toggles the state variable `showView` using the `setShowView` function and sets `showAdd` to `false` if it was previously `true`.
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
    await setShowView((prevShowView) => !prevShowView)
    (showAdd ? setShowAdd(false) : null)
  }

  let keys = []
  for (let i = 0; i < localStorage.length; i++) {
    let localStorage_keys = localStorage.key(i)
    keys.push(localStorage_keys)
  }

  let filteredKeys = keys.filter(key => key.indexOf('-todo') === -1 && key.indexOf('-content') === -1);

  useEffect(() => { // **useEffect(() => {...}, [])**: This `useEffect` hook is used to modify the note titles if their length exceeds 16 characters. It selects all elements with the class name `Note-Title` and checks their text length. If a title's length exceeds 16 characters, it updates the title by showing the first 16 characters followed by an ellipsis. The empty dependency array `[]` ensures that this effect only runs once when the component mounts.
    let noteTitle = document.getElementsByClassName('Note-Title');
    Array.from(noteTitle).forEach(title => {
      let string = title.innerText;
      if (title.innerText.length > 16) title.innerText = `${string.substring(0, 16) + "..."}`
    });
  }, []);

  function hideNotes() { // **hideNotes()**: This function is called when the notes are hidden. It sets the state variable `showNotes` to `false`.
    setShowNotes(false)
    console.log('setShowNotes is false')
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
              setShowAdd((prevShowAdd) => !prevShowAdd);
            }} />
          </div>
        </div>
      </div> }
    </>
  )
}

export default Content