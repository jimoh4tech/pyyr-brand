import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';

import awesome from '../../assets/awesome.svg';

import { useNavigate } from 'react-router-dom';

export const VerifiedPage = ({
	title,
	info,
}: {
	title: string;
	info: string;
}) => {
	const navigate = useNavigate();
	return (
		<>
			<Stack gap={8}>
				<Flex justify={'center'}>
					<Image src={awesome} />
				</Flex>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>{title}</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						{info}
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<Stack minW={'30vw'} gap={3}>
						<Button
							loadingText='Submitting'
							colorScheme='purple'
							mt={6}
							onClick={() => navigate('/	')}
						>
							Proceed to Dashboard
						</Button>
					</Stack>
				</Flex>
			</Stack>
		</>
	);
};
