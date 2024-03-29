# js-assignment
````
instructions.txt has the instructions to run the service
guidelines.txt has the guidelines to be followed while solving and submitting the assignment
problem-statement.txt has the problems statements to be solved
````

Problem 1 commit - [commit](https://github.com/brijeshshah13/assignment/commit/8d07a405509c1cf7ca4393b0ce3ccba5675205f3)

Problem 2 commit - [commit](https://github.com/brijeshshah13/assignment/commit/1dd6cc4f14c34cdcd2e5d9dcadd4d4827a72be7c)

Problem 3 commit - [commit](https://github.com/brijeshshah13/assignment/commit/1efe39b0d5c10ef533b2c1452a88edc1235590d7)

Future enhancements can begin by sending proper error codes and messages in API responses. For now, I have followed the same pattern that was implemented in the code.

### Sample CURLs

Create news by matchId

```
curl --location --request POST 'localhost:3000/news' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "abc",
    "description": "test",
    "matchId": 7
}'
```

Create news by tourId

```
curl --location --request POST 'localhost:3000/news' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "abc",
    "description": "test",
    "tourId": 3
}'
```

Get news by matchId

```
curl --location --request GET 'localhost:3000/news/matches/1'
```

Get news by tourId

```
curl --location --request GET 'localhost:3000/news/tours/1'
```

Get news by sportId

```
curl --location --request GET 'localhost:3000/news/sports/1'
```