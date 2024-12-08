
# Getting Started

PinePods is a Rust based podcast management system that manages podcasts with multi-user support and relies on a central database with clients to connect to it. It's browser based and your podcasts and settings follow you from device to device due to everything being stored on the server. You can subscribe to podcasts and even hosts for podcasts with the help of the PodPeopleDB. It works on mobile devices and can also sync with a Nextcloud server or gpodder compatible sync server so you can use external apps like Antennapod as well!

## Features

Pinepods is a complete podcast management system and allows you to play, download, and keep track of podcasts you (or any of your users) enjoy. It allows for searching and subscribing to hosts and podcasts using The Podcast Index or Itunes and provides a modern looking UI to browse through shows and episodes. In addition, Pinepods provides simple user management and can be used by multiple users at once using a browser or app version. Everything is saved into a MySQL or Postgres database including user settings, podcasts and episodes. It's fully self-hosted, open-sourced, and I provide an option to use a hosted search API or you can also get one from the Podcast Index and use your own. There's even many different themes to choose from! Everything is fully dockerized and I provide a simple guide found below explaining how to install and run Pinepods on your own system.

## Try it out! :zap:

I maintain an instance of Pinepods that's publicly accessible for testing over at [try.pinepods.online](https://try.pinepods.online). Feel free to make an account there and try it out before making your own server instance. This is not intended as a permanant method of using Pinepods and it's expected you run your own server so accounts will often be deleted from there.


## Installing :runner:

There's potentially a few steps to getting Pinepods fully installed. After you get your server up and running fully you can also install the client editions of your choice. The server install of Pinepods runs a server and a browser client over a port of your choice in order to be accessible on the web. With the client installs you simply give the client your server url to connect to the database and then sign in.

### Server Installation :floppy_disk:

