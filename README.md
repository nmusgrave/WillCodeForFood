# WillCodeForFood
CSE461 Project 3, Autumn 2015

# Get dependencies

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

### Package Structure
Client: views, public

Server: bin, node_modules, routes

## Latency Theoretical Limit

1. Find distance between both lat/lng:
http://freegeoip.net/json/
http://freegeoip.net/json/stark-inlet-9527.herokuapp.com

2. Calculate distance in meters / speed of light in optical fiber 2e8 m/s
secsToServer = m / 2e8
Theoretical RTT = 2 * secsToServer
