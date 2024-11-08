import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Circle,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { IVoucherTable } from "../../interface/voucher";
import voucherService from "../../services/voucher";
import { IoEyeOutline } from "react-icons/io5";
import { formatCurrency } from "../../util/format-currency.util";
import {
  MdOutlineAddShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { CartItem } from "./cart";

export const VocuherDetailModal = ({ voucher }: { voucher: IVoucherTable }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        bgColor={"white"}
        px={5}
        py={2}
        w="100px"
        border={"1px solid #f2f2f2"}
        borderRadius={"md"}
        boxShadow={"md"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <IoEyeOutline />
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"medium"}>Vocuher Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Name:</Text>
                <Text fontSize={"small"}>{voucher.Name}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Code:</Text>
                <Text fontSize={"small"}>{voucher.code}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Title:</Text>
                <Text fontSize={"small"}>{voucher.promotional_title}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Description:</Text>
                <Text fontSize={"small"}>{voucher.description}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Visibility:</Text>
                <Text fontSize={"small"}>{voucher.visibility}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Amount:</Text>
                <Text fontSize={"small"}>{formatCurrency(voucher.amount)}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Quantity:</Text>
                <Text fontSize={"small"}>{voucher.qty}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Redemption:</Text>
                <Text fontSize={"small"}>{voucher.redemption}</Text>
              </Flex>
              {/* <Flex justifyContent={'space-between'}>
								<Text fontSize={'small'}>Quantity Used:</Text>
								<Text fontSize={'small'}>{voucher.qty_used}</Text>
							</Flex> */}
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>Expiration Date:</Text>
                <Text fontSize={"small"}>{voucher?.exp}</Text>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const MarketPlaceCard = ({
  voucher,
  setCartCount,
}: {
  voucher: IVoucherTable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCartCount: any;
}) => {
  const toast = useToast();
  const handleAddToCart = async () => {
    try {
      const email = localStorage.getItem("PYMAILYR") || "";
      const val = {
        email,
        add_cart: voucher.code,
      };
      console.log(val);
      const res = await voucherService.addVoucherToCart(val);
      console.log(res);
      if (res.responseCode == 200) {
        toast({
          title: "Voucher Successfully Added",
          description: res.responseMessage,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setCartCount(res.cartCount);
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
  };
  return (
    <Card w={"290px"}>
      <CardBody>
        <Stack gap={4}>
          <Flex gap={4} alignItems={"center"}>
            <Avatar src={voucher.image} name={voucher.Name} />
            <Stack>
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
              >{`${voucher.Name} | ${voucher.code}`}</Text>
              <Text fontSize={"xs"}>{voucher.promotional_title}</Text>
            </Stack>
          </Flex>

          <Flex justifyContent={"space-around"}>
            <VocuherDetailModal voucher={voucher} />
            <Flex
              bgColor={"white"}
              px={5}
              py={2}
              w="100px"
              border={"1px solid #f2f2f2"}
              borderRadius={"md"}
              boxShadow={"md"}
              justifyContent={"center"}
              cursor={"pointer"}
              onClick={handleAddToCart}
            >
              <MdOutlineAddShoppingCart />
            </Flex>
          </Flex>

          <Flex
            bgColor={"white"}
            px={5}
            py={3}
            border={"1px solid #f2f2f2"}
            borderRadius={"md"}
            boxShadow={"md"}
            justifyContent={"center"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              {formatCurrency(voucher.amount)}
            </Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

const MarketPlaceCardList = ({
  vouchers,
  setCartCount,
}: {
  vouchers: IVoucherTable[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCartCount: any;
}) => {
  return (
    <Flex flexWrap={"wrap"} gap={3} justifyContent={"center"}>
      {vouchers.map((v) => (
        <MarketPlaceCard voucher={v} key={v.code} setCartCount={setCartCount} />
      ))}
    </Flex>
  );
};

const CartDrawer = ({ cartCount }: { cartCount: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartItems, setCartItems] = useState<IVoucherTable[]>([]);
  const [total, setTotal] = useState("0");
  const [refetchCart, setRefetchCart] = useState(true);
  const [isLoading, toggleLoading] = useState(false);
  const [exp, setExp] = useState(
    moment().add(60, "days").format("YYYY-MM-DDTHH:mm")
  );
  useEffect(() => {
    const fetchCartVouchers = async () => {
      try {
        const email = localStorage.getItem("PYMAILYR") || "";
        const res = await voucherService.getAllCartVouchers({
          get_cart: email,
        });
        console.log({ res, data: res[1], am: res[0]?.cartTotal });
        setCartItems(res[1]);
        setTotal(res[0]?.cartTotal?.replace(",", "") || "0");
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartVouchers();
  }, [refetchCart, isOpen]);

  const toast = useToast();
  const handleCheckout = async () => {
    if (!exp) return;
    if (total == "0.00") {
      toast({
        title: "Error",
        description: "Cannot checkout empty cart.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      toggleLoading(true);
      const email = localStorage.getItem("PYMAILYR") || "";
      const val = {
        checkout: email,
        exp,
      };
      console.log(val);
      const res = await voucherService.checkoutOrder(val);
      console.log(res);
      if (res.responseCode == 200) {
        toast({
          title: "Voucher Successfully Checkout",
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
      <Box
        onClick={onOpen}
        bg="white"
        cursor="pointer"
        position="relative"
        px={4}
        py={3}
        borderRadius="md"
        _hover={{ bg: "gray.200" }}
      >
        <Circle
          size={"15px"}
          position="absolute"
          top={1.5}
          right={1.5}
          bg="#825EE4"
          color={"white"}
          fontSize="smaller"
        >
          {cartCount}
        </Circle>

        <MdOutlineShoppingCart />
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your cart</DrawerHeader>
          <DrawerBody>
            <Stack gap={10}>
              <Flex flexDir={"column"} gap={4}>
                {cartItems.map((it: IVoucherTable) => (
                  <CartItem
                    key={it.code}
                    voucher={it}
                    setRefetchCart={setRefetchCart}
                    refetchCart={refetchCart}
                  />
                ))}
              </Flex>
              <Flex gap={3} alignItems={"center"}>
                <Text fontSize={"sm"}>Expiration</Text>
                <Input
                  size={"sm"}
                  type="datetime-local"
                  defaultValue={exp}
                  onChange={(e) => setExp(e.target.value)}
                />
              </Flex>
              <Divider />
              <Flex>
                <Spacer />
                <Text fontWeight={"bold"}>Total: {formatCurrency(total)}</Text>
              </Flex>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="purple"
              onClick={handleCheckout}
              isLoading={isLoading}
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const MarketPlacePage = () => {
  const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchVouchers = async () => {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await voucherService.getAllVouchers({ all_voucher: token });

      const cart = await voucherService.getAllCartVouchers({ get_cart: token });
      console.log({ res, data: res[1], cart: cart[0]?.cartCount });
      setVouchers(res[1]);
      setCartCount(cart[0]?.cartCount);
    };

    fetchVouchers();
  }, []);

  return (
    <Stack>
      <Flex
        flex={1}
        boxShadow={"md"}
        borderRadius={"md"}
        flexDir={"column"}
        p={1}
      >
        <Flex
          justifyContent={"space-between"}
          fontSize={"sm"}
          alignItems={"center"}
          p={2}
        >
          <Flex
            gap={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Text fontSize={"xs"}>Brands</Text>
            <CartDrawer cartCount={cartCount} />
          </Flex>
        </Flex>

        <MarketPlaceCardList vouchers={vouchers} setCartCount={setCartCount} />
      </Flex>
    </Stack>
  );
};
