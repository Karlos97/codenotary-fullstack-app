# Description

This is backend part of codenotary recruitment task. It's simple nodejs backend api used to add records to cloud vault and could be used to fetch records using private key api key(if usage of public key was problematic).

Technologies used in the project:

- Express - used for quick development
- Joi - form validation
- Nodemon - hosting the app
- Typescript / eslint
- Swagger - easy documentation with ability to send requests, swagger is accessible only in dev mode

### How to start

Local development is described here. Production is described in the root folder of this very project and is using docker with docker-compose.

- yarn install
- update .env file with env IMMUDB_API_KEY which is private key of cloud vault ( keep in mind that changing port from default one(3000), may require changing it in other files), NODE_ENV - set to development or production depending on purpose
- yarn dev
- get to localhost:3000/swagger to get quick review of accessible endpoints
- remember to keep cors options updated in case of changing ports of the frontend app

### Scripts

`yarn dev` - to run development mode\
`yarn build` - to build the project\
`yarn start` - to start production mode\
`yarn lint` - to run lint and search possible code smells\

### Comments

This is simple backend service used to upload records to the vault. It's validating form and sending it further to the vault. I've skipped adding tests as I do the very same thing on the frontend.
