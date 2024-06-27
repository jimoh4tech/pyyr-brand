import {
	Alert,
	Avatar,
	Box,
	Button,
	Card,
	Flex,
	Heading,
	Image,
	Input,
	Link,
	Stack,
	Switch,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useMediaQuery,
} from '@chakra-ui/react';
import { LuAlertCircle } from 'react-icons/lu';
import empty from '../../assets/empty.svg';

import rectangle from '../../assets/rectangle.svg';
import { IoIosArrowForward } from 'react-icons/io';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CurrentUserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../../services/dashboard';
import { IVoucherTable } from '../../interface/voucher';
import { formatCurrency } from '../../util/format-currency.util';

const Empty = () => {
	const [isLessthan500] = useMediaQuery('(max-width: 500px)');
	const navigate = useNavigate();
	return (
		<>
			<Alert
				status='error'
				bg={'#E0D5FF'}
				border={'1px solid #825EE4'}
				borderRadius={'5px'}
				gap={3}
				color={'black'}
				fontSize={isLessthan500 ? 'xs' : 'sm'}
			>
				<LuAlertCircle />
				Welcome to Pyyr, kindly complete your profile to validate your account.
				<Link
					href='/merchant/kyc'
					textDecoration={'underline'}
					color={'#825EE4'}
					fontSize={isLessthan500 ? 'xs' : 'sm'}
					width={'100px'}
				>
					{' '}
					Get started
				</Link>
			</Alert>
			<Flex
				gap={3}
				flexDir={'column'}
				boxShadow={'md'}
				minH={'75vh'}
				justifyContent={'center'}
			>
				<Flex justify={'center'}>
					<Image src={empty} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'} fontSize={'sm'}>
						Your Dashboard presently has no metric to show
					</Text>
					<Text textAlign={'center'} fontSize={'xs'}>
						Complete your KYC to Validate your account
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<Stack gap={3}>
						<Button
							loadingText='Submitting'
							size='sm'
							colorScheme='purple'
							mt={2}
							onClick={() => navigate('/merchant/kyc')}
							rightIcon={<IoIosArrowForward />}
						>
							Get Started
						</Button>
					</Stack>
				</Flex>
			</Flex>
		</>
	);
};


export const DisplayCard = ({
	value,
	label,
	isChecked,
	title,
}: {
	value: string | number;
	label: string;
	isChecked: boolean;
	title?: string;
}) => {
	const [isCheck, setCheck] = useState(isChecked);

	const handleChange = () => {
		setCheck(!isCheck);
	};
	return (
		<>
			<Card
				flex={1}
				size={{ base: 'sm', md: 'md' }}
				px={{ base: 2, md: 5 }}
				py={3}
				gap={3}
				justifyContent={'space-between'}
			>
				<Heading size={{ base: 'xs', md: 'sm' }} color={'#825EE4'}>
					{' '}
					{title}
				</Heading>
				<Heading size={{ base: 'sm', md: 'md' }}>
					{' '}
					{isCheck ? value : '*****'}
				</Heading>
				<Flex justifyContent={'space-between'}>
					<Text fontSize={{ base: '2xs', md: 'xs' }}>{label}</Text>
					{/* <Box bgSize={{ base: '2xs', md: 'sm' }}>
						<Image src={icon} alt={label} />
					</Box> */}
					<Switch
						size='sm'
						colorScheme='purple'
						isChecked={isCheck}
						onChange={handleChange}
					/>
				</Flex>
			</Card>
		</>
	);
};

