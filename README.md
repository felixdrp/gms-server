# gms-server

## Intall modules & tools

```sh
apt-get install byobu siege
# Install package.json modules.
npm install

# Install Development tools
npm install -g nodemon
npm install -g browserify
npm install -g watchify
```

## Development tools

Re-Run the application on file change:

```sh
nodemon gms-server.js
```

Compiles the Js code. Thanks BabelJs!!!

```sh
gulp watch
```

Compile the client code:

For debug:
```sh
browserify --debug gms-client.js -o ./public/lib/bundle.js
```
On change compile:
```sh
watchify --debug gms-client.js -o ./public/lib/bundle.js
```

Benchmark the server:

```sh
siege -t60S http://localhost:8009
```

## Start to work.

Execute the script 'startWork' to run the Development environment.
It run the server, compile the code and compile the bundle.js for the clients.
It uses byobu to run the script in 3 panes.<br>

* Shift + Arrow keys to move from pane.
* Shift + F11 to full screen.


```sh
./startWork
```
