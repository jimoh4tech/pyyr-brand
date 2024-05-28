import {
	Alert,
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Heading,
	Image,
	Input,
	Link,
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
	useMediaQuery,
} from '@chakra-ui/react';
import { LuAlertCircle } from 'react-icons/lu';
import empty from '../../assets/empty.svg';
import campaignIcon from '../../assets/campaign_icon.svg';
import balance from '../../assets/balance.svg';
import progress from '../../assets/progress.svg';
import image from '../../assets/image.svg';
import rectangle from '../../assets/rectangle.svg';
import { IoIosArrowForward } from 'react-icons/io';
import { useContext, useState } from 'react';
import moment from 'moment';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { CurrentUserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';

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
					href='/kyc'
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
							onClick={() => navigate('/kyc')}
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
	icon,
	title,
}: {
	value: string | number;
	label: string;
	icon: string;
	title?: string;
}) => {
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
				<Heading size={{ base: 'sm', md: 'md' }}> {(value)}</Heading>
				<Flex justifyContent={'space-between'}>
					<Text fontSize={{ base: '2xs', md: 'xs' }}>{label}</Text>
					<Box bgSize={{ base: '2xs', md: 'sm' }}>
						<Image src={icon} alt={label} />
					</Box>
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
						<Avatar size={{ base: 'xs', md: 'sm' }} src={icon} />
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

const CampaignsTable = () => {
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
								No of Winners
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Voucher’s Worth
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Brand
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Status{' '}
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr fontSize={'xs'}>
							<Td fontSize={'xs'}>Christmas Rush </Td>
							<Td fontSize={'xs'}>100</Td>
							<Td fontSize={'xs'}>₦20,000</Td>
							<Td fontSize={'xs'}>Spotify</Td>
							<Td fontSize={'xs'}>
								<Badge
									// eslint-disable-next-line no-constant-condition
									bgColor={true ? '#ffdfdf' : '#d4f7e1'}
									textTransform={'capitalize'}
									borderRadius={'10px'}
								>
									Unclaimed
								</Badge>{' '}
							</Td>
						</Tr>
						<Tr>
							<Td fontSize={'xs'}>Joy in the Villa</Td>
							<Td fontSize={'xs'}>50</Td>
							<Td fontSize={'xs'}>₦20,000</Td>
							<Td fontSize={'xs'}>D’ Place</Td>
							<Td fontSize={'xs'}>
								<Badge
									// eslint-disable-next-line no-constant-condition
									bgColor={false ? '#ffdfdf' : '#d4f7e1'}
									textTransform={'capitalize'}
									borderRadius={'10px'}
								>
									Claimed
								</Badge>{' '}
							</Td>
						</Tr>
						<Tr>
							<Td fontSize={'xs'}>Christmas Rush </Td>
							<Td fontSize={'xs'}>100</Td>
							<Td fontSize={'xs'}>₦20,000</Td>
							<Td fontSize={'xs'}>Spotify</Td>
							<Td fontSize={'xs'}>
								<Badge
									// eslint-disable-next-line no-constant-condition
									bgColor={true ? '#ffdfdf' : '#d4f7e1'}
									textTransform={'capitalize'}
									borderRadius={'10px'}
								>
									Unclaimed
								</Badge>{' '}
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

const DashboardContent = () => {
	const [fromDate, setFromDate] = useState(
		moment().subtract(1, 'days').format('YYYY-MM-DD')
	);
	const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
	return (
		<>
			{' '}
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard
					value='N1,600,000'
					label='Cumulative Voucher Balance'
					icon={balance}
				/>
				<DisplayCard value='N500,000' label='Amount Claimed' icon={progress} />
				<DisplayCard value='10' label='Active Campaigns' icon={campaignIcon} />
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
								<Text>Campaigns</Text>
								<Select placeholder='This Week' size={'xs'}>
									<option value='option1'>This Week</option>
									<option value='option2'>Last Week</option>
									<option value='option3'>Last Month</option>
								</Select>
							</Flex>
							<Link color={'#825EE4'} fontSize={'xs'} textDecor={'underline'}>
								View all
							</Link>
						</Flex>

						<CampaignsTable />
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
							<VoucherCard value='N80,000' label='Nike' icon={image} />
							<VoucherCard value='N480,000' label='Spur' icon={image} />
							<VoucherCard value='N100,000' label='Shoprite' icon={image} />
							<VoucherCard value='N480,000' label='D place' icon={image} />
							<VoucherCard value='N20,000' label='Nike' icon={image} />
							<VoucherCard value='N280,000' label='Spotify' icon={image} />
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

export const BrandDashboard = () => {
	const { currentUser } = useContext(CurrentUserContext);
	return (
		<>
			<Flex flexDir={'column'} gap={3} justifyContent={'space-between'}>
				{currentUser?.businessName === null ? <Empty /> : <DashboardContent />}
			</Flex>
		</>
	);
};
