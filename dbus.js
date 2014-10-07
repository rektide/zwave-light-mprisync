var dbus= require('dbus-promised')

// singleton bus object
var _bus

// retrieve an instance of bus
function bus(){
	if(!_bus){
		_bus= dbus.sessionBus()
	}
	return _bus
}

module.exports= bus
