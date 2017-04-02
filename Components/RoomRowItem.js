import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

export class RoomRowItem extends Component{
	pressHandler(){
		this.props.callOnClick(this.props.room);
	}

	render() {
		return (
			<TouchableOpacity onPress={() => this.pressHandler()}>
				<View style={styles.eachRoom}>
					<Text style={styles.title}>
						{this.props.room.name}
					</Text>
					<Text style={styles.owner}>
						{this.props.room.projects.length} Projects ({this.props.room.numSaved} saved, {this.props.room.leftToSee} left to see)
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	eachRoom:{
		padding: 20,
		backgroundColor: "white",
		borderTopWidth: .5,
		borderBottomWidth: .5,
		borderColor: '#aaa'
	},
	title: {
		fontSize: 15,
	},
	owner: {
		fontSize: 13,
	}
});

export default RoomRowItem; 