const path = require('path');
const remote = require('electron').remote;
const Player = require('./../helpers/player');
const main = remote.require('./main');
const ipcRenderer = require('electron').ipcRenderer;

let player = new Player();

var playButton = document.querySelector('#play-button');
var pauseButton = document.querySelector('#pause-button');
var nextButton = document.querySelector('#next-button');
var previousButton = document.querySelector('#previous-button');
var homeButton = document.querySelector('#home-button');

playButton.addEventListener('click', function () {
  player.play();
});

pauseButton.addEventListener('click', function () {
  player.pause();
});

nextButton.addEventListener('click', function(){
	player.next();
});

previousButton.addEventListener('click', function(){
	player.previous();
});

homeButton.addEventListener('click', function(){
	main.testFunction(function(drives){
		console.log(drives);
	});
});

setup();

function setup(){
	
	ipcRenderer.on('finishedLoadingSongList', (event, songList) => {
		songList.forEach(function(song){
			player.add(song)
		})
		console.log(player.playlist)
	})

	ipcRenderer.on('deviceDisconnected', (event) => {
		console.log('Device has disconnected')
	})
}