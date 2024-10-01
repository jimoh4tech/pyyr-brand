import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  Link,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import person from "../../../assets/person.svg";
import group from "../../../assets/group.svg";

import { ChangeEvent, useState } from "react";
import { PasswordInput } from "../password-input";
import authServices from "../../../services/auth";
import { useNavigate } from "react-router-dom";

const AccountTypeCard = ({
  icon,
  title,
  description,
  isActive,
  setStep,
  type,
  values,
  setValues,
}: {
  icon: string;
  title: string;
  description: string;
  isActive?: boolean;
  setStep: (num: number) => void;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValues: any;
}) => {
  return (
    <>
      <Card
        p={5}
        cursor={"pointer"}
        borderColor={"#825EE4"}
        borderWidth={isActive ? "1px" : "none"}
        onClick={() => {
          setStep(2);
          setValues({ ...values, account_type: type });
        }}
      >
        <CardBody>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Image src={icon} />
            <Text fontWeight={"bold"} fontSize={"sm"}>
              {title}
            </Text>
            <Text fontSize={"xs"}>{description}</Text>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export const Form1 = ({
  setStep,
  values,
  setValues,
}: {
  setStep: (num: number) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValues: any;
}) => {
  return (
    <>
      <Stack gap={8}>
        <Flex justify={"center"}>
          <CircularProgress value={33} size={"100px"} color="#825ee4">
            <CircularProgressLabel fontSize={"sm"}>
              1 of 3
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Flex color={"black"} flexDir={"column"} alignItems={"center"} gap={2}>
          <Text textAlign={"center"} fontWeight={"bold"} fontSize="md">
            How do you intend to use this platform?
          </Text>
          <Text textAlign={"center"} fontSize="md">
            We ask just so we fit the experience to your needs.
          </Text>
        </Flex>
        <Flex justify={"center"} gap={3} flexWrap={"wrap"}>
          <AccountTypeCard
            icon={person}
            title="As a Merchant"
            description="Here to Reward my customers"
            key={"As a Merchant"}
            isActive={true}
            setStep={setStep}
            values={values}
            setValues={setValues}
            type="Business"
          />
          <AccountTypeCard
            icon={group}
            title="As a Brand"
            description="Here to Sell Vouchers/Rewards"
            key={"As a Brand"}
            setStep={setStep}
            values={values}
            setValues={setValues}
            type="brand"
          />
        </Flex>

        <Flex fontSize={"sm"} justifyContent={"center"}>
          Already have an account? &nbsp;
          <Link color={"#825EE4"} fontSize={"sm"} href="/signin">
            Login
          </Link>
        </Flex>
      </Stack>
    </>
  );
};

export const Form2 = ({
  name,
  email,
  password,
  confirmPassword,
  type,
  onChange,
  isSubmitting,
  handleSubmit,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
  onChange: (e: ChangeEvent) => void;
  isSubmitting: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any;
}) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <Stack gap={8}>
        <Flex justify={"center"}>
          <CircularProgress value={67} size={"100px"} color="#825ee4">
            <CircularProgressLabel fontSize={"sm"}>
              2 of 3
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Flex color={"black"} flexDir={"column"} alignItems={"center"} gap={2}>
          <Text fontWeight={"bold"}>Welcome to Pyyr</Text>
          <Text textAlign={"center"} fontSize={"sm"}>
            You’re about to have the best experience. First, lets <br />
            create an account
          </Text>
        </Flex>
        <Flex justify={"center"} color={"black"}>
          <form onSubmit={handleSubmit}>
            <Stack minW={"30vw"} gap={3}>
              <FormControl isRequired>
                <FormLabel htmlFor={"name"}>
                  {type === "brand" ? "Brand Name" : "Fullname"}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"name"}
                    name={`${type === "brand" ? "brand_name" : "fname"}`}
                    type="text"
                    value={name}
                    onChange={onChange}
                    placeholder={`Enter ${
                      type === "brand" ? "Brand" : "Fullname"
                    }`}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor={"email"}>{"Email Address"}</FormLabel>
                <InputGroup>
                  <Input
                    id={"email"}
                    name={"email"}
                    type="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Enter Email"
                  />
                </InputGroup>
              </FormControl>
              <PasswordInput
                label="Password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <PasswordInput
                label="Confirm Password"
                name="cpassword"
                value={confirmPassword}
                onChange={onChange}
              />
              <Checkbox
                size={"sm"}
                fontSize={"xs"}
                onChange={() => setChecked(!isChecked)}
              >
                By signing up you agree to our{" "}
                <Link color={"#825EE4"}>Terms & Conditions </Link> and{" "}
                <Link color={"#825EE4"}>Privacy</Link>
              </Checkbox>
              <Button
                loadingText="Submitting"
                colorScheme="purple"
                type="submit"
                isDisabled={!isChecked}
                isLoading={isSubmitting}
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

export const Form3 = ({
  setStep,
  email,
  type,
}: {
  setStep: (num: number) => void;
  email: string;
  type?: string;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, toggleLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    toggleLoading(true);
    try {
      const res = await authServices.verifyOTP({ checkotp: value, email });
      console.log(res);
      if (res.responseCode == 200) {
        toast({
          title: `${type === "Login" ? "Login success" : "Account verified."}`,
          description: res.responseMessage,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        type === "Login"
          ? navigate("/")
          : type === "Forget"
          ? setStep(3)
          : setStep(4);
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
        toggleLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Stack gap={8}>
        <Flex justify={"center"}>
          <CircularProgress value={100} size={"100px"} color="#825ee4">
            <CircularProgressLabel fontSize={"sm"}>
              3 of 3
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Flex color={"black"} flexDir={"column"} alignItems={"center"} gap={2}>
          <Text fontWeight={"bold"}>OTP Verification</Text>
          <Text textAlign={"center"} fontSize={"sm"}>
            Kindly Input the 4 digit OTP code shared in your email
          </Text>
        </Flex>
        <Flex justify={"center"} color={"black"}>
          <Stack minW={"30vw"} gap={3}>
            <HStack alignContent={"center"} justify={"center"}>
              <PinInput otp value={value} onChange={(val) => setValue(val)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Text textAlign={"center"} fontSize={"sm"}>
              Didn't get the code?{" "}
              <Link color={"#825EE4"}> Click to resend.</Link>
            </Text>
            <Button
              loadingText="Submitting"
              colorScheme="purple"
              type="submit"
              isDisabled={value.length < 4}
              isLoading={isLoading}
              mt={6}
              onClick={handleSubmit}
            >
              Proceed
            </Button>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};
