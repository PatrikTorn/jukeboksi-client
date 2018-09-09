import { combineReducers } from 'redux';
import {appReducer} from './appReducer';
import {roomReducer} from './roomReducer';
import {videoReducer} from './videoReducer';
import io from 'socket.io-client';
const ENDPOINT = 'https://musaservu.herokuapp.com/';
const LOCALHOST = 'http://localhost:5000';
const socket = io(ENDPOINT);

const rootReducer = combineReducers({
    app: appReducer,
    room: roomReducer,
    video: videoReducer,
    socket: () => socket
});

export default rootReducer;
