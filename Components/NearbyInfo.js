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
					<Text style={styles.nearbyText}>
					 	Nearby: {this.props.rooms[0].name}
					</Text>
				</View>
			);
		} else {
			return (<View></View>);
		}
	}
}

const styles = StyleSheet.create({
	nearbyText: {
		fontSize: 10,
		textAlign: 'center',
		margin: 5,
	}
});

export default NearbyInfo; 