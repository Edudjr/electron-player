const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const drivelist = require('drivelist');

let UsbDevice = null;


watchForDevices();

function watchForDevices(){
  setInterval(findDevices, 1000)
}

function findDevices(){
  getDrives(function(drives){
    
    //Iterate through drives to find USB devices
    for(var i=0; i<drives.length; i++){
      if(drives[i].type == 'usb'){
        if(!UsbDevice){
          UsbDevice = drives[i]
          console.log('New device attached:\n',drives[i])
        }
        return;
      }
    }
    //No devices were found
    if(UsbDevice){
      UsbDevice = null;
      console.log('No Devices found')
    }
  })
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
  	width: 800, 
  	height: 600,
  	resizable: false
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
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