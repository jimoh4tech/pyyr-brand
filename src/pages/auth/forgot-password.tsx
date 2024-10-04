import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import splashing from "../../assets/splashing1.svg";
import pyyr from "../../assets/pyyr.svg";
import { useFormik } from "formik";
import authServices from "../../services/auth";
import { useState } from "react";
import { Form3 } from "./register/forms";
import { ResetPasswordPage } from "./reset-password";
import { VerifiedPage } from "./verified";

export const ForgotPasswordPage = () => {
  const [isLessThan700] = useMediaQuery("(max-width: 700px)");
  const toast = useToast();
  const [step, setStep] = useState(1);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    async onSubmit(values) {
      // console.log(values);
      try {
        const res = await authServices.forgetPassword({ forgot: values.email });
        console.log(res);
        if (res.responseCode == 200) {
          toast({
            title: "Mail sent successful.",
            description: res.responseMessage,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setStep(2);
        } else {
          toast({
            title: "Error",
            description:
              res.responseMessage ||
              "Opps! Something went wrong, try again later",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Grid
        templateColumns={`repeat(${isLessThan700 ? 3 : 4}, 1fr)`}
        gap={0}
        color={"white"}
        bgColor={"#825EE4"}
      >
        <GridItem
          colSpan={1}
          bgColor={"#825EE4"}
          display={isLessThan700 ? "none" : "block"}
          justifyContent={"center"}
        >
          <Image h={"97vh"} src={splashing} alt="splash screen" />
        </GridItem>
        <GridItem
          colSpan={3}
          bg={"white"}
          p={isLessThan700 ? 2 : 10}
          color={"black"}
        >
          <Stack
            direction={"row"}
            mb={10}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image
              boxSize={"70px"}
              src={pyyr}
              alt="pyyr"
              display={isLessThan700 ? "block" : "none"}
            />
            <Box />
          </Stack>
          {step === 1 && (
            <Stack gap={8}>
              <Flex
                color={"black"}
                flexDir={"column"}
                alignItems={"center"}
                gap={2}
              >
                <Text fontWeight={"bold"}>Forgot Password</Text>
                <Text textAlign={"center"} fontSize={"sm"}>
                  Please enter your email address below.
                </Text>
              </Flex>
              <Flex justify={"center"} color={"black"}>
                <form onSubmit={formik.handleSubmit}>
                  <Stack minW={"30vw"} gap={3}>
                    <FormControl>
                      <FormLabel htmlFor={"email"}>{"Email Address"}</FormLabel>
                      <InputGroup>
                        <Input
                          id={"email"}
                          name={"email"}
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          placeholder="Enter Email"
                        />
                      </InputGroup>
                    </FormControl>

                    <Flex justify={"flex-end"}>
                      <Link color={"#825EE4"} fontSize={"sm"} href="/signin">
                        Back to Login?
                      </Link>
                    </Flex>
                    <Button
                      loadingText="Submitting"
                      colorScheme="purple"
                      type="submit"
                      isLoading={formik.isSubmitting}
                      mt={6}
                    >
                      Proceed
                    </Button>
                  </Stack>
                </form>
              </Flex>
            </Stack>
          )}

          {step === 2 && (
            <Form3
              setStep={setStep}
              email={formik.values.email}
              type="Forget"
            />
          )}

          {step === 3 && (
            <ResetPasswordPage email={formik.values.email} setStep={setStep} />
          )}

          {step === 4 && (
            <VerifiedPage
              title="Password Successfully Created! "
              info="You’ve successfully created a new password for your authentications"
              href="/signin"
            />
          )}
        </GridItem>
      </Grid>
    </>
  );
};
