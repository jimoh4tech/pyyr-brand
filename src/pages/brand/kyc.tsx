import {
	Button,
	Circle,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Input,
	InputGroup,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Progress,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
// import add from '../../assets/add.svg';

const NoConsentModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				onClick={onOpen}
				colorScheme='purple'
				size={'xs'}
				variant={'ghost'}
			>
				No, I do not give Consent
			</Button>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent gap={4}>
					<ModalHeader fontSize={'md'}>Mind Telling us Why?</ModalHeader>
					<ModalCloseButton />
					<Divider />
					<ModalBody gap={2}>
						<RadioGroup defaultValue='1' colorScheme='purple'>
							<Stack spacing={2}>
								<Radio size={'xs'} value='1'>
									I do not want my data to be saved
								</Radio>
								<Radio size={'xs'} value='2'>
									I do not want my data to be shared
								</Radio>
								<Radio size={'xs'} value='3'>
									My BVN might be at risk
								</Radio>
								<Radio size={'xs'} value='4'>
									Others
								</Radio>
							</Stack>
						</RadioGroup>
						<Stack>
							<Text fontSize={'xs'}>
								Kindly Provide your other reasons here
							</Text>
							<Textarea fontSize={'xs'} placeholder='Enter text here...' />
						</Stack>
					</ModalBody>
					<Divider />
					<ModalFooter>
						<Button size={'xs'} onClick={onClose} colorScheme='purple'>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const Form1 = ({ setStep }: { setStep: (num: number) => void }) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'xs'}>Consent</Heading>
					<Text fontSize={'xs'}>
						Kindly Read information carefully before agreeing to give your
						consent
					</Text>
					<Divider />
					<Flex p={5} bg={'#fbfbfb'}>
						<Text fontSize={'xs'}>
							I, [Account Holder Name], hereby provide Pyyr with my explicit
							consent to collect the following information: My name, BVN,
							official Government ID number, and photo image. <br />
							<br />I acknowledge that Pyyr may share this information with a
							third party for validation against a government source.
							<br /> <br />I am aware that Pyyr may utilize my ID number to
							gather additional data, including:
							<br />
							<ul>
								<li>Full Name</li>
								<li>Date of Birth</li>
								<li>Image</li>
								<li>Name Address</li>
								<li>Full Phone Number</li>
								<li>Gender</li>
								<li>Government ID Expiry Date</li>
								<li>
									Any other supplementary information associated with my ID
									number that the Issuing Authority may provide.
								</li>
							</ul>{' '}
							I understand that this data is utilized solely for identity
							verification purposes. Moreover, I acknowledge that this data may
							be processed or stored outside the borders of Nigeria, and I
							hereby grant my consent for such processing and storage. <br />
							<br /> If at any point I wish to alter my preferences, request
							edits or deletion of my data, or withdraw my consent, I understand
							that I must contact Pyyr directly.
						</Text>
					</Flex>
					<Divider />
					<Flex justifyContent={'flex-end'} gap={3}>
						<NoConsentModal />
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(2)}>
							Yes, I give Consent
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export const ItemCheck = ({
	label,
	value,
	step,
}: {
	label: string;
	value: number;
	step: number;
}) => {
	return (
		<>
			<Flex gap={3}>
				<Circle
					size={'15px'}
					border={'2px solid #825EE4'}
					bg={value > step ? 'white' : '#825EE4'}
				>
					{value < step && <IoCheckmarkSharp color={'white'} />}
				</Circle>{' '}
				{label}
			</Flex>
		</>
	);
};

