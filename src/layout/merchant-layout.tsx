import {
  IconButton,
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  FlexProps,
  Image,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import pyyr from "../assets/pyyr.svg";
import { Outlet } from "react-router-dom";
import { Header } from "../pages/brand/header";
import { useEffect, useState } from "react";
import { MerchantSidebarContent } from "../pages/merchant/sidebar";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  currentNav: string;
}

const MobileNav = ({ onOpen, currentNav, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 2, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box cursor={"pointer"} ml={6} display={{ base: "flex", md: "none" }}>
        <Image src={pyyr} alt="pyyr" />
      </Box>
      <Header currentNav={currentNav} />
    </Flex>
  );
};

export const MerchantLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentNav, setCurrentNav] = useState<
    | "Dashboard"
    | "Vouchers"
    | "Wallet"
    | "Customers"
    | "Gifts"
    | "Campaigns"
    | "Profile"
    | "Marketplace"
  >("Dashboard");

  useEffect(() => {
    if (window.location.href.endsWith("/")) setCurrentNav("Dashboard");
    else if (window.location.href.includes("/vouchers"))
      setCurrentNav("Vouchers");
    else if (window.location.href.includes("/wallet")) setCurrentNav("Wallet");
    else if (window.location.href.includes("/customers"))
      setCurrentNav("Customers");
    else if (window.location.href.includes("/gifts")) setCurrentNav("Gifts");
    else if (window.location.href.includes("/marketplace"))
      setCurrentNav("Marketplace");
    else if (window.location.href.includes("/profile"))
      setCurrentNav("Profile");
    else if (window.location.href.includes("/campaigns"))
      setCurrentNav("Campaigns");
  }, []);

  return (
    <Box minH="100vh" bg={"#fbfbfb"}>
      <MerchantSidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "flex" }}
        currentNav={currentNav}
        setCurrentNav={setCurrentNav}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <MerchantSidebarContent
            onClose={onClose}
            currentNav={currentNav}
            setCurrentNav={setCurrentNav}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} currentNav={currentNav} />
      <Box ml={{ base: 0, md: 60 }} p={{ base: 1, md: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
