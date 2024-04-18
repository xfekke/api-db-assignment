# Automated Testing 1

## Status code 200

### Purpose
Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

### Steps:
1. Send a GET-request to /GET-http://localhost:3000/api/books
2. Send a GET-request to /GET-http://localhost:3000/api/authors 

#### Expected Result
- Status code: 200 OK

### Result
- Statuscode: 200 OK

**Test Name:** /GET books & /GET authors

**Location:** /Tests /Get-requests /GET books & /GET authors

# Automated Testing 2

## JSON-format

### Purpose
Verify that the API returns the expected data format (e.g., JSON, XML) in the response.

### Steps:
1. Implement test code to an existing request.
2. Send a GET-request to /GET-http://localhost:3000/api/books

#### Expected Result
- Body contains expected JSON-format

### Result
- The response body matches the expected JSON-format.
-Example: 
    {
        "_id": "661d10a0fae54bc397af0edd",
        "firstName": "Odetta",
        "lastName": "Dmych",
        "__v": 0
    }

**Test Name:** /GET books 

**Location:** /Tests /Get-requests /GET books

# Automated Testing 3

## 404

### Purpose
Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.

### Steps:
1. Implement test code to an existing request.
2. Send a GET-request to /GET-http://localhost:3000/api/booksx?2 

#### Expected Result
- Status code: 404 Not Found

### Result
- Status code: 404 Not Found

**Test Name:** /GET invalid book request

**Location:** /Tests /Get-requests/GET invalid book request

# Automated Testing 4

## API Data Filtering by Genre

### Purpose
Create an automated test that sends a request with specific filters or search criteria and checks if the API returns the correct data.

### Steps:
1. Implement test code to an existing request.
2. Send a GET-request to /GET-http://localhost:3000/api/books?genre=Horror 

### Expected Result
- Verify that the API returns data for books with the specified genre "Horror".

## Result
- All the objects in the response body contain the genre horror, all other books of different genres are not visible.
- Test passed

**Test Name:** /GET filtering by genre

**Location:** /Tests /Get-requests /GET filtering by genre

# Automated Testing 5

## Pagination 

### Purpose
Write an automated test to verify that the API returns paginated results when a large number of records are requested.

### Steps:
1. Implement test code to an existing request.
2. Include pagination parameters in the request URL, specifying the desired page and limit. example: http://localhost:3000/api/books?page=1&limit=10 

### Expected Result
- The API should return paginated results according to the pagination parameters.
- Each page should contain a limited number of objects specified by the limit.

## Result
- The API returned a paginated list of books, with 10 records per page as expected at page 1. 

**Test Name:** /GET pagination

**Location:** /Tests /Get-requests /GET pagination

# Automated Testing 6

## Special Characters

### Purpose
Test if the API handles special characters and non-English text correctly in input data and returns responses using an automated testing tool.

### Steps:
1. Implement test code to an existing request that compares the response with the assumed output.
2. Make a GET-request with special characters to get a specified author with special characters in his/hers name.
- Example: http://localhost:3000/api/authors?firstName=Åke&lastName=Svensson 

### Expected Result
- The API should return the author according to the parameters, even when special characters are used.

## Result
- The API returned the specified author as expected.
- Example:
[
    {
        "_id": "661d10a0fae54bc397af0eef",
        "firstName": "Åke",
        "lastName": "Svensson",
        "__v": 0
    }
]

**Test Name:** /GET special character

**Location:** /Tests /Get-requests /GET special character

# Automated Testing 7

## Concurrent Requests

### Purpose
Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

### Steps:
1. Add tests to the POST-requests in the Concurrent Requests collection.
2. Run the collection and observe the test results.

### Expected Result
- The API should be able to handle and respond to all requests correctly.
- Every book should be added with no missing data and with no conflicts.

## Result
- The API managed to post all books without conflicts.
- Status code: 201
- Avg. Resp. Time: 15ms

**Test Name:** /Concurrent Requests

**Location:** /Tests /Concurrent Requests

# Automated Testing 8

## HTTP Methods

### Purpose
Test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

### Steps:
1. Add the correct scripts for the existing requests to check that the status codes are correct.
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

# Automated Testing 9

## PUT Books

### Purpose
Write an automated test to check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

### Steps:
1. Implement code to existing PUT-request that compares the new title to the old one.

### Expected Result
- The specified book in the test will be updated correctly and without conflict.

## Result
- The specified book was updated and the status code is 200 OK.

**Test Name:** /PUT Book

**Location:** /Tests /PUT-Requests /PUT Book

# Automated Testing 10

## Run Collection

### Purpose
Design an automated performance test that simulates a large number of users making requests simultaneously to check the API’s performance under heavy load.

### Steps:
1. Implement code to the GET-requests in the collection that checks that the status code is 200 and the response JSON is not empty.
2. Run the collection with 10 iterations (80 requests total).

### Expected Result
- The API will perform under heavy load.

## Result
- The status code of all tests were 200 OK.
- The JSON-response is not empty.
- None of the requests failed.
- Avg. Resp. Time 15ms - Duration: 1s 644ms

**Test Name:** /Runner

**Location:** /Tests /Runner

# Automated Testing 11

## Connection Failure

### Purpose
Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.

### Steps:
1. Implement script to look for status code: 500, response is JSON and a message to previous requests.

### Expected Result
- The API response should contain the status code of 500
- The response should be in JSON format.
- The response body should include an error message to indicate connection error.

## Result
- Status code: 500, Internal Server Error.
- The response is in JSON format.
- The response body includes an error message.

**Test Name:** /GET Book Disconnect & POST Book Disconnect

**Location:** /Tests /Connection Error /GET Book Disconnect & POST Book Disconnect

# Automated Testing 12

## Invalid Parameters

### Purpose
Develop an automated test to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

### Steps:
1. Implement code that looks for the correct message response in an existing GET request.
Example: http://localhost:3000/api/books?genre=Comedy

### Expected Result
- An error message will be returned and no books will be found.

## Result
- The API returns a message that no books are found and returns no other data from the request.
-Example:
{
    "message": "No books found"
}

**Test Name:** /GET Invalid Parameters

**Location:** /Tests /Get-requests /GET Invalid Parameters

# Automated Testing 13

## Rate Limiting

### Purpose
Write an automated test to verify that the API correctly implements any rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

### Steps:
1. Create a new folder with a GET-request to run and implement relevant test code to check for the correct status code.
2. Code will check for status code 200 for the first 100 and 429 for the remaining 100 iterations.
3. Run 200 iterations (100 requests in 15 minutes is the max allowed amount for this API).

### Expected Result
- The API returns the correct status code for every iteration.

## Result
- The API will return the status code 200 OK for the first 100 iterations.
- The API will return the status code 429 for the remaining 100 iterations.

**Test Name:** /Rate Limiting

**Location:** /Tests /Rate Limiting
