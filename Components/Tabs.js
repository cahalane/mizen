import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView
} from 'react-native';
import { connect, Provider } from 'react-redux';
import RoomInfo from './RoomInfo';
import ProjectInfo from './ProjectInfo';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { ProjectList, AllProjectsList } from './ProjectList';

export class Tabs extends Component{
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
			  	<Provider store={this.props.store}>
					<RoomInfo
						style={styles.page} />
			  	</Provider>
				);
		case '2':
		  return (
			  	<Provider store={this.props.store}>
					<AllProjectsList />
			  	</Provider>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
	justifyContent: 'center',
	alignItems: 'center'
  }
});

export default Tabs;