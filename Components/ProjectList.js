import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	DeviceEventEmitter,
	TouchableOpacity
} from 'react-native';
import { connect, Provider } from 'react-redux';
import ProjectRowItem from './ProjectRowItem';
import NearbyInfo from './NearbyInfo';

export class ProjectList extends Component{
	constructor(props){
		super(props);
	}
	render() {
		const { navigate } = this.props.navigation;
			return (
				<ListView
					dataSource={this.props.ds}
					renderRow={(rowData) => <ProjectRowItem
												project={rowData}
												callOnClick={(project) => navigate('IndividualProject', { project: project })} />
				} />
			);
	}

}

const mapStateToProps = (state, ownProps) => {
	let datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	props = {
		ds : datasource.cloneWithRows(state.projects)
	}

	if(typeof ownProps.navigation !== "undefined"){
		props.navigation = ownProps.navigation;
	}

	return props;
}

export const AllProjectsList = connect(mapStateToProps)(ProjectList);
export default ProjectList;