import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-secondary">Title: {note.title}</h5>
          <p className="card-text">Description: {note.description} </p>
          <p className="card-text">Tag: {note.tag} </p>
          <i
            className="fa-solid fa-trash fa-lg (33% increase) my-2"
            style={{ float: "right" }}
            onClick={() => {
              deleteNote(note._id); props.showAlert("Deleted Successfully!", "danger");
            }}
          ></i>
          <i
            className="fas fa-edit fa-lg (33% increase) mx-4 my-2"
            style={{ float: "right" }}
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
