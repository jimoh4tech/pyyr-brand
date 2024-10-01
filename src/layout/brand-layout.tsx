import {
	IconButton,
	Box,
	Flex,
	useColorModeValue,
	Drawer,
	DrawerContent,
	useDisclosure,
	FlexProps,
	Image,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import pyyr from '../assets/pyyr.svg';
import { Outlet } from 'react-router-dom';
import { BrandSidebarContent } from '../pages/brand/sidebar';
import { Header } from '../pages/brand/header';
import { useEffect, useState } from 'react';

interface MobileProps extends FlexProps {
	onOpen: () => void;
	currentNav: string;
}

const MobileNav = ({ onOpen, currentNav, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Box cursor={'pointer'} ml={6} display={{ base: 'flex', md: 'none' }}>
				<Image src={pyyr} alt='pyyr' />
			</Box>
			<Header currentNav={currentNav} />
		</Flex>
	);
};

export const BrandLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentNav, setCurrentNav] = useState<
		| 'Dashboard'
		| 'Vouchers'
		| 'Wallet'
		| 'Report'
		| 'Profile'
		| 'User & Control'
	>('Dashboard');

	useEffect(() => {
		if (window.location.href.endsWith('/')) setCurrentNav('Dashboard');
		else if (window.location.href.includes('/vouchers'))
			setCurrentNav('Vouchers');
		else if (window.location.href.includes('/wallet')) setCurrentNav('Wallet');
		else if (window.location.href.includes('/report')) setCurrentNav('Report');
		else if (window.location.href.includes('/profile'))
			setCurrentNav('Profile');
		else if (
			window.location.href.includes('/user') ||
			window.location.href.includes('/role') ||
			window.location.href.includes('/privileges')
		)
			setCurrentNav('User & Control');
	}, []);

	return (
		<Box minH='100vh' bg={'#fbfbfb'}>
			<BrandSidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'flex' }}
				currentNav={currentNav}
				setCurrentNav={setCurrentNav}
			/>
			<Drawer
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<BrandSidebarContent
						onClose={onClose}
						currentNav={currentNav}
						setCurrentNav={setCurrentNav}
					/>
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} currentNav={currentNav} />
			<Box ml={{ base: 0, md: 60 }} p={{ base: 1, md: 4 }}>
				<Outlet />
			</Box>
		</Box>
	);
};
