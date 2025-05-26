import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import notification from "../../assets/notification.svg";
import help from "../../assets/help.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/user.context";

export const Header = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <>
      <Flex
        p={1}
        color={"black"}
        justifyContent={{ base: "flex-end", md: "space-between" }}
        boxShadow={"sm"}
        w={{ base: "", md: "full" }}
        alignItems={"center"}
      >
        <Flex
          gap={3}
          alignItems={"center"}
          fontSize={"sm"}
          display={{ base: "none", md: "flex" }}
        >
          <Text>Dashboard</Text>
          <InputGroup p={1}>
            <InputLeftElement alignItems={"center"}>
              <FiSearch size={"15px"} />
            </InputLeftElement>
            <Input placeholder="Search" size={"sm"} borderRadius={"30px"} />
          </InputGroup>
        </Flex>
        <Flex gap={3} alignItems={"center"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={0}
            display={{ base: "none", md: "flex" }}
          >
            <Avatar size="2xs" src={help} />
            <Link fontSize={"xs"} textDecoration={"underline"}>
              Get help
            </Link>
            <Popover>
              <PopoverTrigger>
                <Button>Trigger</Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Header</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button colorScheme="blue">Button</Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Stack>
          <Box>
            <Avatar size={"xs"} src={notification} />
          </Box>
          <Box>
            <Avatar
              size={"sm"}
              src={currentUser?.logo}
              name={currentUser?.first_name || currentUser?.brand_name}
            />
          </Box>
          <Text display={{ base: "none", md: "flex" }} fontSize={"sm"}>
            {`Hello ${currentUser?.first_name || currentUser?.brand_name}`}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
