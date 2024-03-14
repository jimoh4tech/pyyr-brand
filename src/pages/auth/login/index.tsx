import {
	Box,
	Center,
	Grid,
	GridItem,
	Image,
	Stack,
	useMediaQuery,
} from '@chakra-ui/react';
import welcome from '../../../assets/welcome.svg';
import splashing from '../../../assets/splashing1.svg';
import back from '../../../assets/back.svg';
import pyyr from '../../../assets/pyyr.svg';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { LoginForm } from './form';

export const LoginPage = () => {
	const [isLessThan700] = useMediaQuery('(max-width: 700px)');

	const [isloading, setLoading] = useState(true);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		async onSubmit(values) {
			console.log(values);
		},
	});

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	});
	return (
		<>
			{isloading ? (
				<Center bgColor={'#825EE4'}>
					<Image h={'96vh'} src={welcome} alt='Welcome' />
				</Center>
			) : (
				<Grid
					templateColumns={`repeat(${isLessThan700 ? 3 : 4}, 1fr)`}
					gap={0}
					color={'white'}
					bgColor={'#825EE4'}
				>
					<GridItem
						colSpan={1}
						bgColor={'#825EE4'}
						display={isLessThan700 ? 'none' : 'block'}
						justifyContent={'center'}
					>
						<Image h={'97vh'} src={splashing} alt='splash screen' />
					</GridItem>
					<GridItem
						colSpan={3}
						bg={'white'}
						p={isLessThan700 ? 2 : 10}
						color={'black'}
					>
						<Stack
							direction={'row'}
							mb={10}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<Image cursor={'pointer'} boxSize={'50px'} src={back} />
							<Image
								boxSize={'70px'}
								src={pyyr}
								alt='pyyr'
								display={isLessThan700 ? 'block' : 'none'}
							/>
							<Box />
						</Stack>
						<LoginForm
							email={formik.values.email}
							password={formik.values.password}
							onChange={formik.handleChange}
							handleSubmit={formik.handleSubmit}
							isSubmitting={formik.isSubmitting}
						/>
					</GridItem>
				</Grid>
			)}
		</>
	);
};
