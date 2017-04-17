import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView
} from 'react-native';
import { connect } from 'react-redux';
import ProjectList from './ProjectList';

export class IndividualRoomScreen extends Component{
	static navigationOptions = {
		// Room name in nav header
	    title: ({ state }) => `${state.params.room.name}`,
	};

	render() {
		const { params } = this.props.navigation.state;
		if(params.room){
			return (
				<View style={styles.container}>
				<ProjectList
					style={styles.container}
					showSearchBar={false}
					projects={params.room.projects}
					navigation={this.props.navigation} />
				</View>
			);
		} else {
			return (<View></View>);
		}
	}
}

const styles = StyleSheet.create({
  container: {
	flex: 1
  }
});

export default IndividualRoomScreen; 