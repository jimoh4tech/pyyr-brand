import {
	Avatar,
	Badge,
	Button,
	Card,
	CardBody,
	CardHeader,
	CircularProgress,
	CircularProgressLabel,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Heading,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Progress,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Switch,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Textarea,
	Th,
	Thead,
	Tr,
	useDisclosure,
	useMediaQuery,
	useToast,
} from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import empty from '../../assets/voucher_empty.svg';
import platium from '../../assets/platium.svg';
import emrald from '../../assets/emrald.svg';
import gift from '../../assets/gift.svg';
import verified from '../../assets/verified.svg';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { ItemCheck } from './kyc/index';
import { DisplayCard } from './dashboard';
import { FiSearch } from 'react-icons/fi';
import { IoEyeOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IVoucherTable } from '../../interface/voucher';
import voucherService from '../../services/voucher';
import { formatCurrency } from '../../util/format-currency.util';
import { useNavigate } from 'react-router-dom';

const ModalForm1 = () => {
	return (
		<>
			<Text fontSize={'sm'} fontWeight={'semibold'}>
				Does your business sell vouchers/gift card currently?
			</Text>
			<RadioGroup defaultValue='yes' colorScheme='purple' mt={4}>
				<Stack spacing={2}>
					<Radio size={'sm'} value='yes'>
						Yes
					</Radio>
					<Radio size={'sm'} value='no'>
						No
					</Radio>
				</Stack>
			</RadioGroup>
		</>
	);
};

const ModalForm2 = () => {
	return (
		<>
			<Text fontSize={'sm'} fontWeight={'semibold'}>
				Are you the principal owner/sole decision maker for this brand or
				business in relations to voucher sales?
			</Text>
			<RadioGroup defaultValue='yes' colorScheme='purple' mt={4}>
				<Stack spacing={2}>
					<Radio size={'sm'} value='yes'>
						Yes, i am the owner
					</Radio>
					<Radio size={'sm'} value='no'>
						No, i’m gathering information on behalf of the owner
					</Radio>
				</Stack>
			</RadioGroup>
		</>
	);
};
const ModalForm3 = () => {
	return (
		<>
			<Text fontSize={'sm'} fontWeight={'semibold'}>
				When would you like to go live with voucher/gift card sales
			</Text>
			<RadioGroup defaultValue='1' colorScheme='purple' mt={4}>
				<Stack spacing={2}>
					<Radio size={'sm'} value='1'>
						Immediately
					</Radio>
					<Radio size={'sm'} value='2'>
						In a week
					</Radio>
					<Radio size={'sm'} value='3'>
						In a Month
					</Radio>
					<Radio size={'sm'} value='4'>
						In 6-12 Weeks
					</Radio>
					<Radio size={'sm'} value='5'>
						In 6 Month
					</Radio>
				</Stack>
			</RadioGroup>
		</>
	);
};

