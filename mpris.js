var dbus= require('./dbus')

// mpris is an instance of an Mpris connection
// @param specificService the suffix for the specific Spotify service to connect to
// @param subInterface (optional) selects which Mpris interface to ask for. default: Player.
// @param cb callback with the dbus object.
function Mpris(specificService, subInterface, cb){
	if(specificSubservice instanceof Function){
		cb= specificService
		specificSubservice
	}
	subInterface= subInterface || 'Player'
	subInterface= subInterface.charAt(0).toUpperCase() + subInterface.substring(1)

	dbus()
	.getService('org.mpris.MediaPlayer2.'+specificService)
	.getInterface(
	  '/org/mpris/MediaPlayer2',
	  'org.mpris.MediaPlayer2.'+subInterface,
	  cb)
}
