# Voting Online.

Voting online app where users can register themselves and cast their vote

## Packages Used

1) Express
2) Mongoose
3) bcryptjs
4) Swagger-ui-express
5) crypto-js
6) Http-status-code
7) SuperTest
8) rewire

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  1) NODE v8.9.4 or above
  2) MONGODB
  3) In command prompt, in folder you wish to keep the project, run
    `git clone https://github.com/parthi1989/voting-online`

#### Installation
  ##### Installing Node Packages
  1) From command prompt, run the `npm install` command
  `C:\Users\dpartheeban\Desktop\DOCS\Node\voting-online>npm install`
  ##### Build
  2) From command prompt, run the `npm run build` command
  `C:\Users\dpartheeban\Desktop\DOCS\Node\voting-online>npm run build`
  ##### Starting MongoDB database
  3)From command prompt, run the `mongod.exe --dbpath {folder path}` command with the folder path you wish to keep the mongodb data
  `C:\Program Files\MongoDB\Server\3.6\bin>mongo.exe --dbpath "C:\Users\dpartheeban\Desktop\DOCS\mongo-data"`
  ##### Starting the app.
  4) From Command prompt, run `npm run app`. It will give the port in which app started. you can browse to that port by, localhost:{port_number}
  `C:\Users\dpartheeban\Desktop\DOCS\Node\voting-online>npm run test`
  ##### Running the Tests
  You can run the test cases of the app in command prompt, using `npm run test`.

  ```C:\Users\dpartheeban\Desktop\DOCS\Node\voting-online>npm test

C:\Users\dpartheeban\Desktop\DOCS\Node\voting-online> npm run test

> voting-online@1.0.0 test C:\Users\dpartheeban\Desktop\DOCS\Node\voting-online
> SET "NODE_ENV=test" && mocha **/*_test.js --timeout 10000

mongodb://localhost:27017/Votetest


Server is up and running in port 3000
(node:19028) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
(node:19028) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
  √ create votes (97ms)
  √ create user
  √ should get token after checking the authenticity
  √ Testing with spies
  GET /fetchvotes
    √ should get all votes

  GET /fetchuser/:IdentityId
    √ should get specified user

  DELETE /vote/:id
    √ should remove a vote

  PATCH /user/:id
(node:19028) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    √ should update the user


  8 passing (3s)
  ```

  ##### Running the coverage.
  ```C:\Users\dpartheeban\Desktop\DOCS\Node\voting-online> npm run coverage

-----------------------------|----------|----------|----------|----------|-------------------|
File                         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------------|----------|----------|----------|----------|-------------------|
All files                    |    72.86 |       50 |    56.14 |    73.02 |                   |
 voting-online               |    91.67 |       50 |    66.67 |      100 |                   |
  server.js                  |    90.63 |       50 |       60 |      100 |             15,29 |
  utils.js                   |      100 |      100 |      100 |      100 |                   |
 voting-online/config        |    57.14 |       50 |      100 |    57.14 |                   |
  config.js                  |    57.14 |       50 |      100 |    57.14 |             5,6,7 |
 voting-online/db            |       50 |       25 |        0 |       50 |                   |
  db.js                      |       50 |       25 |        0 |       50 | 13,14,15,16,19,22 |
 voting-online/db/models     |    78.13 |      100 |    66.67 |    78.13 |                   |
  user.js                    |    75.86 |      100 |    66.67 |    75.86 |... 80,181,186,196 |
  vote.js                    |      100 |      100 |      100 |      100 |                   |
 voting-online/middleware    |    23.08 |        0 |        0 |    23.08 |                   |
  authenticate.js            |    23.08 |        0 |        0 |    23.08 |... 12,14,16,17,18 |
 voting-online/routes        |      100 |     87.5 |      100 |      100 |                   |
  routes.js                  |      100 |     87.5 |      100 |      100 |                51 |
 voting-online/routes/voting |    65.75 |    41.67 |       50 |    65.75 |                   |
  votingroutes.js            |    65.75 |    41.67 |       50 |    65.75 |... 98,199,213,215 |
-----------------------------|----------|----------|----------|----------|-------------------|
```

  ##### Viewing the coverage results.
  you can also find the results in browsing the file `coverage\lcov-report\index.html` in project directory.  