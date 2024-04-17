# Manual Testing 1

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

**Location:** /Tests /Get-requests/GET books & /GET authors

# Manual Testing 2

## JSON-format

### Purpose
Check if the API returns the expected data format (e.g., JSON, XML) in the response.

### Steps:
1. Send a GET-request to /GET-http://localhost:3000/api/books
2. Send a GET-request to /GET-http://localhost:3000/api/authors 

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

**Test Name:** /GET books & /GET authors

**Location:** /Tests /Get-requests/GET books & /GET authors
