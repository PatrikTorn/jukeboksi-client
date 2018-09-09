import { ENDPOINT, createActionPointers} from '../tools/actionTools';
import {arraysEqual} from '../tools/commonTools';
import { arrayMove} from 'react-sortable-hoc';

export const actions = createActionPointers([
	`SET_APP_STATE`,
	`SEARCH_SONG`,
	`SHOW_SEARCH`,
	`HIDE_SEARCH`,
	`SET_SONG`,
	`ADD_SONG`,
	`DELETE_SONG`,
	`SEARCH_RELATED_VIDEOS`,
	`GET_PLAYLIST`,
	`GET_CONNECTIONS`,
	`SORT_PLAYLIST`
]);

export const getPlaylist = (list) => ({
  type: actions.GET_PLAYLIST.NAME,
  payload:list
});

export const sortPlaylist = ({oldIndex, newIndex}) => (dispatch, getState) => {
	dispatch({
		type:actions.SORT_PLAYLIST.NAME,
		payload:arrayMove(getState().app.playlist, oldIndex, newIndex)
	})
	getState().socket.emit('sort songs', getState().app.playlist);
};

export const addSong = (songDetails) => (dispatch, getState) => {
	dispatch({
		type:actions.ADD_SONG.NAME,
		payload:{showSearch:false, search:""}
	});
	getState().socket.emit('add song', songDetails)
}

export const deleteSong = (id) => (dispatch, getState) => {
	getState().socket.emit('delete song', id);
}

export const getConnections = (conns) => ({
	type:actions.GET_CONNECTIONS.NAME,
	payload:conns
});


export const searchSong = search => async dispatch => {
	dispatch({
			type:actions.SET_SONG.NAME,
			payload:search
		})
		// Only music: &topicId=/m/06by7
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&type=video&key=AIzaSyAcu5ChMhKE9-XJnbs1lWZ5yoYwROdmirA`;
		try {
			const request = await fetch(url);
			const videos = await request.json();
			const songs = videos.items.filter(s => s.id.videoId);
			dispatch({
				type:actions.SEARCH_SONG.FULFILLED,
				payload:songs
			});
		}catch(e){
			console.log(e);
		}
  }

	export const hideSearch = () => ({
		type:actions.HIDE_SEARCH.NAME
	});

	export const showSearch = () => ({
		type:actions.SHOW_SEARCH.NAME
	});

export const searchRelatedVideos = id => async dispatch => {
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=AIzaSyAcu5ChMhKE9-XJnbs1lWZ5yoYwROdmirA&maxResults=25`;
	console.log(url);
	try{
		const request = await fetch(url);
		const videos = await request.json();
		const songs = videos.items.filter(s => s.id.videoId);
		dispatch({
			type:actions.SEARCH_RELATED_VIDEOS.FULFILLED,
			payload:songs
		});
	}catch(e){
		console.log(e);
	}
}
