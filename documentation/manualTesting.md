# Manual Testing 1

## Status code 200

### Purpose
Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

### Steps:
1. Send a GET-request to /GET-`http://localhost:3000/api/books`
2. Send a GET-request to /GET-`http://localhost:3000/api/authors` 

#### Expected Result
- Status code: 200 OK

### Result
- Statuscode: 200 OK

**Test Name:** /GET books & /GET authors

**Location:** /Tests /Get-requests/GET books & /GET authors

# Manual Testing 2

## JSON-format

### Purpose
Check if the API returns the expected data format (e.g., JSON, XML) in the response.

### Steps:
1. Send a GET-request to /GET-`http://localhost:3000/api/books`
2. Send a GET-request to /GET-`http://localhost:3000/api/authors` 

#### Expected Result
- Body contains expected JSON-format

### Result
- The response body matches the expected JSON-format.
-Example: 
```
    {
        "_id": "661d10a0fae54bc397af0edd",
        "firstName": "Odetta",
        "lastName": "Dmych",
        "__v": 0
    }
```

**Test Name:** /GET books & /GET authors

**Location:** /Tests /Get-requests/GET books & /GET authors

# Manual Testing 3

## 404

### Purpose
Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.

### Steps:
1. Send a GET-request to /GET-`http://localhost:3000/api/booksx?2` 

#### Expected Result
- Status code: 404 Not Found

### Result
- Status code: 404 Not Found

**Test Name:** /GET invalid book request

**Location:** /Tests /Get-requests/GET invalid book request

# Manual Testing 4

## API Data Filtering by Genre

### Purpose
This test verifies that the API returns the correct data when querying books by genre.

### Steps:
1. Construct a GET-request to the API with the genre filter.
2. Send a GET-request to /GET-`http://localhost:3000/api/books?genre=Horror` 

### Expected Result
- Verify that the API returns data for books with the specified genre "Horror".
- Ensure that the response contains the expected JSON format and data relevant to the "Horror" genre.

## Result
- All the objects in the response body contain the genre horror, all other books of different genres are not visible.

**Test Name:** /GET filtering by genre

**Location:** /Tests /Get-requests /GET filtering by genre

# Manual Testing 5

## Pagination 

### Purpose
Verify that the API returns paginated results when a large number of records are requested.

### Steps:
1. Make a GET request to retrieve the list of books
2. Include pagination parameters in the request URL, specifying the desired page and limit. example: http://localhost:3000/api/books?page=1&limit=10 

### Expected Result
- The API should return paginated results according to the pagination parameters.
- Each page should contain a limited number of objects specified by the limit.

## Result
- The API returned a paginated list of books, with 10 records per page as expected. 
- The results were consistent with the specified pagination parameters and pages could be accessed by adjusting the page parameter in the URL.
- Example:
```
    "totalDocs": 50,
    "limit": 10,
    "totalPages": 5,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
```

**Test Name:** /GET pagination

**Location:** /Tests /Get-requests /GET pagination

# Manual Testing 6

## Special Characters

### Purpose
Check if the API handles special characters and non-English text correctly in input data and returned responses.

### Steps:
1. Make a GET-request with special characters to get a specified author with special characters in his/hers name.
- Example: `http://localhost:3000/api/authors?firstName=Åke&lastName=Svensson` 

### Expected Result
- The API should return the author according to the parameters, even when special characters are used.

## Result
- The API returned the specified author as expected.
- Example:
```
[
    {
        "_id": "661d10a0fae54bc397af0eef",
        "firstName": "Åke",
        "lastName": "Svensson",
        "__v": 0
    }
]
```

**Test Name:** /GET special character

**Location:** /Tests /Get-requests /GET special character

# Manual Testing 7

## Concurrent Requests

### Purpose
Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

### Steps:
1. Create a collection with multiple POST-requests to add multiple books at the same time.

### Expected Result
- The API should be able to handle and respond to all requests correctly.
- Every book should be added with no missing data and with no conflicts.

## Result
- The API managed to post all books without conflicts.
- Status code: 201
- Avg. Resp. Time: 15ms

**Test Name:** /Concurrent Requests

**Location:** /Tests /Concurrent Requests

# Manual Testing 8

## HTTP Methods

### Purpose
Test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

### Steps:
1. Create a collection for the tests.
2. Run each test separately one after the other. 

### Expected Result
- The API should complete the tests with the correct status codes and responses.

## Result
- GET status code: 200 OK
- POST status code: 201 Created
- PUT status code: 200 OK
- DEL statuscode 200 OK
- All tests ran without conflict and had the correct status codes.

**Test Name:** /HTTP Methods

**Location:** /Tests /HTTP Methods

# Manual Testing 9

## PUT Books

### Purpose
Check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

### Steps:
1. Find Obj_ID for the book I want to update and enter new update details in body.
2. Create a GET-request to make sure the object has been updated in the same folder.

### Expected Result
- The specified book in the test will be updated correctly and without conflict.

## Result
- The specified book was updated and the status code is 200 OK.

**Test Name:** /PUT Book

**Location:** /Tests /PUT-Requests /PUT Book

# Manual Testing 10

## Run Collection

### Purpose
Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.

### Steps:
1. Create a collection with multiple GET-requests
2. Run the collection with 100 iterations.

### Expected Result
- The API will perform under heavy load.

## Result
- The status code of all tests were 200 OK.
- None of the requests failed.
- Avg. Resp. Time 19ms - Duration: 11s 820ms

**Test Name:** /Runner

**Location:** /Tests /Runner

# Manual Testing 11

## Connection Failure

### Purpose
Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.

### Steps:
1. Create valid parameters to simulate a disconnect.
2. Implement those parameters to a GET-request and POST-request.

### Expected Result
- The API should be able to handle and recover from the database connection error without losing data integrity.

## Result
- The API responds with the status code: 500 indicating a server error.
- The error message MongoNotConnectedError: Client must be connected before running operations suggest a database connection issue.

**Test Name:** /GET Book Disconnect & POST Book Disconnect

**Location:** /Tests /Connection Error /GET Book Disconnect & POST Book Disconnect

# Manual Testing 12

## Invalid Parameters

### Purpose
Test the API’s ability to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

### Steps:
1. Create a GET-request with invalid parameters, for example a genre that does not exist in the database. 
Example: `http://localhost:3000/api/books?genre=Comedy`

### Expected Result
- An error message will be returned and no books will be found.

## Result
- The API returns a message that no books are found and returns no other data from the request.
- Example:
```
{
    "message": "No books found"
}
```

**Test Name:** /GET Invalid Parameters

**Location:** /Tests /Get-requests /GET Invalid Parameters

# Manual Testing 13

## Rate Limiting

### Purpose
Verify that the API correctly implements rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

### Steps:
1. Run more requests than 100 (100 requests in 15 minutes is the max allowed amount for this API).

### Expected Result
- The API will return the status code 429.

## Result
- The API returns the status code 429 (Too Many Requests).
- The API returns a message that indicates there are too many requests.
- Example: Too many requests, please try again later.

**Test Name:** /GET Invalid Parameters

**Location:** /Tests /Get-requests /GET Invalid Parameters
