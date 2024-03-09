import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigation = useNavigate();
  const { notes, getNotes, updateNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigation("/Login1");
    }
  }, []);

  const handleClick = (e) => {
    console.log("updating notes......", note);
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Update Successfully!", "succes");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNotes = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="etitle"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter title here"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="edescription"
                    className="form-control"
                    id="edescription"
                    placeholder="Description"
                    value={note.edescription}
                    minLength={5}
                    required
                    onChange={onChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    name="etag"
                    className="form-control"
                    id="etag"
                    placeholder="Tag"
                    value={note.etag}
                    minLength={5}
                    required
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3">
        <h2 style={{color: "#0D6EFD"}}> Your Notes </h2>
        <div className="container">
          {notes.length === 0 && "Notes Not Available!"}
        </div>
        <div className=" container row">
          {notes && notes.length > 0
            ? notes.map((notes) => {
                return (
                  <Noteitem
                    key={notes._id}
                    updateNote={updateNotes}
                    showAlert={props.showAlert}
                    note={notes}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Notes;
