import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { connect } from 'react-redux';

export class IndividualProjectScreen extends Component{
	static navigationOptions = {
	    title: ({ state }) => `Project: ${state.params.project.title}`,
	};
	render() {
		const { params } = this.props.navigation.state;
		if(params.project){
			return (
				<View>
					<Text style={styles.headerText}>
						{params.project.title}
					</Text>
					<Text>
						{params.project.description}
					</Text>
				</View>
			);
		} else {
			return (<View></View>);
		}
	}
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
});

export default IndividualProjectScreen; 