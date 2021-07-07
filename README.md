# Peachtree Bank

This project was generated using [Nx](https://nx.dev).

Hosted at https://peachtree-bank-bb.netlify.app/

## Folder Structure
```
apps/
  peachtree // main app
  peachtree-e2e // for end to end test cases
libs
  bb-ui // contains all the UI component library
mock-data // for json-server
```
*Notes:*
- **bb-ui** - uses [Jasmine](https://jasmine.github.io/) to write test cases
- **peachtree** - uses [Jest](https://jestjs.io) to write test cases
- **peachtree-e2e** - uses [Cypress](https://www.cypress.io/) for end to end test cases

## Development server

Run `ng serve peachtree` for a dev server. This application uses json-server for initial data. So, run `npm run serve:json` or `yarn serve:json` in another tab. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `ng build peachtree` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test peachtree` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e peachtree` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
