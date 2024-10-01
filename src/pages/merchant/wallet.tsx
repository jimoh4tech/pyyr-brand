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
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { IWalletTable } from "../../interface/wallet";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { formatCurrency } from "../../util/format-currency.util";
import transactionsService from "../../services/transactions";
import { usePaystackPayment } from "react-paystack";
import { CurrentUserContext } from "../../context/user.context";
import empty from "../../assets/empty.svg";

const AmountCard = ({
  amount,
  setAmount,
}: {
  amount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAmount: any;
}) => {
  return (
    <Text
      fontSize={"xs"}
      bgColor={"white"}
      px={3}
      py={1}
      w="110px"
      border={"1px solid #f2f2f2"}
      borderRadius={"md"}
      boxShadow={"md"}
      cursor={"pointer"}
      onClick={() => setAmount(amount)}
    >
      {formatCurrency(amount)}
    </Text>
  );
};

const ModalForm1 = ({
  amount,
  setAmount,
  handleTopUp,
  balance,
}: {
  balance: number;
  amount: number | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAmount: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTopUp: any;
}) => {
  return (
    <>
      <ModalHeader fontSize={"md"}>Fund Wallet</ModalHeader>
      <ModalCloseButton />
      <Divider />
      <ModalBody>
        <Stack>
          <Stack
            bgColor={"#f9f4f8"}
            p={2}
            alignItems={"center"}
            borderRadius={"lg"}
          >
            <Text fontSize={"xs"}>Available Balance</Text>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {formatCurrency(balance)}
            </Text>
          </Stack>

          <Stack justifyContent={"space-between"}>
            <Text fontSize={"sm"}>Amount</Text>
            <InputGroup>
              <InputLeftAddon>&#8358;</InputLeftAddon>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </InputGroup>
          </Stack>
          <Flex flexWrap={"wrap"} justifyContent={"space-between"} gap={2}>
            {[
              50000, 100000, 10000, 20000, 500000, 1000000, 1000, 5000000, 5000,
              1500000, 2000000, 3000000,
            ].map((c) => (
              <AmountCard amount={c} setAmount={setAmount} key={c} />
            ))}
          </Flex>
        </Stack>
      </ModalBody>
      <Divider />
      <ModalFooter>
        <Button size={"xs"} mr={2}>
          Cancel
        </Button>
        <Button size={"xs"} onClick={handleTopUp} colorScheme="purple">
          Proceed
        </Button>
      </ModalFooter>
    </>
  );
};

const FundModal = ({
  setBalance,
  balance,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBalance: any;
  balance: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState<number>();
  const { currentUser } = useContext(CurrentUserContext);
  const [reference, setReference] = useState<{
    trxref?: string;
    status?: string;
  } | null>(null);
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const toast = useToast();

  const token = localStorage.getItem("PYMAILYR") || "";
  const email = currentUser?.email || "";

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: (amount || 0) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey,
  };
  console.log(config);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (reference: any) => {
    console.log(reference);
    setReference(reference);
  };

  const onClosed = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast({
      title: "Payment Cancelled",
      description: "Payment was not completed",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    onClose();
  };
  const initializePayment = usePaystackPayment(config);

  const fundWallet = async () => {
    const payload = {
      email: token,
      payment_ref: reference?.trxref || "",
    };
    console.log(payload);
    const res = await transactionsService.verifyTopUp(payload);
    console.log(res);
    toast({
      title: "Payment Successful",
      description: "Payment was successfully completed",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    const wallet = await transactionsService.walletBalance({
      pyyr_accounts: token,
    });
    console.log(wallet);
    setBalance(wallet.currentBalance);
    onClose();
  };

  useEffect(() => {
    if (reference) {
      fundWallet();
      setReference(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);
  return (
    <>
      <Button
        colorScheme="purple"
        size={"xs"}
        leftIcon={<IoMdAdd />}
        onClick={onOpen}
      >
        Fund Wallet
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent gap={4}>
          <ModalForm1
            balance={balance}
            amount={amount}
            setAmount={setAmount}
            handleTopUp={() => {
              initializePayment({ onSuccess, onClose: onClosed });
            }}
          />
        </ModalContent>
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

export const EmptyWallet = () => {
  return (
    <>
      <Flex
        gap={3}
        flexDir={"column"}
        boxShadow={"md"}
        minH={"30vh"}
        justifyContent={"center"}
      >
        <Flex justify={"center"}>
          <Image src={empty} />
        </Flex>
        <Flex color={"black"} flexDir={"column"} alignItems={"center"} gap={2}>
          <Text fontSize={"xs"}>You presently have no transaction History</Text>
        </Flex>
      </Flex>
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
            {transactionList?.map((t) => (
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

export const MerchantWalletPage = () => {
  const [fromDate, setFromDate] = useState(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const email = localStorage.getItem("PYMAILYR") || "";
      console.log({ email });
      const res = await transactionsService.walletBalance({
        pyyr_accounts: email,
      });
      console.log(res);
      setBalance(res.currentBalance);

      const bankList = await transactionsService.getBankList();
      console.log({ bankList });
    };
    fetchBalance();
  }, []);

  return (
    <Stack>
      <Flex gap={2} justifyContent={"flex-end"} flexWrap={"wrap"}>
        {/* <Button
          variant={"outline"}
          size={"xs"}
          rightIcon={<IoMdCopy color="#805ad5" />}
        >
          Wallet Acc No : 8790679001 (9 Payment Bank)
        </Button> */}
        <FundModal setBalance={setBalance} balance={balance} />
      </Flex>
      <Flex gap={{ base: 1, md: 3 }}>
        <DisplayCard
          value={formatCurrency(balance)}
          label="Available Balance"
          isChecked={false}
        />
        <DisplayCard
          value={formatCurrency(balance)}
          label="Total Deposits"
          isChecked={false}
        />
        <DisplayCard
          value={formatCurrency(balance)}
          label="Total Pay Out"
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
          </Flex>
          {/* <Select placeholder="This Week" size={"xs"} width={"auto"}>
            <option value="option1">This Week</option>
            <option value="option2">Last Week</option>
            <option value="option3">Last Month</option>
          </Select> */}
        </Flex>

        <WalletTable />
      </Flex>
    </Stack>
  );
};
