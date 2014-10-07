var Zwave= require('zwave'),
  thunkify= require('thunkify'),
  memoizee= require('memoizee')

function dispose(zwave){
	zwave.disconnect()
}

var _zwaves= memoizee(function(dev, options){
	var zwave= new Zwave(dev, options)
	zwave.connect()
	return zwave
}, {
  maxAge: 20000,
  dispose: dispose
})

function thunk= function(dev, options){
	return function(){
		return _zwaves(dev, options)
	}
}

module.exports= _zwaves
module.exports.thunk= thunk
