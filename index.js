/* eslint-disable no-console */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const DiscordRPC = require('discord-rpc');

// don't change the client id if you want this example to work

const ClientId = '384731419601272842';

details = 'Idle';
image = 'idle';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 380,
    resizable: false,
    titleBarStyle: 'hidden',
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null)
    createWindow();
});

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

last = 'Idle';

async function setActivity() {
  if (!rpc || !mainWindow)
    return;
      details = await mainWindow.webContents.executeJavaScript('window.details');
      image = await mainWindow.webContents.executeJavaScript('window.image');
      if(last !== details){
        const startTimestamp = new Date();
        last = details;
      }
      rpc.setActivity({
        details: details,
        startTimestamp,
        largeImageKey: image,
        largeImageText: details,
        instance: false,
      });
      console.log('Changed RPC status');
}

rpc.on('ready', () => {
  setTimeout(function(){setActivity();}, 1000);

  setInterval(() => {
    setActivity();
  }, 16000);
});

rpc.login(ClientId).catch(console.error);