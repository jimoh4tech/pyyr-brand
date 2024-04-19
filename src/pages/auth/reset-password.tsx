import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { PasswordInput } from './password-input';
import authServices from '../../services/auth';

export const ResetPasswordPage = ({
	setStep,
	email,
}: {
	setStep: (num: number) => void;
	email: string;
}) => {
	const toast = useToast();
	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		async onSubmit(values) {
			console.log(values);
			try {
				const res = await authServices.changePassword({
					email,
					npassword: values.password,
					cnpassword: values.confirmPassword,
				});
				console.log(res);
				if (res.responseCode == 200) {
					toast({
						title: 'Password reset successful',
						description: res.responseMessage,
						status: 'success',
						duration: 9000,
						isClosable: true,
						position: 'top-right',
					});
					setStep(4);
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
			<Stack gap={8}>
				<Flex color={'black'} flexDir={'column'} alignItems={'center'} gap={2}>
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
								name='confirmPassword'
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
							/>

							<Button
								loadingText='Submitting'
								colorScheme='purple'
								type='submit'
								isLoading={formik.isSubmitting}
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
