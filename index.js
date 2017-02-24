const path = require('path');
const remote = require('electron').remote;
const Player = require('./player');

let player = new Player();

var playButton = document.querySelector('#play-button');
var pauseButton = document.querySelector('#pause-button');
var nextButton = document.querySelector('#next-button');
var previousButton = document.querySelector('#previous-button');

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

setup();

function setup(){
	player.add(path.join(__dirname, '/soundtrack-1.mp3'));
	player.add(path.join(__dirname, '/soundtrack-2.mp3'));
}