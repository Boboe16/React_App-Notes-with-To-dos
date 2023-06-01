import React, {useEffect} from "react"

function AddViewEdit(props)  {
    useEffect(() => props.hideNotes)

    return (
        <div id='Add_View_Edit' className="row">
          <input type="text" id="Note-Title-Input" className="col-10" placeholder="Title" defaultValue={props.pee}/>
          <button id="Save-Note" className="col-2" onClick={props.save}>
            Save
          </button>
          <textarea id="Note-Content-Input" className="row-" cols="25" rows="2" placeholder="Note something down" defaultValue={props.poo}></textarea>
        </div>
    )
  }

export default AddViewEdit