import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { connect } from 'react-redux';

export class ProjectInfo extends Component{
	render() {
		return (
			<View style={styles.eachProject}>
				<Text style={styles.title}>
					{this.props.project.title}
				</Text>
				<Text style={styles.owner}>
					{this.props.project.student_name} (with {this.props.project.supervisor_name})
				</Text>

			</View>
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