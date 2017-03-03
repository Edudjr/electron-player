const path = require('path');
const remote = require('electron').remote;
const Player = require('./player');
const main = remote.require('./main');

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
	player.add(path.join(__dirname, '/soundtrack-1.mp3'));
	player.add(path.join(__dirname, '/soundtrack-2.mp3'));
}