import {
	Avatar,
	Button,
	Center,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react';
import { DisplayCard } from './dashboard';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useState } from 'react';
import { useFormik } from 'formik';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ICustomer } from '../../interface/customer';
import { IoEyeOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import gift from '../../assets/gift.svg';
import info from '../../assets/info.svg';

const AddCustomerModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [step, setStep] = useState(1);
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			gender: '',
			phoneNumber: '',
			customerId: '',
			interests: '',
			website: '',
			city: '',
			state: '',
		},
		onSubmit(values) {
			console.log(values);
		},
	});
	return (
		<>
			<Button
				colorScheme='purple'
				size={'xs'}
				leftIcon={<IoMdAdd />}
				onClick={onOpen}
			>
				Add Customer
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{step === 1 && (
						<form onSubmit={formik.handleSubmit}>
							<ModalHeader fontSize={'sm'}>
								Add Customer{' '}
								<Text fontSize={'xs'} fontWeight={'light'}>
									Kindly add all the customers on your sales database
								</Text>
							</ModalHeader>

							<ModalCloseButton />
							<Divider />
							<ModalBody>
								<Stack>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='firstName' fontSize={'xs'}>
												First Name
											</FormLabel>
											<Input
												name='firstName'
												value={formik.values.firstName}
												id='firstName'
												onChange={formik.handleChange}
												type='text'
												placeholder='Add Name'
												size={'xs'}
												width={'auto'}
											/>
										</Flex>
									</FormControl>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='lastName' fontSize={'xs'}>
												Last Name
											</FormLabel>
											<Input
												name='lastName'
												value={formik.values.lastName}
												id='lastName'
												onChange={formik.handleChange}
												type='text'
												placeholder='Add Name'
												size={'xs'}
												width={'auto'}
											/>
										</Flex>
									</FormControl>

									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='email' fontSize={'xs'}>
												Email Address
											</FormLabel>
											<Input
												name='email'
												value={formik.values.email}
												id='email'
												onChange={formik.handleChange}
												type='email'
												placeholder='Enter email address'
												size={'xs'}
												width={'auto'}
											/>
										</Flex>
									</FormControl>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='gender' fontSize={'xs'}>
												Gender
											</FormLabel>

											<Select
												placeholder='Select Gender'
												name='gender'
												value={formik.values.gender}
												id='gender'
												onChange={formik.handleChange}
												size={'xs'}
												width={'40'}
											>
												<option value='male'>Male</option>
												<option value='female'>Female</option>
											</Select>
										</Flex>
									</FormControl>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='phoneNumber' fontSize={'xs'}>
												Phone Number
											</FormLabel>
											<Input
												name='phoneNumber'
												value={formik.values.phoneNumber}
												id='phoneNumber'
												onChange={formik.handleChange}
												type='number'
												placeholder='09089778890'
												size={'xs'}
												width={'auto'}
											/>
										</Flex>
									</FormControl>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='customerId' fontSize={'xs'}>
												Customer ID
											</FormLabel>
											<Input
												name='customerId'
												value={formik.values.customerId}
												id='customerId'
												onChange={formik.handleChange}
												type='text'
												placeholder='#23456'
												size={'xs'}
												width={'auto'}
											/>
										</Flex>
									</FormControl>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='state' fontSize={'xs'}>
												Location
											</FormLabel>
											<Flex>
												<Select
													placeholder='State'
													name='state'
													value={formik.values.state}
													id='state'
													onChange={formik.handleChange}
													size={'xs'}
													width={'20'}
												>
													<option value='option1'>Option 1</option>
													<option value='option2'>Option 2</option>
													<option value='option3'>Option 3</option>
												</Select>
												<Select
													placeholder='City'
													name='city'
													value={formik.values.city}
													id='city'
													onChange={formik.handleChange}
													size={'xs'}
													width={'20'}
												>
													<option value='option1'>Option 1</option>
													<option value='option2'>Option 2</option>
													<option value='option3'>Option 3</option>
												</Select>
											</Flex>
										</Flex>
									</FormControl>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='interests' fontSize={'xs'}>
												Interests
											</FormLabel>

											<Select
												placeholder='Select Interests'
												name='interests'
												value={formik.values.interests}
												id='interests'
												onChange={formik.handleChange}
												size={'xs'}
												width={'40'}
											>
												<option value='option1'>Option 1</option>
												<option value='option2'>Option 2</option>
												<option value='option3'>Option 3</option>
											</Select>
										</Flex>
									</FormControl>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='website' fontSize={'xs'}>
												Social Website
											</FormLabel>
											<Input
												name='website'
												value={formik.values.website}
												id='website'
												onChange={formik.handleChange}
												type='text'
												placeholder='Add URL'
												size={'xs'}
												width={'auto'}
											/>
										</Flex>
									</FormControl>
								</Stack>
							</ModalBody>

							<ModalFooter>
								<Button
									colorScheme='purple'
									size={'sm'}
									type='submit'
									onClick={() => setStep(2)}
								>
									Add Customer
								</Button>
							</ModalFooter>
						</form>
					)}
					{step === 2 && (
						<>
							<ModalHeader fontSize={'sm'}></ModalHeader>

							<ModalCloseButton />
							<Divider mt={3} />
							<ModalBody p={20}>
								<Center>{/* <Avatar src={tick} /> */}</Center>
								<Stack>
									<Text
										fontSize={'xs'}
										fontWeight={'bold'}
										textAlign={'center'}
									>
										Customer Successfully Added!
									</Text>
									<Text fontSize={'xs'} textAlign={'center'}>
										You’ve successfully added a new customer, an email has been
										sent to this effect.{' '}
									</Text>
								</Stack>
							</ModalBody>

							<ModalFooter>
								<Button
									colorScheme='purple'
									size={'sm'}
									onClick={() => {
										onClose();
										setStep(1);
									}}
								>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
const DeactivateCustomerModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<RiDeleteBin6Line
				size={'15px'}
				color='red'
				cursor={'pointer'}
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={'sm'}></ModalHeader>

					<ModalCloseButton />
					<Divider mt={3} />
					<ModalBody p={12}>
						<Center>
							<Avatar src={info} />
						</Center>
						<Stack>
							<Text fontSize={'xs'} fontWeight={'bold'} textAlign={'center'}>
								Delete Customer
							</Text>
							<Text fontSize={'xs'} textAlign={'center'}>
								Are you sure you want to deactivate this Customer?
							</Text>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button variant={'outline'} mr={3} onClick={onClose} size={'xs'}>
							Cancel
						</Button>
						<Button colorScheme='red' size={'xs'} onClick={onClose}>
							Yes, Deactivate
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
const CustomerTable = () => {
	const navigate = useNavigate();
	const customerList: ICustomer[] = [
		{
			id: 'ee',
			voucher: 'N222,000.90',
			date: 'Nov 13/2023',
			status: 'Active',
			name: 'Lanre Ogunwa',
			email: 'test@gml.com',
		},
		{
			id: 'e3',
			voucher: 'N222,000.90',
			date: 'Nov 13/2023',
			status: 'Active',
			name: 'Josh Sammy',
			email: 'test@gm8.com',
		},
		{
			id: 'e5',
			voucher: 'N222,000.90',
			date: 'Nov 13/2023',
			status: 'Inactive',
			name: 'Kilish Ugo',
			email: 'test@gm9.com',
		},
		{
			id: 'e34',
			voucher: 'N222,000.90',
			date: 'Nov 13/2023',
			status: 'Active',
			name: 'Comex Time',
			email: 'test@gm2.com',
		},
		{
			id: 'e25',
			voucher: 'N222,000.90',
			date: 'Nov 13/2023',
			status: 'Inactive',
			name: 'Gosh Fox',
			email: 'test@gm3.com',
		},
	];
	return (
		<Stack p={2} bgColor={'white'} boxShadow={'lg'} borderRadius={'lg'}>
			<Flex justifyContent={'space-between'} flexWrap={'wrap'} gap={2}>
				<Flex alignItems={'center'}>
					<InputGroup p={1} maxW={'sm'}>
						<InputLeftElement alignItems={'center'}>
							<FiSearch size={'15px'} />
						</InputLeftElement>
						<Input
							placeholder='Search Customer'
							size={'sm'}
							borderRadius={'md'}
						/>
					</InputGroup>
				</Flex>
				<Flex alignItems={'center'} gap={4}>
					<Button size={'xs'} rightIcon={<AiOutlineFileAdd />}>
						Import File
					</Button>
					<AddCustomerModal />
				</Flex>
			</Flex>

			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Name
							</Th>

							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Customer ID
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Gifted Voucher
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Date Added
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Status
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Action
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{customerList.map((t) => (
							<Tr fontSize={'xs'} key={t.id}>
								<Td fontSize={'xs'}>
									<Stack gap={2}>
										<Text fontSize={'xs'} fontWeight={'semibold'}>
											{t.name}
										</Text>
										<Text fontSize={'xs'}>{t.email}</Text>
									</Stack>
								</Td>
								<Td fontSize={'xs'}>{t.id}</Td>
								<Td fontSize={'xs'}>{t.voucher}</Td>
								<Td fontSize={'xs'}>{t.date}</Td>
								<Td fontSize={'xs'}>{t.status}</Td>
								<Td>
									<Flex gap={3} alignItems={'center'}>
										<IoEyeOutline
											size={'20px'}
											cursor={'pointer'}
											onClick={() => navigate(`/merchant/customers/${t.id}`)}
										/>
										<DeactivateCustomerModal />
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export const CustomerPage = () => {
	return (
		<Stack gap={5}>
			{' '}
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard
					value='5,200'
					label='Total No of Customers'
					isChecked={true}
				/>
				<DisplayCard
					value='700 '
					label='Total No of Customers Rewarded '
					isChecked={true}
				/>
				<DisplayCard
					value='200'
					label='Total No Active Customers'
					isChecked={true}
				/>
			</Flex>
			<CustomerTable />
		</Stack>
	);
};
