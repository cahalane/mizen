import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { connect } from 'react-redux';

export class NearbyInfo extends Component{
	constructor(props) {
		super(props);
		for(i in props.rooms){
			props.rooms[i].numSaved = 0;
			props.rooms[i].leftToSee = 0;
			for(j in props.projects){
				if(props.projects[j].minor_number === props.rooms[i].minor_number
				    && props.projects[j].saved){
					props.rooms[i].numSaved++;
					if(!props.projects[j].done){
						props.rooms[i].leftToSee++;
					}
				}
			}
		}
	}

	detail(room){
		return room.name + " (" + room.numSaved + " saved, " +room.leftToSee + " left to see)";
	}

	render() {
	return (
		<View>
			{this.props.rooms.length > 0 && 
				<Text style={styles.nearbyText}>
				 	Nearby: {this.detail(this.props.rooms[0])}
				 	{this.props.rooms.length > 1 && " & " + this.detail(this.props.rooms[1])}
				</Text>
			}
		</View>
	);
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