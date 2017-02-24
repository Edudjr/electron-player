/* Note: You need to pass the full path for the song
 * e.g: player.add = 'c/user/username/musics/shake.mp3'
 *
 */
var Player = function(){
	this.playlist = [];
	this.currentAudio = new Audio();
	this.currentSongIndex = 0;
	
	//Events
	this.currentAudio.onended = function(){
		console.log('Event: Song has ended');
	}
	this.currentAudio.onplay = function(){
		console.log('Event: Song has started');
	}

	//Public functions
	this.play = function(index = null){
		//Checks if there is a playslist and index is valid
		if (index){
			if(this.playlist.length && index > 0 && index < this.playlist.length){
				console.log('Playing from index: '+index);
				this.currentAudio.src = this.playlist[index];
			}else{
				console.log('Index out of range');
			}
		}
		else if (this.playlist.length){
			console.log('Playing song');
			changeToIndexAndPlay(this, this.currentSongIndex);
		}
		else{
			console.log('No songs to play');
		}
	}

	this.pause = function(){
		if(this.currentAudio){
			console.log('Pausing song');
			this.currentAudio.pause();
		}else{
			console.log('No song to pause');
		}
	}

	this.stop = function(){
		if(this.currentAudio){
			console.log('Stopping song');
			this.currentAudio.pause();
			this.currentSongIndex
		}
	}

	this.add = function(songPath){
		console.log('Adding a song: '+ songPath +', index: '+ this.playlist.length);
		this.playlist.push(songPath);
	}

	this.remove = function(index){
		if(index < this.playlist.length && index > 0){
			console.log('Removing a song: '+ this.playlist[index] +', index: '+ index);
			this.playlist.splice(index, 1);
			//check if removed index is the same as the music playing
		}
	}

	this.next = function(){
		console.log('Moving to the next song');
		this.currentSongIndex < this.playlist.length-1 
			? this.currentSongIndex += 1 
			: this.currentSongIndex = 0;
		changeToIndexAndPlay(this, this.currentSongIndex);
	}

	this.previous = function(){
		console.log('Going back to previous song');
		this.currentSongIndex > 0
			? this.currentSongIndex -= 1
			: this.currentSongIndex = this.playlist.length-1;
		changeToIndexAndPlay(this, this.currentSongIndex);
	}
}

//Private functions
function changeToIndexAndPlay(ctx, index){
	ctx.currentAudio.src = ctx.playlist[index];
	ctx.currentAudio.load();
	ctx.currentAudio.play();
}

module.exports = Player;