const CreateVoucherModal = ({
	setStatus,
}: {
	setStatus: (status: string) => void;
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [step, setStep] = useState(1);

	return (
		<>
			<Button
				loadingText='Submitting'
				size='sm'
				colorScheme='purple'
				mt={2}
				onClick={onOpen}
				rightIcon={<IoIosArrowForward />}
			>
				Create Voucher
			</Button>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent gap={4}>
					<ModalHeader fontSize={'md'}>Create Voucher</ModalHeader>
					<ModalCloseButton />
					<Divider />
					<ModalBody>
						{step === 1 ? (
							<ModalForm1 />
						) : step === 2 ? (
							<ModalForm2 />
						) : (
							<ModalForm3 />
						)}
					</ModalBody>
					<Divider />
					<ModalFooter>
						<Button
							size={'sm'}
							onClick={() =>
								step < 3 ? setStep(step + 1) : setStatus('create')
							}
							colorScheme='purple'
						>
							Proceed
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const Empty = ({ setStatus }: { setStatus: (status: string) => void }) => {
	return (
		<>
			<Flex
				gap={3}
				flexDir={'column'}
				boxShadow={'md'}
				minH={'80vh'}
				justifyContent={'center'}
			>
				<Flex justify={'center'}>
					<Image src={empty} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'} fontSize={'sm'}>
						You Presently have no Vouchers created
					</Text>
					<Text textAlign={'center'} fontSize={'xs'}>
						Kindly create a voucher to start selling to <br /> merchants
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<Stack gap={3}>
						<CreateVoucherModal setStatus={setStatus} />
					</Stack>
				</Flex>
			</Flex>
		</>
	);
};
const Form1 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'sm'}>Voucher Details</Heading>
					<Text fontSize={'xs'}>
						Kindly Provide the information below to create your voucher
					</Text>
					<Divider />
					<Flex p={5} bg={'white'}>
						<Flex flexDir={'column'} gap={3} w={'100%'}>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'image'}>
									{'Cover Image'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'image'}
										name={'image'}
										type='file'
										size={'xs'}
										onChange={(event) => {
											formik.setFieldValue(
												'image',
												event.currentTarget.files &&
													event.currentTarget.files[0]
											);
										}}
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'title'}>
									{'Voucher Title'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'title'}
										name={'voucher_name'}
										type='text'
										size={'xs'}
										value={formik.values.voucher_name}
										onChange={formik.handleChange}
										placeholder='Enter the name you’d like to display on this voucher'
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<FormLabel fontSize={'xs'} htmlFor={'promotion'}>
									{'Promotional Title'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'promotion'}
										name={'promotional_title'}
										type='text'
										size={'xs'}
										value={formik.values.promotional_title}
										onChange={formik.handleChange}
										placeholder='Additional subtext that’d catch the attention of your merchants'
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'description'}>
									{'Description'}
								</FormLabel>
								<InputGroup>
									<Textarea
										id={'description'}
										name={'voucher_des'}
										size={'xs'}
										value={formik.values.voucher_des}
										onChange={formik.handleChange}
										placeholder='Give more context to the value of this voucher card. E.g Perfect for Staff, Customers and friends incentives'
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'role'}>
									{'Voucher Redemption Type'}
								</FormLabel>
								<Select
									size={'xs'}
									name='redemption'
									placeholder='Select Voucher'
									onChange={formik.handleChange}
								>
									<option value='Single use Voucher'>Single use Voucher</option>
									<option value='Multi-use Voucher'>Multi-use Voucher</option>
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'role'}>
									{'Visibility'}
								</FormLabel>
								<Select
									size={'xs'}
									placeholder='Select Visibility'
									name='visibility'
									onChange={formik.handleChange}
								>
									<option value='Draft'>Draft</option>
									<option value='Private'>Private</option>
									<option value='Public'>Public</option>
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'role'}>
									{'Redeem/Usage Window'}
								</FormLabel>
								<FormLabel fontSize={'xs'} htmlFor={'role'}>
									{'Redeem/Usage Window'}
								</FormLabel>
								<Input
									id='exp'
									type='datetime-local'
									name='usage_limit'
									value={formik.values.usage_limit}
									onChange={formik.handleChange}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'Live'}>
									{'When would you like to go live?'}
								</FormLabel>
								<Input
									id='Live'
									type='datetime-local'
									name='live'
									value={formik.values.live}
									onChange={formik.handleChange}
								/>
							</FormControl>
						</Flex>
					</Flex>
					<Divider />
					<Flex justifyContent={'flex-end'} gap={3}>
						{/* <Button
								onClick={() => setStep(1)}
								colorScheme='purple'
								size={'xs'}
								variant={'ghost'}
								disabled={true}
							>
								Back
							</Button> */}
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(2)}>
							Proceed
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const Form2 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'sm'}>Redeem Location(s)</Heading>
					<Text fontSize={'xs'}>
						Kindly Provide the information below to create your voucher
					</Text>
					<Divider />
					<Flex p={5} bg={'white'}>
						<Flex flexDir={'column'} gap={3} w={'100%'}>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'location'}>
									{'Location Name'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'location'}
										name={'location_name'}
										type='text'
										size={'xs'}
										value={formik.values.location_name}
										onChange={formik.handleChange}
										placeholder='Enter location'
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<FormLabel fontSize={'xs'} htmlFor={'url'}>
									{'URL Location'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'url'}
										name={'url'}
										type='text'
										size={'xs'}
										value={formik.values.url}
										onChange={formik.handleChange}
										placeholder='Enter Link'
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'description'}>
									{'Description'}
								</FormLabel>
								<InputGroup>
									<Textarea
										id={'description'}
										name={'description'}
										size={'xs'}
										value={formik.values.description}
										onChange={formik.handleChange}
										placeholder='Give more context to the value of this voucher card. E.g Perfect for Staff, Customers and friends incentives'
									/>
								</InputGroup>
							</FormControl>

							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'how'}>
									{'How to Redeem Voucher'}
								</FormLabel>
								<InputGroup>
									<Textarea
										id={'how'}
										name={'redeem'}
										size={'xs'}
										value={formik.values.redeem}
										onChange={formik.handleChange}
										placeholder='1. Present your voucher card at any of our store during checkout.\n
