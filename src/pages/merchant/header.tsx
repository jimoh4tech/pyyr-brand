import {
	Avatar,
	Box,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import image from '../../assets/Image.svg';
import notification from '../../assets/notification.svg';
import help from '../../assets/help.svg';


export const Header = () => {
	return (
		<>
			<Flex
				p={1}
				color={'black'}
				justifyContent={{ base: 'flex-end', md: 'space-between' }}
				boxShadow={'sm'}
				w={{ base: '', md: 'full' }}
				alignItems={'center'}
			>
				<Flex
					gap={3}
					alignItems={'center'}
					fontSize={'sm'}
					display={{ base: 'none', md: 'flex' }}
				>
					<Text>Dashboard</Text>
					<InputGroup p={1}>
						<InputLeftElement alignItems={'center'}>
							<FiSearch size={'15px'} />
						</InputLeftElement>
						<Input placeholder='Search' size={'sm'} borderRadius={'30px'} />
					</InputGroup>
				</Flex>
				<Flex gap={3} alignItems={'center'}>
					<Stack
						direction={'row'}
						alignItems={'center'}
						gap={0}
						display={{ base: 'none', md: 'flex' }}
					>
						<Avatar size='2xs' src={help} />
						<Link fontSize={'xs'} textDecoration={'underline'}>
							Get help
						</Link>
					</Stack>
					<Box>
						<Avatar size={'xs'} src={notification} />
					</Box>
					<Box>
						<Avatar size={'sm'} src={image} />
					</Box>
					<Text display={{ base: 'none', md: 'flex' }} fontSize={'sm'}>
						Hello Merchant!
					</Text>
				</Flex>
			</Flex>
		</>
	);
};
