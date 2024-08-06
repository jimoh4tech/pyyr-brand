import {
	Avatar,
	Box,
	BoxProps,
	Button,
	CloseButton,
	Divider,
	Flex,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';
import pyyr from '../../assets/pyyr.svg';
import dashboard from '../../assets/dashboard.svg';
import report from '../../assets/report.svg';
import profile from '../../assets/profile.svg';
import user from '../../assets/user.svg';
import wallet from '../../assets/wallet.svg';
import notification from '../../assets/voucher.svg';
import turn_left from '../../assets/turn_left.svg';
import { useNavigate } from 'react-router-dom';
import { INavItem } from '../../interface/interface.nav-items';
import { useContext, useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { CurrentUserContext } from '../../context/user.context';

interface SidebarProps extends BoxProps {
	onClose: () => void;
	currentNav: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setCurrentNav: any;
}

const NavItem = ({
	label,
	icon,
	href,
	isActive,
	setCurrentNav,
	onClose,
}: INavItem) => {
	const navigate = useNavigate();

	return (
		<>
			<Flex
				gap={5}
				onClick={() => {
					setCurrentNav(label);
					onClose();
				}}
			>
				<Flex alignItems={'center'}>
					<Box
						bgColor={isActive ? '#825EE4' : 'white'}
						w={'3px'}
						h={'12px'}
						borderRadius={'10px'}
					/>
				</Flex>
				<Flex
					gap={2}
					bg={isActive ? '#E0D5FF' : 'white'}
					flex={1}
					p={2}
					borderRadius={'md'}
					alignItems={'center'}
					cursor={'pointer'}
					onClick={() => navigate(href)}
					_hover={{ bg: '#E0D5FF' }}
				>
					<Box>
						<Image src={`${icon}`} />
					</Box>
					<Text color={'black'}>{label}</Text>
				</Flex>
			</Flex>
		</>
	);
};

const NavMenuItem = ({
	label,
	icon,
	isActive,
	isControlVisible,
	toggleControlVisibility,
	setCurrentNav,
}: {
	label: string;
	icon: string;
	isActive?: boolean;
	isControlVisible: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toggleControlVisibility: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setCurrentNav?: any;
}) => {
	const navigate = useNavigate();

	return (
		<>
			<Flex
				gap={5}
				onClick={() => {
					toggleControlVisibility(!isControlVisible);
					setCurrentNav('User & Control');
				}}
			>
				<Flex alignItems={'center'}>
					<Box
						bgColor={isActive ? '#825EE4' : 'white'}
						w={'3px'}
						h={'12px'}
						borderRadius={'10px'}
					/>
				</Flex>
				<Flex
					gap={2}
					bg={isActive ? '#E0D5FF' : 'white'}
					flex={1}
					p={2}
					borderRadius={'md'}
					alignItems={'center'}
					cursor={'pointer'}
					onClick={() => navigate('/user')}
					_hover={{ bg: '#E0D5FF' }}
				>
					<Box>
						<Image src={`${icon}`} />
					</Box>
					<Text color={'black'}>{label}</Text>
					{isControlVisible ? <IoIosArrowDown /> : <IoIosArrowForward />}
				</Flex>
			</Flex>
		</>
	);
};
const UserControlExtension = ({ onClose }: { onClose: () => void }) => {
	const [active, setActive] = useState<
		'Users' | 'Role' | 'Privileges' | string
	>('Users');
	const controls = [
		{ label: 'Users', href: '/user' },
		{ label: 'Role', href: '/role' },
		{ label: 'Privileges', href: '/privileges' },
	];
	const navigate = useNavigate();
	return (
		<Flex flexDir={'column'} gap={0} pl={6}>
			{controls.map((c) => (
				<Flex
					key={c.label}
					p={2}
					bgColor={active === c.label ? '#e4e4e4' : 'none'}
					borderRadius={'xl'}
					onClick={() => {
						setActive(c.label);
						navigate(c.href);
						onClose();
					}}
					cursor={'pointer'}
				>
					<Text>{c.label}</Text>
				</Flex>
			))}
		</Flex>
	);
};

export const BrandSidebarContent = ({
	onClose,
	currentNav,
	setCurrentNav,
	...rest
}: SidebarProps) => {
	const [isControlVisible, toggleControlVisibility] = useState(false);
	const navigate = useNavigate();
	const { currentUser } = useContext(CurrentUserContext);

	const navItems: INavItem[] = [
		{
			label: 'Dashboard',
			icon: dashboard,
			href: '/',
		},
		{
			href: '/vouchers',
			icon: notification,
			label: 'Vouchers',
		},
		{
			href: '/wallet',
			icon: wallet,
			label: 'Wallet',
		},
		{
			href: '/report',
			icon: report,
			label: 'Report',
		},
		{
			href: '/profile',
			icon: profile,
			label: 'Profile',
		},
	];

	const handleLogout = () => {
		localStorage.removeItem('PYMAILYR');
		navigate('/signin')
	}

	return (
		<Flex
			transition='3s ease'
			bg={'white'}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h={'full'}
			pr={5}
			display={'flex'}
			flexDir={'column'}
			{...rest}
			gap={10}
			justifyContent={'space-between'}
			overflowY={'scroll'}
		>
			<Stack gap={1}>
				<Flex h='20' alignItems='center' ml='6'>
					<Flex
						flex={1}
						flexDir={'column'}
						gap={2}
						onClick={() => {
							navigate('/');
							setCurrentNav('Dashboard');
						}}
					>
						<Box cursor={'pointer'} ml={6}>
							<Image src={pyyr} alt='pyyr' />
						</Box>
						<Divider width={'full'} />
					</Flex>
					<CloseButton
						display={{ base: 'flex', md: 'none' }}
						onClick={onClose}
					/>
				</Flex>
				{navItems.map((it) => (
					<NavItem
						key={it.label}
						{...it}
						isActive={currentNav == it.label}
						setCurrentNav={setCurrentNav}
						onClose={onClose}
					/>
				))}
				<NavMenuItem
					icon={user}
					isActive={currentNav === 'User & Control'}
					setCurrentNav={setCurrentNav}
					label='User & Control'
					isControlVisible={isControlVisible}
					toggleControlVisibility={toggleControlVisibility}
				/>
				{isControlVisible && <UserControlExtension onClose={onClose} />}
			</Stack>
			<Stack gap={2} mt={'24'}>
				<Flex
					gap={2}
					cursor={'pointer'}
					boxShadow={'md'}
					p={1}
					borderRadius={'5px'}
				>
					<Box>
						<Avatar size={'sm'} src={currentUser?.logo} name={ currentUser?.firstName} />
					</Box>
					<Flex flexDir={'column'} color={'black'}>
						<Text fontSize={'xs'} fontWeight={'bold'}>
							{currentUser?.firstName}
						</Text>
						<Text fontSize={'xs'}>{ currentUser?.email}</Text>
					</Flex>
				</Flex>
				<Button
					leftIcon={<Image src={turn_left} alt='left-turn' />}
					boxShadow={'md'}
					bgColor={'white'}
					color={'red'}
					onClick={handleLogout}
				>
					LOG OUT
				</Button>
			</Stack>
		</Flex>
	);
};
