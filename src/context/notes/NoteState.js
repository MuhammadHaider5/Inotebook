import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const authToken = localStorage.getItem('token');

  // Get all the notes from the server
  /* =============== GET ALL NOTES =============== */
  const getNotes = async () => {
    /* =============== API CALL FOR GET ALL NOTES =============== */
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-Token": authToken
          
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  /* =============== ADD A NOTE ===============*/
  const addNote = async (title, description, tag) => {
    try {
      /* =============== API Call FOR ADD NOTE ===============*/
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-Token": authToken
            
        },
        body: JSON.stringify({ title, description, tag }), // Corrected body format
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const data = await response.json();
      console.log("Note added:", data);

      /* =============== Logic To Add Note In Client ===============*/
      console.log("Adding a new note");
      const note = {
        _id: data._id,
        title: title,
        description: description,
        tag: tag,
        date: data.date,
        __v: data.__v,
      };
      // Assuming 'notes' is an array of existing notes and 'setNotes' is a function to update the state
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  /* =============== DELETE A NOTE ===============*/
  const deleteNote = async (id) => {
    /* =============== API CALL FOR DELETE ===============*/
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-Token": authToken
      },
    });
    const json = response.json();
    console.log(json);
    /* =============== Logic To Delete Notes In Client ===============*/
    console.log("deleting note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
 /*=============== UPDATE A NOTES ===============*/
const updateNote = async (id, title, description, tag) => {
  try {
    /* =============== API CALL FOR UPDATE ===============*/
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-Token": authToken
          
      },
      body: JSON.stringify({ title, description, tag }), // Corrected this line
    });
    const json = await response.json();
    console.log(json);

    /* =============== Logic To UPDATE Notes In Client ===============*/
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  } catch (error) {
    console.error("Error updating note:", error);
  }
};
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
