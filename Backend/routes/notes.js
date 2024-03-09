const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUsers = require("../middleware/fetchUsers");

/* ============== ROUTE 1: Get All the notes using: GET "/api/notes/fetchAllNotes" . Login Required =============== */
router.get("/fetchAllNotes", fetchUsers, async (req, res) => {
  try {
    const notes = await Notes.find({ users: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
/* =============== ROUTE 2: Add a new Note using: POST "/api/notes/addnote" . Login Required ===================*/
router.post(
  "/addnote",
  fetchUsers,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
/* ================= ROUTE 3: Updateing an existing  Notes using: POST "/api/notes/updatenote" . Login Required =================*/
router.put("/updatenote/:id", fetchUsers, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a newNote object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    console.log("Note:", note);
    console.log("Note user:", note.user);

    if (note.user !== req.user.id) {
      return res.status(401).send("Access Denied");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

/* =================== ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required =================*/
router.delete("/deletenote/:id", fetchUsers, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    console.log("Note:", note);
    console.log("Note user:", note.user);

    // Allow deletion only if user owns this Note
    if (note.user !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error:" + error.message);
  }
});
module.exports = router;
