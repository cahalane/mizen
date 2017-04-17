import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Platform,
} from 'react-native';
import { connect, Provider } from 'react-redux';
import NearbyRoomInfo from './RoomInfo';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { ProjectList, AllProjectsList } from './ProjectList';
import RoomList from './RoomList';
import IndividualProjectScreen from './IndividualProjectScreen';
import IndividualRoomScreen from './IndividualRoomScreen';
import {StackNavigator} from 'react-navigation';
import Spacing from './Spacing';
import KeyboardSpacer from 'react-native-keyboard-spacer';

// Screen that handles Nearby
class NearbyScreen extends Component {
    static navigationOptions = {
        title: "Nearby Projects"
    };
    render(){
      return (
            <Provider store={this.props.screenProps.store}>
                <NearbyRoomInfo
                    style={styles.page}
                    navigation={this.props.navigation}/>
            </Provider>
        );
    }
}

// Screen that handles All Projects
class AllProjectsScreen extends Component {
    static navigationOptions = {
        title: "All Projects"
    };
    render(){
      return (
            <Provider store={this.props.screenProps.store}>
                <AllProjectsList navigation={this.props.navigation} />
            </Provider>
        );
    }
}

// Screen that handles the RoomList
class RoomListScreen extends Component {
    static navigationOptions = {
        title: "All Rooms"
    };
    render(){
      return (
            <Provider store={this.props.screenProps.store}>
                <RoomList navigation={this.props.navigation} />
            </Provider>
        );
    }
}

// Nav for navigating from Nearby to Individual Projects
const NearbyNav = StackNavigator( {
  Nearby: { screen: NearbyScreen },
  IndividualProject: { screen: IndividualProjectScreen }
} );

// Nav for navigating from All Projects to Individual Projects
const AllProjectsNav = StackNavigator( {
  AllProjects: { screen: AllProjectsScreen },
  IndividualProject: { screen: IndividualProjectScreen }
} );

// Nav for navigating from All Rooms to Rooms to Individual Projects
const AllRoomsNav = StackNavigator( {
  AllRooms: { screen: RoomListScreen },
  IndividualRoom: { screen: IndividualRoomScreen },
  IndividualProject: { screen: IndividualProjectScreen }
} );


export class Tabs extends Component{
    state = { // We must manually manage this state
        index: 0,
        routes: [
          { key: '1', title: 'Projects' },
          { key: '2', title: 'Nearby' },
          { key: '3', title: 'Rooms' },
        ],
    };

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderHeader = (props) => {
        return <TabBar {...props} />;
    };

    _renderScene = ({ route }) => {
      switch (route.key) {
        case '1':
          return ( // Projects
            <AllProjectsNav style={styles.stackNav} 
                    screenProps={this.props} />
          );  
        case '2':
          return ( // Nearby
            <NearbyNav style={styles.stackNav}
                   screenProps={this.props} />
          );
        case '3':
          return ( //Rooms
            <AllRoomsNav style={styles.stackNav}
                   screenProps={this.props} />
          );
        default:
          return null;
      }
    };

    render() {
        return (
            <View style={styles.container}>
                <Spacing />
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                    />
                <KeyboardSpacer />
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stackNav:{
    ...Platform.select({
        ios: {
            marginTop: -20, // Status bar spacing
        },                  // should use lib to monitor this!
      android: {},
    }),
    flex:1
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Tabs;