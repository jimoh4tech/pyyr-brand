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
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	PinInput,
	PinInputField,
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
	useToast,
} from '@chakra-ui/react';
import { DisplayCard } from './dashboard';
import account from '../../assets/account.svg';
import emrald from '../../assets/emrald.svg';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { IWalletTable } from '../../interface/wallet';
import { IoEyeOutline } from 'react-icons/io5';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import transactionsService from '../../services/transactions';
import { formatCurrency } from '../../util/format-currency.util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalForm1 = ({ formik, balance }: { formik: any; balance: number }) => {
	return (
		<>
			<Stack gap={4}>
				<Text fontSize={'sm'} fontWeight={'semibold'}>
					How much would you like to withdraw?
				</Text>
				<HStack>
					<Text fontSize={'sm'}>Balance:</Text>
					<Text fontSize={'sm'} color={'#825EE4'}>
						{formatCurrency(balance)}
					</Text>
				</HStack>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Text fontSize={'sm'}>Enter amount</Text>
					<Input
						id='amount'
						type='number'
						name='amount'
						value={formik.values.amount}
						onChange={formik.handleChange}
						isInvalid={formik.values.amount > balance}
						width={'70%'}
					/>
				</Flex>
			</Stack>
		</>
	);
};

const ModalForm2 = ({
	formik,
	bankList,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
	bankList: { code: string; id: string; name: string }[];
}) => {
	return (
		<>
			<Stack gap={3}>
				<FormControl isRequired>
					<FormLabel fontSize={'xs'} htmlFor={'bank'}>
						{'Bank Name'}
					</FormLabel>
					<Select
						size={'xs'}
						name='beneficiaryBank'
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
					<FormLabel fontSize={'xs'} htmlFor={'beneficiaryAccountName'}>
						{'Account Name'}
					</FormLabel>
					<InputGroup>
						<Input
							id={'beneficiaryAccountName'}
							name={'beneficiaryAccountName'}
							type='text'
							size={'xs'}
							value={formik.values.beneficiaryAccountName}
							onChange={formik.handleChange}
							placeholder='Enter Account Name'
							isDisabled={true}
						/>
					</InputGroup>
				</FormControl>
			</Stack>
		</>
	);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalForm3 = ({ formik }: { formik: any }) => {
	return (
		<>
			<Stack gap={3}>
				<Flex justifyContent={'space-between'}>
					<Text fontSize={'xs'}>Amount</Text>
					<Text fontSize={'xs'}>{formatCurrency(formik.values.amount)}</Text>
				</Flex>
				<Flex justifyContent={'space-between'}>
					<Text fontSize={'xs'}>Processing Fee</Text>
					<Text fontSize={'xs'}>{formatCurrency(250)}</Text>
				</Flex>
				<Flex justifyContent={'space-between'}>
					<Text fontSize={'xs'}>Receiving Account</Text>
					<Text fontSize={'xs'}>{formik.values.accountNumber}</Text>
				</Flex>
				<Flex justifyContent={'space-between'}>
					<Text fontSize={'xs'}>Account Name</Text>
					<Text fontSize={'xs'}>{formik.values.beneficiaryAccountName}</Text>
				</Flex>
			</Stack>
		</>
	);
};

const ModalForm4 = ({
	pin,
	setPin,
}: {
	pin: string; // eslint-disable-next-line @typescript-eslint/no-explicit-any
	setPin: any;
}) => {
	return (
		<>
			<Stack>
				<Text>Enter the code</Text>
				<Text>We've sent an OTP to your email to confirm transaction</Text>
				<HStack>
					<PinInput otp value={pin} onChange={(val) => setPin(val)}>
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
					</PinInput>
				</HStack>

				<Button colorScheme='purple' type='submit'>
					Submit
				</Button>
			</Stack>
		</>
	);
};

const WithdrawalModal = ({ balance }: { balance: number }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [step, setStep] = useState(1);
	const [pin, setPin] = useState('');
	const [confirm_ptb, setConfirm] = useState('');
	const toast = useToast();
	const navigate = useNavigate();

	const [bankList, setBankList] = useState<
		{ code: string; id: string; name: string }[]
	>([]);
	const formik = useFormik({
		initialValues: {
			ptb: '',
			accountNumber: '',
			beneficiaryAccountName: '',
			beneficiaryBank: '',
			recipient_code: '',
			amount: 0,
		},
		async onSubmit(values) {
			console.log(values);
			if (values.amount > balance)
				return;
			if (step < 3) setStep(step + 1);
			else if (step === 3) {
				try {
					const bank = values.beneficiaryBank.split(':');
					const email = localStorage.getItem('PYMAILYR') || '';
					const newVal = {
						...values,
						recipient_code: bank[0],
						accountBank: bank[1],
						email,
						amount: values.amount.toString(),
					};
					console.log({ newVal });
					const res = await transactionsService.withdrawal(newVal);
					console.log(res);

					if (res.responseCode == 200) {
						toast({
							title: 'Trasaction successfully initiated',
							description: res.responseMessage,
							status: 'success',
							duration: 9000,
							isClosable: true,
							position: 'top-right',
						});
						setConfirm(res.transactionCode);
						setStep(step + 1);
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
			} else {
				try {
					const email = localStorage.getItem('PYMAILYR') || '';
					const newVal = {
						confirm_ptb,
						pin,
						email,
					};
					console.log({ newVal });
					const res = await transactionsService.confirmWithdrawal(newVal);
					console.log(res);

					if (res.responseCode == 200) {
						toast({
							title: 'Transfer Successfully completed',
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
			}
		},
	});

	const fetchAccountName = async () => {
		try {
			const ptb = localStorage.getItem('PYMAILYR') || '';
			const bank = formik.values.beneficiaryBank.split(':');
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
					beneficiaryAccountName: res.data.account_name,
					recipient_code: bank[0],
					ptb,
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
				<form onSubmit={formik.handleSubmit}>
					<ModalContent gap={4}>
						<ModalHeader fontSize={'md'}>
							{step !== 3 ? 'Withdraw' : 'Confirm Details'}
						</ModalHeader>
						<ModalCloseButton />
						<Divider />
						<ModalBody>
							{step === 1 ? (
								<ModalForm1 formik={formik} balance={balance} />
							) : step === 2 ? (
								<ModalForm2 bankList={bankList} formik={formik} />
							) : step === 3 ? (
								<ModalForm3 formik={formik} />
							) : (
								<ModalForm4 pin={pin} setPin={setPin} />
							)}
						</ModalBody>
						<Divider />
						{step < 4 && (
							<ModalFooter>
								<Button
									size={'sm'}
									mr={3}
									variant={'outline'}
									onClick={() => (step === 1 ? setStep(1) : setStep(step - 1))}
								>
									Cancel
								</Button>
								<Button size={'sm'} colorScheme='purple' type='submit'>
									{step < 3 ? 'Proceed' : 'Yes, proceed'}
								</Button>
							</ModalFooter>
						)}
					</ModalContent>
				</form>
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

	const [balance, setBalance] = useState(0);

	useEffect(() => {
		const fetchBalance = async () => {
			const email = localStorage.getItem('PYMAILYR') || '';
			console.log({ email });
			const res = await transactionsService.walletBalance({
				pyyr_accounts: email,
			});
			console.log(res);
			setBalance(res.currentBalance);
		};
		fetchBalance();
	}, []);

	return (
		<>
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard
					value={formatCurrency(balance)}
					label='Wallet Balance'
					icon={emrald}
				/>
				<DisplayCard
					value='0987 *** ***'
					label='Account Info'
					icon={account}
					title='Spotify Limited'
				/>
				<DisplayCard
					value={formatCurrency(balance)}
					label='Earnings'
					icon={emrald}
				/>
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
					<WithdrawalModal balance={balance} />
				</Flex>

				<WalletTable />
			</Flex>
		</>
	);
};
