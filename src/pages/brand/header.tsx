import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
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
import { CurrentUserContext } from "../../context/user.context";
import { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import usersService from "../../services/user";
import { INotification } from "../../interface/notification";

export const Header = ({ currentNav }: { currentNav: string }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("PYMAILYR") || "";
    const res = await usersService.getNotifications({ notification: token });

    console.log("Notifications", res[1]);
    setNotifications(res[1]);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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
          <Text width={"135px"}>{currentNav}</Text>
        </Flex>
        <Flex gap={3} alignItems={"center"}>
          <Popover>
            <PopoverTrigger>
              <Button
                leftIcon={<IoNotificationsOutline />}
                rightIcon={<MdOutlineKeyboardArrowDown />}
                bgColor={"white"}
              >
                Notification
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent maxH={"400px"} overflowY={"auto"} w={"300px"}>
                <PopoverArrow />
                <PopoverHeader color={"black"}>
                  <Flex gap={2} alignItems={"center"}>
                    <IoNotificationsOutline />
                    <Text fontSize={"sm"} color={"black"} fontWeight={"bold"}>
                      Notifications
                    </Text>
                    <Text fontSize={"xs"} color={"gray"}>
                      {notifications?.length || 0} unread
                    </Text>
                  </Flex>
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  {notifications?.length === 0 ? (
                    <Text fontSize={"xs"}>No notifications</Text>
                  ) : (
                    <Stack>
                      {notifications?.map((notification) => (
                        <Card maxW="md">
                          <CardBody>
                            <Flex gap={4}>
                              <Flex gap="4" alignItems="center">
                                <Stack>
                                  <Text fontSize={"xs"} color={"gray"}>
                                    {notification?.date}
                                  </Text>
                                  <Heading size="xs">
                                    {notification?.title}
                                  </Heading>
                                  <Text fontSize={"xs"}>
                                    {notification?.description}
                                  </Text>
                                </Stack>
                              </Flex>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                    </Stack>
                  )}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
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
