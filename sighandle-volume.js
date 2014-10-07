'use strict';

var co= require('co')

function SighandleVolumeFactory(zwave, nodeSet, transformer){
	var send // fwd declare nodeSet sender
	var transformers // processing pipework

	function SighandleVolume(err) {
		if(err){
			console.warn('failed to get signal Volume')
			return
		}
	
		console.log(arguments)
		return

		SighandleVolume.level= arguments[1]
		SighandleVolume.transformers.call(SighandleVolume)
	}


	function*buildZwave(){
		if(this.zwaveFactory)
			this.zwave= this.zwaveFactory()
	}
	function*sendZwave(){
		var zwave= this.zwave,
		  nodeSet= this.nodeSet
		for(var i in nodeSet){
			var node= nodeSet[i]
			zwave.setLevel(node, this.level)
		}
	}

	function setNodeSet(value){
		if(!isNaN(value))
			nodeSet= [value]
		else
			nodeSet= value
	}

	Object.defineProperties(SighandleVolume, {
		// retrieves zwave instances
		zwaveFactory: {
			get: function(){return zwaveFactory},
			set: function(value){zwaveFactory= value;},
			enumerable: true,
			configurable: false
		},
		// accept a node or nodes to send to
		nodeSet: {
			get: function(){return nodeSet},
			set: setNodeSet,
			enumerable: true,
			configurable: false
		},
		// alias for nodeSet
		node: {
			get: function(){return nodeSet},
			set: setNodeSet,
			enumerable: true,
			configurable: false
		},


		// set a default transforms pipeline up using this value
		transformer: {
			set: function(value){
				if(value instanceof Function){ // and async
					transformers= co.call(null, buildZwave, value, sendZwave)
				}else if(!value){
					transformers= co.call(null, buildZwave, sendZwave)
				}
			},
			enumerable: true,
			configurable: false
		},
		// underlying pipework processing a request
		transforms: {
			get: function(){return transforms},
			set: function(value){
				if(!(value instanceof Function)){
					throw new Error('expected a thunk')
				}
				transforms= value
			},
			enumerable: true,
			configurable: false
		}
	})
	SighandleVolume.zwaveFactory= zwave
	SighandleVolume.transformer= transformer
	return SighandleVolume
}

module.exports= SighandleVolumeFactory
