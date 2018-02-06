[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/computersarecool/nightwalker/issues)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ![Cherry Flavor](https://dummyimage.com/50/c71b39/c71b39.jpg "Cherry Flavor")
  ![Nectarine Flavor](https://dummyimage.com/50/fa5132/fa5132.jpg "Nectarine Flavor")
  ![Lemon Flavor](https://dummyimage.com/50/feda60/feda60.jpg "Lemon Flavor")
  ![Apple Flavor](https://dummyimage.com/50/005b3a/005b3a.jpg "Apple Flavor")
  ![Electricity Flavor](https://dummyimage.com/50/26599a/26599a.jpg "Electricity Flavor")
  ![Plumn Crazy](https://dummyimage.com/50/3f2c63/3f2c63.jpg "Plum Crazy Flavor")
  ![Powder Flavor](https://dummyimage.com/50/e45c68/e45c68.jpg "Powder Flavor")
  ![Proton-Powder](https://dummyimage.com/50/ed243f/ed243f.jpg "Proton-Powder Flavor")
  
  > The Official color values of NightWalker's Cherry, Nectarine, Lemon, Apple, Electricity, Plum Crazy, Powder and Proton Powder flavors

*The MEAN App for [NightWalker.clothing](https://nightwalker.clothing "The Nightwalker.clothing website")*

# What is NightWalker?
### A colorful clothing line

  NightWalker is a colorful clothing line. It that explores the future while paying homage to the past.
  
  Inspired by the 80s. Designed in 3D.

  **This is the code for the original NightWalker MEAN Web App.  The website no longer uses this code**. 
  
  The rest of this README is just notes about how to use the code.
  
  To actually buy something from NightWalker go to [NightWalker.clothing](https://nightwalker.clothing "The Nightwalker.clothing website")
  
## What this repo does:
This repo contains all of the code for the original NightWalker web application.  The website site no longer uses this code.
  
### To use:
##### To start the development database:
    mongod --dbpath /data/db/nightwalker &>/dev/null &

##### To add content to database:
```bash
    # From the database directory
    # Test:
      mongo localhost:27017/test ./inventory.js

    # Production:
      mongo localhost:27017/production ./inventory.js
 ```  
##### Deployment scripts:
```bash
    # Copy service files to /etc/systemd/system
    npm run-script copyServices
    
    # From the client directory run with: gulp
    prep, cdnMin, aws

    # Use systemctl to start / stop / monitor
```
  
## Extra notes:
  This project was written in / uses:
  ```
  MongoDB 3.2
  Express 4
  Angular 1.5 
  Node ^6.9
  ECMAScript 2015
  ```
  
  This app was developed entirely with free and open source software. Thank you to everybody who worked on the code this project uses including: 
  
  * [package](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Server Package.json") [authors](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Client Package.json")
  * [Gimp](https://www.gimp.org/ "Gimp")
  * [Inkscape](https://inkscape.org/ "Inkscape")
  * [Free Software Foundation](https://www.fsf.org "FSF")
  * [Electronic Frontier Foundation](https://www.eff.org "EFF") 
  
  A portion of each NightWalker sale goes directly to those organizations.

### License
:copyright: Willy Nolan 2017 

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

