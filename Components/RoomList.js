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
import NearbyInfo from './NearbyInfo';
import RoomRowItem from './RoomRowItem';
import ProjectList from './ProjectList';

export class RoomList2 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<ListView
					style={this.ListViewStyle}
					enableEmptySections={true}
					dataSource={this.props.ds}
					renderRow={(rowData) => <RoomRowItem
												room={rowData}
												callOnClick={(room) => navigate('IndividualRoom', { room: room })} />
				} />
			</View>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	let rooms = state.rooms;
	let minorToID = {}; 
	for(i in state.rooms){
		rooms[i].projects = [];
		rooms[i].numSaved = 0;
		rooms[i].leftToSee = 0;
		minorToID[state.rooms[i].minor_number] = i;
	}

	if(rooms.length){
		for(i in state.projects){
			if(state.projects[i].room != null){
				let thisProject = state.projects[i];
				let targetRoomID = minorToID[thisProject.room.minor_number];
				rooms[targetRoomID].projects.push(state.projects[i]);
				if(thisProject.saved){
					rooms[targetRoomID].numSaved++;
					if(!thisProject.done){
						rooms[targetRoomID].leftToSee++;
					}
				}
			}
		}
	}

	let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	return {
		rooms: rooms,
		ds: ds.cloneWithRows(rooms),
		navigation: ownProps.navigation
	}
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});

export const RoomList = connect(mapStateToProps)(RoomList2);
export default RoomList;