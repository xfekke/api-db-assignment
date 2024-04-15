export default function (server, mongoose) {

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

  const Book = mongoose.model("books", bookSchema);

  // GET all books (w/ parameters)
  server.get('/api/books', async (req, res) => {
    try {
      const sortBy = req.query.sortBy;
      const order = req.query.order;
      const genre = req.query.genre; // Add genre parameter

      console.log('Sort by:', sortBy);
      console.log('Order:', order);
      console.log('Genre:', genre);

      // Query to filter books by genre if genre parameter is provided
      let query = {};
      if (genre) {
        query.genre = genre;
      }

      let books = await Book.find(query).populate('authors');

      if (sortBy) {
        let sortOrder = 1;
        if (order && order.toLowerCase() === 'desc') {
          sortOrder = -1;
        }

        // Parameters sorting
        switch (sortBy) {
          case 'title':
            books = books.sort((a, b) => a.title.localeCompare(b.title) * sortOrder);
            break;
          case 'genre':
            books = books.sort((a, b) => a.genre.localeCompare(b.genre) * sortOrder);
            break;
          case 'publicationDate':
            books = books.sort((a, b) => (new Date(a.publicationDate) - new Date(b.publicationDate)) * sortOrder);
            break;
          case 'score':
            books = books.sort((a, b) => (a.score - b.score) * sortOrder);
            break;
          default:
            break;
        }

        if (sortOrder === -1) {
          books = books.reverse();
        }
      }

      if (!books || books.length === 0) {
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
      const book = await Book.findById(req.params.id).populate('authors');

      if (!book) {
        return res.status(404).json({ message: "Book was not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while retrieving a user." });
    }
  });

  // POST book(s)
  server.post('/api/books', async (req, res) => {
    try {
      const booksData = req.body;

      const createdBooks = []; // array to contain new books

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

}
