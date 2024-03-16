import {
	Avatar,
	AvatarGroup,
	Badge,
	Button,
	Card,
	CardBody,
	Center,
	Checkbox,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
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
	Textarea,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io';
import { VscListFilter } from 'react-icons/vsc';
import { IRole, IUser } from '../../interface/user';
import { IoEyeOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useFormik } from 'formik';
import { useState } from 'react';
import tick from '../../assets/tick.svg';
import info from '../../assets/info.svg';
import u_empty from '../../assets/u_empty.svg';

const DeactivateUserModal = () => {
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
					<ModalBody p={20}>
						<Center>
							<Avatar src={info} />
						</Center>
						<Stack>
							<Text fontSize={'xs'} fontWeight={'bold'} textAlign={'center'}>
								Deactivate User
							</Text>
							<Text fontSize={'xs'} textAlign={'center'}>
								Are you sure you want to deactivate this User?
							</Text>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button variant={'outline'} mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme='red' size={'sm'} onClick={onClose}>
							Yes, Deactivate
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const ViewUserModal = ({ name, image, email, role, id }: IUser) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<IoEyeOutline size={'15px'} cursor={'pointer'} onClick={onOpen} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={'sm'}>View Users</ModalHeader>

					<ModalCloseButton />
					<Divider />
					<ModalBody p={10}>
						<Flex gap={5}>
							<Avatar name={name} src={image} />
							<Stack>
								<Text
									fontSize={'xs'}
									fontWeight={'bold'}
								>{`${name} | ${email} | ${id}`}</Text>
								<Badge fontSize={'xs'} borderRadius={'lg'}>
									{role}
								</Badge>
							</Stack>
						</Flex>
					</ModalBody>
					<Divider mb={10} />
				</ModalContent>
			</Modal>
		</>
	);
};

