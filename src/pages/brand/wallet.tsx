import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DisplayCard } from "./dashboard";
import account from "../../assets/account.svg";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IWalletTable } from "../../interface/wallet";
import { IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import transactionsService from "../../services/transactions";
import { formatCurrency } from "../../util/format-currency.util";
import userService from "../../services/user";
import { EmptyWallet } from "../merchant/wallet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalForm1 = ({ formik, balance }: { formik: any; balance: number }) => {
  return (
    <>
      <Stack gap={4}>
        <Text fontSize={"sm"} fontWeight={"semibold"}>
          How much would you like to withdraw?
        </Text>
        <HStack>
          <Text fontSize={"sm"}>Balance:</Text>
          <Text fontSize={"sm"} color={"#825EE4"}>
            {formatCurrency(balance)}
          </Text>
        </HStack>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"sm"}>Enter amount</Text>
          <Input
            id="amount"
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            isInvalid={formik.values.amount > balance}
            width={"70%"}
          />
        </Flex>
      </Stack>
    </>
  );
};

const ModalForm2 = ({
  formik,
  accountDetails,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  accountDetails: Array<Array<string>>;
}) => {
  const handleAccountChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value.split(":");
    console.log({ value });
    formik.setValues({
      ...formik.values,
      accountNumber: value[0] || "",
      beneficiaryAccountName: value[1] || "",
      beneficiaryBank: value[2] || "",
      recipient_code: value[3] || "",
    });
  };
  return (
    <>
      <Stack gap={3}>
        <FormControl isRequired>
          <FormLabel fontSize={"xs"} htmlFor={"bank"}>
            {"Account"}
          </FormLabel>
          <Select
            size={"xs"}
            name="beneficiaryBank"
            placeholder="Select Account"
            onChange={(e) => handleAccountChange(e)}
          >
            {accountDetails.map((b) => (
              <option key={b[0]} value={`${b[0]}:${b[1]}:${b[3]}:${b[4]}`}>
                {`${b[0]} - ${b[3]}`}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontSize={"xs"} htmlFor={"accountNumber"}>
            {"Account Number"}
          </FormLabel>
          <Input
            id={"accountNumber"}
            name={"accountNumber"}
            type="number"
            w={"full"}
            size={"xs"}
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            placeholder="Enter Account Number"
            isDisabled={true}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontSize={"xs"} htmlFor={"beneficiaryAccountName"}>
            {"Account Name"}
          </FormLabel>
          <InputGroup>
            <Input
              id={"beneficiaryAccountName"}
              name={"beneficiaryAccountName"}
              type="text"
              size={"xs"}
              value={formik.values.beneficiaryAccountName}
              onChange={formik.handleChange}
              placeholder="Enter Account Name"
              isDisabled={true}
            />
          </InputGroup>
        </FormControl>
      </Stack>
    </>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalForm3 = ({ formik }: { formik: any }) => {
  return (
    <>
      <Stack gap={3}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"xs"}>Amount</Text>
          <Text fontSize={"xs"}>{formatCurrency(formik.values.amount)}</Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"xs"}>Processing Fee</Text>
          <Text fontSize={"xs"}>
            {formatCurrency(Number(formik.values.amount) * 0.1)}
          </Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"xs"}>Receiving Account</Text>
          <Text fontSize={"xs"}>{formik.values.accountNumber}</Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"xs"}>Account Name</Text>
          <Text fontSize={"xs"}>{formik.values.beneficiaryAccountName}</Text>
        </Flex>
      </Stack>
    </>
  );
};

