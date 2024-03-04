import {
	Button,
	Card,
	CardBody,
	Center,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	HStack,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	PinInput,
	PinInputField,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import welcome from '../../assets/welcome.svg';
import splashing from '../../assets/splashing1.svg';
import back from '../../assets/back.svg';
import authicon from '../../assets/authicon.svg';
import person from '../../assets/person.svg';
import group from '../../assets/group.svg';
import awesome from '../../assets/awesome.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AccountTypeCard = ({
	icon,
	title,
	description,
	isActive,
	setStep,
}: {
	icon: string;
	title: string;
	description: string;
	isActive?: boolean;
	setStep: (num: number) => void;
}) => {
	return (
		<>
			<Card
				p={5}
				cursor={'pointer'}
				borderColor={'#825EE4'}
				borderWidth={isActive ? '1px' : 'none'}
				onClick={() => setStep(2)}
			>
				<CardBody>
					<Flex flexDir={'column'} alignItems={'center'}>
						<Image src={icon} />
						<Text fontWeight={'bold'} fontSize={'sm'}>
							{title}
						</Text>
						<Text fontSize={'xs'}>{description}</Text>
					</Flex>
				</CardBody>
			</Card>
			;
		</>
	);
};

export const PasswordInput = ({
	name,
	label,
	value,
	onChange,
}: {
	name: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent) => void;
}) => {
	const [show, setShow] = useState(false);
	return (
		<FormControl>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<InputGroup>
				<Input
					id={name}
					name={name}
					type={show ? 'text' : 'password'}
					value={value}
					onChange={onChange}
					placeholder='Your Password'
				/>
				<InputRightElement onClick={() => setShow(!show)}>
					{show ? <FiEye /> : <FiEyeOff />}
				</InputRightElement>
			</InputGroup>
		</FormControl>
	);
};
const Form1 = ({ setStep }: { setStep: (num: number) => void }) => {
	const isLessThan700 = useMediaQuery('(max-width: 750px)');
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<Image boxSize={'40%'} src={authicon} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'} fontSize={isLessThan700 ? 'sm' : 'md'}>
						How do you intend to use this platform?
					</Text>
					<Text>We ask just so we fit the experience to your needs.</Text>
				</Flex>
				<Flex justify={'center'} gap={3} flexWrap={'wrap'}>
					<AccountTypeCard
						icon={person}
						title='As a Merchant'
						description='Here to Reward my customers'
						key={'As a Merchant'}
						isActive={true}
						setStep={setStep}
					/>
					<AccountTypeCard
						icon={group}
						title='As a Brand'
						description='Here to Sell Vouchers/Rewards'
						key={'As a Brand'}
						setStep={setStep}
					/>
				</Flex>
			</Stack>
		</>
	);
};

const Form2 = ({
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
					<Image src={authicon} />
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
								<Link color={'#825EE4'}>Terms</Link> and{' '}
								<Link color={'#825EE4'}>Conditions</Link>
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

const Form3 = ({ setStep }: { setStep: (num: number) => void }) => {
	const [value, setValue] = useState('');
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<Image src={authicon} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>OTP Verification</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						Kindly Input the 4 digit OTP code shared in your email
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<Stack minW={'30vw'} gap={3}>
						<HStack alignContent={'center'} justify={'center'}>
							<PinInput otp value={value} onChange={(val) => setValue(val)}>
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
							</PinInput>
						</HStack>
						<Text textAlign={'center'} fontSize={'sm'}>
							Didn't get the code?{' '}
							<Link color={'#825EE4'}> Click to resend.</Link>
						</Text>
						<Button
							loadingText='Submitting'
							size='lg'
							bg='#825EE4'
							color={'white'}
							type='submit'
							isDisabled={value.length < 4}
							isLoading={false}
							mt={6}
							onClick={() => setStep(4)}
						>
							Proceed
						</Button>
					</Stack>
				</Flex>
			</Stack>
		</>
	);
};

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

export const SignUpPage = () => {
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
		}, 2000);
	});
	return (
		<>
			{isloading ? (
				<Center bgColor={'#825EE4'}>
					<Image src={welcome} boxSize={'85%'} alt='Welcome' />
				</Center>
			) : (
				<Grid
					minH='90vh'
					templateColumns='repeat(4, 1fr)'
					gap={0}
					color={'white'}
				>
					<GridItem colSpan={1} py={1} bgColor={'#825EE4'}>
						<Image src={splashing} boxSize={'85%'} alt='splash screen' />
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
