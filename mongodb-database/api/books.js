export default function (server, mongoose) {

  // Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
  const bookSchema = new mongoose.Schema({
    title: String,
    authors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors' // Referens till författare
    }],
    genre: String,
    publicationDate: Number,
    info: String,
    score: Number
  });

  /* 
    Skapar en Mongoose-modell baserat på bookSchema.
    Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
  */
  const Book = mongoose.model("books", bookSchema);

  /*
  Skapar en GET-route på '/api/users'. 
  När denna route anropas, hämtar den alla dokument från vår "users"-samling och skickar tillbaka dem som ett JSON-svar.
  */
  server.get('/api/books', async (req, res) => {
    try {
      res.json(await Book.find());  // Använder Mongoose's "find"-metod för att hämta alla "users".
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while retrieving a user." });
    }
  });

  // Skapar en GET-route för att hämta en specifik användare med ett specifikt ID.
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


  // Skapar en POST-route för att lägga till en ny bok.
  server.post('/api/books', async (req, res) => {
    try {
      const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors, // Använd req.body.authors för att ta emot en array av författar-ID
        genre: req.body.genre,
        publicationDate: req.body.publicationDate
      });

      // Spara den nya boken
      const savedBook = await newBook.save();

      // Returnera den sparade boken i svaret
      res.status(201).json(savedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while creating a new book." });
    }
  });



  // Skapar en PUT-route för att uppdatera en användare med ett specifikt ID.
  server.put('/api/books/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,  // Uppdatera 'username'
          born: req.body.born,      // Uppdatera 'author'

        }
      }, { new: true });  // Optionen { new: true } ser till att den uppdaterade användaren returneras

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while updating users." });
    }
  });

  // Skapar en DELETE-route för att radera en användare med ett specifikt ID.
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
