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

Why isomorphic web design?

+ SPEED. Faster to render HTML content, directly in the browser. Better overall user experience.
> The importance of the web speed.
> [Phys.org article about web pages speed](http://phys.org/news/2016-03-web-pages-percent-faster-effectively.html)

+ Easier code maintenance.
> Please visit [Isomorphic](http://isomorphic.net/javascript) for more info.

Why GraphQL?
+ Flexibility and composition.

This characteristics improve, potentially, the speed of the web.

> Please visit [GraphQL](http://graphql.org/) and [GraphQL: A data query language](https://code.facebook.com/posts/1691455094417024/graphql-a-data-query-language/) for more info.

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
