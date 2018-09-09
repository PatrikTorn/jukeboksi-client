import { ENDPOINT, createActionPointers} from '../tools/actionTools';

export const actions = createActionPointers([
	`SET_VOLUME`,
  `TOGGLE_FULLSCREEN`
]);

export const setVolume = (volume) => ({
	type:actions.SET_VOLUME.NAME,
	payload:volume
});

export const toggleFullScreen = () => ({
	type:actions.TOGGLE_FULLSCREEN.NAME
});
