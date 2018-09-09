import {actions} from '../actions/appActions';
import {actions as roomActions} from '../actions/roomActions';
const initialStore = {
  song:[],
  search:"",
  playlist:[],
  connections:0,
  showSearch:false
}

export const appReducer = (store = initialStore, {type, payload}) => {
    switch(type) {
        case actions.SET_APP_STATE.NAME:
            return {...store, ...payload}

        case actions.SET_SONG.NAME:
          return {...store, search:payload}

        case actions.ADD_SONG.NAME:
          return {...store, ...payload}

        case actions.SORT_PLAYLIST.NAME:
          return {...store, playlist:payload}

        case actions.SEARCH_SONG.FULFILLED:
          return {...store, song:payload}

        case actions.SHOW_SEARCH.NAME:
          return {...store, showSearch:true}

        case actions.HIDE_SEARCH.NAME:
          return {...store, showSearch:false, search:""}

        case actions.SEARCH_RELATED_VIDEOS.FULFILLED:
          return {...store, song:payload, showSearch:true}

        case actions.GET_PLAYLIST.NAME:
          return {...store, playlist:payload}

        case actions.GET_CONNECTIONS.NAME:
          return {...store, connections:payload}

        case roomActions.CREATE_ROOM.FULFILLED:
          return {...store, connections:payload.connections}

        case roomActions.EXIT_ROOM.NAME:
          return {...store, playlist:[]}
        default:
            return store;
    }
};
