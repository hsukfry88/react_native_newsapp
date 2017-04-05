import React, {
	Component,
	PropTypes
} from 'react'
import {
	NetInfo
} from 'react-native'
export default function(fn) {
	return {
		start: NetInfo.isConnected.fetch().done(fn),
		listener: NetInfo.isConnected.addEventListener('change', fn),
		remove: NetInfo.isConnected.removeEventListener('change', fn)
	}
}