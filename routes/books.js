const express = require('express');
const router = express.Router();


const bookCtrl = require('../controllers/books');


router.get('/searche', bookCtrl.searchBooks);
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);
router.patch('/:id', bookCtrl.modifyBook);
router.post('/', bookCtrl.createBook);
router.delete('/:id', bookCtrl.deleteBook);
router.get('/category/:id', bookCtrl.getAllBookCategorys);
router.get('/authors/:id', bookCtrl.getAllBooksAuthors);



module.exports = router;
