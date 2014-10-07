var Zwave= require('./zwave'),
  PropWatch= require("./properties-changed-watcher')
  SighandleVolume= require('./sighandle-volume')

function setup(zwaveDevice, mprisName, zwaveOpts){
	if(zwaveDevice.charAt[0] != '/' && zwaveDevice.charAt[0] != '.') zwaveDevice= '/dev'+zwaveDevice
	var zwaveOpts= {
	    consoleoutput: true
	    pollinterval: 180000 },
	  zwaveFactory= zwave.thunk(zwaveDevice, zwaveOpts)
	PropWatch(mprisName, 'Volume', SighandleVolume(zwaveFactory, [2]))
}

function main(){
	var zwaveDevice= process.argv[1],
	  mprisName= process.argv[2]
	if(!(zwaveDevice || mprisName))
		throw new Error('Insufficient arguments: '+process.argv[0]+' device mpris-name')
	setup(zwaveDevice, mprisName)
}

if(require.main == module){
	main()
}

module.exports= main
