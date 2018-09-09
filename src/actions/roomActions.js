import { ENDPOINT, createActionPointers} from '../tools/actionTools';
import {arraysEqual} from '../tools/commonTools';

export const actions = createActionPointers([
	`CREATE_ROOM`,
	`JOIN_ROOM`,
	`GET_ROOM_CONNECTIONS`,
	`GET_ROOM_PLAYLIST`,
	`GET_ROOMS`,
	`EXIT_ROOM`
]);


export const createRoom = (name) => (dispatch, getState) => {
  const socket = getState().socket;
  const {rooms}= getState().room;
  const payload = new Promise((resolve, reject) => {
    if(name === ""){
      reject("Anna huoneelle nimi");
    }else if(rooms.map(r => r.room).includes(name)) {
      reject("Tämän niminen huone on jo olemassa");
    }else{
      resolve({room:name, connections:['me'], playlist:[]});
    }
  });
  socket.emit('create room', name);
  return dispatch({
    type:actions.CREATE_ROOM.NAME,
    payload
  });
}

export const joinRoom = (room) => (dispatch, getState) => {
  localStorage.setItem('room', room);
	dispatch({
		type:actions.JOIN_ROOM.NAME,
		payload:room
	});
  getState().socket.emit('join room', room);
}

export const exitRoom = () => (dispatch, getState) => {
   localStorage.removeItem('room');
   getState().socket.emit('exit room', getState().room.room);
	 dispatch({
		 type:actions.EXIT_ROOM.NAME
	 });
}

export const getRoomConnections = (room, connections) => ({
	type:actions.GET_ROOM_CONNECTIONS.NAME,
	payload:{room, connections}
})


export const getRoomPlaylist = (room, playlist) => (dispatch, getState) => {
	const rooms = getState().room.rooms;
  const index = rooms.findIndex(r => r.room === room);
  if(index !== -1 && rooms[index].playlist.length !== playlist.length){
		dispatch({
			type:actions.GET_ROOM_PLAYLIST.NAME,
			payload:{room, playlist}
		});
  }
}

export const getRooms = (rooms) => (dispatch, getState) => {
	dispatch({
		type:actions.GET_ROOMS.NAME,
		payload:rooms
	});

  if(!getState().room.room){
    let room = localStorage.getItem('room');
    rooms.map(r => {
      if(room === r.room){
        joinRoom(room);
      }
    });
  }
}
