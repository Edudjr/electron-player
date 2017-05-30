const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const drivelist = require('drivelist')
const Event = require('./helpers/event')

let event = null
let usbDevice = null
let usbSongList = []

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function watchForDevices(){
  setInterval(findDevices, 1000)
}

function findDevices(callback){
  getDrives(function(drives){

    //Iterate through drives to find USB devices
    for(var i=0; i<drives.length; i++){
      if(drives[i].type.toLowerCase() == 'usb'){
        if(!usbDevice && drives[i].mountpoints.length){
          usbDevice = drives[i]
          console.log('New device attached:\n',drives[i])
          getSongListFromPath(usbDevice.mountpoints[0].path)
        }
        if(callback) callback(true)
        return;
      }
    }
    //No devices were found
    if(usbDevice){
      usbDevice = null;
      console.log('No Devices found/Device has disconnected')
      event.deviceDisconnected()
      if(callback) callback(false)
    }
  })
}

function getSongListFromPath(dirPath){
	console.log('Path: ',dirPath);
  fs.readdir(dirPath, (err, files) => {
    var fullPathFiles = files.filter(function(filePath){
      if(/.mp3$/.test(filePath)) return true
      return false
    }).map(function(filePath) {
      return path.join(dirPath, filePath)
    })
    event.finishedLoadingSongList(fullPathFiles)
  })
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
  	width: 1024,
  	height: 600,
  	resizable: false,
    frame: false
  })

  //Create new Event based on BrowserWindow
  event = new Event(win)

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './views/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.setMenu(null)
  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  //Start watching for devices
  watchForDevices()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

function getDrives(callback){
  drivelist.list((error, drives) => {
    if (error) {
      throw error;
    }
    if(callback)
      callback(drives);
  });
}

module.exports = {
	testFunction: function(callback){
	 getDrives(callback);
	}
}
