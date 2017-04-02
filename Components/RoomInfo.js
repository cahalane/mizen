import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	DeviceEventEmitter,
	ActivityIndicator
} from 'react-native';
import { connect, Provider } from 'react-redux';
import NearbyInfo from './NearbyInfo';
import ProjectList from './ProjectList';

export class RoomInfo2 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (typeof this.props.room !== "undefined"){
			return (
				<View style={styles.container}>
					<View>
						<Text style={styles.headerText}>
							{this.props.room.name}
						</Text>
					</View>
					<ProjectList
						style={styles.page}
						ds={this.props.nearbyDS}
						showSearchBar={false}
						projects={this.props.projrm}
						navigation={this.props.navigation} />
					<NearbyInfo rooms={this.props.nearbyRooms} projects={this.props.projects} />
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
			      	<ActivityIndicator
						animating={true}
						style={{height: 80}}
						size="large"
					/>
					<Text style={styles.headerText}>Looking for a room...</Text>
					<Text>Are you away from the event?</Text>
					<Text>Is Bluetooth enabled?</Text>
				</View>
			);
		}
	}
}

const mapStateToProps = (state) => {
	projrm = [];
	pos = 1;
	for(i in state.projects){
		if( state.projects[i].room != null && state.nearbyRooms.length > 0
			&& state.projects[i].room.minor_number === state.nearbyRooms[0].minor_number){
			projrm.push(state.projects[i]);
		} 
	}

	let room;
	if(projrm.length){
		room = state.nearbyRooms.shift();
		room.numSaved = 0;
		room.leftToSee = 0;
		for(i in projrm){
			if(projrm[i].saved){
				room.numSaved++;
				if(!projrm[i].done){
					room.leftToSee++;
				}
			}
		}
	}

	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	return {
		room: room,
		nearbyRooms: state.nearbyRooms,
		projrm: projrm,
		projects: state.projects,
		nearbyDS: ds.cloneWithRows(projrm),
		allDS: ds.cloneWithRows(state.projects)
	}
}

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
	},

	page: {
    	flex: 1,
    	backgroundColor: 'white'
	},

	headerText: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
});

const RoomInfo = connect(mapStateToProps)(RoomInfo2);
export default RoomInfo;