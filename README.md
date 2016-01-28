# gms-server

## Intall modules & tools

```
apt-get install byobu siege
// Install package.json modules.
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

## Start to work.

Execute the script 'startWork' to run the Development environment.
It run the server, compile the code and compile the bundle.js for the clients.
It uses byobu to run the script in 3 panes:

```
./startWork
```
