import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  /* =============== GET ALL NOTES =============== */
  const getNotes = async () => {
    /* =============== API CALL FOR GET ALL NOTES =============== */
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJfaWQiOiI2NWRkMGNjMDQyYjk0MjMxYzI3ZjY3NTIifSwiaWF0IjoxNzA4OTg1NTQ1fQ.XBprxRBPICAqVUPZWoafd1Ne69PVYbzhH9D8UzK2gvk",
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
          "auth-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJfaWQiOiI2NWRkMGNjMDQyYjk0MjMxYzI3ZjY3NTIifSwiaWF0IjoxNzA4OTg1NTQ1fQ.XBprxRBPICAqVUPZWoafd1Ne69PVYbzhH9D8UzK2gvk",
        },
        body: JSON.stringify({ title, description, tag }), // Corrected body format
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const notes = await response.json();
      console.log("Note added:", notes);

      /* =============== Logic To Add Note In Client ===============*/
      console.log("Adding a new note");
      
      // Assuming 'notes' is an array of existing notes and 'setNotes' is a function to update the state
      setNotes((prevNotes) => [...prevNotes, notes]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // /* =============== ADD A NOTES ===============*/
  // const addNote = async (title, description, tag) => {
  //   /* =============== API Call FOR ADD NOTE ===============*/
  //   const response = await fetch(`${host}/api/notes/addnote`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-Token":
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJfaWQiOiI2NWRkMGNjMDQyYjk0MjMxYzI3ZjY3NTIifSwiaWF0IjoxNzA4OTg1NTQ1fQ.XBprxRBPICAqVUPZWoafd1Ne69PVYbzhH9D8UzK2gvk",
  //     },
  //     body: JSON.stringify(title, description, tag),
  //   });
  //   const json = response.json();
  //   console.log(json);
  //   /* =============== Logic To Add Note In Client ===============*/
  //   console.log("adding a new note");
  //   const note = [
  //     {
  //       _id: "65d08ca9b4e09aafd44f005f",
  //       title: title,
  //       description: description,
  //       tag: tag,
  //       date: "2024-02-17T10:38:33.409Z",
  //       __v: 0,
  //     },
  //   ];
  //   setNotes(note.concat(notes));
  // };

  /* =============== DELETE A NOTE ===============*/
  const deleteNote = async (id) => {
    /* =============== API CALL FOR DELETE ===============*/
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJfaWQiOiI2NWRkMGNjMDQyYjk0MjMxYzI3ZjY3NTIifSwiaWF0IjoxNzA4OTg1NTQ1fQ.XBprxRBPICAqVUPZWoafd1Ne69PVYbzhH9D8UzK2gvk",
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
        "auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJfaWQiOiI2NWRkMGNjMDQyYjk0MjMxYzI3ZjY3NTIifSwiaWF0IjoxNzA4OTg1NTQ1fQ.XBprxRBPICAqVUPZWoafd1Ne69PVYbzhH9D8UzK2gvk",
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
