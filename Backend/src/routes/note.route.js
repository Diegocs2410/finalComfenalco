const { Router } = require('express');
const noteCtrl = require('../controllers/note.controller');
const verifyToken = require('../middlewares/VerifyJwt');

const route = Router();

// route.get('/', verifyToken, noteCtrl.listNotes);
route.get('/notes/user', verifyToken, noteCtrl.notesByUser);
route.get('/:id', verifyToken, noteCtrl.listNoteById);
route.post('/', verifyToken, noteCtrl.addNote);
route.delete('/:id', verifyToken, noteCtrl.deleteNote);
route.put('/:id', verifyToken, noteCtrl.updateNote);

module.exports = route;
