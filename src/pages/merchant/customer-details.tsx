import {
	Badge,
	Box,
	Button,
	Flex,
	Input,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { IVoucherTable } from '../../interface/voucher';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const CustomersDetailsChart = () => {
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

const CustomerRewardTable = () => {
	const vouchers: IVoucherTable[] = [
		{
			name: 'Emerald',
			type: 'Single Use',
			worth: '₦20,000',
			id: '#768',
			quantity: '350',
			price: '₦100,000',
			status: 'Partially Redeemed',
			expireDate: 'N/A',
			merchant: 'Dangote',
		},
		{
			name: 'Platinum',
			type: 'Multiple Use	',
			worth: '₦500,000',
			id: '#768',
			quantity: '350',
			price: '₦100,000',
			status: 'Partially Redeemed',
			expireDate: '20/02/2024',
			merchant: 'Coca-cola',
		},
		{
			name: 'Beryl',
			type: 'Single Use',
			worth: '₦20,000',
			id: '#768',
			quantity: '350',
			price: '₦100,000',
			status: 'Not Redeemed',
			expireDate: '20/02/2024',
			merchant: 'Maggi',
		},
		{
			name: 'Emerald',
			type: 'Single Use',
			worth: '₦20,000',
			id: '#768',
			quantity: '350',
			price: '₦100,000',
			status: 'Redeemed',
			expireDate: '20/02/2024',
			merchant: 'Nestle',
		},
		{
			name: 'Platinum',
			type: 'Multiple Use	',
			worth: '₦500,000',
			id: '#768',
			quantity: '350',
			price: '₦100,000',
			status: 'Redeemed',
			expireDate: '20/02/2024',
			merchant: 'Huggies',
		},
		{
			name: 'Beryl',
			type: 'Single Use',
			worth: '₦20,000',
			id: '#768',
			quantity: '350',
			price: '₦100,000',
			status: 'Not Redeemed',
			expireDate: '20/02/2024',
			merchant: 'Kellogs',
		},
	];
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Voucher's Worth
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								ID
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Date Rewarded
							</Th>

							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Expiry Date
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Brand
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Status
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{vouchers.map((v) => (
							<Tr fontSize={'xs'} key={v.id}>
								<Td fontSize={'xs'}>{v.name}</Td>
								<Td fontSize={'xs'}>#{v.id}</Td>
								<Td fontSize={'xs'}>{v.worth}</Td>
								<Td fontSize={'xs'}>{v.expireDate}</Td>
								<Td fontSize={'xs'}>{v.price}</Td>
								<Td fontSize={'xs'}>
									<Badge
										// eslint-disable-next-line no-constant-condition
										bgColor={
											v.status === 'Not Redeemed'
												? '#ffd5d0'
												: v.status === 'Partially Redeemed'
												? '#ffe3b2'
												: '#d4f7e1'
										}
										textTransform={'capitalize'}
										borderRadius={'10px'}
									>
										{v.status}
									</Badge>{' '}
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export const CustomerDetails = () => {
	const navigate = useNavigate();
	const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
	return (
		<>
			<Stack gap={3} bgColor={'white'}>
				<Flex py={2} px={5} alignItems={'center'} gap={2}>
					<Button
						leftIcon={<IoIosArrowBack />}
						size={'xs'}
						onClick={() => navigate('/merchant/customers')}
					>
						Customer List
					</Button>
					<Text>|</Text>
					<Button size={'xs'}>View Single Customer</Button>
				</Flex>

				<Stack p={5}>
					<Text
						fontSize={'xs'}
						fontWeight={'bold'}
					>{`Demi Charlse | demi@gms.com | #w2342`}</Text>
					<Text fontSize={'xs'}>{`Added on 12/02/2012`}</Text>
					<Badge w={'60px'} fontSize={'xs'} borderRadius={'lg'}>
						Active
					</Badge>
				</Stack>

				<Flex
					boxShadow={'lg'}
					borderRadius={'md'}
					bgColor={'white'}
					p={4}
					flexDir={'column'}
					minH={'35vh'}
					gap={3}
				>
					<Flex
						fontSize={'xs	'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Text fontWeight={'bold'}>Overall Reward Trend</Text>
						<Input
							type='date'
							value={toDate}
							onChange={(e) => setToDate(e.target.value)}
							size={'xs	'}
							width={'auto'}
						/>
					</Flex>
					<Box h={'30vh'}>
						<CustomersDetailsChart />
					</Box>
				</Flex>
				<Stack
					bgColor={'white'}
					borderRadius={'lg'}
					p={4}
					gap={4}
					boxShadow={'lg'}
				>
					<Text fontSize={'sm'} fontWeight={'bold'}>
						Sales History
					</Text>
					<CustomerRewardTable />
				</Stack>
			</Stack>
		</>
	);
};
