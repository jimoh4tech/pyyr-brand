import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import { LuAlertCircle } from "react-icons/lu";
import empty from "../../assets/empty.svg";
import rectangle from "../../assets/rectangle.svg";
import { IoIosArrowForward } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CurrentUserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import dashboardService from "../../services/dashboard";
import { IVoucherTable } from "../../interface/voucher";
import { formatCurrency } from "../../util/format-currency.util";

const Empty = () => {
  const [isLessthan500] = useMediaQuery("(max-width: 500px)");
  const navigate = useNavigate();
  return (
    <>
      <Alert
        status="error"
        bg={"#E0D5FF"}
        border={"1px solid #825EE4"}
        borderRadius={"5px"}
        gap={3}
        color={"black"}
        fontSize={isLessthan500 ? "xs" : "sm"}
      >
        <LuAlertCircle />
        Welcome to Pyyr, kindly complete your profile to validate your account.
        <Link
          href="/kyc"
          textDecoration={"underline"}
          color={"#825EE4"}
          fontSize={isLessthan500 ? "xs" : "sm"}
          width={"100px"}
        >
          {" "}
          Get started
        </Link>
      </Alert>
      <Flex
        gap={3}
        flexDir={"column"}
        boxShadow={"md"}
        minH={"75vh"}
        justifyContent={"center"}
      >
        <Flex justify={"center"}>
          <Image src={empty} />
        </Flex>
        <Flex color={"black"} flexDir={"column"} alignItems={"center"} gap={2}>
          <Text fontWeight={"bold"} fontSize={"sm"}>
            Your Dashboard presently has no metric to show
          </Text>
          <Text textAlign={"center"} fontSize={"xs"}>
            Complete your KYC to Validate your account
          </Text>
        </Flex>
        <Flex justify={"center"} color={"black"}>
          <Stack gap={3}>
            <Button
              loadingText="Submitting"
              size="sm"
              colorScheme="purple"
              mt={2}
              onClick={() => navigate("/kyc")}
              rightIcon={<IoIosArrowForward />}
            >
              Get Started
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export const DisplayCard = ({
  value,
  label,
  isChecked,
  title,
}: {
  value: string | number;
  label: string;
  isChecked: boolean;
  title?: string;
}) => {
  const [isCheck, setCheck] = useState(isChecked);

  const handleChange = () => {
    setCheck(!isCheck);
  };
  return (
    <>
      <Card
        flex={1}
        size={{ base: "sm", md: "md" }}
        px={{ base: 2, md: 5 }}
        py={3}
        gap={3}
        justifyContent={"space-between"}
      >
        <Heading size={{ base: "xs", md: "sm" }} color={"#825EE4"}>
          {" "}
          {title}
        </Heading>
        <Heading size={{ base: "sm", md: "md" }}>
          {" "}
          {isCheck ? value : "*****"}
        </Heading>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={{ base: "2xs", md: "xs" }}>{label}</Text>
          {/* <Box bgSize={{ base: '2xs', md: 'sm' }}>
						<Image src={icon} alt={label} />
					</Box> */}
          <Switch
            size="sm"
            colorScheme="purple"
            isChecked={isCheck}
            onChange={handleChange}
          />
        </Flex>
      </Card>
    </>
  );
};

const VoucherCard = ({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: string;
}) => {
  return (
    <>
      <Card p={2}>
        <Flex
          fontSize={"xs"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex gap={3} alignItems={"center"}>
            <Avatar size={{ base: "xs", md: "sm" }} src={icon} name={label} />
            <Text>{label}</Text>
          </Flex>
          <Text>{value}</Text>
        </Flex>
      </Card>
    </>
  );
};

const DashboardChart = ({
  data,
}: {
  data: { voucher: string; amount: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <XAxis fontSize={"10px"} dataKey="voucher" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <YAxis dataKey="amount" fontSize={"8px"} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const VocuhersTable = ({ vouchers }: { vouchers: IVoucherTable[] }) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                User
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Voucher
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Code
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Amount
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Date
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {vouchers.map((v) => (
              <Tr fontSize={"xs"} key={v.code}>
                <Td fontSize={"xs"}>{v.User} </Td>
                <Td fontSize={"xs"}>{v.Name}</Td>
                <Td fontSize={"xs"}>{v.code}</Td>
                <Td fontSize={"xs"}>{formatCurrency(v.amount)}</Td>

                <Td fontSize={"xs"}>{v.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const DashboardContent = () => {
  const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);
  const [vData, setVData] = useState<{
    total_purchase: string;
    total_used: string;
    wallet_balance: string;
    ledger_balance: string;
  } | null>(null);
  const [graphData, setGraphData] = useState<
    { voucher: string; amount: number }[]
  >([]);
  const [from, setFrom] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await dashboardService.brandDashboard({
        brand_dashboard: token,
        from,
        to,
      });
      console.log(res);
      setVouchers(res[2]);
      setVData(res[0]);
      const processedGraphData = res[1]?.map(
        (d: { voucher: string; amount: string }) => {
          return { ...d, amount: Number(d?.amount?.replace(",", "")) };
        }
      );
      setGraphData(processedGraphData);
      // console.log({ res, processedGraphData });
    };

    try {
      fetchDashboard();
    } catch (error) {
      console.error(error);
    }
  }, [to, from]);
  return (
    <>
      {" "}
      <Flex gap={{ base: 1, md: 3 }}>
        <DisplayCard
          value={formatCurrency(vData?.wallet_balance?.replace(",", "") || "")}
          label="Available Balance"
          isChecked={true}
        />
        <DisplayCard
          value={formatCurrency(vData?.ledger_balance?.replace(",", "") || "")}
          label="Ledger Balance"
          isChecked={true}
        />
        <DisplayCard
          value={vData?.total_used || "0"}
          label="Total Used"
          isChecked={true}
        />
      </Flex>
      <Flex color={"black"} gap={3} flexWrap={"wrap"}>
        <Flex flexDir={"column"} gap={5} bgColor={"white"}>
          <Flex
            boxShadow={"md"}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            minH={"35vh"}
            maxW={"90vw"}
          >
            <Flex
              justifyContent={"space-between"}
              flex={1}
              fontSize={"xs	"}
              alignItems={"center"}
              borderRadius={"md"}
            >
              <Text>Overall Reward Spend</Text>
              <Stack direction="row" gap={0}>
                <Input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  size={"xs	"}
                />
                <Input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  size={"xs	"}
                />
              </Stack>
            </Flex>
            <Box minH={"30vh"}>
              <DashboardChart data={graphData} />
            </Box>
          </Flex>
          <Flex
            boxShadow={"md"}
            borderRadius={"md"}
            flexDir={"column"}
            flexWrap={"wrap"}
            maxW={"90vw"}
          >
            <Flex
              justifyContent={"space-between"}
              fontSize={"sm"}
              alignItems={"center"}
              p={2}
            >
              <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"smaller"}>Vouchers</Text>
                {/* <Select placeholder='This Week' size={'xs'}>
									<option value='option1'>This Week</option>
									<option value='option2'>Last Week</option>
									<option value='option3'>Last Month</option>
								</Select> */}
              </Flex>
              <Text
                color={"#825EE4"}
                fontSize={"xs"}
                textDecor={"underline"}
                onClick={() => navigate("/vouchers")}
                cursor={"pointer"}
              >
                View all
              </Text>
            </Flex>

            <VocuhersTable vouchers={vouchers} />
          </Flex>
        </Flex>
        <Flex flexDir={"column"} gap={5} bgColor={"white"}>
          <Flex
            boxShadow={"md"}
            borderRadius={"md"}
            flexDir={"column"}
            // flex={1}
          >
            <Flex
              justifyContent={"space-between"}
              fontSize={"xs"}
              flex={1}
              alignItems={"center"}
              p={2}
            >
              <Text>Voucher Balances</Text>
              <Text
                color={"#825EE4"}
                fontSize={"xs"}
                textDecor={"underline"}
                onClick={() => navigate("/vouchers")}
                cursor={"pointer"}
              >
                View all
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={1}>
              {vouchers.map((v) => (
                <VoucherCard
                  key={v.code}
                  value={formatCurrency(v.amount)}
                  label={v.Name}
                  icon={v.image}
                />
              ))}
            </Flex>
          </Flex>
          <Flex
            boxShadow={"md"}
            borderRadius={"md"}
            flexDir={"column"}
            flex={1}
            bg={"#E2E0EA"}
            p={4}
            gap={3}
          >
            <Flex flex={1} flexDir={"column"} gap={2}>
              <Image src={rectangle} alt="rec" />
              <Text fontSize={"xs"}>
                Learn How to multiply wealth using Rewards system{" "}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export const BrandDashboard = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <Flex flexDir={"column"} gap={3} justifyContent={"space-between"}>
        {currentUser?.businessName === null ? <Empty /> : <DashboardContent />}
      </Flex>
    </>
  );
};
