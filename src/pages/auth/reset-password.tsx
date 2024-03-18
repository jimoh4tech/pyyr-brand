import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Image,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import splashing from '../../assets/splashing1.svg';
import back from '../../assets/back.svg';
import pyyr from '../../assets/pyyr.svg';
import { useFormik } from 'formik';
import { PasswordInput } from './password-input';
import { useState } from 'react';
import { VerifiedPage } from './verified';

export const ResetPasswordPage = () => {
	const [isLessThan700] = useMediaQuery('(max-width: 700px)');
	const [step, setStep] = useState(1);

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		async onSubmit(values) {
			console.log(values);
		},
	});

	return (
		<>
			<Grid
				templateColumns={`repeat(${isLessThan700 ? 3 : 4}, 1fr)`}
				gap={0}
				color={'white'}
				bgColor={'#825EE4'}
			>
				<GridItem
					colSpan={1}
					bgColor={'#825EE4'}
					display={isLessThan700 ? 'none' : 'block'}
					justifyContent={'center'}
				>
					<Image h={'97vh'} src={splashing} alt='splash screen' />
				</GridItem>
				<GridItem
					colSpan={3}
					bg={'white'}
					p={isLessThan700 ? 2 : 10}
					color={'black'}
				>
					<Stack
						direction={'row'}
						mb={10}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Image cursor={'pointer'} boxSize={'50px'} src={back} />
						<Image
							boxSize={'70px'}
							src={pyyr}
							alt='pyyr'
							display={isLessThan700 ? 'block' : 'none'}
						/>
						<Box />
					</Stack>
					{step === 1 ? (
						<Stack gap={8}>
							<Flex
								color={'black'}
								flexDir={'column'}
								alignItems={'center'}
								gap={2}
							>
								<Text fontWeight={'bold'}>Reset Password</Text>
								<Text textAlign={'center'} fontSize={'sm'}>
									Create a new password for your authentications
								</Text>
							</Flex>
							<Flex justify={'center'} color={'black'}>
								<form onSubmit={formik.handleSubmit}>
									<Stack minW={'30vw'} gap={3}>
										<PasswordInput
											label='Password'
											name='password'
											value={formik.values.password}
											onChange={formik.handleChange}
										/>
										<PasswordInput
											label='Confirm Password'
											name='confirmedPassword'
											value={formik.values.confirmPassword}
											onChange={formik.handleChange}
										/>

										<Button
											loadingText='Submitting'
											colorScheme='purple'
											type='submit'
											isLoading={formik.isSubmitting}
											mt={6}
											onClick={() => setStep(2)}
										>
											Proceed
										</Button>
									</Stack>
								</form>
							</Flex>
						</Stack>
					) : (
						<VerifiedPage
							title='Password Successfully Created! '
							info='You’ve successfully created a new password for your authentications'
							href='/signin'
						/>
					)}
				</GridItem>
			</Grid>
		</>
	);
};
