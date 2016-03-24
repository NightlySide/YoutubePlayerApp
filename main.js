'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        toolbar: false,
        height: 600,
        width: 800
    });
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setAutoHideMenuBar(true);

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