const Form2 = ({ setStep }: { setStep: (num: number) => void }) => {
	const formik = useFormik({
		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			role: '',
			dob: '',
			type: '',
			idNumber: '',
		},
		async onSubmit(values) {
			console.log(values);
			setStep(3);
		},
	});
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<form onSubmit={formik.handleSubmit}>
					<Flex p={5} flexDir={'column'} gap={3}>
						<Heading fontSize={'xs'}>Key Contact Information</Heading>
						<Text fontSize={'xs'}>
							Kindly fill the field with required credentials
						</Text>
						<Divider />
						<Flex p={5} bg={'#fbfbfb'}>
							<Flex flexDir={'column'} gap={3} w={'100%'}>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'name'}>
										{'Name'}
									</FormLabel>
									<HStack>
										<Input
											id={'name'}
											name={'firstname'}
											type='text'
											w={'full'}
											size={'xs'}
											value={formik.values.firstname}
											onChange={formik.handleChange}
											placeholder='First Name'
										/>
										<Input
											id={'name'}
											name={'lastname'}
											type='text'
											w={'full'}
											size={'xs'}
											value={formik.values.lastname}
											onChange={formik.handleChange}
											placeholder='Last Name'
										/>
									</HStack>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'email'}>
										{'Email Address'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'email'}
											name={'email'}
											type='email'
											size={'xs'}
											value={formik.values.email}
											onChange={formik.handleChange}
											placeholder='Enter Email'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'phone'}>
										{'Phone Number'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'phone'}
											name={'phone'}
											type='phone'
											size={'xs'}
											value={formik.values.phone}
											onChange={formik.handleChange}
											placeholder='090908678000'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'role'}>
										{'Role'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'role'}
											name={'role'}
											type='text'
											size={'xs'}
											value={formik.values.role}
											onChange={formik.handleChange}
											placeholder='Enter your role in the company'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'role'}>
										{'Select ID'}
									</FormLabel>
									<Select size={'xs'} placeholder='Select option'>
										<option value='option1'>Option 1</option>
										<option value='option2'>Option 2</option>
										<option value='option3'>Option 3</option>
									</Select>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'idNumber'}>
										{'ID Number'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'idNumber'}
											name={'idNumber'}
											type='text'
											size={'xs'}
											value={formik.values.idNumber}
											onChange={formik.handleChange}
											placeholder='Enter Select ID Number'
										/>
									</InputGroup>
								</FormControl>
							</Flex>
						</Flex>
						<Divider />
						<Flex justifyContent={'flex-end'} gap={3}>
							<Button
								onClick={() => setStep(1)}
								colorScheme='purple'
								size={'xs'}
								variant={'ghost'}
							>
								Back
							</Button>
							<Button colorScheme='purple' size={'xs'} type='submit'>
								Proceed
							</Button>
						</Flex>
					</Flex>
				</form>
			</Flex>
		</>
	);
};

