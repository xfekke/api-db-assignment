export default function (server, mongoose) {

  const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
  });

  const Author = mongoose.model("authors", authorSchema);

  // GET Author
  server.get('/api/authors', async (req, res) => {
    try {
      let query = {};

      if (req.query.firstName) {
        query.firstName = req.query.firstName;
      }
      if (req.query.lastName) {
        query.lastName = req.query.lastName;
      }

      let authors = await Author.find(query);

      if (req.query.sortBy) {
        const sortBy = req.query.sortBy;
        let sortOrder = 1;

        if (req.query.order && req.query.order.toLowerCase() === 'desc') {
          sortOrder = -1;
        }
        authors = authors.sort((a, b) => (a[sortBy] > b[sortBy] ? sortOrder : -sortOrder));
      }

      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while retrieving authors." });
    }
  });

  // Get Author by ID
  server.get('/api/authors/:id', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      if (!author) {
        return res.status(404).json({ message: "Author was not found" });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ message: "An error occurred on the server while retrieving authors." });
    }
  });

  // POST Author
  server.post('/api/authors', async (req, res) => {
    try {
      const authorsData = req.body;
      const createdAuthors = [];

      for (const authorData of authorsData) {
        const newAuthor = new Author({
          firstName: authorData.firstName,
          lastName: authorData.lastName,
        });
        const savedAuthor = await newAuthor.save();
        createdAuthors.push(savedAuthor);
      }

      res.status(201).json(createdAuthors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while creating new authors." });
    }
  });


  // PUT/UPDATE Author by ID
  server.put('/api/authors/:id', async (req, res) => {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        }
      }, { new: true });

      if (!updatedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json(updatedAuthor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while updating authors." });
    }
  });

  // DELETE Author by ID
  server.delete('/api/authors/:id', async (req, res) => {
    try {
      const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
      if (!deletedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json({ message: "Author has been deleted!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred on the server while deleting authors." });
    }
  });
}