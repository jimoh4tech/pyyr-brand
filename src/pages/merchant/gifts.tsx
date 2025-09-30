import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
  Spinner,
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
import { useEffect, useRef, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IVoucherTable } from "../../interface/voucher";
import voucherService from "../../services/voucher";
import moment from "moment";

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
                Brand
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
                <Td fontSize={"xs"} maxW={"200px"}>
                  <Text fontSize={"xs"} isTruncated>
                    {v.Name}
                  </Text>
                </Td>
                <Td fontSize={"xs"} maxW={"200px"}>
                  <Text fontSize={"xs"} isTruncated>
                    {v.brand}
                  </Text>
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const toast = useToast();
  const [vouchers, setVouchers] = useState<IVoucherTable[] | null>(null);
  const [giftValue, setGiftValue] = useState<{
    total_gifted: string;
    total_redeemed: string;
    total_redeemed_amount: string;
  } | null>(null);
  const [exportFrom, setExportFrom] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [exportTo, setExportTo] = useState(moment().format("YYYY-MM-DD"));
  const token = localStorage.getItem("PYMAILYR") || "";

  useEffect(() => {
    const fetchVouchers = async () => {
      const res = await voucherService.getGiftVouchers({
        list_giftvoucher: token,
      });

      console.log({ res });
      setVouchers(res[1]);
      setGiftValue(res[0]);
    };

    fetchVouchers();
  }, []);

  return (
    <Stack gap={5}>
      {" "}
      <Flex gap={{ base: 1, md: 3 }}>
        <DisplayCard
          value={giftValue?.total_gifted || 0}
          label="Total No Gifted"
          isChecked={true}
        />
        <DisplayCard
          value={giftValue?.total_redeemed || 0}
          label="Total No Redeemed"
          isChecked={true}
        />
        <DisplayCard
          value={giftValue?.total_redeemed_amount || 0}
          label="Total No to be claimed"
          isChecked={true}
        />
      </Flex>
      <Flex justifyContent={"space-between"} gap={6}>
        <Spacer />
        <Button size={"sm"} colorScheme="purple" onClick={onOpen}>
          Export
        </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Date Range</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <InputGroup size="sm">
                  <InputLeftAddon>From</InputLeftAddon>
                  <Input
                    size={"sm"}
                    placeholder="2025-11-20"
                    type="date"
                    value={exportFrom}
                    onChange={(e) => setExportFrom(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size="sm">
                  <InputLeftAddon>To</InputLeftAddon>
                  <Input
                    size={"sm"}
                    placeholder="2025-11-30"
                    type="date"
                    value={exportTo}
                    onChange={(e) => setExportTo(e.target.value)}
                  />
                </InputGroup>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant={"outline"} size={"sm"} mr={3} onClick={onClose}>
                Close
              </Button>
              <Link
                href={`https://boltspecta.com/pyyr/app.php?export_history=${token}&start=${exportFrom}&end=${exportTo}`}
                target="_blank"
                isExternal
                bgColor={'purple.500'}
                color={'white'}
                fontSize={'small'}
                px={4}
                py={2}
                borderRadius={'7px'}
                // size={'xs'}
              >
                Export
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
      {!vouchers ? (
        <Center mt={20}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Center>
      ) : (
        <GiftTable vouchers={vouchers} />
      )}
    </Stack>
  );
};
