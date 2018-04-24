## How to start

1) `npm i`
2) `npm run selenium-setup`
3) `npm start:dev`

`npm run integration-test` will run the suite of 
integration tests using selenium. `npm t` will start
watching the `specs` folder and run unit tests.

Running `npm start:dev` will launch the webpack dev server
as well as a mock API server with the following routes:

`http://localhost:3001/front`
`http://localhost:3001/page/:name`
`http://localhost:3001/history/:name`

These paths are the same as the live API's and will
server a subset of the same data. The front end 
automatically configures itself to hit the local
endpoint in this mode. If you want to run the
app against the live API, run

`npm run start:live` (aliased to `npm start`).

Note that the local server returns the same
data no matter which `:name` param is sent.
