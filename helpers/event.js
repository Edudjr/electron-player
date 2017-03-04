module.exports = function(win) {
	return {
		finishedLoadingSongList : (fullPathFiles) => {
			win.webContents.send('finishedLoadingSongList', fullPathFiles)
		},
		deviceDisconnected : () => {
			win.webContents.send('deviceDisconnected', null)
		}
	}
}