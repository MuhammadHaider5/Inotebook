import React, { useContext, useState } from "react";
import notesContext from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(notesContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully!", "info")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2 className="container" style={{color: "#0D6EFD"}}> Add a Notes </h2>
        <form className="container">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Enter title here"
              value={note.title}
              minLength={5}
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              placeholder="Description"
              value={note.description}
              minLength={5}
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              name="tag"
              className="form-control"
              id="tag"
              placeholder="Tag"
              value={note.tag}
              minLength={5}
              required
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary col-lg-1"
            onClick={handleClick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            <strong>Add Note</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
