# Description

This is frontend part of codenotary recruitment task. It's using both backend api to add records and cloud vault to fetch records using public api key.

Technologies used in the project:

- React - used for quick development and fast shipping of the features
- Tanstack query - helper library responsible for fetching and caching data
- Jest - testing library
- Zod - form validation library
- React Hook Form - form library
- Storybook - components quick check-up
- Tailwind - awesome library which speeds up developing by both: using classic css styling with intuitive naming system, setting up quick theme mode, and the best argument is internet full of lovely designs of component which can be adjusted on the fly
- Typescript / eslint
- Vite - builder speeding up development by building the project in the fly

### How to start

Local development is described here. Production is described in the root folder of this very project and is using docker with docker-compose.

- yarn install
- update .env file with envs:
  - VITE_IMMUDB_BACKEND_LINK - backend link, f.e. http://127.0.0.1:3000
  - VITE_IMMUDB_API_PUBLIC_KEY - cloud vault public api key
  - VITE_IMMUDB_RECORDS_LINK - link used to fetch records f.e. https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/search
- yarn dev
- get to localhost:5173 to get access to the UI
- yarn storybook
- get to localhost:6006 to checkup default components(not all of them, it's only an example)

### Scripts

`yarn dev` - to run development mode\
`yarn build` - to build the project\
`yarn start` - to start production mode\
`yarn test` - to run unit tests\
`yarn storybook` - to run storybook\
`yarn build-storybook` - to build storybook stories\
`yarn lint` - to run lint and search possible code smells\
`yarn lint:fix` - to fix code smells which scripts can fix on their own\

### Comments

The most time I've spend on configuration these technologies, but as it's already configured, It's giving a developer huge leverage to keep project simple, atomic, tested and well maintained.
There's also huge help of supporting libraries of tailwind. App is responsive and supports dark / light theme.

I've not dedicated more time than it was needed to write more tests or storybook stories. The project is more or less a PoC how I do build apps and why I do choose such technologies(shortly described above).

I've intentionally didn't use an components like tanstack table to show up that I do know how to build tables.

I've put all my exprience with this and many different libraries, compared them with each other and chosen the best ones. With such background, the project can easily grow.
