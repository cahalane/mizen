import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  Alert,
  AsyncStorage
} from 'react-native';
import Beacons from 'react-native-beacons-manager';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

var defaultState = {
  "beacons" : [],
  "projects" : [],
  "rooms" : [],
  "nearbyRooms": []
}

async function updatePersistentStore(id, todo){
  if(todo === "save" || todo === "unsave"){
    let savedProjects = [];
    try {
      s = await AsyncStorage.getItem('savedProjects');
      if(s != null){
        savedProjects = JSON.parse(s);
      }
    } catch(error) {}
    if( todo === "save" && !savedProjects.includes(id) ){
      savedProjects.push(id);
    } else if(todo === "unsave" && savedProjects.includes(id)){
      let index = savedProjects.indexOf(id);
      savedProjects.splice(index, 1);
    }
    try {
      AsyncStorage.setItem('savedProjects', JSON.stringify(savedProjects));
    } catch(error) {}
  }
  if(todo === "done" || todo === "undone"){
    let doneProjects = [];
    try {
      s = await AsyncStorage.getItem('doneProjects');
      if(s != null){
        doneProjects = JSON.parse(s);
      }
    } catch(error) {}
    if( todo === "done" && !doneProjects.includes(id) ){
      doneProjects.push(id);
    } else if(todo === "undone" && doneProjects.includes(id)){
      let index = doneProjects.indexOf(id);
      doneProjects.splice(index, 1);
    }
    try {
      AsyncStorage.setItem('doneProjects', JSON.stringify(doneProjects));
    } catch(error) {}
  }
}

function state(state = defaultState, action) {
  switch (action.type) {
    case 'BEACONS_UPDATE':
      action.projects = state.projects;
      action.rooms = state.rooms;
      action.nearbyRooms = [];
      for(i in action.beacons){
        for(j in action.rooms){
          if(action.rooms[j].minor_number === action.beacons[i].minor){
            if(!action.nearbyRooms.includes(action.rooms[j])){
              action.nearbyRooms.push(action.rooms[j]);
            }
            break;
          }
        }
      }
      return action
    case 'PROJECT_CHANGE_STATUS':
      id = action.projectID;
      todo = action.todo;
      action = state;
      for(i in action.projects){
        if(action.projects[i].id === id){
          switch(todo){
            case 'save':
              action.projects[i].saved = true;
              break;
            case 'unsave':
              action.projects[i].saved = false;
              break;
            case 'done':
              action.projects[i].done = true;
              break;
            case 'undone':
              action.projects[i].done = false;
              break;
            default:
              break;
          }
          break;
        }
      }
      setTimeout(function(){updatePersistentStore(id, todo)}, 1);
      return action
    case 'PROJECTS_UPDATE':
      for(i in action.projects){
        action.projects[i].changeStatus = function(todo){
          store.dispatch({type:'PROJECT_CHANGE_STATUS', projectID: this.id, todo:todo});
        }
      }
      action.beacons = state.beacons;
      action.rooms = state.rooms;
      action.nearbyRooms = state.nearbyRooms;
      return action;
    case 'ROOMS_UPDATE':
      action.beacons = state.beacons;
      action.projects = state.projects;
      action.nearbyRooms = state.nearbyRooms;
      for(i in action.beacons){
        for(j in action.rooms){
          if(action.rooms[j].minor_number === action.beacons[i].minor){
            if(!action.nearbyRooms.includes(action.rooms[j])){
              action.nearbyRooms.push(action.rooms[j]);
            }
            break;
          }
        }
      }
      return action
    default:
      return state
  }
}

store = createStore(state);
export default store;