const Form3 = ({ setStep }: { setStep: (num: number) => void }) => {
	const formik = useFormik({
		initialValues: {
			firstname: '',
			lastname: '',
			businessName: '',
			phone: '',
			role: '',
			dob: '',
			city: '',
			state: '',
			country: '',
			type: '',
			idNumber: '',
			date: '',
			website: '',
			rcNumber: '',
			email: '',
			logo: '',
		},
		async onSubmit(values) {
			console.log(values);
			setStep(4);
		},
	});
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<form onSubmit={formik.handleSubmit}>
					<Flex p={5} flexDir={'column'} gap={3}>
						<Heading fontSize={'xs'}>Organisational Details</Heading>
						<Text fontSize={'xs'}>
							Kindly fill the field with required credentials
						</Text>
						<Divider />
						<Flex p={5} bg={'#fbfbfb'}>
							<Flex flexDir={'column'} gap={3} w={'100%'}>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'logo'}>
										{'Business Logo'}
									</FormLabel>
									<Text fontSize={'xs'}>Add a business logo</Text>

									{/* <Avatar src={add} as={Input} /> */}
									<Input
										id={'logo'}
										name={'logo'}
										type='file'
										size={'xs'}
										value={formik.values.logo}
										onChange={formik.handleChange}
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'businessName'}>
										{'Business Name'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'businessName'}
											name={'businessName'}
											type='text'
											size={'xs'}
											value={formik.values.businessName}
											onChange={formik.handleChange}
											placeholder='Business Name'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'name'}>
										{'Business Type'}
									</FormLabel>
									<HStack>
										<Select size={'xs'} placeholder='Select Type'>
											<option value='option1'>Option 1</option>
											<option value='option2'>Option 2</option>
											<option value='option3'>Option 3</option>
										</Select>
										<Select size={'xs'} placeholder='Industry'>
											<option value='option1'>Option 1</option>
											<option value='option2'>Option 2</option>
											<option value='option3'>Option 3</option>
										</Select>
									</HStack>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'name'}>
										{'Business Type'}
									</FormLabel>
									<HStack>
										<Select size={'xs'} placeholder='City'>
											<option value='option1'>Option 1</option>
											<option value='option2'>Option 2</option>
											<option value='option3'>Option 3</option>
										</Select>
										<Select size={'xs'} placeholder='State'>
											<option value='option1'>Option 1</option>
											<option value='option2'>Option 2</option>
											<option value='option3'>Option 3</option>
										</Select>
										<Select size={'xs'} placeholder='Country'>
											<option value='option1'>Option 1</option>
											<option value='option2'>Option 2</option>
											<option value='option3'>Option 3</option>
										</Select>
									</HStack>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'date'}>
										{'Date of Establishment'}
									</FormLabel>
									<Input
										id={'date'}
										name={'date'}
										type='date'
										size={'xs'}
										value={formik.values.date}
										onChange={formik.handleChange}
										placeholder='Enter Date'
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'email'}>
										{'Email Address'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'email'}
											name={'email'}
											type='email'
											size={'xs'}
											value={formik.values.email}
											onChange={formik.handleChange}
											placeholder='Enter Email'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'phone'}>
										{'Phone Number'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'phone'}
											name={'phone'}
											type='phone'
											size={'xs'}
											value={formik.values.phone}
											onChange={formik.handleChange}
											placeholder='090908678000'
										/>
									</InputGroup>
								</FormControl>
								<FormControl>
									<FormLabel fontSize={'xs'} htmlFor={'website'}>
										{'Website'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'website'}
											name={'website'}
											type='text'
											size={'xs'}
											value={formik.values.website}
											onChange={formik.handleChange}
											placeholder='www.enteryourwebsite.com'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'rcNumber'}>
										{'RC Number'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'rcNumber'}
											name={'rcNumber'}
											type='text'
											size={'xs'}
											value={formik.values.rcNumber}
											onChange={formik.handleChange}
											placeholder='Enter RC Number'
										/>
									</InputGroup>
								</FormControl>
							</Flex>
						</Flex>
						<Divider />
						<Flex justifyContent={'flex-end'} gap={3}>
							<Button
								onClick={() => setStep(2)}
								colorScheme='purple'
								size={'xs'}
								variant={'ghost'}
							>
								Back
							</Button>
							<Button colorScheme='purple' size={'xs'} type='submit'>
								Proceed
							</Button>
						</Flex>
					</Flex>
				</form>
			</Flex>
		</>
	);
};
const Form4 = ({ setStep }: { setStep: (num: number) => void }) => {
	const formik = useFormik({
		initialValues: {
			accountNumber: '',
			accountName: '',
			bvn: '',
			bank: '',
		},
		async onSubmit(values) {
			console.log(values);
			setStep(5);
		},
	});
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<form onSubmit={formik.handleSubmit}>
					<Flex p={5} flexDir={'column'} gap={3}>
						<Heading fontSize={'xs'}>Payment Account Information</Heading>
						<Text fontSize={'xs'}>
							Kindly fill the field with required credentials
						</Text>
						<Divider />
						<Flex p={5} bg={'#fbfbfb'}>
							<Flex flexDir={'column'} gap={3} w={'100%'}>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'accountNumber'}>
										{'Account Number'}
									</FormLabel>
									<Input
										id={'accountNumber'}
										name={'accountNumber'}
										type='text'
										w={'full'}
										size={'xs'}
										value={formik.values.accountNumber}
										onChange={formik.handleChange}
										placeholder='Enter Account Number'
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'bank'}>
										{'Bank'}
									</FormLabel>
									<Select size={'xs'} placeholder='Select Back'>
										<option value='option1'>Option 1</option>
										<option value='option2'>Option 2</option>
										<option value='option3'>Option 3</option>
									</Select>
								</FormControl>

								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'accountName'}>
										{'Account Name'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'accountName'}
											name={'accountName'}
											type='phone'
											size={'xs'}
											value={formik.values.accountName}
											onChange={formik.handleChange}
											placeholder='Enter Account Name'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<Flex justifyContent={'space-between'}>
										<FormLabel fontSize={'xs'} htmlFor={'bvn'}>
											{'BVN'}
										</FormLabel>
										<Popover>
											<PopoverTrigger>
												<Text
													color={'#825EE4'}
													textDecor={'underline'}
													cursor={'pointer'}
													fontSize={'xs'}
												>
													Why we need your BVN?
												</Text>
											</PopoverTrigger>
											<PopoverContent>
												<PopoverArrow />
												<PopoverCloseButton />
												<PopoverHeader fontSize={'xs'}>Why we need your BVN?</PopoverHeader>
												<PopoverBody fontSize={'xs'}>
													We only need access to your: <br /> - Full Name <br />{' '}
													- Date of Birth <br /> - House Address <br /> - BVN
													Image <br /> <br />
													Rest assured that your Bank Verification Number (BVN)
													does not provide us with any access to your bank
													accounts or transactions. <br /> The validation of
													your BVN is solely handled by NIBBS.
												</PopoverBody>
											</PopoverContent>
										</Popover>
									</Flex>
									<InputGroup>
										<Input
											id={'bvn'}
											name={'bvn'}
											type='text'
											size={'xs'}
											value={formik.values.bvn}
											onChange={formik.handleChange}
											placeholder='Enter BVN Number'
										/>
									</InputGroup>
								</FormControl>
							</Flex>
						</Flex>
						<Divider />
						<Flex justifyContent={'flex-end'} gap={3}>
							<Button
								onClick={() => setStep(4)}
								colorScheme='purple'
								size={'xs'}
								variant={'ghost'}
							>
								Back
							</Button>
							<Button colorScheme='purple' size={'xs'} type='submit'>
								Proceed
							</Button>
						</Flex>
					</Flex>
				</form>
			</Flex>
		</>
	);
};

