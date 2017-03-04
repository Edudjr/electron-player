const path = require('path');
const remote = require('electron').remote;
const Player = require('./../helpers/player');
const main = remote.require('./main');
const ipcRenderer = require('electron').ipcRenderer;

let player = new Player();

let playButton = document.querySelector('#play-button');
let pauseButton = document.querySelector('#pause-button');
let nextButton = document.querySelector('#next-button');
let previousButton = document.querySelector('#previous-button');
let homeButton = document.querySelector('#home-button');

playButton.addEventListener('click', () => {
  player.play();
});

pauseButton.addEventListener('click', () => {
  player.pause();
});

nextButton.addEventListener('click', () => {
	player.next();
});

previousButton.addEventListener('click', () => {
	player.previous();
});

homeButton.addEventListener('click', () => {
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
		console.log('Player has finished loading')
	})

	ipcRenderer.on('deviceDisconnected', (event) => {
		console.log('Device has disconnected')
	})
}