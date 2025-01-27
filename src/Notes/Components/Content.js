import React, { useEffect, useState } from 'react';
import AddViewEdit from './AddViewEdit';
import add_icon from './plus.png';
import delete_icon from './x-square-close-delete-icon-512x512-jzeyu3ut.png';

function Content() {
  // State variables to manage visibility and rendering of different components
  let [showAdd, setShowAdd] = useState(false); // Controls the visibility of the AddViewEdit component for adding notes
  let [showNotes, setShowNotes] = useState(true); // Controls the visibility of the notes list
  let [showView, setShowView] = useState(false); // Controls the visibility of the AddViewEdit component for viewing notes
  let [re_render, setRe_RenderContent] = useState(0); // Tracks changes in state to trigger re-renders

  // Deletes a note and its content from localStorage
  function deleteNote(title) {
    localStorage.removeItem(`${title}`);
    localStorage.removeItem(`${title}-content`);
    setRe_RenderContent(re_render + 1); // Triggers re-render to reflect changes
  }

  let [originalNote, setOriginalNote] = useState(); // Stores the title of the note being edited

  // Saves a new note or updates an existing one
  async function save() {
    let Title = document.querySelector('#Note-Title-Input').value; // Get the note title from input
    let Content = document.querySelector('#Note-Content-Input').value; // Get the note content from input

    if (Title === '') {
      await setShowAdd(false); // Hides AddViewEdit if no title is provided
      await setShowNotes(true); // Shows the notes list
      return;
    }

    localStorage.removeItem(`${originalNote}`); // Removes the original note
    let array = [];
    for (let i = 0; i < localStorage.length; i++) {
      let pupo = localStorage.key(i);
      array.push(`${pupo}`);
    }
    let ihe = array.filter(element => element.includes(`${originalNote}-content`));
    localStorage.removeItem(`${ihe}`);

    await localStorage.setItem(`${Title}`, `${Title}`); // Saves the new note title
    await localStorage.setItem(`${Title}-content`, `${Content}`); // Saves the new note content
    await setShowAdd(false);
    await setShowView(false);
    await setShowNotes(true); // Returns to the notes list
  }

  let [title, setTitle] = useState(); // Stores the currently viewed note title
  let [content, setContent] = useState(); // Stores the currently viewed note content

  // Views a note by retrieving its content from localStorage
  async function view(noteTitle) {
    setOriginalNote(noteTitle); // Sets the original note for editing
    setTitle(noteTitle); // Sets the title for viewing
    let array = [];
    for (let i = 0; i < localStorage.length; i++) {
      let pupo = localStorage.key(i);
      array.push(`${pupo}`);
    }
    let ihe = array.filter(element => element.includes(`${noteTitle}-content`));
    let bebe = localStorage.getItem(ihe); // Gets the note content
    setContent(bebe);
    await setShowView((prevShowView) => !prevShowView); // Toggles the view mode
  
    // Fix for line 65
    if (showAdd) {
      setShowAdd(false); // Proper conditional block
    }
  }
  

  // Retrieves and filters localStorage keys to display notes
  let keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    let localStorage_keys = localStorage.key(i);
    keys.push(localStorage_keys);
  }
  let filteredKeys = keys.filter(key => key.indexOf('-todo') === -1 && key.indexOf('-content') === -1);

  // Truncates note titles longer than 16 characters
  useEffect(() => {
    let noteTitle = document.getElementsByClassName('Note-Title');
    Array.from(noteTitle).forEach(title => {
      let string = title.innerText;
      if (title.innerText.length > 16) title.innerText = `${string.substring(0, 16) + '...'}`;
    });
  }, []);

  // Hides the notes list
  function hideNotes() {
    setShowNotes(false);
    console.log('setShowNotes is false');
  }

  return (
    <>
      {/* Displays the AddViewEdit component for adding or viewing notes */}
      {showAdd && <AddViewEdit save={save} hideNotes={hideNotes} />}
      {showView && <AddViewEdit save={() => save(originalNote)} pee={title} poo={content} hideNotes={hideNotes} />}

      {/* Displays the notes list */}
      {showNotes && (
        <div id="Content" className="row">
          <div id="Notes-Container" className="row-fluid">
            {filteredKeys.map(noteTitle => {
              return (
                <div id="Notes" className="row" key={noteTitle}>
                  <div className="col-6">
                    <li className="Note-Title" onClick={() => view(noteTitle)}>{noteTitle}</li>
                  </div>
                  <div className="col-6">
                    <img className="Note-Delete" src={delete_icon} onClick={() => deleteNote(noteTitle)} alt="delete-icon" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Displays the Add button */}
          <div className="row">
            <div className="col d-flex align-items-center justify-content-center">
              <img
                id="Add"
                className="d-block mx-auto"
                src={add_icon}
                alt="add_icon"
                onClick={async () => {
                  setShowAdd(prevShowAdd => !prevShowAdd);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
