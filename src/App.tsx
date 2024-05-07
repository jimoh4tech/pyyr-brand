import '@fontsource-variable/nunito';
import { Router } from './route/route';
import { Container } from '@chakra-ui/react';
import { CurrentUserProvider } from './context/user.context';

function App() {
	return (
		<>
			<Container maxW={'1200px'} p={3}>
				<CurrentUserProvider>
					<Router />
				</CurrentUserProvider>
			</Container>
		</>
	);
}

export default App;
