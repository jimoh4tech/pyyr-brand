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
import emrald from '../../assets/emrald.svg';
import { IoEyeOutline } from 'react-icons/io5';
import { HiOutlineShoppingBag } from 'react-icons/hi';



const VoucherCards = () => {
	return (
		<Flex flexWrap={'wrap'} gap={2}>
			<Card>
				<CardBody>
					<Stack gap={4}>
						<Flex gap={4} alignItems={'center'}>
							<Avatar name='Spotify' />
							<Stack>
								<Text
									fontSize={'xs'}
									fontWeight={'bold'}
								>{`Spotify Nigeria | Emrald #235`}</Text>
								<Text fontSize={'xs'}>{`Balance: N89,200`}</Text>
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
								N200,000
							</Text>
							<Text fontSize={'xs'}>Quantity: 20/50</Text>
						</Flex>
					</Stack>
				</CardBody>
			</Card>
			<Card>
				<CardBody>
					<Stack gap={4}>
						<Flex gap={4} alignItems={'center'}>
							<Avatar name='Spotify' />
							<Stack>
								<Text
									fontSize={'xs'}
									fontWeight={'bold'}
								>{`Spotify Nigeria | Emrald #235`}</Text>
								<Text fontSize={'xs'}>{`Balance: N89,200`}</Text>
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
								N200,000
							</Text>
							<Text fontSize={'xs'}>Quantity: 20/50</Text>
						</Flex>
					</Stack>
				</CardBody>
			</Card>
			<Card>
				<CardBody>
					<Stack gap={4}>
						<Flex gap={4} alignItems={'center'}>
							<Avatar name='Spotify' />
							<Stack>
								<Text
									fontSize={'xs'}
									fontWeight={'bold'}
								>{`Spotify Nigeria | Emrald #235`}</Text>
								<Text fontSize={'xs'}>{`Balance: N89,200`}</Text>
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
								N200,000
							</Text>
							<Text fontSize={'xs'}>Quantity: 20/50</Text>
						</Flex>
					</Stack>
				</CardBody>
			</Card>
		</Flex>
	);
};

export const MerchantVoucherPage = () => {
	return (
		<Stack>
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard value={0} label='Cumulative Balance' icon={emrald} />
				<DisplayCard value={0}label='No of Brand Vouchers' icon={emrald} />
				<DisplayCard value={0} label='Gifted Vouchers' icon={emrald} />
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
					<Button size={'xs'} colorScheme='purple'>
						Purchase Voucher
					</Button>
				</Flex>

				<VoucherCards />
			</Flex>
		</Stack>
	);
};
