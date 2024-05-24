const express = require('express');
const router = express.Router();


const categoryCtrl = require('../controllers/category');


router.post('/', categoryCtrl.createCategory);
router.get('/:id', categoryCtrl.getOneCategory);
router.get('/', categoryCtrl.getAllCategorys);
router.patch('/:id', categoryCtrl.modifyCategory);
router.delete('/:id', categoryCtrl.deleteCategory);

module.exports = router;
