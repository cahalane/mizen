import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	Platform,
} from 'react-native';
import { connect, Provider } from 'react-redux';
import NearbyRoomInfo from './RoomInfo';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { ProjectList, AllProjectsList } from './ProjectList';
import RoomList from './RoomList';
import IndividualProjectScreen from './IndividualProjectScreen';
import IndividualRoomScreen from './IndividualRoomScreen';
import {StackNavigator} from 'react-navigation';
import Spacing from './Spacing';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class NearbyScreen extends Component {
	static navigationOptions = {
		title: "Nearby Projects"
	};
	render(){
	  return (
			<Provider store={this.props.screenProps.store}>
				<NearbyRoomInfo
					style={styles.page}
					navigation={this.props.navigation}/>
			</Provider>
		);
	}
}

class AllProjectsScreen extends Component {
	static navigationOptions = {
		title: "All Projects"
	};
	render(){
	  return (
			<Provider store={this.props.screenProps.store}>
				<AllProjectsList navigation={this.props.navigation} />
			</Provider>
		);
	}
}

class RoomListScreen extends Component {
	static navigationOptions = {
		title: "All Rooms"
	};
	render(){
	  return (
			<Provider store={this.props.screenProps.store}>
				<RoomList navigation={this.props.navigation} />
			</Provider>
		);
	}
}


const NearbyNav = StackNavigator({
  Nearby: { screen: NearbyScreen },
  IndividualProject: { screen: IndividualProjectScreen }
});

const AllProjectsNav = StackNavigator({
  AllProjects: { screen: AllProjectsScreen },
  IndividualProject: { screen: IndividualProjectScreen }
});

const AllRoomsNav = StackNavigator({
  AllProjects: { screen: RoomListScreen },
  IndividualRoom: { screen: IndividualRoomScreen },
  IndividualProject: { screen: IndividualProjectScreen }
});


export class Tabs extends Component{
	state = {
		index: 0,
		routes: [
		  { key: '1', title: 'Projects' },
		  { key: '2', title: 'Nearby' },
		  { key: '3', title: 'Rooms' },
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
				<AllProjectsNav	style={styles.stackNav}  screenProps={this.props} />
			);  
		case '2':
		  return (
				<NearbyNav style={styles.stackNav} screenProps={this.props} />
			);
		case '3':
		  return (
				<AllRoomsNav style={styles.stackNav}  screenProps={this.props} />
			);
		default:
		  return null;
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Spacing />
				<TabViewAnimated
					style={styles.container}
					navigationState={this.state}
					renderScene={this._renderScene}
					renderHeader={this._renderHeader}
					onRequestChangeTab={this._handleChangeTab}
					/>
				<KeyboardSpacer />
			</View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
  stackNav:{
	...Platform.select({
		ios: {
			marginTop: -20,
		},
	  android: {},
	}),
	flex:1
  },
  page: {
	justifyContent: 'center',
	alignItems: 'center'
  }
});

export default Tabs;