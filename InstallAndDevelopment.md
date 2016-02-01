# Install and Development

## Table of Contents

  + [Install tools](#install-tools)
  + [Use development tools](#use-development-tools)
  + [Start to work](#start-to-work)

## Install tools

  It's important to use tools that to helps us to automate the development process.
  We use:

  * [NodeJs](https://nodejs.org)
  * [byobu](http://byobu.co/)
  * [nodemon](http://nodemon.io/)
  * [browserify](http://browserify.org/)
  * [watchify](https://github.com/substack/watchify)

### Install nodeJs

  The project use [nodeJs](https://nodejs.org). To install nodeJs please follow one of the next options:

   * [Option 1](https://nodejs.org/en/download/package-manager/)
   * [Option 2](https://github.com/creationix/nvm)

### Install Development tools

  ```sh
    apt-get install byobu siege

    # Install package.json modules.
    npm install

    # Install Development tools
    npm install -g nodemon
    npm install -g browserify
    npm install -g watchify
  ```

**[⬆ back to top](#table-of-contents)**

## Use development tools

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
  Automate on file change compile:
  ```sh
    watchify --debug gms-client.js -o ./public/lib/bundle.js
  ```

  Please, remove the '--debug' parameter to compile for production.

### Access to development server:

  Go to the local url: ```[http://localhost:8009/](http://localhost:8009/)```

  Benchmark the server:

  ```sh
    siege -t60S http://localhost:8009
  ```

**[⬆ back to top](#table-of-contents)**

## Start to work

  Execute the script 'startWork' to run the Development environment.
  It runs the server, compiles the js code with babeljs and then creates the bundle.js file for the clients.
  It uses byobu to run the script in 3 panes.

  ```sh
    ./startWork
  ```

   * ```Shift + Arrow``` keys to move across pane.
   * ```Shift + F11``` to full a pane.
   * ```Ctrl + F11``` to close a pane.

**[⬆ back to top](#table-of-contents)**
