import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ProjectRowItem extends Component{
	pressHandler(){
		this.props.callOnClick(this.props.project);
	}
	constructor(props) {
		super(props);
		this.state = {};

		// saving and loading can be slow
		// so use these to show state transitions
		this.state.loadingSave = false;
		this.state.loadingDone = false;
	}

	toggleSave(){
		this.setState({loadingSave:true});
		setTimeout(() => {
			this.props.project.changeStatus(!this.props.project.saved ? 'save' : 'unsave')
			this.setState({loadingSave:false});
		}, 1); // JS has no threads so this approximates one
	}

	toggleDone(){
		this.setState({loadingDone:true});
		setTimeout(() => {
			this.props.project.changeStatus(!this.props.project.done ? 'done' : 'undone');
			this.setState({loadingDone:false});
		}, 1);
	}

	render() {
		return (
			<View style={styles.eachProject}>
				<View style={styles.main}>
					<TouchableOpacity style={styles.main} onPress={() => this.pressHandler()}>
						<View style={styles.main}>
							<Text style={[styles.title, {color: this.props.project.done ? '#999' : 'black'}]}>
								{this.props.project.title}
							</Text>
							<Text style={[styles.owner, {color: this.props.project.done ? '#999' : 'black'}]}>
								{this.props.project.student_name} (with {this.props.project.supervisor_name})
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			  	{<Icon.Button name={this.props.project.saved ? 'star' : 'star-o'} 
			  				 color={this.state.loadingSave ? 'white' : this.props.project.saved ? '#ffd600' : 'black'}
			  				 style={styles.button}
			  				 onPress={() => {this.toggleSave()}} /> }
			  	{<Icon.Button name={this.props.project.done  ? 'check-circle' : 'check-circle-o'}
 			  				 color={this.state.loadingDone ? 'white' : this.props.project.done ? '#00c853' : 'black'}
 			  				 style={styles.button} 
			  				 onPress={() => {this.toggleDone()}} /> }

			</View>
		);
	}
}
const styles = StyleSheet.create({
	eachProject:{
		padding: 20,
		backgroundColor: "white",
		borderTopWidth: .5,
		borderBottomWidth: .5,
		borderColor: '#ddd',
		flex:1,
		flexDirection: 'row'
	},
	main:{
		width:250,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	indicator:{
		marginRight:10
	},
	title: {
		fontSize: 15,
		flex:1
	},
	owner: {
		fontSize: 13,
		flex:1
	}
});

export default ProjectRowItem; 