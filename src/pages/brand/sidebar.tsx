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
import user from '../../assets/user.svg';
import wallet from '../../assets/wallet.svg';
import notification from '../../assets/voucher.svg';
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
						<Image src={`${icon}`} />
					</Box>
					<Text color={'black'}>{label}</Text>
				</Flex>
			</Flex>
		</>
	);
}

export const BrandSidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	// const [active, setActive] = useState<
	// 	'Dashboard' | 'Vouchers' | 'Wallet' | 'Report' | 'User & Control'
	// >('Dashboard');
	const navItems: INavItem[] = [
		{
			label: 'Dashboard',
			icon: dashboard,
			href: '/',
			isActive: window.location.href?.endsWith('/'),
		},
		{
			href: '/vouchers',
			icon: notification,
			isActive: window.location.href?.includes('vouchers'),
			label: 'Vouchers',
		},
		{
			href: '/wallet',
			icon: wallet,
			isActive: window.location.href?.includes('wallet'),
			label: 'Wallet',
		},
		{
			href: '/report',
			icon: report,
			isActive: window.location.href?.includes('report'),
			label: 'Report',
		},
		{
			href: '/profile',
			icon: user,
			isActive: window.location.href?.includes('profile'),
			label: 'User & Control',
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
