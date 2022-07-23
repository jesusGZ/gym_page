import {InfinitySpin} from 'react-loader-spinner';
import {Stack} from '@mui/material';
import React from 'react';

const Loader = () => (
	<Stack direction='row' justifyContent='center' alignItems='center' width='100%'>
		<InfinitySpin color='grey' />
	</Stack>
);

export default Loader;
