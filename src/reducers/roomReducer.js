import {actions} from '../actions/roomActions';
const initialStore = {
  rooms:[],
  room:null
}

export const roomReducer = (store = initialStore, {type, payload}) => {
    switch(type) {
      case actions.GET_ROOM_CONNECTIONS.NAME:
        return {...store, rooms:store.rooms.map(r => r.room === payload.room ? {...r, connections:payload.connections} : r)}
      case actions.GET_ROOM_PLAYLIST.NAME:
        return {...store, rooms:store.rooms.map(r => r.room === payload.room ? {...r, playlist:payload.playlist} : r)}
      case actions.GET_ROOMS.NAME:
        return {...store, rooms:payload}
      case actions.CREATE_ROOM.FULFILLED:
        return {...store, room:payload.room}
      case actions.JOIN_ROOM.NAME:
        return {...store, room:payload}
      case actions.EXIT_ROOM.NAME:
        return {...store, room:null}
        default:
            return store;
    }
};
