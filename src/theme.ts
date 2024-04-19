import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};
const theme = extendTheme({
	fonts: {
		heading: `'Nunito Variable', sans-serif`,
		body: `'Nunito Variable', sans-serif`,
	},
	config,
});

export default theme;
