import {YOUTUBE_HOST, EXERCISE_HOST, YOUTUBE_API_KEY} from '../constants';

export const exerciseOptions = {method: 'GET', headers: {'X-RapidAPI-Host': EXERCISE_HOST, 'X-RapidAPI-Key': EXERCISE_API_KEY}};
export const youtubeOptions = {method: 'GET', headers: {'X-RapidAPI-Host': YOUTUBE_HOST, 'X-RapidAPI-Key': YOUTUBE_API_KEY}};

export const fetchData = async (url, options) => {
	const res = await fetch(url, options);
	const data = await res.json();
	return data;
};
