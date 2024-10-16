# Local setup
- clone the repo
- `yarn install`
- `cd ./packages/be-api && docker-compose up` - run the database (mongo) in docker
- `cp ./packages/be-api/.env_template ./packages/be-api/.env` - copy config (backend configured to use local database)
- `cd ./packages/be-api && yarn run watch` - run the backend
- `cd ./packages/web-api && yarn run start` - run the frontend
- open http://localhost:5173/#/graph/test in browser

## Configs' explanations
- added "next" as a root dependency to avoid errors with "eslint-config-next required next" in vscode (packageExtensions may solve this but other problem with next/babel appears)