const ModalForm4 = ({
  pin,
  setPin,
  isLoading,
}: {
  pin: string; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPin: any;
  isLoading: boolean;
}) => {
  return (
    <>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
      >
        <Text fontWeight={"bold"}>Enter the code</Text>
        <Text fontSize={"small"}>
          We've sent an OTP to your email to confirm transaction
        </Text>
        <HStack>
          <PinInput otp value={pin} onChange={(val) => setPin(val)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <Button
          colorScheme="purple"
          type="submit"
          w={"100%"}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </Flex>
    </>
  );
};

const WithdrawalModal = ({
  balance,
  accountDetails,
}: {
  balance: number;
  accountDetails: Array<Array<string>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [confirm_ptb, setConfirm] = useState("");
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      ptb: "",
      accountNumber: "",
      beneficiaryAccountName: "",
      beneficiaryBank: "",
      recipient_code: "",
      amount: 0,
    },
    async onSubmit(values) {
      console.log(values);
      if (values.amount > balance) return;
      if (step < 3) setStep(step + 1);
      else if (step === 3) {
        try {
          const email = localStorage.getItem("PYMAILYR") || "";
          const newVal = {
            ...values,
            ptb: email,
            amount: values.amount.toString(),
          };
          // console.log({ newVal });
          const res = await transactionsService.withdrawal(newVal);
          // console.log(res);

          if (res.responseCode == 200) {
            toast({
              title: "Trasaction successfully initiated",
              description: res.responseMessage,
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
            setConfirm(res.transactionCode);
            setStep(step + 1);
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
      } else {
        try {
          setLoading(true);
          const email = localStorage.getItem("PYMAILYR") || "";
          const newVal = {
            confirm_ptb,
            pin,
            email,
          };
          // console.log({ newVal });
          const res = await transactionsService.confirmWithdrawal(newVal);
          // console.log(res);

          if (typeof res === "string" ? res.includes('"status":true') : null) {
            toast({
              title: "Transfer Successfully completed",
              description: res.responseMessage,
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
            setStep(1);
            onClose();
          } else {
            setLoading(false);
            toast({
              title: "Error",
              description: "Opps! Something went wrong, try again later",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    },
  });

  return (
    <>
      <Button
        loadingText="Submitting"
        size="sm"
        colorScheme="purple"
        mt={2}
        onClick={onOpen}
      >
        Withdraw
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent gap={4}>
            <ModalHeader fontSize={"md"}>
              {step !== 3 ? "Withdraw" : "Confirm Details"}
            </ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
              {step === 1 ? (
                <ModalForm1 formik={formik} balance={balance} />
              ) : step === 2 ? (
                <ModalForm2 formik={formik} accountDetails={accountDetails} />
              ) : step === 3 ? (
                <ModalForm3 formik={formik} />
              ) : (
                <ModalForm4 pin={pin} setPin={setPin} isLoading={isLoading} />
              )}
            </ModalBody>
            <Divider />
            {step < 4 && (
              <ModalFooter>
                {step > 1 && (
                  <Button
                    size={"sm"}
                    mr={3}
                    variant={"outline"}
                    onClick={() =>
                      step === 1 ? setStep(1) : setStep(step - 1)
                    }
                  >
                    Back
                  </Button>
                )}
                <Button size={"sm"} colorScheme="purple" type="submit">
                  {step < 3 ? "Proceed" : "Yes, proceed"}
                </Button>
              </ModalFooter>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

const WalletChart = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] | undefined = [];
  return (
    <ResponsiveContainer width="99%" height="99%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 5,
          bottom: 0,
        }}
      >
        <XAxis fontSize={"10px"} dataKey="name" />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const ViewWalletDrawer = ({
  id,
  recipient,
  bank,
  amount,
  status,
}: IWalletTable) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IoEyeOutline size={"20px"} onClick={onOpen} cursor={"pointer"} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"sm"}>View Transaction</DrawerHeader>
          <Divider />
          <DrawerBody>
            <Stack gap={5}>
              <Avatar src={account} />
              <Flex justifyContent={"space-between"} flexDir={"column"}>
                <Text
                  fontSize={"xs"}
                  fontWeight={"bold"}
                >{`${recipient}`}</Text>
                <Text
                  fontSize={"xs"}
                  fontWeight={"bold"}
                >{`${bank} • ${id}`}</Text>
              </Flex>
              <Divider />

              <Stack gap={5}>
                <Flex
                  borderTop={"1px solid #f3f2f1"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"xs"}>Amount</Text>
                  <Text fontSize={"xs"}>{amount}</Text>
                </Flex>
                <Flex
                  borderTop={"1px solid #f3f2f1"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"xs"}>Processing Fee</Text>
                  <Text fontSize={"xs"}>{amount}</Text>
                </Flex>
                <Flex
                  borderTop={"1px solid #f3f2f1"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"xs"}>Account name</Text>
                  <Text fontSize={"xs"}>{recipient}</Text>
                </Flex>
                <Flex
                  borderTop={"1px solid #f3f2f1"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"xs"}>Transation Status</Text>
                  <Badge
                    bgColor={
                      status === "Failed"
                        ? "#ffd5d0"
                        : status === "Pending"
                        ? "#ffe3b2"
                        : "#d4f7e1"
                    }
                    textTransform={"capitalize"}
                    borderRadius={"10px"}
                  >
                    {status}
                  </Badge>{" "}
                </Flex>
                <Flex
                  borderTop={"1px solid #f3f2f1"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"xs"}>Transation ID</Text>
                  <Text fontSize={"xs"}>{id}</Text>
                </Flex>
              </Stack>
            </Stack>
            <Divider />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const WalletTable = () => {
  const transactionList: IWalletTable[] = [];
  if (transactionList.length === 0) return <EmptyWallet />;
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Recipient
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Amount
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Originating Bank
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Transaction ID
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Type
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Date
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Status
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactionList.map((t) => (
              <Tr fontSize={"xs"} key={t.id}>
                <Td fontSize={"xs"}>{t.recipient} </Td>
                <Td fontSize={"xs"}>{t.amount}</Td>
                <Td fontSize={"xs"}>{t.bank}</Td>
                <Td fontSize={"xs"}>{t.id}</Td>
                <Td fontSize={"xs"}>{t.type}</Td>
                <Td fontSize={"xs"}>{t.date}</Td>
                <Td fontSize={"xs"}>
                  <Badge
                    bgColor={
                      t.status === "Failed"
                        ? "#ffd5d0"
                        : t.status === "Pending"
                        ? "#ffe3b2"
                        : "#d4f7e1"
                    }
                    textTransform={"capitalize"}
                    borderRadius={"10px"}
                  >
                    {t.status}
                  </Badge>{" "}
                </Td>
                <Td>
                  <ViewWalletDrawer {...t} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export const Wallet = () => {
  const [fromDate, setFromDate] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));

  const [balance, setBalance] = useState(0);
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("PYMAILYR") || "";
    const fetchBalance = async () => {
      // console.log({ token });
      const res = await transactionsService.walletBalance({
        pyyr_accounts: token,
      });
      // console.log(res);
      setBalance(res.currentBalance);
    };
    const fetchAccountDetails = async () => {
      const res = await userService.getBankDetails({
        get_bank: token,
      });
      // console.log({ res: res[1] });
      setAccountDetails(res[1]);
    };
    fetchBalance();
    fetchAccountDetails();
  }, []);

  return (
    <>
      <Flex gap={{ base: 1, md: 3 }}>
        <DisplayCard
          value={formatCurrency(balance)}
          label="Wallet Balance"
          isChecked={false}
        />
        <DisplayCard
          value={accountDetails.length !== 0 ? accountDetails[0][0] : ""}
          label="Account Info"
          isChecked={false}
          title={accountDetails.length !== 0 ? accountDetails[0][1] : ""}
        />
        <DisplayCard
          value={formatCurrency(balance)}
          label="Earnings"
          isChecked={false}
        />
      </Flex>
      <Flex
        boxShadow={"md"}
        borderRadius={"md"}
        p={2}
        flexDir={"column"}
        flex={1}
        minH={"35vh"}
      >
        <Flex
          justifyContent={"space-between"}
          flex={1}
          fontSize={"xs	"}
          alignItems={"center"}
          borderRadius={"md"}
        >
          <Text>Total Amount Spent</Text>
          <Stack direction="row" gap={0}>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              size={"xs	"}
            />
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              size={"xs	"}
            />
          </Stack>
        </Flex>
        <Box h={"30vh"}>
          <WalletChart />
        </Box>
      </Flex>
      <Flex flex={1} boxShadow={"md"} borderRadius={"md"} flexDir={"column"}>
        <Flex
          justifyContent={"space-between"}
          fontSize={"sm"}
          alignItems={"center"}
          p={2}
        >
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"xs"}>Transaction History</Text>
            {/* <Select placeholder="This Week" size={"xs"}>
              <option value="option1">This Week</option>
              <option value="option2">Last Week</option>
              <option value="option3">Last Month</option>
            </Select> */}
          </Flex>
          <WithdrawalModal balance={balance} accountDetails={accountDetails} />
        </Flex>

        <WalletTable />
      </Flex>
    </>
  );
};
