const express = require('express');
const router = express.Router();


const authorCtrl = require('../controllers/authors');


router.get('/', authorCtrl.getAllAuthors );
router.get('/:id', authorCtrl.getOneAuthor );
router.patch('/:id', authorCtrl.modifyAuthor);
router.post('/', authorCtrl.createAuthor );
router.delete('/:id', authorCtrl.deleteAuthor );


module.exports = router;