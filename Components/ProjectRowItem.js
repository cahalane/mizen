import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

export class ProjectInfo extends Component{
	pressHandler(){
		this.props.callOnClick(this.props.project);
	}

	render() {
		return (
			<TouchableOpacity onPress={() => this.pressHandler()}>
				<View style={styles.eachProject}>
					<Text style={styles.title}>
						{this.props.project.title}
					</Text>
					<Text style={styles.owner}>
						{this.props.project.student_name} (with {this.props.project.supervisor_name})
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	eachProject:{
		margin:20
	},
	title: {
		fontSize: 15,
	},
	owner: {
		fontSize: 13,
	}
});

export default ProjectInfo; 