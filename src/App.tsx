import "@fontsource-variable/nunito";
import { Router } from "./route/route";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Container maxW={"1200px"} p={3}>
        <Router />
      </Container>
    </>
  );
}

export default App;
