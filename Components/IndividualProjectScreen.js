import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export class IndividualProjectScreen extends Component{
	static navigationOptions = {
	    title: ({ state }) => `${state.params.project.title}`,
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.state.loadingSave = false;
		this.state.loadingDone = false;
	}

	toggleSave(){
		const { params } = this.props.navigation.state;
		setTimeout(() => {
			params.project.changeStatus(!params.project.saved ? 'save' : 'unsave')
			this.setState({loadingSave:false});
		}, 1);
		this.setState({loadingSave:true});
	}

	toggleDone(){
		const { params } = this.props.navigation.state;
		setTimeout(() => {
			params.project.changeStatus(!params.project.done ? 'done' : 'undone');
			this.setState({loadingDone:false});
		}, 1);
		this.setState({loadingDone:true});
	}

	render() {
		const { params } = this.props.navigation.state;
		if(params.project){
			return (
				<ScrollView style={styles.projectPage}>
					<Text style={styles.headerText}>
						{params.project.title}
					</Text>
					<View style={styles.buttonHold}>
						<View style={styles.buttonHold2}>
					  	{!this.state.loadingSave && <Icon.Button name={params.project.saved ? 'star' : 'star-o'} 
							 color={params.project.saved ? '#ffd600' : 'black'}
							 style={styles.button}
							 onPress={() => {this.toggleSave()}}> 
							 <Text>Save{params.project.saved && "d"}</Text>
							 </Icon.Button>}
					  	{this.state.loadingSave && <ActivityIndicator style={styles.button} />}
						</View>
						<View style={styles.buttonHold2}>
					  	{!this.state.loadingDone && <Icon.Button name={params.project.done  ? 'check-circle' : 'check-circle-o'}
							color={params.project.done ? '#00c853' : 'black'}
							style={styles.button} 
							onPress={() => {this.toggleDone()}}>
							<Text>{!params.project.done && "Mark"} Done</Text></Icon.Button>}
					  	{this.state.loadingDone && <ActivityIndicator style={styles.button} />}
			  			</View>
			  		</View>
					<Text>
						{params.project.description}
					</Text>
				</ScrollView>
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
	},
	projectPage: {
		padding:20
	},
	buttonHold: {
		alignItems: 'center',
		flexDirection: 'row',
		width:340
	},
	buttonHold2:{
		flex:1,
		margin:10
	},
	button: {
		width:150,
		alignItems: 'center',
		backgroundColor: 'white',
	},
});

export default IndividualProjectScreen; 