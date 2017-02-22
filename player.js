const path = require('path');
const remote = require('electron').remote;
const main = remote.require('./main');

var playButton = document.querySelector('#play-button');
var mainButton = document.querySelector('#main-button');

playButton.addEventListener('click', function () {
  playAudio();
});

mainButton.addEventListener('click', function () {
  mainFunction();
});

function playAudio(){
	var audio = new Audio(path.join(__dirname, '/soundtrack-1.mp3'));
	audio.play();
}

function mainFunction(){
	console.log(main);
	main.testFunction();
}