import { combineReducers } from 'redux';
import {appReducer} from './appReducer';
import io from 'socket.io-client';
const ENDPOINT = 'https://musaservu.herokuapp.com/';
const LOCALHOST = 'http://localhost:5000';
const socket = io(LOCALHOST);

const rootReducer = combineReducers({
    app: appReducer,
    socket: () => socket
});

export default rootReducer;
