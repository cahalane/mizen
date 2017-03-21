import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { connect } from 'react-redux';

export class NearbyInfo extends Component{
	render() {
		if(this.props.rooms.length > 0){
			return (
				<View>
					<Text>
						{this.props.rooms[0].name}
					</Text>
				</View>
			);
		} else {
			return (<View></View>);
		}
	}
}

export default NearbyInfo; 