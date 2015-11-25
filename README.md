# WillCodeForFood
CSE461 Project 3, Autumn 2015

# Setup
## Get dependencies

```
$ npm install
```

## Launch server

```
$ heroku local
$ open http://localhost:5000
```

## Remote
https://stark-inlet-9527.herokuapp.com/

# Package Structure

## Client

*views/* contains .jade files. [Jade](http://jade-lang.com/) is a templating language that is more succinct than HTML. The templates are rendered by the server. The client's view of the website is initialized during a preliminary GET request (see routes/index.js). The client sends the GET request to the server with the Jade templates, and the server responds with HTML for the browser to render. 

  views/layout.jade: frame for the web page
  
  views/index.jade: contents are inserted into views/layout.jade:11, at the "block content" tag.
  
  views/error.jade: error page

*public/* contains additional information for the client to render and interact with the website. 

  public/images/ and public/stylesheets/: make the page pretty
  
  public/js/: Javascript controllers for the client's experience. Manipulates DOM elements (using [JQuery](http://api.jquery.com/)) due to user input and input from the server. Sends any necessary updates to the server.
  
## Server

Written in [ExpressJS](http://expressjs.com/) and [NodeJS](https://nodejs.org/en/). Both provide functionality to write server-side applications. They provide a framework, and handle things like page routing (ExpressJS), HTTP requests (ExpressJS), and asynchronous event-driven applications (NodeJS). NodeJS also provides a huge package manager (npm), that makes installing dependencies very easy.

*app.js*: loads dependencies, initializes the server-side application, routing, error handling, etc.
  
*[Procfile](https://devcenter.heroku.com/articles/procfile#procfile-naming-and-location)*: used by Heroku to create various processes while hosting the application.

*bin/www*: second initialization step for the app. 

*node_modules/*: contains installed dependencies. Additional modules can be installed using npm.

*routes/*: server-side controllers.

  *routes/index.js*: responds to client's request for HTML to render, allows the web page to be created.
  
# Latency Theoretical Limit

1. Find distance between both lat/lng:
http://freegeoip.net/json/
http://freegeoip.net/json/stark-inlet-9527.herokuapp.com

2. Calculate distance in meters / speed of light in optical fiber 2e8 m/s
secsToServer = m / 2e8
Theoretical RTT = 2 * secsToServer
