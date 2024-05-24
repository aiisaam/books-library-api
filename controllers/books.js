const mongoose = require("mongoose");
const Book = mongoose.model('Book');

exports.createBook = async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title,
            numberOfPages: req.body.numberOfPages,
            category: req.body.category,
            authors: req.body.authors,
            img: req.body.img,
            description: req.body.description,
            prix: req.body.prix

        });  
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) { 
        res.status(500).send(err);
    }
  };

  exports.modifyBook = async (req, res) => {
    try {     //UpdateOne
            const updatedBook = await Book.findOneAndUpdate(  
            {_id: req.params.id},
            req.body,
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).send({ message: 'Livre non trouvé' });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).send(err);
    }
  };

  exports.getOneBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('authors');
        if (!book) return res.status(400).send({
            message: 'This id Book Not Found' 
        });
        res.json(book);
    } catch (err) {
        res.status(500).send(err);
    }
  };

  exports.deleteBook =  async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);  
  
        if (!deletedBook) {
            return res.status(404).send({ message: 'Livre non trouvé' });
        }
        res.json({ message: 'Livre supprimé avec succès' });
    } catch (err) {
        res.status(500).send(err);
    }
  };

  exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('authors');
        res.status(200).json(books);
    } catch (err) {
        res.status(400).send(err);
    }
  };

   exports.searchBooks = async(req, res) => { 
    try {
        const { title, authorName } = req.query;
        let query = {};
        if(title) {
            query.title = { $regex: title, $options: "i" };
        }
        if(authorName) {
            const author = await mongoose.model('Author').findOne({ name: { $regex: authorName, $options: "i"} });
           if (author) {
               // query["authors.name"] = { $regex: authorName, $options: "i"};
            query.authors = author._id;
           } else {
            return res.status(400).json([]);
           }
        }
        // const books = await Book.find(query).populate('authors');
        const books = await mongoose.model('Book').find(query).populate('authors');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
   }

  // find : returns an array of items (array of objects)
  // findOne: returns single document (one Object)  : findOneById({key: value})
  // findById : it takes an id and returns the document : findOneById(documentId)
  
  exports.getAllBookCategorys = async (req, res) => {
      try {
        const books = await Book.find({ category: req.params.id}).populate('authors'); //({ authors: req.params.id })
        /// !books : means : false, 0, undefined, ""
        // books.length : checks if the array is empty []
        if (!books || books.length === 0) {
            return res.status(404).send({ message: `Aucun livre trouvé pour la catégorie: ${req.params.id} ` });
        }
        res.status(200).json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getAllBooksAuthors = async(req, res) => {
    try {
      const books = await Book.find({ authors: req.params.id});
      if(!books || books.length === 0) {
        return res.status(404).send({ message: `Aucun livre trouvé pour le author : ${req.params.id}` });
    }
        res.status(200).send(books); 
   } catch (error) {
      res.status(500).send(error);
    }
  };


