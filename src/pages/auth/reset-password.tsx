import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';
import splashing from '../../assets/splashing.svg';
import back from '../../assets/back.svg';
import authicon from '../../assets/authicon.svg';
import awesome from '../../assets/awesome.svg';
import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import { PasswordInput } from './register';

const Verified = () => {
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<Image src={awesome} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>Password Successfully Created!</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						You’ve successfully created a new password for <br /> your
						authentications
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
							onClick={() => console.log('s')}
						>
							Proceed to Dashboard
						</Button>
					</Stack>
				</Flex>
			</Stack>
		</>
	);
};
const Form2 = ({
	password,
	confirmPassword,
	onChange,
	isSubmitting,
	handleSubmit,
	setStep,
}: {
	password: string;
	confirmPassword: string;
	onChange: (e: ChangeEvent) => void;
	isSubmitting: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleSubmit: any;
	setStep: (num: number) => void;
}) => {
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<Image src={authicon} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>Reset Password</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						Create a new password for your authentications
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<form onSubmit={handleSubmit}>
						<Stack minW={'30vw'} gap={3}>
							<PasswordInput
								label='Create Password'
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

							<Button
								loadingText='Submitting'
								size='lg'
								bg='#825EE4'
								color={'white'}
								type='submit'
								isDisabled={isSubmitting}
								isLoading={isSubmitting}
								mt={6}
								onClick={() => setStep(2)}
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

export const ResetPasswordPage = () => {
	const [step, setStep] = useState(1);
	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		async onSubmit(values) {
			console.log(values);
			setStep(3);
		},
	});

	return (
		<>
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
					{step === 1 ? (
						<Form2
							confirmPassword={formik.values.confirmPassword}
							password={formik.values.password}
							onChange={formik.handleChange}
							handleSubmit={formik.handleSubmit}
							isSubmitting={formik.isSubmitting}
							setStep={setStep}
						/>
					) : (
						<Verified />
					)}
				</GridItem>
			</Grid>
		</>
	);
};
