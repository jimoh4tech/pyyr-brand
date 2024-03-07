import {
	Avatar,
	Badge,
	Box,
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	Input,
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
import account from '../../assets/account.svg';
import emrald from '../../assets/emrald.svg';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useState } from 'react';
import moment from 'moment';
import { IWalletTable } from '../../interface/wallet';
import { IoEyeOutline } from 'react-icons/io5';

const ModalForm1 = () => {
	return (
		<>
			<Text fontSize={'sm'} fontWeight={'semibold'}>
				How much would you like to withdraw?
			</Text>
			<HStack>
				<Text fontSize={'sm'}>Balance:</Text>
				<Text fontSize={'sm'}>₦540,000</Text>
			</HStack>
			<Flex justifyContent={'space-between'}>
				<Text fontSize={'sm'}>Enter amount</Text>
				<Input type='number' />
			</Flex>
		</>
	);
};

const ModalForm2 = () => {
	return (
		<>
			<Text fontSize={'sm'} fontWeight={'semibold'}>
				How much would you like to withdraw?
			</Text>
			<HStack>
				<Text fontSize={'sm'}>Balance:</Text>
				<Text fontSize={'sm'}>₦540,000</Text>
			</HStack>
			<Flex>
				<Text fontSize={'sm'}></Text>
				<Input type='number' />
			</Flex>
		</>
	);
};
const ModalForm3 = () => {
	return (
		<>
			<Text fontSize={'sm'} fontWeight={'semibold'}>
				How much would you like to withdraw?
			</Text>
			<HStack>
				<Text fontSize={'sm'}>Balance:</Text>
				<Text fontSize={'sm'}>₦540,000</Text>
			</HStack>
			<Flex>
				<Text fontSize={'sm'}></Text>
				<Input type='number' />
			</Flex>
		</>
	);
};

const WithdrawalModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [step, setStep] = useState(1);

	return (
		<>
			<Button
				loadingText='Submitting'
				size='sm'
				colorScheme='purple'
				mt={2}
				onClick={onOpen}
			>
				Withdraw
			</Button>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent gap={4}>
					<ModalHeader fontSize={'md'}>Withdraw</ModalHeader>
					<ModalCloseButton />
					<Divider />
					<ModalBody>
						{step === 1 ? (
							<ModalForm1 />
						) : step === 2 ? (
							<ModalForm2 />
						) : (
							<ModalForm3 />
						)}
					</ModalBody>
					<Divider />
					<ModalFooter>
						<Button
							size={'sm'}
							onClick={() => setStep(step + 1)}
							colorScheme='purple'
						>
							Proceed
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const WalletChart = () => {
	const data = [
		{
			name: 'Nov 12',
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Nov 14',
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: 'Nov 16',
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: 'Nov 18',
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: 'Nov 23',
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: 'Nov 24',
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: 'Nov 11',
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];
	return (
		<ResponsiveContainer width='99%' height='99%'>
			<AreaChart
				width={500}
				height={400}
				data={data}
				margin={{
					top: 5,
					right: 0,
					left: 5,
					bottom: 0,
				}}
			>
				<XAxis fontSize={'10px'} dataKey='name' />
				<Tooltip />
				<Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
			</AreaChart>
		</ResponsiveContainer>
	);
};

const ViewWalletDrawer = ({
	id,
	recipient,
	bank,
	amount,
	status,
}: IWalletTable) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IoEyeOutline size={'20px'} onClick={onOpen} cursor={'pointer'} />
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} size={'sm'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader fontSize={'sm'}>View Transaction</DrawerHeader>
					<Divider />
					<DrawerBody>
						<Stack gap={5}>
							<Avatar src={account} />
							<Flex justifyContent={'space-between'} flexDir={'column'}>
								<Text
									fontSize={'xs'}
									fontWeight={'bold'}
								>{`${recipient}`}</Text>
								<Text
									fontSize={'xs'}
									fontWeight={'bold'}
								>{`${bank} • ${id}`}</Text>
							</Flex>
							<Divider />

							<Stack gap={5}>
								<Flex
									borderTop={'1px solid #f3f2f1'}
									justifyContent={'space-between'}
								>
									<Text fontSize={'xs'}>Amount</Text>
									<Text fontSize={'xs'}>{amount}</Text>
								</Flex>
								<Flex
									borderTop={'1px solid #f3f2f1'}
									justifyContent={'space-between'}
								>
									<Text fontSize={'xs'}>Processing Fee</Text>
									<Text fontSize={'xs'}>{amount}</Text>
								</Flex>
								<Flex
									borderTop={'1px solid #f3f2f1'}
									justifyContent={'space-between'}
								>
									<Text fontSize={'xs'}>Account name</Text>
									<Text fontSize={'xs'}>{recipient}</Text>
								</Flex>
								<Flex
									borderTop={'1px solid #f3f2f1'}
									justifyContent={'space-between'}
								>
									<Text fontSize={'xs'}>Transation Status</Text>
									<Badge
										// eslint-disable-next-line no-constant-condition
										bgColor={
											status === 'Failed'
												? '#ffd5d0'
												: status === 'Pending'
												? '#ffe3b2'
												: '#d4f7e1'
										}
										textTransform={'capitalize'}
										borderRadius={'10px'}
									>
										{status}
									</Badge>{' '}
								</Flex>
								<Flex
									borderTop={'1px solid #f3f2f1'}
									justifyContent={'space-between'}
								>
									<Text fontSize={'xs'}>Transation ID</Text>
									<Text fontSize={'xs'}>{id}</Text>
								</Flex>
							</Stack>
						</Stack>
						<Divider />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const WalletTable = () => {
	const transactionList: IWalletTable[] = [
		{
			recipient: 'Orange Fly',
			amount: '₦200,000',
			bank: 'Access Bank',
			id: '105DU9192W',
			type: 'Debit',
			date: '10/12/23',
			status: 'Pending',
		},
		{
			recipient: 'Ebenor Couture',
			amount: '₦100,000',
			bank: 'Access Bank',
			id: '305DP9192W',
			type: 'Credit',
			date: '10/12/23',
			status: 'Failed',
		},
		{
			recipient: 'Dangote Plc',
			amount: '₦200,000',
			bank: 'Access Bank',
			id: '105DU9192W',
			type: 'Credit',
			date: '09/11/23',
			status: 'Successful',
		},
	];
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Recipient
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Amount
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Originating Bank
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Transaction ID
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Type
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Date
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
								<Td fontSize={'xs'}>{t.recipient} </Td>
								<Td fontSize={'xs'}>{t.amount}</Td>
								<Td fontSize={'xs'}>{t.bank}</Td>
								<Td fontSize={'xs'}>{t.id}</Td>
								<Td fontSize={'xs'}>{t.type}</Td>
								<Td fontSize={'xs'}>{t.date}</Td>
								<Td fontSize={'xs'}>
									<Badge
										// eslint-disable-next-line no-constant-condition
										bgColor={
											t.status === 'Failed'
												? '#ffd5d0'
												: t.status === 'Pending'
												? '#ffe3b2'
												: '#d4f7e1'
										}
										textTransform={'capitalize'}
										borderRadius={'10px'}
									>
										{t.status}
									</Badge>{' '}
								</Td>
								<Td>
									<ViewWalletDrawer {...t} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export const Wallet = () => {
	const [fromDate, setFromDate] = useState(
		moment().subtract(1, 'days').format('YYYY-MM-DD')
	);
	const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
	return (
		<>
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard value='₦0' label='Wallet Balance' icon={emrald} />
				<DisplayCard
					value='0987 *** ***'
					label='Account Info'
					icon={account}
					title='Spotify Limited'
				/>
				<DisplayCard value='₦0' label='Earnings' icon={emrald} />
			</Flex>
			<Flex
				boxShadow={'md'}
				borderRadius={'md'}
				p={2}
				flexDir={'column'}
				flex={1}
				minH={'35vh'}
			>
				<Flex
					justifyContent={'space-between'}
					flex={1}
					fontSize={'xs	'}
					alignItems={'center'}
					borderRadius={'md'}
				>
					<Text>Overall Earning Trend</Text>
					<Stack direction='row' gap={0}>
						<Input
							type='date'
							value={fromDate}
							onChange={(e) => setFromDate(e.target.value)}
							size={'xs	'}
						/>
						<Input
							type='date'
							value={toDate}
							onChange={(e) => setToDate(e.target.value)}
							size={'xs	'}
						/>
					</Stack>
				</Flex>
				<Box h={'30vh'}>
					<WalletChart />
				</Box>
			</Flex>
			<Flex flex={1} boxShadow={'md'} borderRadius={'md'} flexDir={'column'}>
				<Flex
					justifyContent={'space-between'}
					fontSize={'sm'}
					alignItems={'center'}
					p={2}
				>
					<Flex gap={2} alignItems={'center'}>
						<Text fontSize={'xs'}>Transaction History</Text>
						<Select placeholder='This Week' size={'xs'}>
							<option value='option1'>This Week</option>
							<option value='option2'>Last Week</option>
							<option value='option3'>Last Month</option>
						</Select>
					</Flex>
					<WithdrawalModal />
				</Flex>

				<WalletTable />
			</Flex>
		</>
	);
};
