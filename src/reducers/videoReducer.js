import {actions} from '../actions/videoActions';

const initialStore = {
  fullScreen:false,
  volume:50
}

export const videoReducer = (store = initialStore, {type, payload}) => {
    switch(type) {
      case actions.SET_VOLUME.NAME:
        return {...store, volume:payload}
      case actions.TOGGLE_FULLSCREEN.NAME:
        return {...store, fullScreen: !store.fullScreen}
      default:
          return store;
    }
};
