import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	DeviceEventEmitter,
	TouchableOpacity,
	Platform
} from 'react-native';
import { connect, Provider } from 'react-redux';
import ProjectRowItem from './ProjectRowItem';
import SearchBar from 'react-native-searchbar';

export class ProjectList extends Component{
	constructor(props){
		super(props);
		this.state = {};

		this.showSearchBar = true;
		if(typeof props.showSearchBar !== "undefined"){
			this.showSearchBar = props.showSearchBar;
		}

		this.ListViewStyle = {};
		if(this.showSearchBar){
			this.ListViewStyle.marginTop = 62;
		}
	}

	_getDS(){
		if(typeof this.state.ds2 !== "undefined"){
			return this.state.ds2;
		}
		return this.props.ds;
	}

	_handleResults(results){
		this.state.ds2 = this.props.ds.cloneWithRows(results);
		this.state.results = results;
	}

	render() {
		const { navigate } = this.props.navigation;
			return (
				<View>
					<ListView
						style={this.ListViewStyle}
						enableEmptySections={true}
						dataSource={this._getDS()}
						renderRow={(rowData) => <ProjectRowItem
													project={rowData}
													callOnClick={(project) => navigate('IndividualProject', { project: project })} />
					} />
					{this.showSearchBar && <SearchBar
						ref={(ref) => this.searchBar = ref}
  						data={this.props.projects}
  						focusOnLayout={false}
						allDataOnEmptySearch={true}
						handleResults={(results) => this._handleResults(results)}
						showOnLoad={this.showSearchBar}
						hideBack={true}
						iOSPadding={false}
						style={{margin: 10}}
					/>}
				</View>
			);
	}

}

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