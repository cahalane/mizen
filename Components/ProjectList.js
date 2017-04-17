import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	DeviceEventEmitter,
	TouchableOpacity,
	Platform,
	Button
} from 'react-native';
import { connect, Provider } from 'react-redux';
import ProjectRowItem from './ProjectRowItem';
import SearchBar from 'react-native-searchbar';


export class ProjectList extends Component{
	constructor(props){
		super(props);
		this.state = {};
		this.state.results = props.projects;

		// if a DataSource isn't provided, make one in state
		if(typeof props.ds === "undefined"){
			let datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.state.ds2 = datasource.cloneWithRows(props.projects);
		}

		this.showSearchBar = true;
		if(typeof props.showSearchBar !== "undefined"){
			//show searchbar unless told specifically not to
			this.showSearchBar = props.showSearchBar;
		}

		this.ListViewStyle = {flex:1};
		if(this.showSearchBar){
			// add space for searchbar if we have it!
			this.ListViewStyle.marginTop = 52;
		}
	}

	_getDS(){
		if(typeof this.state.ds2 !== "undefined"){
			return this.state.ds2;
		}
		return this.props.ds;
		// return normal datasource unless we have
		// search results or otherwise
	}

	_handleResults(results){
		// make a datasource with results and set it as the view's datasource
		this.setState({ds2: this.props.ds.cloneWithRows(results)});
		this.state.results = results; // store results for saveResults 
	}

	saveResults(){
		for(i in this.state.results){
			this.state.results[i].changeStatus('save');
		}
	}

	render() {
		const { navigate } = this.props.navigation;
			return (
				<View style={styles.container}>
					<ListView
						style={this.ListViewStyle}
						enableEmptySections={true}
						removeClippedSubviews = {false} 
						initialListSize={this.props.projects.length}
						dataSource={this._getDS()}
						renderRow={(rowData) => <ProjectRowItem
													project={rowData}
													callOnClick={(project) => navigate('IndividualProject', { project: project })} />
					} />
					{this.showSearchBar && 
						<SearchBar
							ref={(ref) => this.searchBar = ref}
	  						data={this.props.projects}
	  						focusOnLayout={false}
							allDataOnEmptySearch={true}
							handleResults={(results) => this._handleResults(results)}
							showOnLoad={this.showSearchBar}
							hideBack={true}
							iOSPadding={false}
						/>
					}
					{this.showSearchBar && this.state.results.length < this.props.projects.length &&
						<Button
							onPress={() => this.saveResults()}
							title="Add All To Saved Projects"
							accessibilityLabel="Add all these results to Saved Projects"
							/>
					}
				</View>
			);
	}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white'
  },
});


const mapStateToProps = (state, ownProps) => {
	let datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	props = {
		ds : datasource.cloneWithRows(state.projects),
		projects: state.projects
	}

	if(typeof ownProps.navigation !== "undefined"){
		props.navigation = ownProps.navigation;
	}

	return props;
}

export const AllProjectsList = connect(mapStateToProps)(ProjectList);
export default ProjectList;