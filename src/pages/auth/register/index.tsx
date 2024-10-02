import {
  Box,
  Center,
  Grid,
  GridItem,
  Image,
  Stack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import welcome from "../../../assets/welcome.svg";
import splashing from "../../../assets/splashing1.svg";
import back from "../../../assets/back.svg";
import pyyr from "../../../assets/pyyr.svg";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form1, Form2, Form3 } from "./forms";
import { VerifiedPage } from "../verified";
import authServices from "../../../services/auth";

export const RegistrationPage = () => {
  const [isLessThan700] = useMediaQuery("(max-width: 700px)");

  const [isloading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      fname: "",
      brand_name: "",
      email: "",
      password: "",
      cpassword: "",
      account_type: "",
    },
    async onSubmit(values) {
      console.log(values);
      try {
        if (values.password.length < 6) {
          toast({
            title: "Error",
            description: "Password must not be less then 6 characters",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }
        if (values.password !== values.cpassword) {
          toast({
            title: "Error",
            description: "Password don't match!",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }
        const res = await authServices.register(values);
        // console.log(res);
        if (res.responseCode == 200) {
          toast({
            title: "Account created.",
            description: res.responseMessage,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setStep(3);
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
              {step > 1 && (
                <Image
                  onClick={() => (step > 1 ? setStep(step - 1) : null)}
                  cursor={"pointer"}
                  boxSize={"50px"}
                  src={back}
                />
              )}
              <Image
                boxSize={"70px"}
                src={pyyr}
                alt="pyyr"
                display={isLessThan700 ? "block" : "none"}
              />
              <Box />
            </Stack>
            {step === 1 ? (
              <Form1
                setStep={setStep}
                values={formik.values}
                setValues={formik.setValues}
              />
            ) : step === 2 ? (
              <Form2
                name={
                  formik.values.fname
                    ? formik.values.fname
                    : formik.values.brand_name
                }
                email={formik.values.email}
                type={formik.values.account_type}
                confirmPassword={formik.values.cpassword}
                password={formik.values.password}
                onChange={formik.handleChange}
                handleSubmit={formik.handleSubmit}
                isSubmitting={formik.isSubmitting}
              />
            ) : step === 3 ? (
              <Form3 setStep={setStep} email={formik.values.email} />
            ) : (
              <VerifiedPage
                title="Account Verified!"
                info="We’ve Successfully Verified your Account"
                href={
                  formik.values.account_type === "brand"
                    ? "/kyc"
                    : "/merchant/kyc"
                }
              />
            )}
          </GridItem>
        </Grid>
      )}
    </>
  );
};
