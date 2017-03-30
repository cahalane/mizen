import React, { Component } from 'react';
import {
	View,
	StatusBar
} from 'react-native';
import StatusBarSizeIOS from 'react-native-status-bar-size';

export class Spacing extends Component {
   constructor(props){
   		super(props);
   		this.state = {};
   		console.log(StatusBarSizeIOS.currentHeight);
		this.state.currentStatusBarHeight = StatusBarSizeIOS.currentHeight;
   }

	componentDidMount(){
		StatusBarSizeIOS.addEventListener('didChange', () => this._handleStatusBarSizeDidChange());
   }

	componentWillUnmount(){
		StatusBarSizeIOS.removeEventListener('didChange', () => this._handleStatusBarSizeDidChange());
	}

	_handleStatusBarSizeDidChange(currentStatusBarHeight) {
		this.setState({currentStatusBarHeight: currentStatusBarHeight});
	}
	
	render(){
		return (
			<View style={{backgroundColor: '#2196f3', height: this.state.currentStatusBarHeight}}>
				<StatusBar
					barStyle="light-content"
					/>
			</View>
		);
   }
}

export default Spacing; 