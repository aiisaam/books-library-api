const mongoose = require("mongoose");
const Author = mongoose.model('Author');



exports.getAllAuthors = async(req, res) => {
    try {
      const authors = await Author.find();
      res.status(201).json( authors);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  };



  exports.getOneAuthor = async(req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      if (!author) return res.status(404).send({
        message: 'author not found'
      });
      res.json(author);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }



  exports.modifyAuthor =  async(req, res) => {
    try {
      const updateAuthor = await Author.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        { new: true } 
      );
      if (!updateAuthor) {
        return res.status(404).send({ message: 'author non trouvé' });
      }
      res.json(updateAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
};



exports.deleteAuthor = async(req, res) => {
    try {
      const deleteAuthor = await Author.findByIdAndDelete(req.params.id);
      if (!deleteAuthor) {
        return res.status(404).send({ message: 'author non trouvé' });
      }
      res.json({ message: 'author suprimé avec succes' });
    } catch (err) {
      res.status(500).send(err);
    }
  };



  exports.createAuthor = async(req, res) => {
    try {
      const author = new Author({
        name: req.body.name
      });
      const savedAuthor = await author.save();
      res.status(201).json(savedAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
  };