const UsersTable = () => {
	const transactionList: IUser[] = [
		{
			id: '23456',
			name: 'Demi Wilkinson',
			date: '12/10/23',
			status: 'Active',
			role: 'Accountant',
			email: 'demi@dangotegroup.com',
		},
		{
			id: '23454',
			name: 'Chike Ugochukwu',
			date: '12/10/23',
			status: 'Inactive',
			role: 'Sale Rep',
			email: 'demi@dangotegroup.com',
		},
		{
			id: '23256',
			name: 'Oluma Ijidola',
			date: '12/10/23',
			status: 'Active',
			role: 'Admin',
			email: 'demi@dangotegroup.com',
		},
		{
			id: '53454',
			name: 'Josh Emeka',
			date: '12/10/23',
			status: 'Active',
			role: 'Admin',
			email: 'demi@dangotegroup.com',
		},
		{
			id: '27456',
			name: 'Frank Collins',
			date: '12/10/23',
			status: 'Active',
			role: 'Accountant',
			email: 'demi@dangotegroup.com',
		},
		{
			id: '23854',
			name: 'Mark Musk',
			date: '12/10/23',
			status: 'Active',
			role: 'Sale Rep',
			email: 'demi@dangotegroup.com',
		},
	];

	if (transactionList.length == 0)
		return (
			<Flex
				justifyContent={'center'}
				alignItems={'center'}
				direction={'column'}
				gap={2}
			>
				<Image src={u_empty} alt='empty' />
				<Text fontSize={'xs'}>No Users has been added yet</Text>
				<Flex alignItems={'center'} gap={4}>
					<AddUserModal />
					<Button size={'sm'} rightIcon={<AiOutlineFileAdd />}>
						Import File
					</Button>
				</Flex>
			</Flex>
		);
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Name
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								User ID
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Role
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
						{transactionList.map((t) => (
							<Tr fontSize={'xs'} key={t.id}>
								<Td fontSize={'xs'}>
									<Flex gap={2}>
										<Avatar name={t.name} size={'sm'} />
										<Stack gap={2}>
											<Text fontSize={'sm'} fontWeight={'semibold'}>
												{t.name}
											</Text>
											<Text fontSize={'sm'}>{t.email}</Text>
										</Stack>
									</Flex>{' '}
								</Td>
								<Td fontSize={'xs'}>#{t.id}</Td>
								<Td fontSize={'xs'}>
									<Badge
										px={4}
										py={1}
										borderRadius={'2xl'}
										textTransform={'capitalize'}
									>
										{t.role}
									</Badge>
								</Td>
								<Td fontSize={'xs'}>{t.date}</Td>
								<Td fontSize={'xs'}>
									<Badge
										px={4}
										py={1}
										borderRadius={'2xl'}
										textTransform={'capitalize'}
										bgColor={t.status === 'Active' ? '#d4f7e1' : '#e7e5e4'}
									>
										{t.status}
									</Badge>
								</Td>
								<Td>
									<Stack direction={'row'} gap={3}>
										<ViewUserModal key={t.id} {...t} />
										<CiEdit size={'15px'} cursor={'pointer'} />
										<DeactivateUserModal />
									</Stack>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

const RoleTable = () => {
	const rolesList: IRole[] = [
		{
			id: '23456',
			description: 'Demi Wilkinson',
			date: '12/10/23',
			role: 'Accountant',
		},
		{
			id: '23454',
			description: 'Chike Ugochukwu',
			date: '12/10/23',
			role: 'Sale Rep',
		},
		{
			id: '23256',
			description: 'Oluma Ijidola',
			date: '12/10/23',
			role: 'Admin',
		},
		{
			id: '53454',
			description: 'Josh Emeka',
			date: '12/10/23',
			role: 'Admin',
		},
		{
			id: '27456',
			description: 'Frank Collins',
			date: '12/10/23',
			role: 'Accountant',
		},
		{
			id: '23854',
			description: 'Mark Musk',
			date: '12/10/23',
			role: 'Sale Rep',
		},
	];

	if (rolesList.length > 0)
		return (
			<Flex
				justifyContent={'center'}
				alignItems={'center'}
				direction={'column'}
				gap={2}
			>
				<Image src={u_empty} alt='empty' />
				<Text fontSize={'xs'}>No Roles has been craeted yet</Text>
				<Flex alignItems={'center'} gap={4}>
					<AddRoleModal />
				</Flex>
			</Flex>
		);
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Name
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								User ID
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Role
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
						{rolesList.map((t) => (
							<Tr fontSize={'xs'} key={t.id}>
								<Td fontSize={'xs'}>
									<Badge
										px={4}
										py={1}
										borderRadius={'2xl'}
										textTransform={'capitalize'}
										bgColor={t.role === 'Active' ? '#d4f7e1' : '#e7e5e4'}
									>
										{t.role}
									</Badge>
								</Td>

								<Td fontSize={'xs'}>{t.date}</Td>
								<Td fontSize={'xs'}>
									<Badge
										px={4}
										py={1}
										borderRadius={'2xl'}
										textTransform={'capitalize'}
									>
										{t.role}
									</Badge>
								</Td>
								<Td fontSize={'xs'}>{t.date}</Td>

								<Td>
									<Stack direction={'row'} gap={3}>
										<CiEdit size={'15px'} cursor={'pointer'} />
										<DeactivateUserModal />
									</Stack>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

const PrivilegeTable = () => {
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Privileges
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Create
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								View
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Add
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Edit
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Withdraw
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Delete
							</Th>
						</Tr>
					</Thead>
					<Tbody gap={5}>
						<Tr>
							<Td fontSize={'xs'}>Dashboard</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
						</Tr>
						<Tr>
							<Td fontSize={'xs'}>Vouchers</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
						</Tr>
						<Tr>
							<Td fontSize={'xs'}>Wallet</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
						</Tr>
						<Tr>
							<Td fontSize={'xs'}>Report</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
						</Tr>
						<Tr>
							<Td fontSize={'xs'}>Profile</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
						</Tr>
						<Tr>
							<Td fontSize={'xs'}>User & Controls</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
							<Td>
								<Checkbox size={'sm'}></Checkbox>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

const AddUserModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [step, setStep] = useState(1);
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			role: '',
			email: '',
			gender: '',
			phoneNumber: '',
			staffId: '',
		},
		onSubmit(values) {
			console.log(values);
		},
	});
	return (
		<>
			<Button
				colorScheme='purple'
				size={'sm'}
				leftIcon={<IoMdAdd />}
				onClick={onOpen}
			>
				Add User
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{step === 1 && (
						<form onSubmit={formik.handleSubmit}>
							<ModalHeader fontSize={'sm'}>
								Add Users{' '}
								<Text fontSize={'xs'} fontWeight={'light'}>
									Please note that only roles that has been created can be
									selected
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
											<FormLabel htmlFor='role' fontSize={'xs'}>
												Role
											</FormLabel>

											<Select
												placeholder='Select Role'
												name='role'
												value={formik.values.role}
												id='role'
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
											<FormLabel htmlFor='staffId' fontSize={'xs'}>
												Staff ID
											</FormLabel>
											<Input
												name='staffId'
												value={formik.values.staffId}
												id='staffId'
												onChange={formik.handleChange}
												type='text'
												placeholder='#23456'
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
									Add User
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
								<Center>
									<Avatar src={tick} />
								</Center>
								<Stack>
									<Text
										fontSize={'xs'}
										fontWeight={'bold'}
										textAlign={'center'}
									>
										User Successfully Added!
									</Text>
									<Text fontSize={'xs'} textAlign={'center'}>
										You’ve successfully added a new user, an email has been sent
										to this effect.{' '}
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
const AddRoleModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [step, setStep] = useState(1);
	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
		},
		onSubmit(values) {
			console.log(values);
		},
	});
	return (
		<>
			<Button
				colorScheme='purple'
				size={'sm'}
				leftIcon={<IoMdAdd />}
				onClick={onOpen}
			>
				Create Role
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{step === 1 && (
						<form onSubmit={formik.handleSubmit}>
							<ModalHeader fontSize={'sm'}>Create Role</ModalHeader>

							<ModalCloseButton />
							<Divider />
							<ModalBody>
								<Stack>
									<FormControl>
										<Flex justifyContent={'space-between'}>
											<FormLabel htmlFor='name' fontSize={'xs'}>
												Role Name
											</FormLabel>
											<Input
												name='name'
												value={formik.values.name}
												id='name'
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
											<FormLabel htmlFor='description' fontSize={'xs'}>
												Description
											</FormLabel>
											<Textarea
												name='description'
												value={formik.values.description}
												id='description'
												onChange={formik.handleChange}
												placeholder='Describe Role'
												size={'xs'}
												width={'auto'}
											/>
										</Flex>
									</FormControl>
								</Stack>
							</ModalBody>
							<Divider />
							<ModalFooter>
								<Button
									colorScheme='purple'
									size={'sm'}
									type='submit'
									onClick={() => setStep(2)}
								>
									Add Role
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
								<Center>
									<Avatar src={tick} />
								</Center>
								<Stack>
									<Text
										fontSize={'xs'}
										fontWeight={'bold'}
										textAlign={'center'}
									>
										Role Successfully Created!
									</Text>
									<Text fontSize={'xs'} textAlign={'center'}>
										You’ve successfully added a new role, you can now assign
										respective roles to users
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

export const User = () => {
	return (
		<Stack gap={5}>
			<Card>
				<CardBody>
					<Stack gap={10}>
						<Flex justifyContent={'space-between'}>
							<Text fontWeight={'bold'}>0</Text>
							<Text>...</Text>
						</Flex>
						<Flex justifyContent={'space-between'} flexWrap={'wrap'}>
							<Text fontSize={'xs'}>Total Amount of Users</Text>
							<AvatarGroup size='sm'>
								<Avatar
									name='Segun Adebayo'
									src='https://bit.ly/sage-adebayo'
								/>
								<Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
								<Avatar
									name='Prosper Otemuyiwa'
									src='https://bit.ly/prosper-baba'
								/>
								<Avatar
									name='Christian Nwamba'
									src='https://bit.ly/code-beast'
								/>
							</AvatarGroup>
						</Flex>
					</Stack>
				</CardBody>
			</Card>
			<Stack p={5} bgColor={'white'} borderRadius={'lg'} boxShadow={'lg'}>
				<Flex justifyContent={'space-between'} flexWrap={'wrap'} gap={2}>
					<Flex alignItems={'center'}>
						<InputGroup p={1} maxW={'sm'}>
							<InputLeftElement alignItems={'center'}>
								<FiSearch size={'15px'} />
							</InputLeftElement>
							<Input
								placeholder='Search User'
								size={'sm'}
								borderRadius={'md'}
							/>
						</InputGroup>
						<Button size={'sm'} rightIcon={<VscListFilter />}>
							Filter
						</Button>
					</Flex>
					<Flex alignItems={'center'} gap={4}>
						<Button size={'sm'} rightIcon={<AiOutlineFileAdd />}>
							Import File
						</Button>
						<AddUserModal />
					</Flex>
				</Flex>

				<UsersTable />
			</Stack>
		</Stack>
	);
};

export const Role = () => {
	return (
		<Stack gap={5}>
			<Card>
				<CardBody>
					<Stack gap={10}>
						<Flex justifyContent={'space-between'}>
							<Text fontWeight={'bold'}>0</Text>
							<Text>...</Text>
						</Flex>
						<Flex justifyContent={'space-between'} flexWrap={'wrap'}>
							<Text fontSize={'sm'}>Total Roles Created</Text>
							<AvatarGroup size='sm'>
								<Avatar
									name='Segun Adebayo'
									src='https://bit.ly/sage-adebayo'
								/>
								<Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
								<Avatar
									name='Prosper Otemuyiwa'
									src='https://bit.ly/prosper-baba'
								/>
								<Avatar
									name='Christian Nwamba'
									src='https://bit.ly/code-beast'
								/>
							</AvatarGroup>
						</Flex>
					</Stack>
				</CardBody>
			</Card>
			<Stack p={5} bgColor={'white'} borderRadius={'lg'} boxShadow={'lg'}>
				<Flex justifyContent={'space-between'} flexWrap={'wrap'} gap={2}>
					<Flex alignItems={'center'}>
						<InputGroup p={1} maxW={'sm'}>
							<InputLeftElement alignItems={'center'}>
								<FiSearch size={'15px'} />
							</InputLeftElement>
							<Input
								placeholder='Search Role'
								size={'sm'}
								borderRadius={'md'}
							/>
						</InputGroup>
						<Button size={'sm'} rightIcon={<VscListFilter />}>
							Filter
						</Button>
					</Flex>
					<Flex alignItems={'center'} gap={4}>
						<AddRoleModal />
					</Flex>
				</Flex>

				<RoleTable />
			</Stack>
		</Stack>
	);
};

export const Privilege = () => {
	return (
		<Stack>
			<Text
				p={3}
				bgColor={'white'}
				borderRadius={'md'}
				boxShadow={'md'}
				fontSize={'xs'}
			>
				Permissions & Control restricts users to certain functionalities and
				action. The table below displays the certain kinds of Permission
				(Create, View, Update,Withdraw, Delete etc.) that can be performed by
				all kinds of Roles (Account Officer, Admin, Sales Rep, Etc). Checking
				the boxes on each action means the specific role can perform the checked
				action(s){' '}
			</Text>
			<Stack p={5} bgColor={'white'} borderRadius={'lg'} boxShadow={'lg'}>
				<Flex justifyContent={'space-between'} flexWrap={'wrap'} gap={2}>
					<Flex alignItems={'center'}>
						<InputGroup p={1} maxW={'sm'}>
							<InputLeftElement alignItems={'center'}>
								<FiSearch size={'15px'} />
							</InputLeftElement>
							<Input
								placeholder='Search Role'
								size={'sm'}
								borderRadius={'md'}
							/>
						</InputGroup>
						<Button size={'sm'} rightIcon={<VscListFilter />}>
							Filter
						</Button>
					</Flex>
					<Flex alignItems={'center'} gap={4}>
						<Menu>
							<MenuButton
								size={'xs'}
								as={Button}
								rightIcon={<IoIosArrowDown />}
							>
								Sales Rep
							</MenuButton>
							<MenuList>
								<MenuItem fontSize={'xs'}>Sales Rep</MenuItem>
								<MenuItem fontSize={'xs'}>Account Officer</MenuItem>
								<MenuItem fontSize={'xs'}>Admin</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				<PrivilegeTable />
			</Stack>
		</Stack>
	);
};
