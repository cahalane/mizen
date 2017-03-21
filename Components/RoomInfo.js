import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView
} from 'react-native';
import { connect } from 'react-redux';
import ProjectInfo from './ProjectInfo';
import NearbyInfo from './NearbyInfo';

export class RoomInfo extends Component{
	constructor(props) {
		super(props);
		console.log(props.projects);
	}

	render() {
		if (typeof this.props.room !== "undefined"){
			return (
				<View>
					<Text style={styles.headerText}>
						{this.props.room.name}
					</Text>
					<ListView
						dataSource={this.props.dataSource}
						renderRow={(rowData) => <ProjectInfo project={rowData}/>}
					/>
					<NearbyInfo rooms={this.props.nearbyRooms} />
				</View>
			);
		} else {
			return (
				<Text>
					Looking for a room...
				</Text>
			);
		}
	}
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
});

export default RoomInfo;