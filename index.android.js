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

import Tabs from './Components/Tabs';

var defaultState = {
	"beacons" : [{"minor" : 0}],
	"projects" : [],
	"rooms" : [],
	"nearbyRooms": [{}]
}

function state(state = defaultState, action) {
	switch (action.type) {
	case 'BEACONS_UPDATE':
		action.projects = state.projects;
		action.rooms = state.rooms;
		action.nearbyRooms = [];
		for(i in action.beacons){
			for(j in action.rooms){
				if(action.rooms[j].minor_number === action.beacons[i].minor){
					if(!action.nearbyRooms.includes(action.rooms[j])){
						action.nearbyRooms.push(action.rooms[j]);
					}
					break;
				}
			}
		}
		return action
	case 'PROJECTS_UPDATE':
		action.beacons = state.beacons;
		action.rooms = state.rooms;
		action.nearbyRooms = state.nearbyRooms;
		return action
	case 'ROOMS_UPDATE':
		action.beacons = state.beacons;
		action.projects = state.projects;
		action.nearbyRooms = state.nearbyRooms;
		for(i in action.beacons){
			for(j in action.rooms){
				if(action.rooms[j].minor_number === action.beacons[i].minor){
					if(!action.nearbyRooms.includes(action.rooms[j])){
						action.nearbyRooms.push(action.rooms[j]);
					}
					break;
				}
			}
		}
		return action
	default:
		return state
	}
}

let store = createStore(state);
Beacons.detectIBeacons(); 

store.dispatch({type:'BEACONS_UPDATE', beacons:[{minor:9494}, {minor:9494}, {minor:32767}]});

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
				function compare(a,b) {
				  if (a.distance < b.distance)
				    return -1;
				  if (a.distance > b.distance)
				    return 1;
				  return 0;
				}

				data.beacons.sort(compare);
				store.dispatch({type:'BEACONS_UPDATE', beacons:data.beacons});
			}
		});
}
establishBeacons();

async function getProjectsFromAPI() {
	try {
		let response = await fetch('https://colmfyp.netsoc.co/projects.json');
		let responseJson = await response.json();
		return responseJson;
	} catch(error) {
		console.error(error);
	}
}
async function initProjects(){
	let data = await getProjectsFromAPI();
	console.log(data); 
	store.dispatch({type:'PROJECTS_UPDATE', projects:data.projects});
	store.dispatch({type:'ROOMS_UPDATE', rooms:data.rooms});
}
initProjects();

export default class Mizen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Provider store={store}>
					<Tabs />
				</Provider>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
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
