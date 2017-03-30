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
import RoomInfo from './RoomInfo';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { ProjectList, AllProjectsList } from './ProjectList';
import IndividualProjectScreen from './IndividualProjectScreen';
import {StackNavigator} from 'react-navigation';
import Spacing from './Spacing';

class NearbyScreen extends Component {

	static navigationOptions = {
		title: "Nearby Projects"
	};
	render(){
	  return (
			<Provider store={this.props.screenProps.store}>
				<RoomInfo
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

const NearbyNav = StackNavigator({
  Nearby: { screen: NearbyScreen },
  IndividualProject: { screen: IndividualProjectScreen }
});

const AllProjectsNav = StackNavigator({
  AllProjects: { screen: AllProjectsScreen },
  IndividualProject: { screen: IndividualProjectScreen }
});

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
				<NearbyNav screenProps={this.props} />
				);
		case '2':
		  return (
				<AllProjectsNav screenProps={this.props} />
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
			</View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
  page: {
	justifyContent: 'center',
	alignItems: 'center'
  }
});

export default Tabs;