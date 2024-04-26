# Bookfinder API Assignment

## Introduction

This documentation covers my API assignment focused on books. The API enables users to search for books based on criteria such as title, author, genre, and publication date. Additionally, it provides information about the books and their ratings.

Things I have added additionally to the project are:
- Manual & automated test 14
- Hidden the MongoDB connection string in a .env file

### MongoDB

If you want to use my connection string:

MongoDB connection string:
`mongodb+srv://fekkeru:qwerty1234@cluster0.w3hrvjd.mongodb.net/`

**Setup:**
1. Create a `.env` file in the `mongodb-databse` folder.
2. Add the MongoDB connection string after `MONGODB_URI=` in the `.env` file.

This `.env` file will securely store the MongoDB connection string, allowing the application to access the database without exposing sensitive information.

**Note:** Make sure to include `.env` in a `.gitignore` file to prevent it from being tracked.

**Note:** If you want to add the data to your own MongoDB, the exported data is also in **JSON**-files. To manually add them, the files are in the folder: `mongoDB-export`.

The /book api data-file: `test.books.json`.

The /author api data-file: `test.author.json`.

Exported database file:
`compass-connections.json`

### Postman

#### Test Collection:
[API Test Collection](https://www.postman.com/gold-firefly-601719/workspace/api-db-assignment/collection/33841366-2c315312-f88c-4e2e-8a97-c924b542c5b4?action=share&creator=33841366&active-environment=33841366-4dc57239-ce6d-48d5-9728-151255661fb6)

#### Mock-Server Collection
[Mock Server Collection](https://www.postman.com/gold-firefly-601719/workspace/api-db-assignment/collection/33841366-169a9988-7f29-4393-9c16-054b644e28a3?action=share&creator=33841366&active-environment=33841366-4dc57239-ce6d-48d5-9728-151255661fb6)

#### Postman JSON
The Postman collections and environment is also importet to the `.postman` folder. There is 3 collections: Tests, Extra Tests and Tests Mock.

### Documentation

Manual and automated testing documentation exists in the `documentation` folder, each in a seperate file.

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

### Retrieve a list of books.

**Request:**

#### GET http://localhost:3000/api

**Response:**
```
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
### Get a specific book

**Request:**

#### GET http://localhost:3000/api/books/661d4b8ec98662b7dc6d745d

**Response:**
```
{
    "_id": "661d4b8ec98662b7dc6d745d",
    "title": "Dystopian Dreams",
    "authors": [
        {
            "_id": "661d10a0fae54bc397af0ee3",
            "firstName": "Jorie",
            "lastName": "O'Nion",
            "__v": 0
        }
    ],
    "genre": "Dystopian",
    "publicationDate": "2022-11-03",
    "info": "Explore a hauntingly vivid dystopian landscape where hope is scarce, and survival is a constant struggle against the odds.",
    "score": 6,
    "__v": 0
}
```
### Create a book

**Request:**

#### POST http://localhost:3000/api

**Response:**
```
[
    {
        "title": "Concurrent Book 1",
        "authors": [
            "661d11f0fae54bc397af0f31"
        ],
        "genre": "Science Fiction",
        "publicationDate": "2012-02-10",
        "info": "This is a test.",
        "score": 7,
        "_id": "66213251fc8543202b1a9166",
        "__v": 0
    }
]
```
### Delete that book!

**Request:**

#### POST http://localhost:3000/api/books/66213251fc8543202b1a9166

**Response:**
```
{
    "message": "Book has been deleted!"
}
```
