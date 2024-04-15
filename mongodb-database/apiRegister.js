import books from "./api/books.js";
import authors from "./api/authors.js"

export default function (server, mongoose) {

  books(server, mongoose);
  authors(server, mongoose);

}

