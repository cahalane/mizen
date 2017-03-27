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

export class ProjectList extends Component{
	render() {
		return (
			<ListView
				dataSource={this.props.ds}
				renderRow={(rowData) => <ProjectInfo project={rowData}/>}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	let datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	return{
		ds : datasource.cloneWithRows(state.projects)
	}
}

export const AllProjectsList = connect(mapStateToProps)(ProjectList);
export default ProjectList;