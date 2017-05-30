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
let stopButton = document.querySelector('#stop-button');
let volumeBar = document.querySelector('#volume-bar-selector');
let volumeBarForeground = document.querySelector('#volume-bar-foreground');
let song = document.querySelector('#song');
let author = document.querySelector('#author');

playButton.addEventListener('click', () => {
  player.play();
});

nextButton.addEventListener('click', () => {
	player.next();
});

previousButton.addEventListener('click', () => {
	player.previous();
});

volumeBarForeground.style.height = '100%';

volumeBar.addEventListener('mousemove', (event) => {
	let rect = volumeBar.getBoundingClientRect();
	let position = event.pageY - rect.top;
	let percentage = 100 - (position*100/rect.height);
	volumeBarForeground.style.height = percentage+'%';
	player.setVolume(percentage);
});


setup();

function setup(){
	//player.add(path.join(__dirname, './../media/soundtrack-1.mp3'));
	//player.add(path.join(__dirname, './../media/soundtrack-2.mp3'));

	ipcRenderer.on('finishedLoadingSongList', (event, songList) => {
		songList.forEach(function(song){
			player.add(song)
		})
		console.log('Player has finished loading')
	})

	ipcRenderer.on('deviceDisconnected', (event) => {
		console.log('Device has disconnected')
	})

	player.onended = () => {
		console.log('FRONT: Song has ended');
	}

	player.onplay = (song) => {
		this.song.innerHTML = song.songName;
		this.author.innerHTML = song.songAuthor;
	}
}