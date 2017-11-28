const { webFrame } = require('electron');

setInterval(function(){

images = {'Idle':'idle','AFK':'afk','Browsing the internet':'browsing','Coding':'coding','Homework':'homework','Gaming':'gaming','YouTube':'youtube'};

details = document.getElementById('status').value;
image = images[document.getElementById('status').value];

console.log(details);

}, 1000);