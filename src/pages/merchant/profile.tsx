import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { CiEdit, CiLocationOn, CiMobile2 } from "react-icons/ci";
import { CurrentUserContext } from "../../context/user.context";
import userService from "../../services/user";
import authService from "../../services/auth";
import { QRCodeCanvas } from "qrcode.react";

const Form1 = ({ onClose }: { onClose: () => void }) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    async onSubmit(values) {
      // console.log(values);
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await authService.changePasswordAuth({
        ...values,
        email: token,
      });
      // console.log(res);

      if (res?.responseCode == 200) {
        toast({
          title: "Success",
          description: res?.responseMessage || "Password successfully changed",
          status: "success",
          duration: 9000,
          position: "top-right",
        });
        formik.setValues({
          confirm_password: "",
          current_password: "",
          new_password: "",
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: res?.responseMessage || "Error changing password",
          status: "error",
          duration: 9000,
          position: "top-right",
        });
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex
          bg={"white"}
          flexDir={"column"}
          justifyContent={"space-between"}
          minH={"75vh"}
        >
          <Flex flexDir={"column"} gap={3} w={"100%"}>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"current_password"}>
                {"Current Password"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"current_password"}
                  name={"current_password"}
                  type="password"
                  size={"xs"}
                  value={formik.values.current_password}
                  onChange={formik.handleChange}
                  placeholder="Enter current password"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"new_password"}>
                {"New Password"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"new_password"}
                  name={"new_password"}
                  type="password"
                  size={"xs"}
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  placeholder="Enter New password"
                  minLength={6}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"confirm_password"}>
                {"Confirm Password"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"confirm_password"}
                  name={"confirm_password"}
                  type="password"
                  size={"xs"}
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  placeholder="Enter confirm password"
                  minLength={6}
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <Stack gap={5}>
            <Divider />
            <Flex justifyContent={"flex-end"} gap={3}>
              <Button
                colorScheme="purple"
                size={"xs"}
                type="submit"
                isLoading={formik.isSubmitting}
              >
                Update Password
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </form>
    </>
  );
};

const ChangePasswordDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size={"sm"}
        variant={"outline"}
        leftIcon={<CiEdit />}
        onClick={onOpen}
      >
        Change Password
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"sm"}>
            Change Password{" "}
            <Text fontSize={"xs"} fontWeight={"light"}>
              Kindly fill the following fields
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <Form1 onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const MerchantProfile = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const [accountDetails, setAccountDetails] = useState([]);
  const downloadQRCode = () => {
    const canvas = document.querySelector(
      "#qrcode-canvas"
    ) as HTMLCanvasElement;
    if (!canvas) throw new Error("<canvas> not found in the DOM");

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QR code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await userService.getBankDetails({
        get_bank: token,
      });
      console.log({ res });
      setAccountDetails(res[1][0]);
    };

    fetchAccountDetails();
  }, []);

  return (
    <Stack p={5} borderRadius={"lg"} boxShadow={"lg"} bg={"white"} gap={7}>
      <Stack gap={4}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Profile information
          </Text>
          {/* Temporarily diabled edit profile */}
          {<ChangePasswordDrawer />}
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Avatar src={currentUser?.logo} name={currentUser?.businessName} />
          <Stack>
            <Text
              fontSize={"xs"}
              fontWeight={"bold"}
            >{`${currentUser?.businessName} | ${currentUser?.rc_number} | ${currentUser?.email}`}</Text>
            <Flex gap={1}>
              <CiMobile2 />
              <Text fontSize={"xs"}>{currentUser?.phone}</Text>
            </Flex>
            <Flex gap={1}>
              <CiLocationOn />
              <Text
                fontSize={"xs"}
              >{`${currentUser?.state}, ${currentUser?.country}`}</Text>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
      <Stack gap={4}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Business Details
        </Text>

        <Stack gap={3}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Business Type</Text>
            <Text fontSize={"xs"}>{currentUser?.businessType}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Industry</Text>
            <Text fontSize={"xs"}>{currentUser?.industry}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Date of Establishment</Text>
            <Text fontSize={"xs"}>{currentUser?.date}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Store Link</Text>
            <Text fontSize={"xs"}>{currentUser?.website}</Text>
          </Flex>
        </Stack>
      </Stack>

      <Stack gap={4}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Key Contact Details
        </Text>

        <Stack gap={3}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Full Name</Text>
            <Text
              fontSize={"xs"}
            >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Date of Birth</Text>
            <Text fontSize={"xs"}>{currentUser?.dob}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Nationality</Text>
            <Text fontSize={"xs"}>{currentUser?.country}</Text>
          </Flex>
        </Stack>
      </Stack>

      <Stack gap={4}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          Payment Account Info
        </Text>

        <Stack gap={3}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Account Number</Text>
            <Text fontSize={"xs"}>{accountDetails && accountDetails[0]}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Bank Name</Text>
            <Text fontSize={"xs"}>{accountDetails && accountDetails[3]}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Account Name</Text>
            <Text fontSize={"xs"}>{accountDetails && accountDetails[1]}</Text>
          </Flex>
        </Stack>
      </Stack>
      <Stack gap={4}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"xs"}>Wallet ID</Text>
          <Text fontSize={"xs"}>{currentUser?.wallet_id}</Text>
        </Flex>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          QR Code
        </Text>

        <Stack gap={3}>
          <QRCodeCanvas
            id="qrcode-canvas"
            value={currentUser?.email || "pyyr@pyyr.io"}
            size={290}
            level={"H"}
            marginSize={2}
          />
          <Button colorScheme="purple" onClick={downloadQRCode}>
            Download QR Code
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
