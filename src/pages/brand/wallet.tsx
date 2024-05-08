import {
	AspectRatio,
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
	FormLabel,
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
import { IoMdAdd, IoMdCopy } from 'react-icons/io';
import { formatCurrency } from '../../util/format-currency.util';
import transactionsService from '../../services/transactions';

const AmountCard = ({
	amount,
	setAmount,
}: {
	amount: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setAmount: any;
}) => {
	return (
		<Text
			fontSize={'xs'}
			bgColor={'white'}
			px={3}
			py={1}
			w='110px'
			border={'1px solid #f2f2f2'}
			borderRadius={'md'}
			boxShadow={'md'}
			cursor={'pointer'}
			onClick={() => setAmount(amount)}
		>
			{formatCurrency(amount)}
		</Text>
	);
};

const ModalForm1 = ({
	amount,
	setAmount,
	handleTopUp,
}: {
	amount: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setAmount: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleTopUp: any;
}) => {
	return (
		<>
			<ModalHeader fontSize={'md'}>Fund Wallet</ModalHeader>
			<ModalCloseButton />
			<Divider />
			<ModalBody>
				<Stack>
					<Stack
						bgColor={'#f9f4f8'}
						p={2}
						alignItems={'center'}
						borderRadius={'lg'}
					>
						<Text fontSize={'xs'}>Available Balance</Text>
						<Text fontSize={'sm'} fontWeight={'bold'}>
							{formatCurrency(12000)}
						</Text>
					</Stack>

					<Stack justifyContent={'space-between'}>
						<Text fontSize={'sm'}>Amount</Text>
						<InputGroup>
							<InputLeftAddon>&#8358;</InputLeftAddon>
							<Input
								type='number'
								value={amount}
								onChange={(e) => setAmount(Number(e.target.value))}
							/>
						</InputGroup>
					</Stack>
					<Flex flexWrap={'wrap'} justifyContent={'space-between'} gap={2}>
						{[
							50000, 100000, 10000, 20000, 500000, 1000000, 1000, 5000000, 5000,
							1500000, 2000000, 3000000,
						].map((c) => (
							<AmountCard amount={c} setAmount={setAmount} key={c} />
						))}
					</Flex>
					<Stack>
						<Text></Text>
						<FormLabel htmlFor='method' fontSize={'xs'}>
							Payment Method
						</FormLabel>

						<Select
							placeholder='Flutterwave'
							name='method'
							id='method'
							size={'xs'}
						>
							<option value='male'>FlutterWave</option>
							<option value='female'>Pyyr</option>
						</Select>
					</Stack>
				</Stack>
			</ModalBody>
			<Divider />
			<ModalFooter>
				<Button size={'xs'} mr={2}>
					Cancel
				</Button>
				<Button size={'xs'} onClick={handleTopUp} colorScheme='purple'>
					Proceed
				</Button>
			</ModalFooter>
		</>
	);
};

// const ModalForm2 = () => {
// 	return (
// 		<>
// 			<Text fontSize={'sm'} fontWeight={'semibold'}>
// 				How much would you like to withdraw?
// 			</Text>
// 			<HStack>
// 				<Text fontSize={'sm'}>Balance:</Text>
// 				<Text fontSize={'sm'}>₦540,000</Text>
// 			</HStack>
// 			<Flex>
// 				<Text fontSize={'sm'}></Text>
// 				<Input type='number' />
// 			</Flex>
// 		</>
// 	);
// };

const ProccessModal = ({ checkoutUrl }: { checkoutUrl: string }) => {
	return (
		<AspectRatio maxW='560px' ratio={1}>
			<Box as='iframe' title='naruto' src={checkoutUrl} allowFullScreen />
		</AspectRatio>
	);
};

const FundModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [step, setStep] = useState(1);
	const [amount, setAmount] = useState(0);
	const [checkoutUrl, setCheckoutUrl] = useState('');

	const handleTopUp = async () => {
		try {
			const bankList = await transactionsService.getBankList();
			console.log(bankList);
			const email = localStorage.getItem('PYMAILYR') || '';

			console.log({ email, card_topup: amount.toString() });
			const res = await transactionsService.topUp({
				email,
				card_topup: amount.toString(),
			});
			console.log(res);
			const trans = JSON.parse(res.replace('""', ''));
			const link = trans?.data?.payments?.redirectLink || '';

			console.log(link, trans);
			setCheckoutUrl(link);
			setStep(2);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button
				colorScheme='purple'
				size={'xs'}
				leftIcon={<IoMdAdd />}
				onClick={onOpen}
			>
				Fund Wallet
			</Button>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent gap={4}>
					{step === 1 ? (
						<ModalForm1
							amount={amount}
							setAmount={setAmount}
							handleTopUp={handleTopUp}
						/>
					) : (
						<ProccessModal checkoutUrl={checkoutUrl} />
					)}
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
			id: '105DU192W',
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
		<Stack>
			<Flex gap={2} justifyContent={'flex-end'}>
				<Button
					variant={'outline'}
					size={'xs'}
					rightIcon={<IoMdCopy color='#805ad5' />}
				>
					Wallet Acc No : 8790679001 (9 Payment Bank)
				</Button>
				<FundModal />
			</Flex>
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard
					value='₦1,120,000'
					label='Available Balance'
					icon={emrald}
				/>
				<DisplayCard value='₦850,780' label='Total Deposits' icon={emrald} />
				<DisplayCard value='₦450,000' label='Total Pay Out' icon={emrald} />
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
					</Flex>
					<Select placeholder='This Week' size={'xs'} width={'auto'}>
						<option value='option1'>This Week</option>
						<option value='option2'>Last Week</option>
						<option value='option3'>Last Month</option>
					</Select>
				</Flex>

				<WalletTable />
			</Flex>
		</Stack>
	);
};
