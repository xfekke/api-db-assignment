# Bookfinder API Assignment

## Introduction

This documentation covers my API assignment focused on books. The API enables users to search for books based on criteria such as title, author, genre, and publication date. Additionally, it provides information about the books and their ratings.

### MongoDB

MongoDB connection string:
`mongodb+srv://fekkeru:qwerty1234@cluster0.w3hrvjd.mongodb.net/`

Exported database file:
`compass-connections.json`

### Postman

#### Test Collection:
[API Test Collection](https://www.postman.com/gold-firefly-601719/workspace/api-db-assignment/collection/33841366-2c315312-f88c-4e2e-8a97-c924b542c5b4?action=share&creator=33841366&active-environment=33841366-4dc57239-ce6d-48d5-9728-151255661fb6)

#### Mock-Server Collection
[Mock Server Collection](https://www.postman.com/gold-firefly-601719/workspace/api-db-assignment/collection/33841366-169a9988-7f29-4393-9c16-054b644e28a3?action=share&creator=33841366&active-environment=33841366-4dc57239-ce6d-48d5-9728-151255661fb6)

## Book API

### Endpoints

#### GET /books

Retrieve a list of books based on specified criteria.

**Parameters:**
- `title`: The title of the book.
- `author`: The name of the author.
- `genre`: The genre of the book.
- `publicationDate`: The publication date of the book.

**Examples:**
- `http://localhost:3000/api/books?sortBy=genre`
- `http://localhost:3000/api/books?genre=Horror`

#### GET /api/authors

Retrieve a list of authors.

**Parameters:**
- `sortBy`: Sort authors by `firstName` or `lastName`.

**Sorting Options:**
- Sort by first name in ascending order: `?sortBy=firstName`
- Sort by first name in descending order: `?sortBy=firstName&order=desc`
- Sort by last name in ascending order: `?sortBy=lastName`
- Sort by last name in descending order: `?sortBy=lastName&order=desc`

#### GET /api

Retrieve a list of books.

#### GET /api/books/:id

Retrieve information about a specific book.

#### POST /api

Create a new book entry.

#### POST /api/books/:id

Delete a book entry.

### Request and Response Examples

####  Get a list of books

**Request:**

**Response:**
```json
{
    "_id": "661d4b8ec98662b7dc6d7457",
    "title": "Echoes of the Future",
    "authors": [
        {
            "_id": "661d10a0fae54bc397af0edd",
            "firstName": "Odetta",
            "lastName": "Dmych",
            "__v": 0
        }
    ],
    "genre": "Science Fiction",
    "publicationDate": "2023-05-15",
    "info": "A gripping tale set in a futuristic world where echoes of the past hold the key to humanity's destiny.",
    "score": 6,
    "__v": 0
}
``` 
