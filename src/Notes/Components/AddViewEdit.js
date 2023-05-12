import React, {useEffect} from "react"

function AddViewEdit(props)  {
    useEffect(() => props.hideNotes)

    return (
        <form id='Add_View_Edit' className="row" onSubmit={props.save}>
          <input type="text" id="Note-Title-Input" className="col-10" placeholder="Title" defaultValue={props.pee}/>
          <input type="submit" id="Save-Note"className="col-2" placeholder="Save" value='Save'/>
          <textarea id="Note-Content-Input" className="row-" cols="25" rows="2" placeholder="Note something down" defaultValue={props.poo}></textarea>
        </form>
    )
  }

export default AddViewEdit