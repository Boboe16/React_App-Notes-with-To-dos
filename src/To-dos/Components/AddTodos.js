import React from "react"

function AddTodos(props) {
    return (
      <div id="Add-Todo" className="row-fluid">
          <input type="text" id="Add-Todo-Input" className="col-9" placeholder="To-do"/>
          <button id="Save-Todo" className="col-3" onClick={props.submit}>
            Save
          </button>
      </div>
    )
}

export default AddTodos