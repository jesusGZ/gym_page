import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';

import {exerciseOptions, fetchData, youtubeOptions} from '../utils/fetchData';
import SimilarExercises from '../components/SimilarExercises';
import ExerciseVideos from '../components/ExerciseVideos';
import {EXERCISE_HOST, YOUTUBE_HOST} from '../constants';
import Detail from '../components/Detail';

const ExerciseDetail = () => {
	const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
	const [equipmentExercises, setEquipmentExercises] = useState([]);
	const [exerciseDetail, setExerciseDetail] = useState({});
	const [exerciseVideos, setExerciseVideos] = useState([]);
	const {id} = useParams();

	useEffect(() => {
		window.scrollTo({top: 0, behavior: 'smooth'});

		const fetchExercisesData = async () => {
			const exerciseDbUrl = EXERCISE_HOST;
			const youtubeSearchUrl = YOUTUBE_HOST;

			const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
			setExerciseDetail(exerciseDetailData);

			const exerciseVideosData = await fetchData(
				`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
				youtubeOptions
			);
			setExerciseVideos(exerciseVideosData.contents);

			const targetMuscleExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
				exerciseOptions
			);
			setTargetMuscleExercises(targetMuscleExercisesData);

			const equimentExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
				exerciseOptions
			);
			setEquipmentExercises(equimentExercisesData);
		};

		fetchExercisesData();
	}, [id]);

	if (!exerciseDetail) return <div>No Data</div>;

	return (
		<Box sx={{mt: {lg: '96px', xs: '60px'}}}>
			<Detail exerciseDetail={exerciseDetail} />
			<ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
			<SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
		</Box>
	);
};

export default ExerciseDetail;
