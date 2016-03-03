# Project Architecture

The objective is to make a system modular and scalable.

## Project Keywords

+ [Isomorphic](http://isomorphic.net/javascript)
+ [NodeJS](https://nodejs.org/)
+ [Express](http://expressjs.com/)
+ [React](https://facebook.github.io/react/)
+ [React-router](https://github.com/reactjs/react-router)
+ [Redux](http://redux.js.org/)
+ [GraphQL](http://graphql.org/)
+ [BabelJS](https://babeljs.io/)

## Project components.

### Web

+ Server. ('Isomorphic')
+ Client. ('Isomorphic')
+ GraphQL Server. Provides data to server and client.('Isomorphic').

### Data

+ Crawler -> DataBase/File.
+ Static files.
+ Another sources.

## URL Plan

### Root "/"

The root element will redirect to the topic list "/topicList/"

### Topic List "/topicList/" "/topicList/?offset=10"

The topic list, "/topicList/", will present the last list of topics.
We can advance in the topics chain by the use of the offset query value, "/topicList/?offset=10".

### Topic "/topic/:topicID"

We can access to a topic by "/topic/:topicID" where :topicID is the topic identifier.
