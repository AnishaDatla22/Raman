const {remote}=require('electron');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const path = require('path');
const url = require('url')
const ipcMain = electron.remote.ipcMain




let child;

$('#scan').click(function(){
    child =new BrowserWindow({ webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true
      },frame:true,width:400,height:200,parent:win,modal:true});
    child.loadURL(url.format({
        pathname:path.join(__dirname,'addWindow.html'),
        protocol:'file',
        slashes:true

    }))
    child.webContents.openDevTools();

    child.on('closed',() => {
        child=null;
        
        })
  
    });
   
    ipcMain.on('item',function(e,item){
        win.webContents.send('item',item)
        console.log(item);
        child.close()
        
        
        
        })




var win = remote.getCurrentWindow();



$('#minimg').click(function(){

win.minimize();

});

$('#maximg').click(function(){

   if( !win.isMaximized()){

    win.maximize();

   }
   else {
    win.unmaximize();

   }
    
    });
    

    $('#closeimg').click(function(){

        win.close();
        
        });
        