const Form5 = ({ setStep }: { setStep: (num: number) => void }) => {
	const formik = useFormik({
		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			role: '',
			dob: '',
			type: '',
			idNumber: '',
		},
		async onSubmit(values) {
			console.log(values);
		},
	});
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<form onSubmit={formik.handleSubmit}>
					<Flex p={5} flexDir={'column'} gap={3}>
						<Heading fontSize={'xs'}>Documents/Verification</Heading>
						<Text fontSize={'xs'}>Kindly upload the required document</Text>
						<Divider />
						<Flex p={5} bg={'#fbfbfb'}>
							<Flex flexDir={'column'} gap={3} w={'100%'}>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'name'}>
										{'Name'}
									</FormLabel>
									<HStack>
										<Input
											id={'name'}
											name={'firstname'}
											type='text'
											w={'full'}
											size={'xs'}
											value={formik.values.firstname}
											onChange={formik.handleChange}
											placeholder='First Name'
										/>
										<Input
											id={'name'}
											name={'lastname'}
											type='text'
											w={'full'}
											size={'xs'}
											value={formik.values.lastname}
											onChange={formik.handleChange}
											placeholder='Last Name'
										/>
									</HStack>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'email'}>
										{'Email Address'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'email'}
											name={'email'}
											type='email'
											size={'xs'}
											value={formik.values.email}
											onChange={formik.handleChange}
											placeholder='Enter Email'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'phone'}>
										{'Phone Number'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'phone'}
											name={'phone'}
											type='phone'
											size={'xs'}
											value={formik.values.phone}
											onChange={formik.handleChange}
											placeholder='090908678000'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'role'}>
										{'Role'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'role'}
											name={'role'}
											type='text'
											size={'xs'}
											value={formik.values.role}
											onChange={formik.handleChange}
											placeholder='Enter your role in the company'
										/>
									</InputGroup>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'role'}>
										{'Select ID'}
									</FormLabel>
									<Select size={'xs'} placeholder='Select option'>
										<option value='option1'>Option 1</option>
										<option value='option2'>Option 2</option>
										<option value='option3'>Option 3</option>
									</Select>
								</FormControl>
								<FormControl isRequired>
									<FormLabel fontSize={'xs'} htmlFor={'idNumber'}>
										{'ID Number'}
									</FormLabel>
									<InputGroup>
										<Input
											id={'idNumber'}
											name={'idNumber'}
											type='text'
											size={'xs'}
											value={formik.values.idNumber}
											onChange={formik.handleChange}
											placeholder='Enter Select ID Number'
										/>
									</InputGroup>
								</FormControl>
							</Flex>
						</Flex>
						<Divider />
						<Flex justifyContent={'flex-end'} gap={3}>
							<Button
								onClick={() => setStep(4)}
								colorScheme='purple'
								size={'xs'}
								variant={'ghost'}
							>
								Back
							</Button>
							<Button colorScheme='purple' size={'xs'} type='submit'>
								Proceed
							</Button>
						</Flex>
					</Flex>
				</form>
			</Flex>
		</>
	);
};
export const BrandKYC = () => {
	const [step, setStep] = useState(1);
	return (
		<>
			<Flex
				color={'black'}
				boxShadow={'md'}
				minH={'90vh'}
				p={3}
				flexDir={'column'}
				mt={2}
				bgColor={'white'}
			>
				<Text>Account Validation</Text>
				<Flex gap={2}>
					<Flex
						flex={1}
						flexDir={'column'}
						p={5}
						boxShadow={'md'}
						fontSize={'xs'}
						gap={3}
					>
						<Text>Steps</Text>
						<Flex
							alignItems={'center'}
							gap={2}
							justifyContent={'space-between'}
						>
							<Progress
								value={step * 20}
								colorScheme='purple'
								w='130px'
								size='xs'
								borderRadius={'md'}
							/>
							<Text>{step} of 5</Text>
						</Flex>

						<ItemCheck label='Consent' value={1} step={step} />
						<ItemCheck label='Key Contact Details' value={2} step={step} />
						<ItemCheck label='Organisational Details' value={3} step={step} />
						<ItemCheck label='Payment Account Info' value={4} step={step} />
						<ItemCheck label='Documents/Verification' value={5} step={step} />
					</Flex>
					<Flex bg={'#fbfbfb'} flex={3} p={5}>
						{step === 1 ? (
							<Form1 setStep={setStep} />
						) : step === 2 ? (
							<Form2 setStep={setStep} />
						) : step === 3 ? (
							<Form3 setStep={setStep} />
						) : step === 4 ? (
							<Form4 setStep={setStep} />
						) : (
							<Form5 setStep={setStep} />
						)}
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
