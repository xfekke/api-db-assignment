import mongoosePaginate from 'mongoose-paginate-v2';
import dotenv from 'dotenv';

dotenv.config();
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI); 

export default function (server, mongoose) {
  let isConnected = true
  // Schema for books
  const bookSchema = new mongoose.Schema({
    title: String,
    authors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors' // Reference to get author data
    }],
    genre: String,
    publicationDate: String,
    info: String,
    score: Number
  });

  bookSchema.plugin(mongoosePaginate);
  const Book = mongoose.model("books", bookSchema);

  // GET all books (w/ parameters)
  server.get('/api/books', async (req, res) => {
    try {
      const maxParams = 2;
      if (Object.keys(req.query).length > maxParams) {
        return res.status(400).json({ message: `Too many parameters. Maximum allowed is ${maxParams}.` });
      }

      if (req.query.disconnect === 'true') {
        if (isConnected) {
          await mongoose.disconnect();
          isConnected = false;
        }

      } else {
        if (!isConnected) {
          // Reconnect
          await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          console.log("Connected to MongoDB");
          isConnected = true;
        }
      }
      const sortBy = req.query.sortBy;
      const order = req.query.order;
      const genre = req.query.genre;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      let query = {};
      if (genre) {
        query.genre = genre;
      }

      const options = {
        page: page,
        limit: limit,
        sort: sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : null,
        populate: 'authors'
      };

      const books = await Book.paginate(query, options);

      if (!books || books.docs.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }

      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while retrieving books." });
    }
  });

  // GET book ID
  server.get('/api/books/:id', async (req, res) => {
    try {
      if (req.query.disconnect === 'true') {
        if (isConnected) {
          await mongoose.disconnect();
          isConnected = false;
        }
      } else {
        if (!isConnected) {
          // Reconnect
          await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          console.log("Connected to MongoDB");
          isConnected = true;
        }
      }
      const book = await Book.findById(req.params.id).populate('authors');

      if (!book) {
        return res.status(404).json({ message: "Book was not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while retrieving a book." });
    }
  });

  // POST book(s)
  server.post('/api/books', async (req, res) => {
    try {
      if (req.query.disconnect === 'true') {
        if (isConnected) {
          await mongoose.disconnect();
          isConnected = false;
        }
      } else {
        if (!isConnected) {
          // Reconnect
          await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          isConnected = true;
        }
      }
      const booksData = req.body;

      const createdBooks = []; // Array to post multiple books

      for (const bookData of booksData) {
        const newBook = new Book({
          title: bookData.title,
          authors: bookData.authors,
          genre: bookData.genre,
          publicationDate: bookData.publicationDate,
          info: bookData.info,
          score: bookData.score
        });

        const savedBook = await newBook.save();

        // Puts the saved book in the array
        createdBooks.push(savedBook);
      }

      res.status(201).json(createdBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while creating new books." });
    }
  });

  // PUT/UPDATE books
  server.put('/api/books/:id', async (req, res) => {
    try {
      if (req.query.disconnect === 'true') {
        if (isConnected) {
          await mongoose.disconnect();
          isConnected = false;
        }
      } else {
        if (!isConnected) {
          // Reconnect
          await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          isConnected = true;
        }
      }
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
          title: req.body.title,
          authors: req.body.authors,
          genre: req.body.genre,
          publicationDate: req.body.publicationDate,
          info: req.body.info,
          score: req.body.score
        }
      }, { new: true });

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while updating users." });
    }
  });

  // DELETE specific book by ID
  server.delete('/api/books/:id', async (req, res) => {
    try {
      if (req.query.disconnect === 'true') {
        if (isConnected) {
          await mongoose.disconnect();
          isConnected = false;
        }
      } else {
        if (!isConnected) {
          // Reconnect
          await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          isConnected = true;
        }
      }
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json({ message: "Book has been deleted!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while deleting users." });
    }
  });
  server.get('/api/books/invalid', async (req, res) => {
    res.status(400).json({ message: "Unvalid Request" });
  });
}
