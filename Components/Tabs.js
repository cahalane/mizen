import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView
} from 'react-native';
import { connect } from 'react-redux';
import RoomInfo from './RoomInfo';
import ProjectInfo from './ProjectInfo';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';


export class Tabs2 extends Component{
	state = {
		index: 0,
		routes: [
		  { key: '1', title: 'Nearby' },
		  { key: '2', title: 'All' },
		],
		};

		_handleChangeTab = (index) => {
		this.setState({ index });
		};

		_renderHeader = (props) => {
		return <TabBar {...props} />;
		};

		_renderScene = ({ route }) => {
		switch (route.key) {
		case '1':
		  return (
			<RoomInfo
				style={styles.page}
				room = {this.props.room}
				nearbyRooms = {this.props.nearbyRooms}
				projects = {this.props.projrm}
				dataSource = {this.props.nearbyDS} />
			);
		case '2':
		  return (
		  	<View style={styles.page}>
			  	<ListView
					dataSource={this.props.allDS}
					renderRow={(rowData) => <ProjectInfo project={rowData}/>}
					/>
			</View>
			);
		default:
		  return null;
		}
	};

	render() {
		return (
			<TabViewAnimated
		        style={styles.container}
		        navigationState={this.state}
		        renderScene={this._renderScene}
		        renderHeader={this._renderHeader}
		        onRequestChangeTab={this._handleChangeTab}
		      	/> 
      		);
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
  container: {
    flex: 1
  },
  page: {
	justifyContent: 'center',
	alignItems: 'center'
  }
});


const Tabs = connect(mapStateToProps)(Tabs2);
export default Tabs;