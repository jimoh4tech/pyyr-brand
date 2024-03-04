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
import customer from '../../assets/customer.svg';
import campaign from '../../assets/campaign.svg';
import wallet from '../../assets/wallet.svg';
import market from '../../assets/market.svg';
import notification from '../../assets/voucher.svg';
import profile from '../../assets/profile.svg';
import image from '../../assets/image.svg';
import turn_left from '../../assets/turn_left.svg';

import { useNavigate } from 'react-router-dom';
import { INavItem } from '../../interface/interface.nav-items';

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

function NavItem({ label, icon, href, isActive }: INavItem) {
	const navigate = useNavigate();

	return (
		<>
			<Flex gap={5}>
				<Flex alignItems={'center'}>
					<Box
						bgColor={
							isActive
								? '#825EE4'
								: 'white'
						}
						w={'3px'}
						h={'12px'}
						borderRadius={'10px'}
					/>
				</Flex>
				<Flex
					gap={2}
					bg={
						isActive
							? '#E0D5FF'
							: 'white'
					}
					flex={1}
					p={2}
					borderRadius={'md'}
					alignItems={'center'}
					cursor={'pointer'}
					onClick={() => navigate(href)}
					_hover={{ bg: '#E0D5FF' }}
				>
					<Box>
						<Image src={`${icon}`} onClick={() => navigate('/home')} />
					</Box>
					<Text color={'black'}>{label}</Text>
				</Flex>
			</Flex>
		</>
	);
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const navItems: INavItem[] = [
		{
			label: 'Dashboard',
			icon: dashboard,
			href: '/',
			isActive: window.location.href?.includes('/'),
		},
		{
			href: '/customers',
			icon: customer,
			isActive: window.location.href?.includes('/customers'),
			label: 'Customers',
		},

		{
			href: '/campaigns',
			icon: campaign,
			isActive: window.location.href?.includes('/campaigns'),
			label: 'Campaigns',
		},
		{
			href: '/wallet',
			icon: wallet,
			isActive: window.location.href?.includes('/wallet'),
			label: 'Wallet',
		},
		{
			href: '/vouchers',
			icon: notification,
			isActive: window.location.href?.includes('/vouchers'),
			label: 'Vouchers',
		},
		{
			href: '/marketplace',
			icon: market,
			isActive: window.location.href?.includes('/marketplace'),
			label: 'Marketplace',
		},
		{
			href: '/profile',
			icon: profile,
			isActive: window.location.href?.includes('/profile'),
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
				<NavItem key={it.label} {...it} />
			))}
			<Stack gap={3} px={2} mt={'30vh'}>
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
