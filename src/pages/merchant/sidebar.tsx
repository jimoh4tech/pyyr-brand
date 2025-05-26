import {
  Avatar,
  Badge,
  Box,
  BoxProps,
  Button,
  CloseButton,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import pyyr from "../../assets/pyyr.svg";
import dashboard from "../../assets/dashboard.svg";
import market from "../../assets/market.svg";
import profile from "../../assets/profile.svg";
import group from "../../assets/group.svg";
import control from "../../assets/control.svg";
import wallet from "../../assets/wallet.svg";
import campaign from "../../assets/campaign.svg";
import notification from "../../assets/voucher.svg";
import turn_left from "../../assets/turn_left.svg";
import { useNavigate } from "react-router-dom";
import { INavItem } from "../../interface/interface.nav-items";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/user.context";

interface SidebarProps extends BoxProps {
  onClose: () => void;
  currentNav: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentNav: any;
}

const NavItem = ({
  label,
  icon,
  href,
  isActive,
  setCurrentNav,
  onClose,
  tag,
}: INavItem) => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        gap={5}
        onClick={() => {
          setCurrentNav(label);
          onClose();
        }}
      >
        <Flex alignItems={"center"}>
          <Box
            bgColor={isActive ? "#825EE4" : "white"}
            w={"3px"}
            h={"12px"}
            borderRadius={"10px"}
          />
        </Flex>
        <Flex
          gap={2}
          bg={isActive ? "#E0D5FF" : "white"}
          flex={1}
          p={2}
          borderRadius={"md"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={() => navigate(href)}
          _hover={{ bg: "#E0D5FF" }}
        >
          <Box width={6}>
            <Image src={icon} />
          </Box>
          <Text color={"black"}>{label}</Text>
          {tag && (
            <Badge
              size={"sm"}
              fontSize={"x-small"}
              variant="solid"
              colorScheme="purple"
            >
              {tag}
            </Badge>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export const MerchantSidebarContent = ({
  onClose,
  currentNav,
  setCurrentNav,
  ...rest
}: SidebarProps) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navItems: INavItem[] = [
    {
      label: "Dashboard",
      icon: dashboard,
      href: "/merchant",
    },
    {
      label: "Gifts",
      icon: control,
      href: "/merchant/gifts",
    },
    {
      label: "Customers",
      icon: group,
      href: "/merchant/customers",
    },
    {
      label: "Campaigns",
      icon: campaign,
      href: "/merchant/campaigns",
      tag: "New",
    },
    {
      href: "/merchant/wallet",
      icon: wallet,
      label: "Wallet",
    },
    {
      href: "/merchant/vouchers",
      icon: notification,
      label: "Vouchers",
    },
    {
      href: "/merchant/marketplace",
      icon: market,
      label: "Marketplace",
    },
    {
      href: "/merchant/profile",
      icon: profile,
      label: "Profile",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("PYMAILYR");
    setCurrentUser(null);
    navigate("/signin");
  };

  return (
    <Flex
      transition="3s ease"
      bg={"white"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h={"full"}
      pr={5}
      // display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
      {...rest}
    >
      <Stack gap={1}>
        <Flex h="20" alignItems="center" ml="6">
          <Flex
            flex={1}
            flexDir={"column"}
            gap={2}
            onClick={() => {
              navigate("/");
              setCurrentNav("Dashboard");
            }}
          >
            <Box cursor={"pointer"} ml={6}>
              <Image src={pyyr} alt="pyyr" />
            </Box>
            <Divider width={"full"} />
          </Flex>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {navItems.map((it) => (
          <NavItem
            key={it.label}
            {...it}
            isActive={currentNav == it.label}
            setCurrentNav={setCurrentNav}
            onClose={onClose}
          />
        ))}
      </Stack>
      <Stack gap={2} mb={4}>
        <Flex
          gap={2}
          cursor={"pointer"}
          boxShadow={"md"}
          p={1}
          borderRadius={"5px"}
        >
          <Box>
            <Avatar
              size={"sm"}
              src={currentUser?.logo}
              name={currentUser?.firstName}
            />
          </Box>
          <Flex flexDir={"column"} color={"black"}>
            <Text fontSize={"xs"} fontWeight={"bold"}>
              {currentUser?.firstName}
            </Text>
            <Text fontSize={"xs"}>{currentUser?.email}</Text>
          </Flex>
        </Flex>
        <Button
          leftIcon={<Image src={turn_left} alt="left-turn" />}
          boxShadow={"md"}
          bgColor={"white"}
          color={"red"}
          onClick={handleLogout}
        >
          LOG OUT
        </Button>
      </Stack>
    </Flex>
  );
};
