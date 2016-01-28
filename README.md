# gms-server

## Intall modules & tools

```
npm install
npm install -g nodemon
npm install -g browserify
npm install -g watchify
```

## Development tools

Re-Run the application on file change:

```
nodemon gms-server.js
```

Compiles the Js code. Thanks BabelJs!!!

```
gulp watch
```

Compile the client code:

For debug:
```
browserify --debug gms-client.js -o ./public/lib/bundle.js
```
On change compile:
```
watchify --debug gms-client.js -o ./public/lib/bundle.js
```

Benchmark the server:

```
siege -t60S http://localhost:8009
```
