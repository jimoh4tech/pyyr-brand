import {
	Avatar,
	Button,
	Card,
	CardBody,
	Flex,
	Stack,
	Text,
} from '@chakra-ui/react';
import { DisplayCard } from './dashboard';
import voucherService from '../../services/voucher';
import { useEffect, useState } from 'react';
import { IVoucherTable } from '../../interface/voucher';
import { VocuherDetailModal } from './market-place';
import { formatCurrency } from '../../util/format-currency.util';
import { useNavigate } from 'react-router-dom';


const VoucherCard = ({ voucher }: { voucher: IVoucherTable }) => {
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
						<VocuherDetailModal voucher={voucher} />
						
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
							{formatCurrency(voucher.amount)}
						</Text>
					</Flex>
				</Stack>
			</CardBody>
		</Card>
	);
};

export const MerchantVoucherPage = () => {
	const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVouchers = async () => {
			const token = localStorage.getItem('PYMAILYR') || '';
			const res = await voucherService.getAllMerchantVouchers({
				list_voucher: token,
			});

			console.log({ res });
			setVouchers(res[1]);
		};

		fetchVouchers();
	}, []);
	return (
		<Stack>
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard value={0} label='Cumulative Balance' isChecked={true} />
				<DisplayCard value={0} label='No of Brand Vouchers' isChecked={true} />
				<DisplayCard value={0} label='Gifted Vouchers' isChecked={true} />
			</Flex>

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
						<Text fontSize={'xs'}>Voucher Balances</Text>
					</Flex>
					<Button
						size={'xs'}
						colorScheme='purple'
						
						onClick={() => navigate('/merchant/marketplace')}
					>
						Purchase Voucher
					</Button>
				</Flex>

				<Flex flexWrap={'wrap'} gap={3} justifyContent={'center'}>
					{vouchers.map((v) => (
						<VoucherCard key={v.code} voucher={v} />
					))}
				</Flex>
			</Flex>
		</Stack>
	);
};
