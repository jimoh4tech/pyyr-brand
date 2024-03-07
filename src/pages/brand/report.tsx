import {
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
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ISalesTable } from '../../interface/report';
import { IoEyeOutline } from 'react-icons/io5';

const ReportChart = () => {
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

const SalesTable = () => {
	const transactionList: ISalesTable[] = [
		{
			id: 'ee',
			quantity: 10,
			totalRedeemed: 'N222,000.90',
			date: 'Nov 13/2023',
			partialRedeemed: 'N333.32',
			expired: 'N339,400.09',
		},
		{
			id: 'e3',
			quantity: 10,
			totalRedeemed: 'N222,000.90',
			date: 'Nov 13/2023',
			partialRedeemed: 'N333.32',
			expired: 'N339,400.09',
		},
		{
			id: 'e5',
			quantity: 10,
			totalRedeemed: 'N222,000.90',
			date: 'Nov 13/2023',
			partialRedeemed: 'N333.3',
			expired: 'N339,400.09',
		},
		{
			id: 'e34',
			quantity: 50,
			totalRedeemed: 'N222,000.90',
			date: 'Nov 13/2023',
			partialRedeemed: 'N333.32',
			expired: 'N339,400.09',
		},
		{
			id: 'e25',
			quantity: 10,
			totalRedeemed: 'N222,000.90',
			date: 'Nov 13/2023',
			partialRedeemed: 'N333.78',
			expired: 'N339,400.09',
		},
	];
	return (
		<>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Date
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Qty Sold
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Total Redeemed
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Total Expired
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Partially Redeemed
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Action
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{transactionList.map((t) => (
							<Tr fontSize={'xs'} key={t.id}>
								<Td fontSize={'xs'}>{t.date} </Td>
								<Td fontSize={'xs'}>{t.quantity}</Td>
								<Td fontSize={'xs'}>{t.totalRedeemed}</Td>
								<Td fontSize={'xs'}>{t.expired}</Td>
								<Td fontSize={'xs'}>{t.partialRedeemed}</Td>
								<Td>
									<IoEyeOutline size={'20px'} cursor={'pointer'} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export const Report = () => {
	const [fromDate, setFromDate] = useState(
		moment().subtract(1, 'days').format('YYYY-MM-DD')
	);
	const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
	return (
		<>
			<Stack gap={3}>
				<Flex
					justifyContent={'space-between'}
					flex={1}
					bgColor={'white'}
					py={2}
					px={5}
					boxShadow={'md'}
					alignItems={'center'}
				>
					<Text fontWeight={'bold'}>Sales Report</Text>
					<Stack direction={'row'}>
						<Button
							size={'sm'}
							variant={'outline'}
							leftIcon={<MdOutlineArrowOutward />}
						>
							Export Overview
						</Button>
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
					</Stack>
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
						<Text>Overall Sales Trend</Text>
						<Stack direction='row' gap={0}>
							<Text>Redeemed</Text>
							<Text>Unredeemed</Text>
						</Stack>
					</Flex>
					<Box h={'30vh'}>
						<ReportChart />
					</Box>
				</Flex>
				<Stack bgColor={'white'} borderRadius={'lg'} p={4} gap={4}>
					<Text fontSize={'sm'} fontWeight={'bold'}>
						Sales History
					</Text>
					<SalesTable />
				</Stack>
			</Stack>
		</>
	);
};
