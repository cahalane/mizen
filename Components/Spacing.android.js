import React, { Component } from 'react';
import {
	View,
	StatusBar
} from 'react-native';

export class Spacing extends Component{
	render(){
		return (<View><StatusBar backgroundColor="#2196f3" /></View>);
   } // only thing to do on android is set the statusbar honestly
}

export default Spacing; 