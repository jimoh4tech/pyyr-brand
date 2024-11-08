import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
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
import { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IVoucherTable } from "../../interface/voucher";
import voucherService from "../../services/voucher";

const GiftVoucherModal = ({
  code,
  disabled,
}: {
  code: string;
  disabled: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, toggleLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleUpdate = async (code: string, user: string) => {
    try {
      toggleLoading(true);
      const email = localStorage.getItem("PYMAILYR") || "";
      const val = {
        gift_voucher: email,
        code,
        user,
      };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user)) {
        toast({
          title: "Error",
          description: "Invalid mail! Kindly enter a valid mail",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        toggleLoading(false);
      }
      // console.log(val);
      const res = await voucherService.giftVoucher(val);
      // console.log(res);
      if (res.responseCode == 200) {
        toast({
          title: "Gift Successfully Updated",
          description: res.responseMessage,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        toggleLoading(false);
        onClose();
      } else {
        toggleLoading(false);
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
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={"xs"}
        colorScheme="purple"
        cursor={"pointer"}
        isDisabled={disabled}
      >
        Gift
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"medium"}>Gift Voucher</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"small"}>Email</Text>
                <Input
                  type="email"
                  w={"50%"}
                  size={"sm"}
                  value={email}
                  placeholder="johhy@pyyr.io"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Flex>

              <Flex my={5}>
                <Spacer />
                <Button
                  size={"sm"}
                  colorScheme="purple"
                  variant={"outline"}
                  mr={4}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  size={"sm"}
                  colorScheme="purple"
                  onClick={() => handleUpdate(code, email)}
                  isLoading={isLoading}
                >
                  Gift
                </Button>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const GiftedUsersPopover = ({
  code,
  disabled,
}: {
  code: string;
  disabled: boolean;
}) => {
  const toast = useToast();
  const [users, setUsers] = useState<string[]>([]);

  const handleViewGiftVoucher = async () => {
    try {
      const email = localStorage.getItem("PYMAILYR") || "";
      const val = {
        gift_all: email,
        code,
      };
      // console.log(val);
      const res = await voucherService.viewGiftVoucher(val);
      // console.log(res, res[0].responseCode);
      if (res[0].responseCode == 200) {
        toast({
          title: "Fetched gifted successfully",
          description: res[0].responseMessage,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unprocessedUsers = res[1]?.map((u: any) => u.User);
        console.log({ unprocessedUsers });
        setUsers(unprocessedUsers);
      } else {
        // toggleLoading(false);
        toast({
          title: "Error",
          description:
            res[0].responseMessage ||
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
  };
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button
          size={"xs"}
          colorScheme="purple"
          variant={"outline"}
          cursor={"pointer"}
          mr={1}
          onClick={handleViewGiftVoucher}
          isDisabled={disabled}
        >
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Gifted Users</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {users.length === 0 ? (
            <div>Loading...</div>
          ) : (
            users.map((u) => <div key={u}>{u}</div>)
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
const GiftTable = ({ vouchers }: { vouchers: IVoucherTable[] }) => {
  return (
    <Stack p={2} bgColor={"white"} boxShadow={"lg"} borderRadius={"lg"}>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Name
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Code
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Amount
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Quantity
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Gifted
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Redeemed
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {vouchers?.map((v) => (
              <Tr fontSize={"xs"} key={v.code}>
                <Td fontSize={"xs"}>
                  <Text fontSize={"xs"}>{v.Name}</Text>
                </Td>
                <Td fontSize={"xs"}>
                  <Text fontSize={"xs"}>{v.code}</Text>
                </Td>
                <Td fontSize={"xs"}>
                  <Text fontSize={"xs"}>{v.worth}</Text>
                </Td>
                <Td fontSize={"xs"}>
                  <Text fontSize={"xs"}>{v.qty}</Text>
                </Td>
                <Td fontSize={"xs"}>
                  <Text fontSize={"xs"}>{v.qty_gifted}</Text>
                </Td>
                <Td fontSize={"xs"}>
                  <Text fontSize={"xs"}>{v.redeem}</Text>
                </Td>
                <Td fontSize={"xs"}>
                  <GiftedUsersPopover
                    code={v.code}
                    disabled={v?.qty_gifted === 0}
                  />
                  <GiftVoucherModal
                    code={v.code}
                    disabled={v.qty <= (v?.qty_gifted || 0)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export const GiftsPage = () => {
  const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await voucherService.getGiftVouchers({
        list_giftvoucher: token,
      });

      // console.log({ res });
      setVouchers(res[1]);
      // setVData(res[0]);
    };

    fetchVouchers();
  }, []);

  const toast = useToast();

  return (
    <Stack gap={5}>
      {" "}
      <Flex gap={{ base: 1, md: 3 }}>
        <DisplayCard value="0" label="Total No of Invitees" isChecked={true} />
        <DisplayCard value="0" label="Total No Redeemed" isChecked={true} />
        <DisplayCard
          value="0"
          label="Total No to be claimed"
          isChecked={true}
        />
      </Flex>
      <Flex justifyContent={"space-between"} gap={6}>
        <Spacer />
        <Button
          size={"sm"}
          rightIcon={<AiOutlineFileAdd />}
          onClick={() =>
            toast({
              title: "Coming soon",
              description: "We're currently working on this feature!",
              status: "info",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            })
          }
        >
          Gift Multiple
        </Button>
      </Flex>
      <GiftTable vouchers={vouchers} />
    </Stack>
  );
};
