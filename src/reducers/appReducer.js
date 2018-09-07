import {actions} from '../actions/appActions';
const initialStore = {
  song:[],
  playlist:[],
  connections:0,
  showSearch:false,
  rooms:[],
  room:""
}

export const appReducer = (store = initialStore, {type, payload}) => {
    switch(type) {
        case actions.SET_APP_STATE.NAME:
            return {...store, ...payload}
        case actions.SEARCH_SONG.FULFILLED:
          return {...store, song:payload}
        case actions.SEARCH_RELATED_VIDEOS.FULFILLED:
          return {...store, song:payload, showSearch:true}
        case actions.UPDATE_PLAYLIST.NAME:
          return {...store, playlist:payload}
        default:
            return store;
    }
};
