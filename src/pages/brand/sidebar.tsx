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
import image from '../../assets/image.svg';
import turn_left from '../../assets/turn_left.svg';

import { useNavigate } from 'react-router-dom';
import { INavItem } from '../../interface/interface.nav-items';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const NavItem = ({
	label,
	icon,
	href,
	isActive,
	setActiveNav,
	onClose,
}: INavItem) => {
	const navigate = useNavigate();

	return (
		<>
			<Flex
				gap={5}
				onClick={() => {
					setActiveNav(href);
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
	setActiveNav,
}: {
	label: string;
	icon: string;
	isActive?: boolean;
	isControlVisible: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toggleControlVisibility: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setActiveNav?: any;
}) => {
	const navigate = useNavigate();

	return (
		<>
			<Flex
				gap={5}
				onClick={() => {
					toggleControlVisibility(!isControlVisible);
					setActiveNav('/user');
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
const UserControlExtension = () => {
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
		<Flex flexDir={'column'} gap={1} py={2} pl={6}>
			{controls.map((c) => (
				<Flex
					key={c.label}
					p={2}
					bgColor={active === c.label ? '#e4e4e4' : 'none'}
					borderRadius={'xl'}
					onClick={() => {
						setActive(c.label);
						navigate(c.href);
					}}
					cursor={'pointer'}
				>
					<Text>{c.label}</Text>
				</Flex>
			))}
		</Flex>
	);
};

export const BrandSidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const [activeNav, setActiveNav] = useState<
		'/' | '/vouchers' | '/wallet' | '/report' | '/profile' | '/user'
	>('/');
	const [isControlVisible, toggleControlVisibility] = useState(false);
	const navItems: INavItem[] = [
		{
			label: 'Dashboard',
			icon: dashboard,
			href: '/',
			isActive: activeNav === '/',
		},
		{
			href: '/vouchers',
			icon: notification,
			isActive: activeNav === '/vouchers',
			label: 'Vouchers',
		},
		{
			href: '/wallet',
			icon: wallet,
			isActive: activeNav === '/wallet',
			label: 'Wallet',
		},
		{
			href: '/report',
			icon: report,
			isActive: activeNav === '/report',
			label: 'Report',
		},
		{
			href: '/profile',
			icon: profile,
			isActive: activeNav === '/profile',
			label: 'Profile',
		},
	];

	return (
		<Box
			transition='3s ease'
			bg={'white'}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			pr={7}
			{...rest}
		>
			<Flex h='20' alignItems='center' ml='6' justifyContent='space-between'>
				<Flex flex={1} flexDir={'column'} gap={2}>
					<Box cursor={'pointer'} ml={6}>
						<Image src={pyyr} alt='pyyr' />
					</Box>
					<Divider width={'full'} />
				</Flex>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{navItems.map((it) => (
				<NavItem
					key={it.label}
					{...it}
					setActiveNav={setActiveNav}
					onClose={onClose}
				/>
			))}
			<NavMenuItem
				icon={user}
				isActive={activeNav.includes('/user')}
				setActiveNav={setActiveNav}
				label='User & Control'
				isControlVisible={isControlVisible}
				toggleControlVisibility={toggleControlVisibility}
			/>
			{isControlVisible && <UserControlExtension />}

			<Stack gap={3} px={2} mt={'40vh'}>
				<Flex
					gap={2}
					cursor={'pointer'}
					boxShadow={'md'}
					p={1}
					borderRadius={'5px'}
				>
					<Box>
						<Avatar size={'sm'} src={image} />
					</Box>
					<Flex flexDir={'column'} color={'black'}>
						<Text fontSize={'xs'} fontWeight={'bold'}>
							Merchant
						</Text>
						<Text fontSize={'xs'}>textt@gksgii.com</Text>
					</Flex>
				</Flex>
				<Button
					leftIcon={<Image src={turn_left} alt='left-turn' />}
					boxShadow={'md'}
					bgColor={'white'}
					color={'red'}
				>
					LOG OUT
				</Button>
			</Stack>
		</Box>
	);
};
