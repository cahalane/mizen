import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	Linking,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export class IndividualProjectScreen extends Component{
	static navigationOptions = {
		// Display project title on the navigator
	    title: ({ state }) => `${state.params.project.title}`,
	};

	constructor(props) {
		super(props);
		this.state = {};

		// When projects are transitioning between saved and done
		// use these variables to show instant feedback
		this.state.loadingSave = false;
		this.state.loadingDone = false;
	}

	toggleSave(){
		const { params } = this.props.navigation.state;
		this.setState({loadingSave:true});
		setTimeout(() => {
			params.project.changeStatus(!params.project.saved ? 'save' : 'unsave')
			this.setState({loadingSave:false});
		}, 1); // JS doesn't support threading, but this is similar!
	}

	toggleDone(){
		const { params } = this.props.navigation.state;
		this.setState({loadingDone:true});
		setTimeout(() => {
			params.project.changeStatus(!params.project.done ? 'done' : 'undone');
			this.setState({loadingDone:false});
		}, 1);
	}

	render() {
		const { params } = this.props.navigation.state;
		if(params.project){
			return (
				<ScrollView style={styles.projectPage}>
					<View style={{flex:1, alignItems:'stretch'}}>
						{params.project.image !== null && <Image style={{flex:1, height:130, marginVertical:15}} source={{uri: params.project.image, cache: 'force-cache'}} />}
					</View>
					<Text style={styles.headerText}>
						{params.project.title}
					</Text>
					<Text style={styles.center}>
						Student: {params.project.student_name}
						{"\n"}Supervisor: {params.project.supervisor_name}
						{params.project.sndreader_name !== "-none-" && "\nSecond Reader: " + params.project.sndreader_name}
					</Text>
					<View style={styles.buttonHold}>
					  	{!this.state.loadingSave && <Icon.Button name={params.project.saved ? 'star' : 'star-o'} 
							 color={params.project.saved ? '#ffd600' : 'black'}
							 style={styles.button}
							 backgroundColor="transparent"
							 onPress={() => {this.toggleSave()}}> 
							 <Text>Save{params.project.saved && "d"}</Text>
							 </Icon.Button>}
					  	{this.state.loadingSave && <ActivityIndicator style={styles.button} />}
					  	{!this.state.loadingDone && <Icon.Button name={params.project.done  ? 'check-circle' : 'check-circle-o'}
							color={params.project.done ? '#00c853' : 'black'}
							style={styles.button}
							backgroundColor="transparent" 
							onPress={() => {this.toggleDone()}}>
							<Text>{!params.project.done && "Mark"} Done</Text></Icon.Button>}
		  			</View>
					<View style={{alignItems:'center', marginBottom:15}}>
					  	{params.project.linkedin && <Icon.Button name="linkedin"
							color="blue"
							backgroundColor="white"
							onPress={() => {Linking.openURL(params.project.linkedin)}}>
							<Text>LinkedIn</Text></Icon.Button>}
					</View>
					<Text>
						{params.project.description}
					</Text>
					<View style={{height:30}}></View> {/* some additional padding */}
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
	center:{
		textAlign:'center'
	},
	projectPage: {
		padding:20
	},
	buttonHold:{
		flexDirection: 'row',
		width:300,
		alignItems:'center'	
	},
	button: {
		width:140,
		margin:10,
		backgroundColor: 'white',
	},
});

export default IndividualProjectScreen; 