import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	DeviceEventEmitter
} from 'react-native';
import { connect, Provider } from 'react-redux';
import ProjectInfo from './ProjectInfo';
import NearbyInfo from './NearbyInfo';
import ProjectList from './ProjectList';

export class RoomInfo2 extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		if (typeof this.props.room !== "undefined"){
			return (
				<View>
					<Text style={styles.headerText}>
						{this.props.room.name}
					</Text>
					<ProjectList
						ds={this.props.nearbyDS}/>
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

const mapStateToProps = (state) => {
	projrm = [];
	for(i in state.projects){
		if( state.projects[i].room != null && state.nearbyRooms.length > 0
			&& state.projects[i].room.minor_number === state.nearbyRooms[0].minor_number){
			projrm.push(state.projects[i]);
		} 
	}

	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	return {
		room: state.nearbyRooms[0],
		nearbyRooms: state.nearbyRooms.slice(1),
		projrm: projrm,
		projects: state.projects,
		nearbyDS: ds.cloneWithRows(projrm),
		allDS: ds.cloneWithRows(state.projects)
	}
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
});

const RoomInfo = connect(mapStateToProps)(RoomInfo2);
export default RoomInfo;