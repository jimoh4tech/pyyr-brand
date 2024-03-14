import {
	Avatar,
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	Select,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { CiEdit, CiLocationOn, CiMobile2 } from 'react-icons/ci';

const Form1 = () => {
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
			<form onSubmit={formik.handleSubmit}>
				<Flex
					bg={'white'}
					flexDir={'column'}
					justifyContent={'space-between'}
					minH={'75vh'}
				>
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
					<Stack gap={5}>
						<Divider />
						<Flex justifyContent={'flex-end'} gap={3}>
							<Button colorScheme='purple' size={'xs'} type='submit'>
								Update Changes
							</Button>
						</Flex>
					</Stack>
				</Flex>
			</form>
		</>
	);
};

const Form2 = () => {
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
		},
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Flex
					bg={'white'}
					flexDir={'column'}
					justifyContent={'space-between'}
					minH={'75vh'}
				>
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
					<Stack gap={5}>
						<Divider />
						<Flex justifyContent={'flex-end'} gap={3}>
							<Button colorScheme='purple' size={'xs'} type='submit'>
								Update Changes
							</Button>
						</Flex>
					</Stack>
				</Flex>
			</form>
		</>
	);
};

const Form3 = () => {
	const formik = useFormik({
		initialValues: {
			accountNumber: '',
			bank: '',
			accountName: '',
		},
		async onSubmit(values) {
			console.log(values);
		},
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Flex
					bg={'white'}
					flexDir={'column'}
					justifyContent={'space-between'}
					minH={'75vh'}
				>
					<Flex flexDir={'column'} gap={3} w={'100%'}>
						<FormControl isRequired>
							<FormLabel fontSize={'xs'} htmlFor={'name'}>
								{'Account Number'}
							</FormLabel>
							<Input
								id={'name'}
								name={'accountNumber'}
								type='text'
								w={'full'}
								size={'xs'}
								value={formik.values.accountNumber}
								onChange={formik.handleChange}
								placeholder='0990987996'
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel fontSize={'xs'} htmlFor={'bank'}>
								{'Bank'}
							</FormLabel>
							<Select size={'xs'} placeholder='Select option'>
								<option value='option1'>GTBank</option>
								<option value='option2'>UBA</option>
								<option value='option3'>Option 3</option>
							</Select>
						</FormControl>
						<FormControl isRequired>
							<FormLabel fontSize={'xs'} htmlFor={'name'}>
								{'Account Name'}
							</FormLabel>
							<Input
								id={'name'}
								name={'accountName'}
								type='text'
								w={'full'}
								size={'xs'}
								value={formik.values.accountName}
								onChange={formik.handleChange}
								placeholder='Spotify Nig Limited'
							/>
						</FormControl>
					</Flex>
					<Stack gap={5}>
						<Divider />
						<Flex justifyContent={'flex-end'} gap={3}>
							<Button colorScheme='purple' size={'xs'} type='submit'>
								Update Changes
							</Button>
						</Flex>
					</Stack>
				</Flex>
			</form>
		</>
	);
};
const EditProfileDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				size={'sm'}
				variant={'outline'}
				leftIcon={<CiEdit />}
				onClick={onOpen}
			>
				Edit Details
			</Button>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} size={'md'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader fontSize={'sm'}>
						Edit Information{' '}
						<Text fontSize={'xs'} fontWeight={'light'}>
							Some information would require you contact Pyyr for edit Access
						</Text>
					</DrawerHeader>

					<DrawerBody>
						<Tabs variant='soft-rounded' size={'sm'} colorScheme='purple'>
							<TabList
								bgColor={'#f5f5f4'}
								borderRadius={'3xl'}
								p={1}
								fontSize={'sm'}
								justifyContent={'space-between'}
							>
								<Tab fontSize={'sm'}>Key Contact Info</Tab>
								<Tab fontSize={'sm'}>Business Details</Tab>
								<Tab fontSize={'sm'}>Account Info</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<Form1 />
								</TabPanel>
								<TabPanel>
									<Form2 />
								</TabPanel>
								<TabPanel>
									<Form3 />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export const Profile = () => {
	return (
		<Stack p={5} borderRadius={'lg'} boxShadow={'lg'} bg={'white'} gap={7}>
			<Stack gap={4}>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Text fontSize={'sm'} fontWeight={'bold'}>
						Profile information
					</Text>
					<EditProfileDrawer />
				</Flex>

				<Flex gap={4} alignItems={'center'}>
					<Avatar name='Spotify' />
					<Stack>
						<Text
							fontSize={'xs'}
							fontWeight={'bold'}
						>{`Spotify | RC:223345 | hellospotify@ai.com`}</Text>
						<Flex gap={1}>
							<CiMobile2 />
							<Text fontSize={'xs'}>+212 67000 000</Text>
						</Flex>
						<Flex gap={1}>
							<CiLocationOn />
							<Text fontSize={'xs'}>California, US</Text>
						</Flex>
					</Stack>
				</Flex>
			</Stack>
			<Stack gap={4}>
				<Text fontSize={'sm'} fontWeight={'bold'}>
					Business Details
				</Text>

				<Stack gap={3}>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Business Type</Text>
						<Text fontSize={'xs'}>LLC</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Industry</Text>
						<Text fontSize={'xs'}>Entertainment Technology</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Date of Establishment</Text>
						<Text fontSize={'xs'}>25/01/23</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Weblink</Text>
						<Text fontSize={'xs'}>hellospotify@ai.com</Text>
					</Flex>
				</Stack>
			</Stack>

			<Stack gap={4}>
				<Text fontSize={'sm'} fontWeight={'bold'}>
					Key Contact Details
				</Text>

				<Stack gap={3}>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Full Name</Text>
						<Text fontSize={'xs'}>Clark Gabriel</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Date of Birth</Text>
						<Text fontSize={'xs'}>25/01/23</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Nationality</Text>
						<Text fontSize={'xs'}>Canada</Text>
					</Flex>
				</Stack>
			</Stack>

			<Stack gap={4}>
				<Text fontSize={'sm'} fontWeight={'bold'}>
					Payment Account Info
				</Text>

				<Stack gap={3}>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Account Number</Text>
						<Text fontSize={'xs'}>0987654321</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Bank</Text>
						<Text fontSize={'xs'}>Union Bank</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text fontSize={'xs'}>Account Name</Text>
						<Text fontSize={'xs'}>Spotify Limited</Text>
					</Flex>
				</Stack>
			</Stack>
		</Stack>
	);
};
