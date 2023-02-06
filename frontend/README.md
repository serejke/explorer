# Explorer Frontend

[RemixJS](https://remix.run/) Server Side Rendering allows for easy [routing](https://remix.run/docs/en/v1/guides/routing#what-is-nested-routing) for `/block/:hash`, `/transaction/:hash`
and form submission for blocks search.

### OpenAPI generation

Frontend generates an OpenAPI client to `./generated-sources/openapi`
and includes this as a local NPM library.

```
// Start backend to expose http://localhost:3001/swagger-json
$ cd backend && npm install && npm run start:dev

// Generate ./generated-sources/openapi
$ cd frontend && npm run generate-openapi-client

// Use new OpenAPI client in frontend code and commit to Git
```