import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { IVoucherTable } from "../../interface/voucher";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CustomersDetailsChart = () => {
  return (
    <ResponsiveContainer width="99%" height="99%">
      <AreaChart
        width={500}
        height={400}
        data={[]}
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

const CustomerRewardTable = () => {
  const vouchers: IVoucherTable[] = [];
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Voucher's Worth
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                ID
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Date Rewarded
              </Th>

              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Expiry Date
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Brand
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {vouchers.map((v) => (
              <Tr fontSize={"xs"} key={v.code}>
                <Td fontSize={"xs"}>{v.Name}</Td>
                <Td fontSize={"xs"}>#{v.code}</Td>
                <Td fontSize={"xs"}>{v.worth}</Td>
                <Td fontSize={"xs"}>{v.expireDate}</Td>
                <Td fontSize={"xs"}>{v.price}</Td>
                <Td fontSize={"xs"}>
                  <Badge
                    colorScheme="red"
                    textTransform={"capitalize"}
                    borderRadius={"10px"}
                  >
                    {v.visibility}
                  </Badge>{" "}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export const CustomerDetails = () => {
  const navigate = useNavigate();
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  return (
    <>
      <Stack gap={3} bgColor={"white"}>
        <Flex py={2} px={5} alignItems={"center"} gap={2}>
          <Button
            leftIcon={<IoIosArrowBack />}
            size={"xs"}
            onClick={() => navigate("/merchant/customers")}
          >
            Customer List
          </Button>
          <Text>|</Text>
          <Button size={"xs"}>Single customer</Button>
        </Flex>

        <Stack p={5}>
          <Avatar name="Adams Umar" size={"sm"} />
          <Text fontSize={"xs"} fontWeight={"bold"}>{`Demi Charlse`}</Text>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>{`Email:        demi@gmail.com`}</Text>
            <Badge
              textTransform={"capitalize"}
              rounded={"lg"}
              colorScheme="red"
            >
              Active
            </Badge>
          </Flex>
          <Text fontSize={"xs"}>{`Date added:   12/02/2012`}</Text>
        </Stack>

        <Flex
          boxShadow={"lg"}
          borderRadius={"md"}
          bgColor={"white"}
          p={4}
          flexDir={"column"}
          minH={"35vh"}
          gap={3}
        >
          <Flex
            fontSize={"xs	"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={"bold"}>Overall Reward Trend</Text>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              size={"xs	"}
              width={"auto"}
            />
          </Flex>
          <Box h={"30vh"}>
            <CustomersDetailsChart />
          </Box>
        </Flex>
        <Stack
          bgColor={"white"}
          borderRadius={"lg"}
          p={4}
          gap={4}
          boxShadow={"lg"}
        >
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Sales History
          </Text>
          <CustomerRewardTable />
        </Stack>
      </Stack>
    </>
  );
};
