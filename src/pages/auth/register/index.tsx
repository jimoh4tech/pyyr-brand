import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	GridItem,
	Image,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import welcome from '../../../assets/welcome.svg';
import splashing from '../../../assets/splashing1.svg';
import back from '../../../assets/back.svg';
import awesome from '../../../assets/awesome.svg';
import pyyr from '../../../assets/pyyr.svg';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form1, Form2, Form3 } from './Forms';

const Verified = () => {
	const navigate = useNavigate();
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<Image src={awesome} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>Account Verified!</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						We’ve Successfully Verified your Account
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<Stack minW={'30vw'} gap={3}>
						<Button
							loadingText='Submitting'
							size='lg'
							bg='#825EE4'
							color={'white'}
							mt={6}
							onClick={() => navigate('/	')}
						>
							Proceed to Dashboard
						</Button>
					</Stack>
				</Flex>
			</Stack>
		</>
	);
};

export const RegistrationPage = () => {
	const [isLessThan700] = useMediaQuery('(max-width: 700px)');

	const [isloading, setLoading] = useState(true);
	const [step, setStep] = useState(1);
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		async onSubmit(values) {
			console.log(values);
			setStep(3);
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
							<Image
								onClick={() => (step > 1 ? setStep(step - 1) : null)}
								cursor={'pointer'}
								boxSize={'50px'}
								src={back}
							/>
							<Image
								boxSize={'70px'}
								src={pyyr}
								alt='pyyr'
								display={isLessThan700 ? 'block' : 'none'}
							/>
							<Box />
						</Stack>
						{step === 1 ? (
							<Form1 setStep={setStep} />
						) : step === 2 ? (
							<Form2
								name={formik.values.name}
								email={formik.values.email}
								confirmPassword={formik.values.confirmPassword}
								password={formik.values.password}
								onChange={formik.handleChange}
								handleSubmit={formik.handleSubmit}
								isSubmitting={formik.isSubmitting}
							/>
						) : step === 3 ? (
							<Form3 setStep={setStep} />
						) : (
							<Verified />
						)}
					</GridItem>
				</Grid>
			)}
		</>
	);
};
