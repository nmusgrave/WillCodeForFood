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

*public/* TODO

## Server

*bin/* TODO

*node_modules/* TODO

*routes/* TODO

# Latency Theoretical Limit

1. Find distance between both lat/lng:
http://freegeoip.net/json/
http://freegeoip.net/json/stark-inlet-9527.herokuapp.com

2. Calculate distance in meters / speed of light in optical fiber 2e8 m/s
secsToServer = m / 2e8
Theoretical RTT = 2 * secsToServer
