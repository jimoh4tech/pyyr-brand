import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import transactionsService from "../services/transactions";
import {
  Button,
  Container,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const PaymentLinkPage = () => {
  const param = useParams();
  const [transactions, setTransactions] = useState<
    { Name: string; code: string; Date: string; Amount: string }[]
  >([]);

  useEffect(() => {
    const getManagerTransaction = async () => {
      // console.log(param);
      const res = await transactionsService.getManagerTransactions({
        payment_view: param?.link || "",
      });
      // console.log({ res });
      setTransactions(res[0]);
    };

    getManagerTransaction();
  }, [param]);
  return (
    <>
      <Container maxW={"1200px"}>
        <Flex justifyContent="center" alignItems={"center"}>
          <Button colorScheme="purple" onClick={() => location.reload()}>
            Refresh
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="striped" colorScheme="purple" size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Code</Th>
                <Th>Date</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions?.map((t) => (
                <Tr key={t.code + t.Amount + t.Name}>
                  <Td>{t.Name}</Td>
                  <Td>{t.code}</Td>
                  <Td>{t.Date}</Td>
                  <Td isNumeric>{t.Amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
