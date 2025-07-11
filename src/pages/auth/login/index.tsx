import {
  Box,
  Center,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import welcome from "../../../assets/welcome.svg";
import splashing from "../../../assets/splashing1.svg";
import pyyr from "../../../assets/pyyr.svg";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { LoginForm } from "./form";
import authServices from "../../../services/auth";

import { useNavigate } from "react-router-dom";
import userService from "../../../services/user";
import { CurrentUserContext } from "../../../context/user.context";
import { Form3 } from "../register/forms";
import LogRocket from "logrocket";

const VerifyOTP = ({
  isOpen,
  onClose,
  email,
}: {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form3 setStep={() => {}} email={email} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const LoginPage = () => {
  const [isLessThan700] = useMediaQuery("(max-width: 700px)");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [isloading, setLoading] = useState(true);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    async onSubmit(values) {
      // console.log(values);
      try {
        const res = await authServices.login(values);
        console.log(res);
        authServices.setToken(res.token);

        const user = await userService.getFullUserDetail({
          full_user: res.token,
        });

        localStorage.setItem("PYMAILYR", res.token);
        console.log(user);
        if (res.responseCode == 200) {
          setCurrentUser(user);
          LogRocket.identify(values.username, {
            name: user?.name,
            email: values.username,
            account_type: user?.account_type,
          });
          toast({
            title: "Login successful.",
            description: res.responseMessage,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          res.userRole === "brand" ? navigate("/") : navigate("/merchant");
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
          // Allow yet to be verified users to get verification code
          if (res.responseCode === "403") {
            onOpen();
            const res = await authServices.resendCode({
              resend_otp: values.username,
            });
            console.log(res);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        toast({
          title: "Error",
          description:
            error?.message || "Opps! Something went wrong, try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });
  return (
    <>
      {isloading ? (
        <Center bgColor={"#825EE4"}>
          <Image h={"96vh"} src={welcome} alt="Welcome" />
        </Center>
      ) : (
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
            <LoginForm
              username={formik.values.username}
              password={formik.values.password}
              onChange={formik.handleChange}
              handleSubmit={formik.handleSubmit}
              isSubmitting={formik.isSubmitting}
            />
            <VerifyOTP
              isOpen={isOpen}
              onClose={onClose}
              email={formik.values.username}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
