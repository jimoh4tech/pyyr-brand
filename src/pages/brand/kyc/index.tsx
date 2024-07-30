import {
	Button,
	Circle,
	CircularProgress,
	CircularProgressLabel,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
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
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Textarea,
	Th,
	Thead,
	Tr,
	useDisclosure,
	useMediaQuery,
	useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import authService from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import transactionsService from '../../../services/transactions';
import userServices from '../../../services/user';
import { CurrentUserContext } from '../../../context/user.context';
import { IManager } from '../../../interface/customer';

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

const Form2 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void; // eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
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
										name={'firstName'}
										type='text'
										w={'full'}
										size={'xs'}
										value={formik.values.firstName}
										onChange={formik.handleChange}
										placeholder='First Name'
									/>
									<Input
										id={'name'}
										name={'lastName'}
										type='text'
										w={'full'}
										size={'xs'}
										value={formik.values.lastName}
										onChange={formik.handleChange}
										placeholder='Last Name'
									/>
								</HStack>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'mail'}>
									{'Email Address'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'mail'}
										name={'mail'}
										type='email'
										size={'xs'}
										value={formik.values.mail}
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
										type='number'
										size={'xs'}
										value={formik.values.phone}
										onChange={formik.handleChange}
										placeholder='090908678000'
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'dob'}>
									{'Date of Birth'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'dob'}
										name={'dob'}
										type='date'
										size={'xs'}
										value={formik.values.dob}
										onChange={formik.handleChange}
										placeholder='Enter date'
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'id_type'}>
									{'Select ID'}
								</FormLabel>

								<Select
									size={'xs'}
									onChange={formik.handleChange}
									name='id_type'
									placeholder='Select option'
								>
									<option value='NIN'>NIN</option>
									<option value='BVN'>BVN</option>
									<option value='Driver Lisence'>Driver's Lisence</option>
									<option value='Internation Passport'>
										Internation Passport
									</option>
									<option value='Voter Card'>Voter's Card</option>
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'idNumber'}>
									{'ID Number'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'idNumber'}
										name={'id_number'}
										type='text'
										size={'xs'}
										value={formik.values.id_number}
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
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(3)}>
							Proceed
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const Form3 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void; // eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	const industries = [
		'Agricuture',
		'Commerce',
		'Finance',
		'Education',
		'Gaming',
		'Health',
		'Hospitality',
		'Entertainment',
		'Logistics',
		'Travel',
		'Utility',
	];

	const businesses = [
		'Sole Proprietorship',
		'Partnership',
		'Limited Liability Company (LLC)',
		'Corporation',
		'Nonprofit Organization',
		'Cooperative',
		'Franchise',
		'Social Enterprise',
		'Startup',
	];
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
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
								<Input
									id={'logo'}
									name={'logo'}
									type='file'
									size={'xs'}
									onChange={(event) => {
										formik.setFieldValue(
											'logo',
											event.currentTarget.files && event.currentTarget.files[0]
										);
									}}
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
								<FormLabel fontSize={'xs'} htmlFor={'business Type'}>
									{'Business Type'}
								</FormLabel>
								<HStack>
									<Select
										size={'xs'}
										name='businessType'
										placeholder='Select Type'
										onChange={formik.handleChange}
									>
										{businesses.map((b) => (
											<option key={b} value={b}>
												{b}
											</option>
										))}
										<option value='option1'>Option 1</option>
										<option value='option2'>Option 2</option>
										<option value='option3'>Option 3</option>
									</Select>
									<Select
										size={'xs'}
										onChange={formik.handleChange}
										name='industry'
										placeholder='Industry'
									>
										{industries.map((i) => (
											<option key={i} value={i}>
												{i}
											</option>
										))}
									</Select>
								</HStack>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'name'}>
									{'Location'}
								</FormLabel>
								<HStack>
									<Select
										size={'xs'}
										onChange={formik.handleChange}
										name='city'
										placeholder='City'
									>
										<option value='option1'>Option 1</option>
										<option value='option2'>Option 2</option>
										<option value='option3'>Option 3</option>
									</Select>
									<Select
										size={'xs'}
										onChange={formik.handleChange}
										name='state'
										placeholder='State'
									>
										<option value='option1'>Option 1</option>
										<option value='option2'>Option 2</option>
										<option value='option3'>Option 3</option>
									</Select>
									<Select
										size={'xs'}
										onChange={formik.handleChange}
										name='country'
										placeholder='Country'
									>
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
										name={'b_mail'}
										type='email'
										size={'xs'}
										value={formik.values.b_mail}
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
										name={'b_phone'}
										type='number'
										size={'xs'}
										value={formik.values.b_phone}
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
										name={'rc_number'}
										type='text'
										size={'xs'}
										value={formik.values.rc_number}
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
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(4)}>
							Proceed
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
const Form4 = ({
	setStep,
	formik,
	bankList,
}: {
	setStep: (num: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
	bankList: { code: string; id: string; name: string }[];
}) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'xs'}>Payment Account Information</Heading>
					<Text fontSize={'xs'}>
						Kindly fill the field with required credentials
					</Text>
					<Divider />
					<Flex p={5} bg={'#fbfbfb'}>
						<Flex flexDir={'column'} gap={3} w={'100%'}>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'bank'}>
									{'Bank'}
								</FormLabel>
								<Select
									size={'xs'}
									name='accountBank'
									placeholder='Select Back'
									onChange={formik.handleChange}
								>
									{bankList.map((b) => (
										<option key={b.id} value={`${b.code}:${b.name}`}>
											{b.name}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'accountNumber'}>
									{'Account Number'}
								</FormLabel>
								<Input
									id={'accountNumber'}
									name={'accountNumber'}
									type='number'
									w={'full'}
									size={'xs'}
									value={formik.values.accountNumber}
									onChange={formik.handleChange}
									placeholder='Enter Account Number'
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'accountName'}>
									{'Account Name'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'accountName'}
										name={'accountName'}
										type='text'
										size={'xs'}
										value={formik.values.accountName}
										onChange={formik.handleChange}
										placeholder='Enter Account Name'
										isDisabled={true}
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
											<PopoverHeader fontSize={'xs'}>
												Why we need your BVN?
											</PopoverHeader>
											<PopoverBody fontSize={'xs'}>
												We only need access to your: <br /> - Full Name <br /> -
												Date of Birth <br /> - House Address <br /> - BVN Image{' '}
												<br /> <br />
												Rest assured that your Bank Verification Number (BVN)
												does not provide us with any access to your bank
												accounts or transactions. <br /> The validation of your
												BVN is solely handled by NIBBS.
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
							onClick={() => setStep(3)}
							colorScheme='purple'
							size={'xs'}
							variant={'ghost'}
						>
							Back
						</Button>
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(5)}>
							Proceed
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const Form5 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'xs'}>Documents/Verification</Heading>
					<Text fontSize={'xs'}>Kindly upload the required document</Text>
					<Divider />
					<Flex p={5} bg={'#fbfbfb'}>
						<Flex flexDir={'column'} gap={3} w={'100%'}>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'certificate'}>
									{'Certificate of Corporation'}
								</FormLabel>
								<Input
									id={'certificate'}
									name={'coc'}
									type='file'
									size={'xs'}
									onChange={(event) => {
										formik.setFieldValue(
											'coc',
											event.currentTarget.files && event.currentTarget.files[0]
										);
									}}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'cac'}>
									{'Form CAC'}
								</FormLabel>
								<Input
									id={'cac'}
									name={'cac'}
									type='file'
									size={'xs'}
									onChange={(event) => {
										formik.setFieldValue(
											'cac',
											event.currentTarget.files && event.currentTarget.files[0]
										);
									}}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'id'}>
									{'National Identity'}
								</FormLabel>
								<Input
									id={'id'}
									name={'idcard'}
									type='file'
									size={'xs'}
									onChange={(event) => {
										formik.setFieldValue(
											'idcard',
											event.currentTarget.files && event.currentTarget.files[0]
										);
									}}
								/>
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
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(6)}>
							Proceed
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const ManagerTable = ({
	managers,
	setManagers,
}: {
	managers: IManager[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setManagers: any;
}) => {
	const toast = useToast();
	const handleRemoveManager = async (code: string) => {
		try {
			const email = localStorage.getItem('PYMAILYR') || '';
			const mObj = {
				email,
				remove_manager: code,
			};
			const res = await authService.removeManager(mObj);
			console.log(mObj, res);

			if (res.responseCode == 200) {
				setManagers(res[0]);
				toast({
					title: 'Manager successfully Removed.',
					description: res.responseMessage,
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'top-right',
				});
			} else {
				toast({
					title: 'Error',
					description:
						res.responseMessage ||
						'Opps! Something went wrong, try again later',
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top-right',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<TableContainer>
			<Table size='sm'>
				<Thead>
					<Tr>
						<Th fontSize={'x-small'}>Name</Th>
						<Th fontSize={'x-small'}>Phone</Th>
						<Th fontSize={'x-small'}>Location</Th>
						<Th fontSize={'x-small'}>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{managers.length > 0 ? (
						managers.map((m) => (
							<Tr key={m.code} boxSize={'10px'}>
								<Td fontSize={'x-small'}>{m.Name}</Td>
								<Td fontSize={'x-small'}>{m.phone}</Td>
								<Td fontSize={'x-small'}>{m.location}</Td>
								<Td
									fontSize={'x-small'}
									cursor={'pointer'}
									textDecor={'underline'}
									onClick={() => handleRemoveManager(m.code)}
								>
									remove
								</Td>
							</Tr>
						))
					) : (
						<Text fontSize={'small'}>No Record!</Text>
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
const Form6 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	const toast = useToast();
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [location, setLocation] = useState('');
	const [loading, setLoading] = useState(false);
	const [managers, setManagers] = useState<IManager[]>([]);

	const handleAddManager = async () => {
		try {
			setLoading(true);
			const email = localStorage.getItem('PYMAILYR') || '';
			const mObj = {
				add_manager: email,
				name,
				phone: `+234${phone}`,
				location,
			};
			if (!name || !phone || !location) {
				toast({
					title: 'Error',
					description: 'All fields are required',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top-right',
				});
				setLoading(false);
				return;
			}
			const res = await authService.addManager(mObj);
			console.log(mObj, res);

			if (res.responseCode == 200) {
				setManagers(res[0]);
				setLoading(false);

				// Reset the fields
				setName('');
				setLocation('');
				setPhone('');
				toast({
					title: 'Manager successfully Added.',
					description: res.responseMessage,
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'top-right',
				});
			} else {
				setLoading(true);
				toast({
					title: 'Error',
					description:
						res.responseMessage ||
						'Opps! Something went wrong, try again later',
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top-right',
				});
			}
		} catch (error) {
			setLoading(true);
			console.log(error);
		}
	};
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'xs'}>Redemption Locations</Heading>
					<Text fontSize={'xs'}>Kindly enter all redemption locations</Text>
					<Divider />
					<Flex p={5} bg={'#fbfbfb'} flexDir={'column'} gap={10}>
						<ManagerTable managers={managers} setManagers={setManagers} />
						<Flex flexDir={'column'} gap={3} w={'100%'}>
							<FormControl >
								<FormLabel fontSize={'xs'} htmlFor={'mName'}>
									{'Manager Info'}
								</FormLabel>
								<Flex flexWrap={'wrap'} gap={1}>
									<Input
										id={'mName'}
										placeholder='Name'
										type='text'
										size={'xs'}
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<InputGroup size={'xs'}>
										<InputLeftAddon>+234</InputLeftAddon>
										<Input
											type='tel'
											placeholder='Phone'
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
									</InputGroup>
									<Input
										id={'mName'}
										placeholder='Location'
										type='text'
										size={'xs'}
										value={location}
										onChange={(e) => setLocation(e.target.value)}
									/>
								</Flex>
							</FormControl>
							<Flex justifyContent={'flex-end'}>
								<Button
									size={'xs'}
									colorScheme='green'
									onClick={handleAddManager}
									isLoading={loading}
								>
									Add
								</Button>
							</Flex>
						</Flex>
					</Flex>
					<Divider />
					<Flex justifyContent={'flex-end'} gap={3}>
						<Button
							onClick={() => setStep(5)}
							colorScheme='purple'
							size={'xs'}
							variant={'ghost'}
						>
							Back
						</Button>
						<Button
							colorScheme='purple'
							size={'xs'}
							type='submit'
							isLoading={formik.isSubmitting}
						>
							Submit
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
export const BrandKYC = () => {
	const [step, setStep] = useState(2);
	const [isLessThan600] = useMediaQuery('(max-width: 600px)');
	const [bankList, setBankList] = useState<
		{ code: string; id: string; name: string }[]
	>([]);
	const { setCurrentUser } = useContext(CurrentUserContext);
	const toast = useToast();
	const navigate = useNavigate();

	const fetchAccountName = async () => {
		try {
			// const token = localStorage.getItem('PYMAILYR') || '';
			const bank = formik.values.accountBank.split(':');
			console.log({
				get_account: formik.values.accountNumber,
				bankcode: bank[0],
			});
			const res = await transactionsService.getAccountName({
				get_account: formik.values.accountNumber,
				bankcode: bank[0],
			});
			console.log({ res });
			if (res.status) {
				formik.setValues({
					...formik.values,
					accountName: res.data.account_name,
				});
				toast({
					title: 'Success',
					description: res.message,
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right',
				});
			} else {
				toast({
					title: 'Error',
					description:
						res.message || 'Opps! Something went wrong, try again later',
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top-right',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const formik = useFormik({
		initialValues: {
			coc: '',
			cac: '',
			idcard: '',
			accountNumber: '',
			accountName: '',
			bvn: '',
			firstName: '',
			lastName: '',
			phone: '',
			businessName: '',
			businessType: '',
			dob: '',
			city: '',
			state: '',
			country: '',
			date: '',
			website: '',
			rc_number: '',
			logo: '',
			id_type: '',
			id_number: '',
			industry: '',
			b_mail: '',
			b_phone: '',
			accountBank: '',
			mail: '',
			bankcode: '',
		},
		async onSubmit(values) {
			try {
				const bank = values.accountBank.split(':');
				const email = localStorage.getItem('PYMAILYR') || '';
				const newVal = {
					...values,
					bankcode: bank[0],
					accountBank: bank[1],
					email,
					accountNumber: values.accountNumber.toString(),
					b_phone: values.b_phone.toString(),
					phone: values.phone.toString(),
				};
				console.log({ newVal });
				const res = await authService.kyc(newVal);
				const user = await userServices.getFullUserDetail({ full_user: email });
				console.log({ res, user });
				setCurrentUser(user);
				if (res.responseCode == 200) {
					toast({
						title: 'KYC successfully submitted.',
						description: res.responseMessage,
						status: 'success',
						duration: 9000,
						isClosable: true,
						position: 'top-right',
					});
					navigate('/');
				} else {
					toast({
						title: 'Error',
						description:
							res.responseMessage ||
							'Opps! Something went wrong, try again later',
						status: 'error',
						duration: 9000,
						isClosable: true,
						position: 'top-right',
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
	});

	useEffect(() => {
		const fetchBankList = async () => {
			const banks = await transactionsService.getBankList();
			console.log({ banks });
			setBankList(banks.data);
		};

		if (bankList.length === 0) fetchBankList();

		if (formik.values.accountNumber.toString().length === 10) {
			console.log(formik.values.accountNumber.toString().length === 10);
			fetchAccountName();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.accountNumber]);
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
				<Flex justify={'center'} display={isLessThan600 ? 'flex' : 'none'}>
					<CircularProgress
						value={(step - 1) * 20}
						size={'70px'}
						color='#825ee4'
					>
						<CircularProgressLabel fontSize={'xs'}>
							{step - 1} of 5
						</CircularProgressLabel>
					</CircularProgress>
				</Flex>
				<Flex gap={2}>
					<Flex
						flex={1}
						flexDir={'column'}
						p={5}
						boxShadow={'md'}
						fontSize={'xs'}
						gap={3}
						display={isLessThan600 ? 'none' : 'flex'}
					>
						<Text>Steps</Text>
						<Flex
							alignItems={'center'}
							gap={2}
							justifyContent={'space-between'}
						>
							<Progress
								value={(step - 1) * 20}
								colorScheme='purple'
								w='130px'
								size='xs'
								borderRadius={'md'}
							/>
							<Text width={'32px'}>{step - 1} of 5</Text>
						</Flex>

						{/* <ItemCheck label='Consent' value={1} step={step} /> */}
						<ItemCheck label='Key Contact Details' value={2} step={step} />
						<ItemCheck label='Organisational Details' value={3} step={step} />
						<ItemCheck label='Payment Account Info' value={4} step={step} />
						<ItemCheck label='Documents/Verification' value={5} step={step} />
						<ItemCheck label='Redemption Locations' value={6} step={step} />
					</Flex>
					<Flex bg={'#fbfbfb'} flex={3} p={isLessThan600 ? 1 : 5}>
						<form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
							{step === 1 ? (
								<Form1 setStep={setStep} />
							) : step === 2 ? (
								<Form2 setStep={setStep} formik={formik} />
							) : step === 3 ? (
								<Form3 setStep={setStep} formik={formik} />
							) : step === 4 ? (
								<Form4 setStep={setStep} formik={formik} bankList={bankList} />
							) : step === 5 ? (
								<Form5 setStep={setStep} formik={formik} />
							) : (
								<Form6 setStep={setStep} formik={formik} />
							)}
						</form>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};
