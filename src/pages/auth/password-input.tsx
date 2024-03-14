import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
export const PasswordInput = ({
	name,
	label,
	value,
	onChange,
}: {
	name: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent) => void;
}) => {
	const [show, setShow] = useState(false);
	return (
		<FormControl>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<InputGroup>
				<Input
					id={name}
					name={name}
					type={show ? 'text' : 'password'}
					value={value}
					onChange={onChange}
					placeholder='Your Password'
				/>
				<InputRightElement onClick={() => setShow(!show)}>
					{show ? <FiEye /> : <FiEyeOff />}
				</InputRightElement>
			</InputGroup>
		</FormControl>
	);
};