2. Scan barcode using a barcode scanner at checkout\n 
3. Enter the unique voucher code at the online checkout on our website to enjoy the virtual shopping experience.'
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<FormLabel fontSize={'xs'} htmlFor={'video'}>
									{'Embed Explainer Video'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'video'}
										name={'video'}
										type='text'
										size={'xs'}
										value={formik.values.video}
										onChange={formik.handleChange}
										placeholder='Enter Link'
									/>
								</InputGroup>
							</FormControl>
						</Flex>
					</Flex>
					<Divider />
					<Flex justifyContent={'flex-end'} gap={3}>
						<Button
							onClick={() => setStep(1)}
							colorScheme='purple'
							size={'xs'}
							variant={'ghost'}
						>
							Back
						</Button>
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(3)}>
							Proceed
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const Form3 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'sm'}>Pricing</Heading>
					<Text fontSize={'xs'}>
						Kindly Provide the information below to create your voucher
					</Text>
					<Divider />
					<Flex p={5} bg={'white'}>
						<Flex flexDir={'column'} gap={3} w={'100%'}>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'worth'}>
									{'Voucher’s Monetary Worth'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'worth'}
										name={'worth'}
										type='text'
										size={'xs'}
										value={formik.values.worth}
										onChange={formik.handleChange}
										placeholder='What’s the worth of this voucher. E.g ₦20,000'
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'amount'}>
									{'Voucher Amount'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'amount'}
										name={'amount'}
										type='text'
										size={'xs'}
										value={formik.values.amount}
										onChange={formik.handleChange}
										placeholder='How much would you sell this voucher for?'
									/>
								</InputGroup>
							</FormControl>

							{/* <FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'role'}>
									{'Should this Voucher be redeemable once?'}
								</FormLabel>
								<Select size={'xs'} placeholder='Draft'>
									<option value='option1'>Yes, it should</option>
									<option value='option2'>
										No, it can be redeemable multiple times
									</option>
								</Select>
							</FormControl> */}
						</Flex>
					</Flex>
					<Divider />
					<Flex justifyContent={'flex-end'} gap={3}>
						<Button
							onClick={() => setStep(2)}
							colorScheme='purple'
							size={'xs'}
							variant={'ghost'}
						>
							Back
						</Button>
						<Button colorScheme='purple' size={'xs'} onClick={() => setStep(4)}>
							Proceed
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const VoucherCard = ({
	amount,
	worth,
	redemption,
	voucher_name,
}: {
	// image: string;
	amount: string;
	worth: string;
	voucher_name: string;
	redemption: string;
}) => {
	return (
		<Card backgroundColor={'#FF5C30'}>
			<CardHeader>
				<Flex justifyContent={'space-between'}>
					<Avatar name={voucher_name} size={'xs'} />
					<Text>#763</Text>
				</Flex>
			</CardHeader>
			<CardBody>
				<Stack gap={10}>
					<Flex
						justifyContent={'center'}
						alignItems={'center'}
						flexDir={'column'}
					>
						<Text fontWeight={'bold'} fontSize={'x-large'}>
							{voucher_name}
						</Text>
						<Text>{redemption}</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Stack>
							<Text fontWeight={'semibold'}>{formatCurrency(amount)}</Text>
							<Text>{`Cost Price: ${formatCurrency(worth)}`}</Text>
						</Stack>

						<Button variant={'outline'}>Buy Now</Button>
					</Flex>
				</Stack>
			</CardBody>
		</Card>
	);
};

