'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var mainWindow = null;
var os = require('os');
var {dialog} = require('electron');
var ipc = require('electron').ipcMain;

ipc.on('close-main-window', function() {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        resizable: true,
        height: 600,
        width: 800,
        webPreferences:{
          nodeIntegration:true,
          contextIsolation:false
        }
    });

mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});



ipc.on('open-file-dialog-for-file', function (event) {
    console.log("file");
    if(os.platform() === 'linux' || os.platform() === 'win32'){
       dialog.showOpenDialog({
           properties: ['openFile']
       }, function (files) {
          if (files) event.sender.send('selected-file', files[0]);
       });
   } else {
       dialog.showOpenDialog({
           properties: ['openFile', 'openDirectory']
       }, function (files) {
           if (files){ event.sender.send('selected-file', files[0]);
           console.log("win64");
       }
       });
   }});