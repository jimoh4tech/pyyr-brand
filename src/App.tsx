import "@fontsource-variable/nunito";
import LogRocket from "logrocket";

import { Router } from "./route/route";
import { Container } from "@chakra-ui/react";

function App() {
  LogRocket.init("qi0ax9/pyyr-app");
  return (
    <>
      <Container maxW={"1200px"} p={1}>
        <Router />
      </Container>
    </>
  );
}

export default App;
