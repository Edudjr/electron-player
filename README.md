# electron-player
This is a music player made with Electron. It will play any music files from a plugged pen-drive.

# How to run
1. download this repo
1. navigate to downloaded repo
1. run ```npm install```

In order for the USB Detection to work, we need to install:
1. run ```sudo apt-get install -y build-essential```
1. run ```sudo apt-get install libudev-dev``` (check for any dependencies and install them with apt-get)
1. install node-gyp ```npm install -g node-gyp```
1. Then, we need to rebuild usb-detection for Electron. run ```node-gyp rebuild --target=1.4.15 --arch=x64 --dist-url=https://atom.io/download/electron``` (use `ia32` for 32 bits architecture)
1. run ```./node_modules/.bin/electron .```