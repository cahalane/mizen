/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	DeviceEventEmitter
} from 'react-native';
import Beacons from 'react-native-beacons-android'

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

function currentRoom(state = {room:{minor:'No room found'}}, action) {
	switch (action.type) {
	case 'UPDATE':
		return action
	default:
		return state
	}
}
function projects(state = {projects:[]}, action) {
	switch (action.type) {
	case 'UPDATE':
		return action
	default:
		return state
	}
}

let roomStore = createStore(currentRoom);
let projectsStore = createStore(projects);

Beacons.detectIBeacons();
async function establishBeacons(){
		try {
			await Beacons.startRangingBeaconsInRegion('REGION1', 'b9407f30-f5f8-466e-aff9-25556b57fe6d')
			console.log(`Beacons ranging started successfully`);
		} catch (error) {
			console.log(`Beacons ranging not started, error: ${error}`);
		}
		DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
			console.log(data);
			if(data.beacons.length > 0){
				new_room = data.beacons[0];
				new_room.minor = "Beacon detected: " + new_room.minor
				roomStore.dispatch({type:'UPDATE', room:data.beacons[0]});
			}
		});
}
establishBeacons();

async function getProjectsFromAPI() {
	try {
		let response = await fetch('https://colmfyp.netsoc.co/projects.json');
		let responseJson = await response.json();
		return responseJson.projects;
	} catch(error) {
		console.error(error);
	}
}
async function initProjects(){
	let projects = await getProjectsFromAPI();
	console.log(projects);
	projectsStore.dispatch({type:'UPDATE', projects:projects});
}
initProjects();

export default class Mizen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Provider store={roomStore}>
					<RoomInfo />
				</Provider>
				<Provider store={projectsStore}>
					<ProjectInfo />
				</Provider>
			</View>
		);
	}
}

export class RoomInfo2 extends Component{
	render() {
		return (
			<Text style={styles.welcome}>
					{this.props.room}
			</Text>
		);
	}
}
const mapRoomStateToProps = (state) => {
	return {
		room: state.room.minor
	}
}

const RoomInfo = connect(mapRoomStateToProps)(RoomInfo2);


export class ProjectInfo2 extends Component{
	render() {
		return (
			<Text style={styles.welcome}>
					With {this.props.numprojs} projects
			</Text>
		);
	}
}

const mapProjectStateToProps = (state) => {
	return {
		numprojs: state.projects.length
	}
}
const ProjectInfo = connect(mapProjectStateToProps)(ProjectInfo2);



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('Mizen', () => Mizen);
