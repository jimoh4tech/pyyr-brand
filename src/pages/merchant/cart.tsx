import {
  Button,
  CloseButton,
  Flex,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import voucherService from "../../services/voucher";
import { IVoucherTable } from "../../interface/voucher";
import { formatCurrency } from "../../util/format-currency.util";

const QuantitySelect = ({
  voucher,
  setRefetchCart,
  refetchCart,
}: {
  voucher: IVoucherTable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefetchCart: any;
  refetchCart: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const increaseCartItem = async () => {
    try {
      setIsLoading(true);
      const email = localStorage.getItem("PYMAILYR") || "";
      const val = {
        email,
        add_cart: voucher.code,
      };
      // console.log(val);
      const res = await voucherService.addVoucherToCart(val);
      // console.log(res);
      setRefetchCart(!refetchCart);
      if (res.responseCode == 200) {
        toast({
          title: "Voucher Successfully Added",
          description: res.responseMessage,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
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

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const reduceCartItem = async () => {
    try {
      setIsLoading(true);
      const email = localStorage.getItem("PYMAILYR") || "";
      const val = {
        email,
        reduce_cart: voucher.code,
      };
      // console.log(val);
      const res = await voucherService.reduceQtyVoucherFromCart(val);
      // console.log(res);
      setRefetchCart(!refetchCart);
      if (res.responseCode == 200) {
        toast({
          title: "Voucher Successfully Reduced",
          description: res.responseMessage,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
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

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex justifyContent={"space-between"} alignItems="center" minW={"90px"}>
      <Button
        colorScheme="purple"
        isDisabled={voucher.qty === 1}
        shadow="lg"
        isLoading={isLoading}
        size={"xs"}
        onClick={reduceCartItem}
      >
        &#9866;
      </Button>
      <Text fontWeight={"bold"}>{voucher.qty}</Text>
      <Button
        isLoading={isLoading}
        shadow="lg"
        colorScheme="purple"
        size={"xs"}
        onClick={increaseCartItem}
      >
        &#10011;
      </Button>
    </Flex>
  );
};

export const CartItem = ({
  voucher,
  setRefetchCart,
  refetchCart,
}: {
  voucher: IVoucherTable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefetchCart: any;
  refetchCart: boolean;
}) => {
  const toast = useToast();
  const total = Number(voucher.price?.replace(",", "")) * Number(voucher.qty);

  const removeCartItem = async () => {
    try {
      const email = localStorage.getItem("PYMAILYR") || "";
      const val = {
        email,
        remove_cart: voucher.code,
      };
      // console.log(val);
      const res = await voucherService.removeVoucherFromCart(val);
      // console.log(res);
      setRefetchCart(!refetchCart);
      if (res.responseCode == 200) {
        toast({
          title: "Voucher Successfully Reduced",
          description: res.responseMessage,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
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
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Flex flexDir={"column"} width={"70%"}>
        <Text fontWeight={"bold"} fontSize={"sm"}>
          {voucher.Name}
        </Text>
        <Text fontSize={"xs"}>{`Code: ${voucher.code}`}</Text>
      </Flex>

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <QuantitySelect
          voucher={voucher}
          setRefetchCart={setRefetchCart}
          refetchCart={refetchCart}
        />
        <Text fontWeight={"bold"}>{formatCurrency(total)}</Text>
        <CloseButton
          aria-label={`Delete ${voucher.code} from cart`}
          onClick={() => removeCartItem()}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Link
          fontSize="sm"
          textDecor="underline"
          onClick={() => removeCartItem()}
        >
          Delete
        </Link>
        <QuantitySelect
          voucher={voucher}
          setRefetchCart={setRefetchCart}
          refetchCart={refetchCart}
        />
        <Text fontWeight={"bold"}>{formatCurrency(total)}</Text>
      </Flex>
    </Flex>
  );
};
