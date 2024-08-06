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

const SalesDetailsChart = () => {
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

const SalesDetailsTable = () => {
	const vouchers: IVoucherTable[] = [];
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Voucher Name
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Voucher ID
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Worth
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Quantity
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Merchant
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Expiry Date
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Amount
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Status
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{vouchers.map((v) => (
							<Tr fontSize={'xs'} key={v.code}>
								<Td fontSize={'xs'}>{v.Name}</Td>
								<Td fontSize={'xs'}>#{v.code}</Td>
								<Td fontSize={'xs'}>{v.worth}</Td>
								<Td fontSize={'xs'}>{v.qty}</Td>
								<Td fontSize={'xs'}>{v.merchant}</Td>
								<Td fontSize={'xs'}>{v.expireDate}</Td>
								<Td fontSize={'xs'}>{v.price}</Td>
								<Td fontSize={'xs'}>
									<Badge
										// eslint-disable-next-line no-constant-condition
										bgColor={
											v.visibility === 'Not Redeemed'
												? '#ffd5d0'
												: v.visibility === 'Partially Redeemed'
												? '#ffe3b2'
												: '#d4f7e1'
										}
										textTransform={'capitalize'}
										borderRadius={'10px'}
									>
										{v.visibility}
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

export const SalesDetails = () => {
	const navigate = useNavigate();
	const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
	return (
		<>
			<Stack gap={3}>
				<Flex py={2} px={5} alignItems={'center'} gap={2}>
					<Button
						leftIcon={<IoIosArrowBack />}
						size={'sm'}
						onClick={() => navigate('/report')}
					>
						Sales Report
					</Button>
					<Text>|</Text>
					<Button size={'sm'}>View Report</Button>
				</Flex>
				
				<Flex
					boxShadow={'lg'}
					borderRadius={'md'}
					bgColor={'white'}
					p={4}
					flexDir={'column'}
					flex={1}
					minH={'35vh'}
					gap={3}
				>
					<Flex flex={1} fontSize={'xs'} alignItems={'center'} justifyContent={'space-between'}>
						<Text fontWeight={'bold'}>Voucher Sales</Text>
						<Input
							type='date'
							value={toDate}
							onChange={(e) => setToDate(e.target.value)}
							size={'xs	'}
							width={'auto'}
						/>
					</Flex>
					<Box h={'30vh'}>
						<SalesDetailsChart />
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
					<SalesDetailsTable />
				</Stack>
			</Stack>
		</>
	);
};