const Form4 = ({
	setStep,
	formik,
}: {
	setStep: (num: number) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
}) => {
	return (
		<>
			<Flex bg={'white'} flex={1} flexDir={'column'}>
				<Flex p={5} flexDir={'column'} gap={3}>
					<Heading fontSize={'sm'}>Preview</Heading>
					<Text fontSize={'xs'}>
						A sneak peak on how the vouchers would look to your merchant
					</Text>
					<Divider />
					<Flex p={5} bg={'white'}>
						<Flex flexDir={'column'} gap={3} w={'100%'}>
							<VoucherCard {...formik.values} />
						</Flex>
					</Flex>
					<Divider />
					<Flex justifyContent={'flex-end'} gap={3}>
						<Button
							onClick={() => setStep(3)}
							colorScheme='purple'
							size={'xs'}
							variant={'ghost'}
						>
							Back
						</Button>
						<Button
							colorScheme='purple'
							size={'xs'}
							type='submit'
							isLoading={formik.isSubmitting}
						>
							Create
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const CreateVoucher = () => {
	const [step, setStep] = useState(1);
	const [isLessThan600] = useMediaQuery('(max-width: 600px)');
	const toast = useToast();
	// const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			voucher_name: '',
			promotional_title: '',
			voucher_des: '',
			redemption: '',
			visibility: '',
			usage_limit: '',
			live: '',
			worth: '',
			amount: '',
			image: '',
			location_name: '',
			url: '',
			description: '',
			redeem: '',
			video: '',
		},
		async onSubmit(values) {
			try {
				const token = localStorage.getItem('PYMAILYR') || '';
				const newVal = {
					...values,
					add_voucher: token,
					usage_limit: values.usage_limit.replace('T', ' '),
					live: values.live.replace('T', ' '),
				};
				console.log({ newVal });
				const res = await voucherService.createVoucher(newVal);
				console.log(res);

				if (res.responseCode == 200) {
					toast({
						title: 'Vocuher successfully created.',
						description: res.responseMessage,
						status: 'success',
						duration: 9000,
						isClosable: true,
						position: 'top-right',
					});
					// navigate('/vouchers');
				} else {
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
		},
	});

	return (
		<>
			<Flex
				color={'black'}
				boxShadow={'md'}
				minH={'90vh'}
				p={3}
				flexDir={'column'}
				mt={2}
				bgColor={'white'}
			>
				<Text>Create Voucher</Text>
				<Flex justify={'center'} display={isLessThan600 ? 'flex' : 'none'}>
					<CircularProgress value={step * 25} size={'70px'} color='#825ee4'>
						<CircularProgressLabel fontSize={'xs'}>
							{step} of 4
						</CircularProgressLabel>
					</CircularProgress>
				</Flex>
				<Flex gap={2}>
					<Flex
						flex={1}
						flexDir={'column'}
						p={5}
						boxShadow={'md'}
						fontSize={'xs'}
						gap={3}
						display={isLessThan600 ? 'none' : 'flex'}
					>
						<Text>Steps</Text>
						<Flex
							alignItems={'center'}
							gap={2}
							justifyContent={'space-between'}
						>
							<Progress
								value={step * 25}
								colorScheme='purple'
								w='130px'
								size='xs'
								borderRadius={'md'}
							/>
							<Text width={'32px'}>{step} of 4</Text>
						</Flex>

						<ItemCheck label='Voucher Details' value={1} step={step} />
						<ItemCheck label='Redeem Location(s)' value={2} step={step} />
						<ItemCheck label='Pricing ' value={3} step={step} />
						<ItemCheck label='Preview' value={4} step={step} />
					</Flex>
					<Flex bg={'#fbfbfb'} flex={3} p={isLessThan600 ? 1 : 5}>
						<form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
							{step === 1 ? (
								<Form1 setStep={setStep} formik={formik} />
							) : step === 2 ? (
								<Form2 setStep={setStep} formik={formik} />
							) : step === 3 ? (
								<Form3 setStep={setStep} formik={formik} />
							) : (
								<Form4 setStep={setStep} formik={formik} />
							)}
						</form>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

const ViewVoucherDrawer = ({
	code,
	worth,
	Date,
	Name,
	amount,
}: IVoucherTable) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IoEyeOutline size={'20px'} onClick={onOpen} />
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} size={'md'}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader fontSize={'sm'}>View Voucher</DrawerHeader>
					<Divider />
					<DrawerBody>
						<Stack gap={5}>
							<Avatar src={gift} />
							<Flex justifyContent={'space-between'}>
								<Text
									fontSize={'xs'}
									fontWeight={'bold'}
								>{`${Name} Voucher ${code}`}</Text>
								<HStack px={'3'} borderRadius={'lg'} boxShadow={'md'}>
									<Text fontSize={'xs'}>{Date}</Text>
									<Image src={verified} alt={Name} />
								</HStack>
								<Text
									fontSize={'xs'}
									px={'3'}
									borderRadius={'lg'}
									boxShadow={'md'}
								>
									{' '}
									{worth}
								</Text>
								<Text
									fontSize={'xs'}
									px={'3'}
									borderRadius={'lg'}
									boxShadow={'md'}
								>{`@ ${formatCurrency(amount)}`}</Text>
							</Flex>
							<Divider />
							<Text
								fontSize={'xs'}
								fontWeight={'semibold'}
								textDecor={'underline'}
							>
								Description
							</Text>
							<Text fontSize={'xs'}>
								This {worth} worth of voucher is a gateway to a delightful and
								personalised shopping experience for valued customers. With the
								freedom to choose from our extensive range of products and
								services, this voucher offers a myriad of possibilities
							</Text>
							<Text
								fontSize={'xs'}
								fontWeight={'semibold'}
								textDecor={'underline'}
							>
								How to Redeem Voucher
							</Text>
							<Text fontSize={'xs'}>
								1. Present your voucher card at any of our store during
								checkout.
								<br />
								2. Scan barcode using a barcode scanner at checkout <br />
								3. Enter the unique voucher code at the online checkout on our
								website to enjoy the virtual shopping experience.
							</Text>
							<Text
								fontSize={'xs'}
								fontWeight={'semibold'}
								textDecor={'underline'}
							>
								Where to Redeem
							</Text>
							<Text fontSize={'xs'}>
								1. At any of our store across the country.
								<br />
								2. On our website @ www.shoprite.com
							</Text>
							<Text
								fontSize={'xs'}
								fontWeight={'semibold'}
								textDecor={'underline'}
							>
								Expiry
							</Text>
							<Text fontSize={'xs'}>
								This Voucher Expires 1 month after purchase, after which becomes
								irredeemable.
							</Text>
							<Text fontSize={'xs'} fontWeight={'semibold'}>
								Additional Information
							</Text>
							<Flex justifyContent={'space-between'} gap={3}>
								<Card size={'sm'} flex={1}>
									<CardBody>
										<Stack spacing={'5'}>
											<Text fontSize={'xs'}>No of times sold</Text>
											<Text fontSize={'xs'} fontWeight={'semibold'}>
												35
											</Text>
										</Stack>
									</CardBody>
								</Card>
								<Card size={'sm'} flex={1}>
									<CardBody>
										<Stack spacing={'5'}>
											<Flex justifyContent={'space-between'}>
												<Text fontSize={'xs'}>Merchants</Text>
												<Text
													fontSize={'xs'}
													textDecor={'underline'}
													textColor={'#825EE4'}
												>
													View
												</Text>
											</Flex>
											<Text fontSize={'xs'} fontWeight={'semibold'}>
												5
											</Text>
										</Stack>
									</CardBody>
								</Card>
								<Card size={'sm'} flex={1}>
									<CardBody>
										<Stack spacing={'5'}>
											<Text fontSize={'xs'}>Quantity Sold</Text>
											<Text fontSize={'xs'} fontWeight={'semibold'}>
												350
											</Text>
										</Stack>
									</CardBody>
								</Card>
							</Flex>
						</Stack>
						<Divider />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const VoucherTable = ({ vouchers }: { vouchers: IVoucherTable[] }) => {
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
								Voucher Type
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Worth
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Voucher ID
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Quantity Sold
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Sales Price
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Status
							</Th>
							<Th fontSize={'xs'} textTransform={'capitalize'}>
								Action
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{vouchers?.map((v) => (
							<Tr fontSize={'xs'} key={v.code}>
								<Td fontSize={'xs'}>{v.Name}</Td>
								<Td fontSize={'xs'}>{v.redemption}</Td>
								<Td fontSize={'xs'}>{formatCurrency(v.worth)}</Td>
								<Td fontSize={'xs'}>{v.code}</Td>
								<Td fontSize={'xs'}>{v.quantity}</Td>
								<Td fontSize={'xs'}>{formatCurrency(v.amount)}</Td>
								<Td fontSize={'xs'}>
									<Badge
										// eslint-disable-next-line no-constant-condition
										bgColor={
											v.visibility === 'Draft'
												? '#ffd5d0'
												: v.visibility === 'Private'
												? '#ffe3b2'
												: '#d4f7e1'
										}
										textTransform={'capitalize'}
										borderRadius={'10px'}
									>
										{v.visibility}
									</Badge>{' '}
								</Td>
								<Td>
									<Flex
										justifyContent={'space-between'}
										alignItems={'center'}
										gap={2}
									>
										<Switch colorScheme='purple' size={'sm'} />{' '}
										<ViewVoucherDrawer {...v} />
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VoucherContent = ({ setStatus }: { setStatus: any }) => {
	const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);
	useEffect(() => {
		const fetchVouchers = async () => {
			const token = localStorage.getItem('PYMAILYR') || '';
			const res = await voucherService.getVouchers({ get_voucher: token });
			setVouchers(res[1]);
			console.log({ res, data: res[1] });
		};

		fetchVouchers();
	}, []);
	return (
		<>
			<Flex gap={{ base: 1, md: 3 }}>
				<DisplayCard value='35' label='Total No Vouchers' icon={emrald} />
				<DisplayCard
					value='₦20,000 '
					label='Most Purchased'
					icon={emrald}
					title='Emerald'
				/>
				<DisplayCard
					value='₦500,000'
					label='Least Purchased'
					icon={platium}
					title='Platinum'
				/>
			</Flex>
			<Flex
				flex={1}
				bg={'white'}
				borderRadius={'md'}
				boxShadow={'lg'}
				p={5}
				flexDir={'column'}
				gap={3}
			>
				<Flex
					justifyContent={'space-between'}
					flex={1}
					alignItems={'center'}
					flexWrap={'wrap'}
					gap={2}
				>
					<Text fontSize={'sm'}>Vouchers</Text>
					<InputGroup p={1} maxW={'60%'}>
						<InputLeftElement alignItems={'center'}>
							<FiSearch size={'15px'} />
						</InputLeftElement>
						<Input placeholder='Search' size={'sm'} borderRadius={'30px'} />
					</InputGroup>
					<Menu>
						<MenuButton
							fontSize={'sm'}
							as={Button}
							rightIcon={<MdKeyboardArrowDown />}
						>
							All
						</MenuButton>
						<MenuList>
							<MenuItem fontSize={'sm'}>All</MenuItem>
							<MenuItem fontSize={'sm'}>Draft</MenuItem>
							<MenuItem fontSize={'sm'}>Private</MenuItem>
							<MenuItem fontSize={'sm'}>Public</MenuItem>
						</MenuList>
					</Menu>
					<CreateVoucherModal setStatus={setStatus} />
				</Flex>
				<Divider />
				<VoucherTable vouchers={vouchers} />
			</Flex>
		</>
	);
};

export const Voucher = () => {
	const [status, setStatus] = useState<'empty' | 'create' | 'list'>('list');
	return (
		<>
			<Flex flexDir={'column'} gap={3} justifyContent={'space-between'}>
				{status === 'empty' ? (
					<Empty setStatus={() => setStatus('create')} />
				) : status === 'create' ? (
					<CreateVoucher />
				) : (
					<VoucherContent setStatus={() => setStatus('create')} />
				)}
			</Flex>
		</>
	);
};
