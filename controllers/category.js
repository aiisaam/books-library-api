const mongoose = require("mongoose");
const Category = mongoose.model('Category');





exports.createCategory =  async(req, res) => {
    try {
        const category = new Category({
            name: req.body.name
        });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);  // 201 indique que la ressource a été créée avec succès
    } catch (err) {
        res.status(500).send(err);
    }
  };  




exports.modifyCategory =  async(req, res) => {
    // console.log("category_id :", req.params);
    // {
    //     id: "",
    //     name: "",
    // }
    try {
        const updatedCategory = await Category.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            { new: true }  // Cette option garantit que la réponse contient la version mise à jour du document
        );
        if (!updatedCategory) {
            return res.status(404).send({ message: 'Catégory non trouvée' });
        }
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).send(err);
    }
};  




exports.getOneCategory =  async(req, res) => {
    try {
       const category = await Category.findById(req.params.id);
       if (!category) return res.status(404).send({ message: 'category id Not found'});
       res.json(category);
    } catch (err) {
         res.status(500).send(err);
    }
  };




exports.deleteCategory = async(req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).send({ message: 'Catégorie non trouvée' });
        }
        res.json({ message: 'Catégorie supprimée avec succès' });
    } catch (err) {
        res.status(500).send(err);
    }
  };



exports.getAllCategorys = async(req, res) => {
    try {
          const categorys = await Category.find();
             res.status(202).json(categorys);
    }        catch (err) {
            res.status(404).send(err);
       }
  };
