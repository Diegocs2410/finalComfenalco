const noteCtrl = {};
const { messageGeneral } = require('../helpers/Messages');
const noteModel = require('../models/note.model');

// noteCtrl.listNotes = async (req, res) => {
//   try {
//     const notes = await noteModel.find().populate('user', { password: 0 });
//     res.json({ ok: true, notes });
//   } catch (error) {
//     res.status(400).json({ ok: false, message: error.message });
//   }
// };
noteCtrl.listNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById({ _id: id }).populate('user', { password: 0 });
    if (!note) {
      return res.status(400).json({ ok: false, message: 'Note not found' });
    }
    messageGeneral(res, 200, true, note, '');
    // res.status(201).json({ ok: true, note });
  } catch (error) {
    messageGeneral(res, 500, false, error.message);
  }
};
noteCtrl.addNote = async (req, res) => {
  try {
    const { title, description, date, user, priority } = req.body;
    const newNote = noteModel({
      title,
      description,
      date,
      user,
      priority,
    });
    await newNote.save(); //Use save method from instance noteModel  */
    messageGeneral(res, 201, true, '', 'Note added succesfully');
    // res.status(201).json({ ok: true, message: 'Note added succesfully' });
  } catch (error) {
    messageGeneral(res, 500, false, error.message);
  }
};
noteCtrl.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById({ _id: id });
    if (!note) {
      return res.status(400).json({ message: 'Note not found', ok: false });
    }
    await note.deleteOne();
    messageGeneral(res, 200, true, '', 'Note deleted');
    // res.status(200).json({ message: 'Note deleted', ok: true });
  } catch (error) {
    messageGeneral(res, 500, false, error.message);
  }
};
noteCtrl.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById({ _id: id });
    if (!note) {
      return res.status(400).json({ message: 'Note not found', ok: false });
    }
    const title = req.body.title || note.title;
    const description = req.body.description || note.description;
    const date = req.body.date || note.date;
    const user = req.body.user || note.user;
    const priority = req.body.priority || note.priority;
    const updatedNote = {
      title,
      description,
      date,
      user,
      priority,
    };

    await note.updateOne(updatedNote);
    messageGeneral(res, 200, true, updatedNote, ' Note updtated successfully');
  } catch (error) {
    messageGeneral(res, 500, false, error.message);
  }
};
noteCtrl.notesByUser = async (req, res) => {
  try {
    const id = req.userid;
    const userNotes = await noteModel.find({ user: id });
    messageGeneral(res, 200, true, userNotes, 'Notes by user');
    // res.status(200).json({ ok: true, userNotes });
  } catch (error) {
    messageGeneral(res, 500, false, error.message);
  }
};
module.exports = noteCtrl;
