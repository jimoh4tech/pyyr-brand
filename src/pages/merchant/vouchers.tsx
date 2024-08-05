import {
	Avatar,
	Button,
	Card,
	CardBody,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { DisplayCard } from './dashboard';
import voucherService from '../../services/voucher';
import { useEffect, useState } from 'react';
import { IVoucherTable } from '../../interface/voucher';
import { VocuherDetailModal } from './market-place';
import { formatCurrency } from '../../util/format-currency.util';
import { useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import dashboardService from '../../services/dashboard';

const EditVoucherModal = ({ voucher }: { voucher: IVoucherTable }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const [isLoading, toggleLoading] = useState(false);
	const [date, setDate] = useState('');

	const handleUpdate = async () => {
		try {
			toggleLoading(true);
			const email = localStorage.getItem('PYMAILYR') || '';
			const val = {
				update_voucher: email,
				v_code: voucher.code,
				exp: date,
			};							
			console.log(val);
			const res = await dashboardService.updateVoucher(val);
			console.log(res);
			if (res.responseCode == 200) {
				toast({
					title: 'Voucher Successfully Updated',
					description: res.responseMessage,
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right',
				});
				toggleLoading(false);
				onClose();
			} else {
				toggleLoading(false);
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
	};

	return (
		<>
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
				onClick={onOpen}
			>
				<CiEdit />
			</Flex>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={'medium'}>Edit Vocuher Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Flex justifyContent={'space-between'}>
								<Text fontSize={'small'}>Name</Text>
								<Text fontSize={'small'}>{voucher.Name}</Text>
							</Flex>
							<Flex justifyContent={'space-between'}>
								<Text fontSize={'small'}>Code:</Text>
								<Text fontSize={'small'}>{voucher.code}</Text>
							</Flex>
							<Flex justifyContent={'space-between'}>
								<Text fontSize={'small'}>Quantity:</Text>
								<Text fontSize={'small'}>{voucher.qty}</Text>
							</Flex>
							<Flex justifyContent={'space-between'} alignItems={'center'}>
								<Text fontSize={'small'}>Expiration Date:</Text>
								<Input
									type='date'
									w={'50%'}
									size={'sm'}
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</Flex>

							<Flex my={5}>
								<Spacer />
								<Button
									size={'sm'}
									colorScheme='purple'
									variant={'outline'}
									mr={4}
									onClick={onClose}
								>
									Close
								</Button>
								<Button
									size={'sm'}
									colorScheme='purple'
									onClick={handleUpdate}
									isLoading={isLoading}
								>
									Update
								</Button>
							</Flex>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

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
							<Text fontSize={'xs'}>{voucher.promotional_title}</Text>
						</Stack>
					</Flex>

					<Flex justifyContent={'space-around'}>
						<VocuherDetailModal voucher={voucher} />
						<EditVoucherModal voucher={voucher} />
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
	const [vData, setVData] = useState<{
		total_purchase: string;
		total_used: string;
		total_voucher: string;
	} | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchVouchers = async () => {
			const token = localStorage.getItem('PYMAILYR') || '';
			const res = await voucherService.getAllMerchantVouchers({
				list_voucher: token,
			});

			console.log({ res });
			setVouchers(res[1]);
			setVData(res[0]);
		};

		fetchVouchers();
	}, []);
	return (
		<Stack>
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard
					value={formatCurrency(vData?.total_voucher?.replace(',', '') || 0)}
					label='Cumulative Balance'
					isChecked={true}
				/>
				<DisplayCard
					value={vData?.total_used || 0}
					label='Total Used'
					isChecked={true}
				/>
				<DisplayCard
					value={formatCurrency(vData?.total_purchase?.replace(',', '') || 0)}
					label='Total Purchased'
					isChecked={true}
				/>
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
