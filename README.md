# book-site

Updated README.md on tuesday 4.5 and thursday 8.5 (nothing else updated in backend)

Link to website (not always available): https://users.metropolia.fi/~annaalav/sssf/bookside/#/

Frontend repository: https://github.com/AnnaA123/book-front

---

## Example queries to /graphql

Logging in will give you a token, add it in the header like this:
```
{ "authorization": "bearer <token>" }
```

## User

Signup
```
mutation {
  signup(
    username: "<username>",
    password: "<password>"
    email: "<email>",
    description: "<description>"
  ){
    id
    username
  }
}
```

Login
```
{
  login(username:"<username>", password:"<password>"){
    username
    token
  }
}
```

Get user
```
{
  user(id: "<id>"){
    id
    username
    description
  }
}
```

Edit user (token required)
```
mutation {
    modifyUser(
        id: "<id>",
        username: "<username>",
        email: "<email>",
        description: "<description>",
    ) {
        id, 
        username,
        description
    }
}
```

Delete user (token required)
```
mutation {
    deleteUser(id: "<id>"){
        id
    }
}
```

---

## Review

Get all reviews
```
{
    reviews{
        id, 
        Title, 
        Content,
        Rating,
        BookTitle,
        BookID,
        UserID {
            id
            username
        }
    }
}
```

Get one review
```
{
    review(id: "<id>"){
        id, 
        Title, 
        Content,
        Rating,
        BookTitle,
        BookID,
        UserID {
            id
            username
        }
    }
}
```

Get reviews by book id (i.e. "60900e5ca29aa4083cbfe650")
```
{
    reviewsByBook(BookID: "<BookID>"){
        id, 
        Title, 
        Content,
        Rating,
        BookTitle,
        BookID,
        UserID {
            id,
            username
        }
    }
}
```

Get reviews by user id
```
{
    reviewsByUser(UserID: "<UserID>"){
        id, 
        Title, 
        Content,
        Rating,
        BookTitle,
        BookID,
        UserID {
            id,
            username
        }
    }
}
```

Add review (UserID must refer to an existing user. Token in header is required)
```
mutation {
    addReview(
        BookID: "<BookID", 
        BookTitle: "<BookTitle>", 
        UserID: "<UserID>",
        Title: "<Title>",
        Content: "<Content>",
        Rating: "<Rating>"
    ) {
        id, 
        Title, 
        Content
    }
}
```

Edit review (token required)
```
mutation {
    modifyReview(
        id: "<id>",
        Title: "<Title>",
        Content: "<Content>",
        Rating: "<Rating>"
    ) {
        id, 
        Title, 
        Content
    }
}
```

Delete review (token required)
```
mutation {
    deleteReview(id: "<id>"){
        id
    }
}
```

---

## npm packages

- dotenv
- express
- mongoose
- express-graphql
- graphql
- apollo-server-express
- passport
- passport-jwt
- passport-local
- jsonwebtoken
- bcrypt
- cors

---

Note: controllers and routes were a part of the original non-Graphql version, which can be found in the ["original" branch](./tree/original)
