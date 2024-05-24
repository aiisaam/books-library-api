const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('./models');
const app = express();



app.use(cors());
app.use(bodyParser.json());

app.use("/user", require("./routes/user"));
app.use("/books", require("./routes/books"));
app.use("/category", require("./routes/category"));
app.use("/author", require("./routes/authors"));


mongoose.connect('mongodb+srv://7ari:F3JCntkcbf5FHbz2@cluster0.nc9zz2v.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));


module.exports = app;










































































/*
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("./models");


const bookRoutes = require('./routes/books');
const categoryRoutes = require('./routes/category');
const authorsRoutes = require('./routes/authors');

const userRoutes = require('./routes/user');


const app = express();



 mongoose.connect('mongodb+srv://7ari:F3JCntkcbf5FHbz2@cluster0.nc9zz2v.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));
   
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/books', bookRoutes);
  app.use('/category', categoryRoutes);
  app.use('/authors', authorsRoutes);

  app.use('/singup', userRoutes);
  app.use('/login', userRoutes);


 module.exports = app;



/*

  app.get('/books/category/:categoryId', async (req, res) => {
    try {
      // find : returns an array of items (array of objects)
      // findOne: returns single document (one Object)  : findOneById({key: value})
      // findById : it takes an id and returns the document : findOneById(documentId)
        const books = await Book.find({ category: req.params.categoryId});

        /// !books : means : false, 0, undefined, ""
        // books.length : checks if the array is empty []

        if (!books || books.length === 0) {
            return res.status(404).send({ message: `Aucun livre trouvé pour la catégorie: ${req.params.categoryId}` });
        }
        res.status(200).json(books);
    } catch (err) {
        res.status(500).send(err);
    }
});


//Obtenir Tout les livre qui ont le méme authors 

app.get('/books/authors/:authorsId', async(req, res) => {
  try {
    const books = await Book.find({ authors: req.params.authorsId});
    if(!books || books.length === 0) {
      return res.status(404).send({ message: `Aucun livre trouvé pour le authors : ${req.params.authorsId}` });
  }
      res.status(200).send(books); 
 } catch (error) {
    res.status(500).send(error);
  }
});

*/























