import {
	AspectRatio,
	Box,
	Button,
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
} from '@chakra-ui/react';
import welcome from '../../assets/welcome.svg';
import splashing from '../../assets/splashing.svg';
import back from '../../assets/back.svg';
import authicon from '../../assets/authicon.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { PasswordInput } from './register';

const Form2 = ({
	email,
	password,
	onChange,
	isSubmitting,
	handleSubmit,
}: {
	email: string;
	password: string;
	onChange: (e: ChangeEvent) => void;
	isSubmitting: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleSubmit: any;
}) => {
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<Image src={authicon} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>Welcome Back!</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						Kindly provide your login credentials to gain access <br /> to the system
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<form onSubmit={handleSubmit}>
						<Stack minW={'30vw'} gap={3}>
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
							<Flex justify={'flex-end'}>
								<Link color={'#825EE4'} fontSize={'sm'} href='/forgot-password'>Forgot Password?</Link>
							</Flex>
							<Button
								loadingText='Submitting'
								size='lg'
								bg='#825EE4'
								color={'white'}
								type='submit'
								isDisabled={isSubmitting}
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
	const [isloading, setLoading] = useState(true);
	const [step, setStep] = useState(1);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		async onSubmit(values) {
			console.log(values);
			setStep(3);
		},
	});

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	});
	return (
		<>
			{isloading ? (
				<AspectRatio>
					<Image src={welcome} boxSize={'90vh'} alt='Welcome' />
				</AspectRatio>
			) : (
				<Grid h='90vh' templateColumns='repeat(4, 1fr)' gap={0} color={'white'}>
					<GridItem colSpan={1} py={1}>
						<Box>
							<Image src={splashing} alt='splash screen' />
						</Box>
					</GridItem>
					<GridItem colSpan={3} bg='white' p={10} gap={4}>
						<Stack>
							<Flex
								onClick={() => (step > 1 ? setStep(step - 1) : null)}
								cursor={'pointer'}
							>
								<Image src={back} />
							</Flex>
						</Stack>
						<Form2
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
