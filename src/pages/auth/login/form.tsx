import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';

import { ChangeEvent } from 'react';
import { PasswordInput } from '../password-input';

export const LoginForm = ({
	email,
	password,
	onChange,
	isSubmitting,
	handleSubmit,
}: {
	email: string;
	password: string;
	onChange: (e: ChangeEvent) => void;
	isSubmitting: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleSubmit: any;
}) => {
	return (
		<>
			<Stack gap={8}>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
					<Text fontWeight={'bold'}>Welcome Back!</Text>
					<Text textAlign={'center'} fontSize={'sm'}>
						Kindly provide your login credentials to gain access to the system
					</Text>
				</Flex>
				<Flex justify={'center'} color={'black'}>
					<form onSubmit={handleSubmit}>
						<Stack minW={'30vw'} gap={3}>
							<FormControl>
								<FormLabel htmlFor={'email'}>{'Email Address'}</FormLabel>
								<InputGroup>
									<Input
										id={'email'}
										name={'email'}
										type='email'
										value={email}
										onChange={onChange}
										placeholder='Enter Email'
									/>
								</InputGroup>
							</FormControl>
							<PasswordInput
								label='Password'
								name='password'
								value={password}
								onChange={onChange}
							/>

							<Flex justify={'flex-end'}>
								<Link color={'#825EE4'} fontSize={'sm'} href='/forgot-password'>
									Forget password?
								</Link>
							</Flex>
							<Button
								loadingText='Submitting'
								colorScheme='purple'
								type='submit'
								isLoading={isSubmitting}
								mt={6}
							>
								Proceed
							</Button>
						</Stack>
					</form>
				</Flex>
			</Stack>
		</>
	);
};
