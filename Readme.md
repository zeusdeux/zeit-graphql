# [Zeit](https://zeit.co/) APIs over GraphQL

This project provides a GraphQL wrapper around Zeit REST APIs.
I am using this as a way to learn how to build a production GraphQL server and familiarize myself with the tooling around it.

It can be accessed at [`https://zeit.zdx.cat/graphql`](https://zeit.zdx.cat/graphql)
and the progress of this project can be tracked at [`https://zeit.zdx.cat/progress`](https://zeit.zdx.cat/progress).

The goal for this project is to support all the GET endpoints and others via mutations.

## Local dev

`npm install && npm run dev`

## Code structure

The code is structured such that, in the future, it is possible to have a lambda
per top level field (e.g., `Query.deployments`, `Query.deployment`, etc)