const VoucherCard = ({
	value,
	label,
	icon,
}: {
	value: string;
	label: string;
	icon: string;
}) => {
	return (
		<>
			<Card p={2}>
				<Flex
					fontSize={'xs'}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Flex gap={3} alignItems={'center'}>
						<Avatar size={{ base: 'xs', md: 'sm' }} src={icon} name={label} />
						<Text>{label}</Text>
					</Flex>
					<Text>{value}</Text>
				</Flex>
			</Card>
		</>
	);
};
const DashboardChart = () => {
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
		<ResponsiveContainer width='100%' height='100%'>
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

const VocuhersTable = ({ vouchers }: { vouchers: IVoucherTable[] }) => {
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Voucher
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Worth
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Code
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Amount
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Date
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{vouchers.map((v) => (
							<Tr fontSize={'xs'} key={v.code}>
								<Td fontSize={'xs'}>{v.Name} </Td>
								<Td fontSize={'xs'}>{formatCurrency(v.worth)}</Td>
								<Td fontSize={'xs'}>{v.code}</Td>
								<Td fontSize={'xs'}>{formatCurrency(v.amount)}</Td>

								<Td fontSize={'xs'}>{v.date}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

const DashboardContent = () => {
	const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);
	const [vData, setVData] = useState<{
		total_purchase: string;
		total_used: string;
		total_voucher: string;
	} | null>(null);
	const navigate = useNavigate();
	const [from, setFrom] = useState(
		moment().subtract(7, 'days').format('YYYY-MM-DD')
	);
	const [to, setTo] = useState(moment().format('YYYY-MM-DD'));

		useEffect(() => {
			const fetchDashboard = async () => {
				const token = localStorage.getItem('PYMAILYR') || '';
				const res = await dashboardService.merchantDashboard({
					merchant_dashboard: token,
					from,
					to,
				});
				setVouchers(res[1]);
				setVData(res[0]);
				console.log({ res });
			};

			try {
				fetchDashboard();
			} catch (error) {
				console.error(error);
			}
		}, [to, from]);
	return (
		<>
			{' '}
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard
					value={formatCurrency(vData?.total_voucher.replace(',', '') || 0)}
					label='Cumulative Voucher Balance'
					isChecked={true}
				/>
				<DisplayCard
					value={vData?.total_used || 0}
					label='Amount Claimed'
					isChecked={true}
				/>
				<DisplayCard
					value={formatCurrency(vData?.total_purchase || 0)}
					label='Total Purchased'
					isChecked={true}
				/>
			</Flex>
			<Flex color={'black'} gap={3} flexWrap={'wrap'}>
				<Flex flexDir={'column'} gap={5} bgColor={'white'}>
					<Flex
						boxShadow={'md'}
						borderRadius={'md'}
						p={2}
						flexDir={'column'}
						minH={'35vh'}
						maxW={'90vw'}
					>
						<Flex
							justifyContent={'space-between'}
							flex={1}
							fontSize={'xs	'}
							alignItems={'center'}
							borderRadius={'md'}
						>
							<Text>Overall Reward Spend</Text>
							<Stack direction='row' gap={0}>
								<Input
									type='date'
									value={from}
									onChange={(e) => setFrom(e.target.value)}
									size={'xs	'}
								/>
								<Input
									type='date'
									value={to}
									onChange={(e) => setTo(e.target.value)}
									size={'xs	'}
								/>
							</Stack>
						</Flex>
						<Box minH={'30vh'}>
							<DashboardChart />
						</Box>
					</Flex>
					<Flex
						boxShadow={'md'}
						borderRadius={'md'}
						flexDir={'column'}
						flexWrap={'wrap'}
						maxW={'90vw'}
					>
						<Flex
							justifyContent={'space-between'}
							fontSize={'sm'}
							alignItems={'center'}
							p={2}
						>
							<Flex gap={2} alignItems={'center'}>
								<Text>Vouchers</Text>
								{/* <Select placeholder='This Week' size={'xs'}>
									<option value='option1'>This Week</option>
									<option value='option2'>Last Week</option>
									<option value='option3'>Last Month</option>
								</Select> */}
							</Flex>
							<Text
								color={'#825EE4'}
								fontSize={'xs'}
								textDecor={'underline'}
								onClick={() => navigate('/vouchers')}
								cursor={'pointer'}
							>
								View all
							</Text>
						</Flex>

						<VocuhersTable vouchers={vouchers} />
					</Flex>
				</Flex>
				<Flex flexDir={'column'} gap={5} bgColor={'white'}>
					<Flex
						boxShadow={'md'}
						borderRadius={'md'}
						flexDir={'column'}
						// flex={1}
					>
						<Flex
							justifyContent={'space-between'}
							fontSize={'xs'}
							flex={1}
							alignItems={'center'}
							p={2}
						>
							<Text>Voucher Balances</Text>
							<Link color={'#825EE4'} textDecor={'underline'}>
								View all
							</Link>
						</Flex>
						<Flex flexDir={'column'} gap={1}>
							{vouchers.map((v) => (
								<VoucherCard
									key={v.code}
									value={formatCurrency(v.amount)}
									label={v.Name}
									icon={v.image}
								/>
							))}
						</Flex>
					</Flex>
					<Flex
						boxShadow={'md'}
						borderRadius={'md'}
						flexDir={'column'}
						flex={1}
						bg={'#E2E0EA'}
						p={4}
						gap={3}
					>
						<Flex flex={1} flexDir={'column'} gap={2}>
							<Image src={rectangle} alt='rec' />
							<Text fontSize={'xs'}>
								Learn How to multiply wealth using Rewards system{' '}
							</Text>
						</Flex>
						<Link fontSize={'xs'} color={'#825EE4'}>
							<Flex alignItems={'center'} gap={2}>
								Get more information <IoIosArrowForward />
							</Flex>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export const MerchantDashboard = () => {
	const { currentUser } = useContext(CurrentUserContext);
	return (
		<>
			<Flex flexDir={'column'} gap={3} justifyContent={'space-between'}>
				{currentUser?.businessName === null ? <Empty /> : <DashboardContent />}
			</Flex>
		</>
	);
};
