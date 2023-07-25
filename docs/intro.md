# Getting Started

PinePods is a Python based app that can sync podcasts for individual accounts that relies on a central database with a web frontend and apps available on multiple platforms

## Features

Pinepods is a complete podcasts management system and allows you to play, download, and keep track of podcasts you enjoy. It allows for searching new podcasts using The Podcast Index and provides a modern looking UI to browse through shows and episodes. In addition, Pinepods provides simple user managment and can be used by multiple users at once using a browser or app version. Everything is saved into a Mysql database including user settings, podcasts and episodes. It's fully self-hosted, and I provide an option to use a hosted API or you can also get one from the podcast API and use your own. There's even many different themes to choose from! Everything is fully dockerized and I provide a simple guide found below explaining how to install Pinepods on your own system.

## Try it out! :zap:

I try and maintain an instance of Pinepods that's publicly accessible for testing over at [pinepods.online](https://pinepods.online). Feel free to make an account there and try it out before making your own server instance. This is not intended as a permanant method of using Pinepods and it's expected you run your own server so accounts will often be deleted from there.

## Installing :runner:

There's potentially a few steps to getting Pinepods fully installed as after you get your server up and running fully. You can also install the client editions of your choice. The server install of Pinepods runs a server and a browser client over a port of your choice in order to be accessible on the web. With the client installs you simply give your install a specific url to connect to the database and then sign in.

### Server Installation :floppy_disk:

First, the server. It's hightly recommended you run the server using docker compose. Here's the docker compose yaml needed.

#### Compose File

```
version: '3'
services:
  db:
    image: mariadb:latest
    environment:
      MYSQL_TCP_PORT: 3306
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: pypods_database
      MYSQL_COLLATION_SERVER: utf8mb4_unicode_ci
      MYSQL_CHARACTER_SET_SERVER: utf8mb4
      MYSQL_INIT_CONNECT: 'SET @@GLOBAL.max_allowed_packet=64*1024*1024;'
    volumes:
      - /home/user/pinepods/sql:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: always
  pinepods-proxy:
    image: madeofpendletonwool/pinepods-proxy:latest
    ports:
      - "8033:8000"
    restart: always
  pinepods:
    image: madeofpendletonwool/pinepods:latest
    ports:
      - "8034:8034"
      - "8032:8032"
    environment:
      # Default Admin User Information
      USERNAME: pinepods
      PASSWORD: password
      FULLNAME: John Pinepods
      EMAIL: john@pinepods.com
      # Database Vars
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: password
      DB_NAME: pypods_database
      # Image/Audio Proxy Vars
      PROXY_HOST: pinepods-proxy
      PROXY_PORT: 8033
      PROXY_PROTOCOL: http
      REVERSE_PROXY: "True"
      #Podcast Index API
      API_URL: 'https://api.pinepods.online/api/search'


    depends_on:
      - db
      - pinepods-proxy


```

Make sure you change these variables to variables specific to yourself.

```
      MYSQL_ROOT_PASSWORD: password
      USERNAME: pinepods
      PASSWORD: password
      FULLNAME: John Pinepods
      EMAIL: john@pinepods.com
      DB_PASSWORD: password # This should match the MSQL_ROOT_PASSWORD
      PROXY_HOST: proxy.pinepods.online
      PROXY_PORT: 8033
      PROXY_PROTOCOL: http
      REVERSE_PROXY: "True"
      API_URL: 'https://api.pinepods.online/api/search'
```

Most of those are pretty obvious, but let's break a couple of them down.

#### Admin User Info

First of all, the USERNAME, PASSWORD, FULLNAME, and EMAIL vars are your details for your default admin account. This account will have admin credentails and will be able to log in right when you start up the app. Once started you'll be able to create more users and even more admins but you need an account to kick things off on. If you don't specify credentials in the compose file it will create an account with a random password for you but I would recommend just creating one for yourself.

#### Proxy Info

Second, the PROXY_HOST, PROXY_PORT, PROXY_PROTOCOL, and REVERSE_PROXY vars. Pinepods uses a proxy to route both images and audio files in order to prevent CORs issues in the app (Essentially so podcast images and audio displays correctly and securely). It uses a second container to accomplish this. That's the pinepods-proxy portion of the compose file. The application itself will then use this proxy to route media though. This proxy also be ran over a reverse proxy. Here's few examples

**Recommended:**
Routed through proxy, secure, with reverse proxy

```
      PROXY_HOST: proxy.pinepods.online
      PROXY_PORT: 8033
      PROXY_PROTOCOL: https
      REVERSE_PROXY: "True"
```

*Note*: With reverse proxies you create a second proxy host. So for example my Pinepods instance itself runs at port 8034 at pinpods.online so my reverse proxy reflects that and I have a dns record for the domain created for pinepods.online to point to my public ip. In addition, my proxy is ran at port 8033 over domain proxy.pinepods.online. I created a seperate dns record for this pointed to my public ip.

*Also Note*: If you run pinepods over reverse proxy to secure it you **must** run the proxy server over reverse proxy as well to prevent mixed content in the browser

Direct to ip, insecure, and no reverse proxy

```
      PROXY_HOST: 192.168.0.30
      PROXY_PORT: 8033
      PROXY_PROTOCOL: http
      REVERSE_PROXY: "False"
```

Hostname, secure, and no reverse proxy

```
      PROXY_HOST: proxy.pinepods.online
      PROXY_PORT: 8033
      PROXY_PROTOCOL: https
      REVERSE_PROXY: "False"
```

Note: Changing REVERSE_PROXY to False adjusts what the application uses for the reverse proxy. In short it removed the port from the url it uses for routing since the reverse proxy will add the port for you.

So REVERSE_PROXY "True"
https://proxy.pinepods.online

REVERSE_PROXY "False"
https://proxy.pinepods.online:8033

#### Note on the Search API

Let's talk quickly about the searching API. This allows you to search for new podcasts and it queries either itunes or the podcast index for new podcasts. The podcast index requires an api key while itunes does not. If you'd rather not mess with the api at all simply set the API_URL to the one below.

```
API_URL: 'https://api.pinepods.online/api/search'
```

This is an api that I maintain. I do not guarantee 100% uptime on this api though, it should be up most of the time besides a random internet or power outage here or there. A better idea though, and what I would honestly recommend is to maintain your own api. It's super easy. Check out the API docs for more information on doing this. 

https://pinepods.online/api/search_api

#### Start it up!

Either way, once you have everything all setup and your compose file created go ahead and run your

```
sudo docker-compose up
```

command on the main pinepods app to pull the container images and get started. Once fully started up you'll be able to access pinepods on the url you configured and you'll be able to start connecting clients as well.

### Linux Client Install :computer:

Coming Soon

### Windows Client Install :computer:

Coming Soon

### Mac Client Install :computer:

Coming Soon

### Android Install :iphone:

Coming Soon

### ios Install :iphone:

Coming Soon

## Platform Availability

The Intention is for this app to become available on Windows, Linux, Mac, Android, and IOS. The server will be run from docker and connect to the clients on these platforms