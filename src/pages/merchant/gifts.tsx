import {
	Button,
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
import { CreatableSelect } from 'chakra-react-select';
import { useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';

const EditGiftModal = ({ invitee }: { invitee: string }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const toast = useToast();
	const [isLoading, toggleLoading] = useState(false);
	const [email, setEmail] = useState(invitee);

	const handleUpdate = async () => {
		try {
			toggleLoading(true);
			const email = localStorage.getItem('PYMAILYR') || '';
			const val = {
				update_voucher: email,
			};
			console.log(val);
			// const res = await dashboardService.updateVoucher(val);
			// console.log(res);
			// if (res.responseCode == 200) {
			// 	toast({
			// 		title: 'Gift Successfully Updated',
			// 		description: res.responseMessage,
			// 		status: 'success',
			// 		duration: 9000,
			// 		isClosable: true,
			// 		position: 'top-right',
			// 	});
			// 	toggleLoading(false);
			// 	onClose();
			// } else {
			// 	toggleLoading(false);
			// 	toast({
			// 		title: 'Error',
			// 		description:
			// 			res.responseMessage ||
			// 			'Opps! Something went wrong, try again later',
			// 		status: 'error',
			// 		duration: 9000,
			// 		isClosable: true,
			// 		position: 'top-right',
			// 	});
			// }
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<CiEdit onClick={onOpen}/>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={'medium'}>Edit Vocuher Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack>
							<Flex justifyContent={'space-between'} alignItems={'center'}>
								<Text fontSize={'small'}>Email</Text>
								<Input
									type='email'
									w={'50%'}
									size={'sm'}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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

const GiftTable = () => {
	const giftsList: string[] = [
		'olu@pyyr.io',
		'ibile@com.go',
		'owanbe@google.com',
	];
	return (
		<Stack p={2} bgColor={'white'} boxShadow={'lg'} borderRadius={'lg'}>
			<TableContainer>
				<Table variant='simple' size={'sm'}>
					<Thead>
						<Tr>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Invitees
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Action
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{giftsList.map((t) => (
							<Tr fontSize={'xs'} key={t}>
								<Td fontSize={'xs'}>
									<Text fontSize={'xs'}>{t}</Text>
								</Td>
								<Td fontSize={'xs'}>
									<Tr fontSize={'xs'} key={t}>
										<Td>
											<EditGiftModal invitee={t} />
										</Td>
									</Tr>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export const GiftsPage = () => {
	const [emails, setEmails] = useState<readonly string[]>([]);
	const toast = useToast();
	return (
		<Stack gap={5}>
			{' '}
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard value='0' label='Total No of Invitees' isChecked={true} />
				<DisplayCard value='0' label='Total No Redeemed' isChecked={true} />
				<DisplayCard
					value='0'
					label='Total No to be claimed'
					isChecked={true}
				/>
			</Flex>
			<Flex gap={3}>
				<CreatableSelect
					isMulti
					size={'sm'}
					placeholder='Add Email Address'
					value={emails}
					onChange={setEmails}
				/>
				<Button size={'sm'} colorScheme='purple'>
					Add
				</Button>
				<Button
					size={'sm'}
					rightIcon={<AiOutlineFileAdd />}
					onClick={() =>
						toast({
							title: 'Coming soon',
							description: "We're currently working on this feature!",
							status: 'info',
							duration: 9000,
							isClosable: true,
							position: 'top-right',
						})
					}
				>
					Import File
				</Button>
			</Flex>
			<GiftTable />
		</Stack>
	);
};
