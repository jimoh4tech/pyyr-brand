import { Avatar, Card, CardBody, Flex, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IVoucherTable } from '../../interface/voucher';
import voucherService from '../../services/voucher';
import { IoEyeOutline } from 'react-icons/io5';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { formatCurrency } from '../../util/format-currency.util';

const MarketPlaceCard = ({ voucher }: { voucher: IVoucherTable }) => {
	return (
		<Card w={'290px'}>
			<CardBody>
				<Stack gap={4}>
					<Flex gap={4} alignItems={'center'}>
						<Avatar src={voucher.image} name={voucher.Name} />
						<Stack>
							<Text
								fontSize={'xs'}
								fontWeight={'bold'}
							>{`${voucher.Name} | ${voucher.code}`}</Text>
							<Text fontSize={'xs'}>{voucher.redemption}</Text>
						</Stack>
					</Flex>

					<Flex justifyContent={'space-around'}>
						<Flex
							bgColor={'white'}
							px={5}
							py={2}
							w='100px'
							border={'1px solid #f2f2f2'}
							borderRadius={'md'}
							boxShadow={'md'}
							justifyContent={'center'}
							cursor={'pointer'}
						>
							<IoEyeOutline />
						</Flex>
						<Flex
							bgColor={'white'}
							px={5}
							py={2}
							w='100px'
							border={'1px solid #f2f2f2'}
							borderRadius={'md'}
							boxShadow={'md'}
							justifyContent={'center'}
							cursor={'pointer'}
						>
							<HiOutlineShoppingBag />
						</Flex>
					</Flex>

					<Flex
						bgColor={'white'}
						px={5}
						py={3}
						border={'1px solid #f2f2f2'}
						borderRadius={'md'}
						boxShadow={'md'}
						justifyContent={'center'}
						flexDir={'column'}
						alignItems={'center'}
					>
						<Text fontSize={'md'} fontWeight={'bold'}>
							{formatCurrency(voucher.worth)}
						</Text>
						<Text fontSize={'xs'}>Quantity In cart: 0</Text>
					</Flex>
				</Stack>
			</CardBody>
		</Card>
	);
};

const MarketPlaceCardList = ({ vouchers }: { vouchers: IVoucherTable[] }) => {
	return (
		<Flex flexWrap={'wrap'} gap={3} justifyContent={'center'}>
			{vouchers.map((v) => (
				<MarketPlaceCard voucher={v} key={v.code} />
			))}
		</Flex>
	);
};

export const MarketPlacePage = () => {
	const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);
	useEffect(() => {
		const fetchVouchers = async () => {
			const token = localStorage.getItem('PYMAILYR') || '';
			const res = await voucherService.getAllVouchers({ all_voucher: token });
			setVouchers(res[1]);
			console.log({ res, data: res[1] });
		};

		fetchVouchers();
	}, []);
	return (
		<Stack>
			<Flex
				flex={1}
				boxShadow={'md'}
				borderRadius={'md'}
				flexDir={'column'}
				p={1}
			>
				<Flex
					justifyContent={'space-between'}
					fontSize={'sm'}
					alignItems={'center'}
					p={2}
				>
					<Flex gap={2} alignItems={'center'}>
						<Text fontSize={'xs'}>Brands</Text>
					</Flex>
				</Flex>

				<MarketPlaceCardList vouchers={vouchers} />
			</Flex>
		</Stack>
	);
};
