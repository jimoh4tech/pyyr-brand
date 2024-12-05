import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="gray.50"
    >
      <Heading as="h1" fontSize="6xl" color="purple.500">
        404
      </Heading>
      <Text fontSize="lg" mt={2} color="gray.600">
        Oops! The page you’re looking for doesn’t exist.
      </Text>
      <Button mt={6} colorScheme="purple" onClick={goHome}>
        Go Back Home
      </Button>
    </Box>
  );
};
