import {
	Box,
	Button,
	Center,
	Checkbox,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Image,
	Input,
	InputGroup,
	Link,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import welcome from '../../assets/welcome.svg';
import splashing from '../../assets/splashing1.svg';
import back from '../../assets/back.svg';
import pyyr from '../../assets/pyyr.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { PasswordInput } from './password-input';

const LoginForm = ({
	name,
	email,
	password,
	confirmPassword,
	onChange,
	isSubmitting,
	handleSubmit,
}: {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	onChange: (e: ChangeEvent) => void;
	isSubmitting: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleSubmit: any;
}) => {
	const [isChecked, setChecked] = useState(false);
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<CircularProgress value={67} size={'100px'} color='#825ee4'>
						<CircularProgressLabel fontSize={'sm'}>
							2 of 3
						</CircularProgressLabel>
					</CircularProgress>
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>Welcome to Pyyr</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						You’re about to have the best experience. First, lets <br />
						create an account
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<form onSubmit={handleSubmit}>
						<Stack minW={'30vw'} gap={3}>
							<FormControl>
								<FormLabel htmlFor={'name'}>{'Brand Name'}</FormLabel>
								<InputGroup>
									<Input
										id={'name'}
										name={'name'}
										type='text'
										value={name}
										onChange={onChange}
										placeholder='Enter Brand'
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor={'email'}>{'Email Address'}</FormLabel>
								<InputGroup>
									<Input
										id={'email'}
										name={'email'}
										type='email'
										value={email}
										onChange={onChange}
										placeholder='Enter Email'
									/>
								</InputGroup>
							</FormControl>
							<PasswordInput
								label='Password'
								name='password'
								value={password}
								onChange={onChange}
							/>
							<PasswordInput
								label='Confirm Password'
								name='confirmPassword'
								value={confirmPassword}
								onChange={onChange}
							/>
							<Checkbox
								size={'sm'}
								fontSize={'xs'}
								onChange={() => setChecked(!isChecked)}
							>
								By signing up you agree to our{' '}
								<Link color={'#825EE4'}>Terms & Conditions </Link> and{' '}
								<Link color={'#825EE4'}>Privacy</Link>
							</Checkbox>
							<Button
								loadingText='Submitting'
								size='lg'
								bg='#825EE4'
								color={'white'}
								type='submit'
								isDisabled={!isChecked}
								isLoading={isSubmitting}
								mt={6}
							>
								Proceed
							</Button>
						</Stack>
					</form>
				</Flex>
			</Stack>
		</>
	);
};

export const SignInPage = () => {
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
						<LoginForm
							name={formik.values.name}
							email={formik.values.email}
							confirmPassword={formik.values.confirmPassword}
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
