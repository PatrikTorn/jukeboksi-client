import { ENDPOINT, createActionPointers} from '../tools/actionTools';

export const actions = createActionPointers([
	`SET_APP_STATE`,
	`SEARCH_SONG`,
	`SEARCH_RELATED_VIDEOS`,
	`UPDATE_PLAYLIST`
]);

export const setAppState = payload => ({
    type: actions.SET_APP_STATE.NAME,
    payload
});

export const updatePlaylist = payload => ({
    type: actions.UPDATE_PLAYLIST.NAME,
    payload
});

export const searchSong = search => async dispatch => {
		// https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=5rOiW_xY-kc&type=video&key=AIzaSyAcu5ChMhKE9-XJnbs1lWZ5yoYwROdmirA
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
