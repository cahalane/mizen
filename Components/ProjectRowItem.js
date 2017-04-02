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
		this.state.loadingSave = false;
		this.state.loadingDone = false;
	}

	toggleSave(){
		setTimeout(() => {
			this.props.project.changeStatus(!this.props.project.saved ? 'save' : 'unsave')
			this.setState({loadingSave:false});
		}, 1);
		this.setState({loadingSave:true});
	}

	toggleDone(){
		setTimeout(() => {
			this.props.project.changeStatus(!this.props.project.done ? 'done' : 'undone');
			this.setState({loadingDone:false});
		}, 1);
		this.setState({loadingDone:true});
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
			  	{!this.state.loadingSave && <Icon.Button name={this.props.project.saved ? 'star' : 'star-o'} 
			  				 color={this.props.project.saved ? '#ffd600' : 'black'}
			  				 style={styles.button}
			  				 onPress={() => {this.toggleSave()}} /> }
			  	{this.state.loadingSave && <ActivityIndicator style={styles.button} />}
			  	{!this.state.loadingDone && <Icon.Button name={this.props.project.done  ? 'check-circle' : 'check-circle-o'}
 			  				 color={this.props.project.done ? '#00c853' : 'black'}
 			  				 style={styles.button} 
			  				 onPress={() => {this.toggleDone()}} /> }
			  	{this.state.loadingDone && <ActivityIndicator style={styles.button} />}

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