First, the server. You have multiple options for deploying Pinepods:

  - [Using Docker Compose :whale:](#docker-compose)
  - [Using Helm for Kubernetes :anchor:](#helm-deployment)

You can also choose to use MySQL/MariaDB or Postgres as your database. Examples for both are provided below.

### Docker Compose

#### Compose File - PostgreSQL (Recommended)
```yaml
services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_DB: pinepods_database
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: myS3curepass
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - /home/user/pinepods/pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: always

  valkey:
    image: valkey/valkey:8-alpine
    ports:
      - "6379:6379"

  pinepods:
    image: madeofpendletonwool/pinepods:latest
    ports:
      - "8040:8040"
    environment:
      # Basic Server Info
      SEARCH_API_URL: 'https://search.pinepods.online/api/search'
      PEOPLE_API_URL: 'https://people.pinepods.online'
      # Default Admin User Information
      USERNAME: myadminuser01
      PASSWORD: myS3curepass
      FULLNAME: Pinepods Admin
      EMAIL: user@pinepods.online
      # Database Vars
      DB_TYPE: postgresql
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: myS3curepass
      DB_NAME: pinepods_database
      # Valkey Settings
      VALKEY_HOST: valkey
      VALKEY_PORT: 6379
      # Enable or Disable Debug Mode for additional Printing
      DEBUG_MODE: false
    volumes:
      # Mount the download and backup locations on the server
      - /home/user/pinepods/downloads:/opt/pinepods/downloads
      - /home/user/pinepods/backups:/opt/pinepods/backups
    depends_on:
      - db
      - valkey
```

#### Compose File - MariaDB (Alternative)
```yaml
services:
  db:
    image: mariadb:latest
    command: --wait_timeout=1800
    environment:
      MYSQL_TCP_PORT: 3306
      MYSQL_ROOT_PASSWORD: myS3curepass
      MYSQL_DATABASE: pinepods_database
      MYSQL_COLLATION_SERVER: utf8mb4_unicode_ci
      MYSQL_CHARACTER_SET_SERVER: utf8mb4
      MYSQL_INIT_CONNECT: 'SET @@GLOBAL.max_allowed_packet=64*1024*1024;'
    volumes:
      - /home/user/pinepods/sql:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: always

  valkey:
    image: valkey/valkey:8-alpine
    ports:
      - "6379:6379"

  pinepods:
    image: madeofpendletonwool/pinepods:latest
    ports:
      - "8040:8040"
    environment:
      # Basic Server Info
      SEARCH_API_URL: 'https://search.pinepods.online/api/search'
      PEOPLE_API_URL: 'https://people.pinepods.online'
      # Default Admin User Information
      USERNAME: myadminuser01
      PASSWORD: myS3curepass
      FULLNAME: Pinepods Admin
      EMAIL: user@pinepods.online
      # Database Vars
      DB_TYPE: mariadb
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: myS3curepass
      DB_NAME: pinepods_database
      # Valkey Settings
      VALKEY_HOST: valkey
      VALKEY_PORT: 6379
      # Enable or Disable Debug Mode for additional Printing
      DEBUG_MODE: false
    volumes:
      # Mount the download and backup locations on the server
      - /home/user/pinepods/downloads:/opt/pinepods/downloads
      - /home/user/pinepods/backups:/opt/pinepods/backups
    depends_on:
      - db
      - valkey
```

Make sure you change these variables to variables specific to yourself at a minimum.

```
      USERNAME: pinepods
      PASSWORD: password
      FULLNAME: John Pinepods
      EMAIL: john@pinepods.com
      # DB vars should match your values for the db you set up above
      DB_TYPE: postgresql
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: myS3curepass
      DB_NAME: pinepods_database
```

Most of those are pretty obvious, but let's break a couple of them down.

#### Admin User Info

First of all, the USERNAME, PASSWORD, FULLNAME, and EMAIL vars are your details for your default admin account. This account will have admin credentails and will be able to log in right when you start up the app. Once started you'll be able to create more users and even more admins but you need an account to kick things off on. If you don't specify credentials in the compose file it will create an account with a random password for you but I would recommend just creating one for yourself.


#### Note on the Search API

Let's talk quickly about the searching API. This allows you to search for new podcasts and it queries either itunes or the podcast index for new podcasts. The podcast index requires an api key while itunes does not. If you'd rather not mess with the api at all simply set the API_URL to the one below.

```
SEARCH_API_URL: 'https://search.pinepods.online/api/search'
```

Above is an api that I maintain. I do not guarantee 100% uptime on this api though, it should be up most of the time besides a random internet or power outage here or there. A better idea though, and what I would honestly recommend is to maintain your own api. It's super easy. Check out the API docs for more information on doing this. Link Below -

https://www.pinepods.online/docs/API/search_api


#### Start it up!

Either way, once you have everything all setup and your compose file created go ahead and run

```
sudo docker-compose up
```

To pull the container images and get started. Once fully started up you'll be able to access pinepods at the port you configured and you'll be able to start connecting clients as well.


### Helm Deployment

Alternatively, you can deploy Pinepods using Helm on a Kubernetes cluster. Helm is a package manager for Kubernetes that simplifies deployment.
Adding the Helm Repository

First, add the Pinepods Helm repository:

```
helm repo add pinepods http://helm.pinepods.online/PinePods
helm repo update
```
#### Installing the Chart

To install the Pinepods Helm chart, run:

```
helm install pinepods pinepods/pinepods -f my-values.yaml --namespace pinepods-namespace
```
#### Customizing Values

Create a my-values.yaml file to override default values - Any value with {{  }} are things you need to set yourself.:

```
## Container image configuration
image:
  repository: madeofpendletonwool/pinepods
  tag: latest
  pullPolicy: Always

service:
  type: ClusterIP
  port: 8040


ingress:
  enabled: true
  className: ""
  annotations:
    annotations:
      # Whatever you need to set here
  hosts:
    - host: {{ pinepods_domain }}
      paths:
        - path: /
          pathType: Prefix


persistence:
  enabled: true
  downloads:
    storageClass: {{ storage_class }}
    accessMode: ReadWriteOnce
    size: {{ downloads_size }}
  backups:
    storageClass: {{ storage_class }}
    accessMode: ReadWriteOnce
    size: {{ backups_size }}

postgresql:
  enabled: true
  auth:
    username: postgres
    password: {{ postgres_password }}
    database: pinepods_database
  persistence:
    enabled: true
    storageClass: {{ storage_class }}
    size: {{ postgres_size }}

valkey:
  enabled: true
  architecture: standalone
  auth:
    enabled: false
  replica:
    replicaCount: 0
  primary:
    persistence:
      enabled: false
  service:
    port: 6379

env:
  SEARCH_API_URL: "https://search.pinepods.online/api/search"
  PEOPLE_API_URL: "https://people.pinepods.online"
  USERNAME: {{ admin_username }}
  PASSWORD: {{ admin_password }}
  FULLNAME: {{ admin_fullname }}
  EMAIL: {{ admin_email }}
  DB_TYPE: "postgresql"
  DB_USER: "postgres"
  DB_NAME: "pinepods_database"
  DB_PORT: "5432"
  DEBUG_MODE: "false"

# Backend and Podpeople can be disabled (set to false) if you plan to use the ones I maintain.
# To do that set to false and simply keep the SEARCH_API_URL and PEOPLE_API_URL above as their defaults
backend:
  enabled: true
  image:
    repository: madeofpendletonwool/pinepods_backend
    tag: latest
    pullPolicy: Always
  service:
    type: ClusterIP
    port: 5000
  secrets:
    apiKey: {{ backend_api_key }}
    apiSecret: {{ backend_api_secret }}
# This ingress is specific to pinepods backend. If you don't use that change to disabled.
  ingress:
    enabled: true
    className: ""
    annotations:
      # Whatever you need to set here
    hosts:
      - host: {{ backend_domain }}
        paths:
          - path: /
            pathType: Prefix

podpeople:
  enabled: true
  image:
    repository: madeofpendletonwool/podpeople_db
    tag: latest
    pullPolicy: Always
  service:
    type: ClusterIP
    port: 8085
  persistence:
    enabled: true
    storageClass: {{ storage_class }}
    size: {{ podpeople_size }}
    accessMode: ReadWriteOnce
  auth:
    adminUsername: {{ admin_username }}
    adminPassword: {{ admin_password }}
  environment:
    ntfyUrl: {{ ntfy_url }}
    ntfyTopic: {{ ntfy_topic }}
    searchApiUrl: {{ search_api_url }}
    baseurl: {{ pod_people_base_url }}
# This ingress is specific to podpeople db. If you don't use that change to disabled.
  ingress:
    enabled: true
    className: ""
    annotations:
      # Whatever you need to set here
    hosts:
      - host: {{ podpeople_domain }}
        paths:
          - path: /
            pathType: Prefix
```

#### Create a namespace for Pinepods:

Create a namespace to hold the deployment:
```
kubectl create namespace pinepods-namespace
```

#### Starting Helm

Once you have everything set up, install the Helm chart:
```
helm install pinepods pinepods/Pinepods -f my-values.yaml
```
This will deploy Pinepods on your Kubernetes cluster with a postgres database. MySQL/MariaDB is not supported with the kubernetes setup. The service will be accessible at the specified NodePort.

Check out the Tutorials on the documentation site for more information on how to do basic things.

https://pinepods.online/tutorial-basic/sign-in-homescreen.md

## Client Installs

Any of the client additions are super easy to get going.

### Linux Client Installs :computer:

#### AppImage, Fedora/Red Hat Derivative/Debian based (Ubuntu)

First head over to the releases page on Github

https://github.com/madeofpendletonwool/PinePods/releases

Grab the latest linux release. There's both an appimage a deb, and an rpm. Use the appimage of course if you aren't using a debian or red hat based distro. Change the permissions if using the appimage version to allow it to run.

```
sudo chmod +x pinepods.appimage
```

^ The name of the app file will vary slightly based on the version so be sure you change it or it won't work.

For the rpm or deb version just run and install

Once started you'll be able to sign in with your username and password. The server name is simply the url you browse to to access the server.

#### Arch Linux (AUR)

Install the Pinepods Client right from the AUR! Replace the command below with your favorite aur helper

```
paru -S pinepods
```

#### Flatpak

You can search for Pinepods in your favorite flatpak installer gui app such as Gnome Software.

```
Flathub link and install command will be here soon (post 0.7.0 launch and compile)
```

#### Snap

Quick snap install away!

```
snap install pinepods
```

#### Windows Client Install :computer:

Any of the client additions are super easy to get going. First head over to the releases page on Github

https://github.com/madeofpendletonwool/PinePods/releases

There's a exe and msi windows install file.

The exe will actually start an install window and allow you to properly install the program to your computer.

The msi will simply run a portable version of the app.

Either one does the same thing ultimately and will work just fine.

Once started you'll be able to sign in with your username and password. The server name is simply the url you browse to to access the server.

#### Mac Client Install :computer:

Any of the client additions are super easy to get going. First head over to the releases page on Github

https://github.com/madeofpendletonwool/PinePods/releases

There's a dmg and pinepods_mac file.

Simply extract, and then go into Contents/MacOS. From there you can run the app.

The dmg file will prompt you to install the Pinepods client into your applications fileter while the _mac file will just run a portable version of the app.

Once started you'll be able to sign in with your username and password. The server name is simply the url you browse to to access the server.

#### Android Install :iphone:

For now, it's a manual install and there are some issues with the app. Check the releases page for the latest apk.

#### ios Install :iphone:

Coming Soon - The web app works great for phones.

## PodPeople DB

Podpeople DB is a project that I maintain and also develop. Podpeople DB is a way to suppliment Person tags for podcasts that don't support them by default. This allows the community to maintain hosts and follow them to all podcasts! I maintain an instance of Podpeople DB at podpeopledb.com. Otherwise, it's an open source project and you can maintain and instance of your own if you prefer. For information on that go [here](https://podpeopledb.com/docs/self-host). You can download the database yourself and maintain your own instance. If you do decide to go this route please still add any hosts for your favorite podcasts at the instance hosted at podpeopledb.com. The community will thank you!

For additional info on Podpeople DB check out [the docs](https://podpeopledb.com/docs/what-is-this-for).

Additionally, I've written [a blog](https://www.pinepods.online/blog) post discussing the rational around it's creation.

Finally, you can check out the Repo for it [here!](https://github.com/madeofpendletonwool/podpeople-db)

## Pinepods Firewood

A CLI only client that can be used to remotely share your podcasts to is in the works! Check out [Pinepods Firewood!](https://github.com/madeofpendletonwool/pinepods-firewood)

## Platform Availability

The Intention is for this app to become available on Windows, Linux, Mac, Android, and IOS. Windows, Linux, Mac, web, and android are all currently available and working. The android app is in a sort of beta currently as I finalize any remaining issues with it. Track those [here](https://github.com/madeofpendletonwool/PinePods/issues/320). This app is built with Tauri, therefore once the Android version is in a final state there's no reason I can't just compile it to ios as well.

For a podcast sync app I recommend Opodsync, but nextcloud sync works great too! This is only required if you use an app like AntennaPods. So then your Pinepods and Antennapods sync up podcasts.

[OpodSync](https://github.com/kd2org/opodsync)

[Nextcloud Podcast Sync App](https://apps.nextcloud.com/apps/gpoddersync)

ARM devices are also supported including raspberry pis. The app is shockingly performant on a raspberry pi as well. The only limitation is that a 64bit OS is required on an arm device. Setup is exactly the same, just use the latest tag and docker will auto pull the arm version.


#### Runners

Arm Images made possible by Runs-On:
https://runs-on.com
