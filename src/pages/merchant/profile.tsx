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
  HStack,
  Input,
  InputGroup,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { CiEdit, CiLocationOn, CiMobile2 } from "react-icons/ci";
import { CurrentUserContext } from "../../context/user.context";
import userService from "../../services/user";
import { QRCodeSVG } from "qrcode.react";

const Form1 = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const formik = useFormik({
    initialValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      mail: currentUser?.mail || "",
      phone: currentUser?.phone || "",
      role: "",
      dob: currentUser?.dob || "",
      type: currentUser?.id_type || "",
      id_number: currentUser?.id_number || "",
    },
    async onSubmit(values) {
      console.log(values);
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
              <FormLabel fontSize={"xs"} htmlFor={"name"}>
                {"Name"}
              </FormLabel>
              <HStack>
                <Input
                  id={"name"}
                  name={"firstName"}
                  type="text"
                  w={"full"}
                  size={"xs"}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder="First Name"
                />
                <Input
                  id={"name"}
                  name={"lastName"}
                  type="text"
                  w={"full"}
                  size={"xs"}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  placeholder="Last Name"
                />
              </HStack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"mail"}>
                {"Email Address"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"mail"}
                  name={"mail"}
                  type="email"
                  size={"xs"}
                  value={formik.values.mail}
                  onChange={formik.handleChange}
                  placeholder="Enter Email"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"phone"}>
                {"Phone Number"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"phone"}
                  name={"phone"}
                  type="number"
                  size={"xs"}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="090908678000"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"dob"}>
                {"Date of Birth"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"dob"}
                  name={"dob"}
                  type="date"
                  size={"xs"}
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  placeholder="Enter date"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"id_type"}>
                {"Select ID"}
              </FormLabel>

              <Select
                size={"xs"}
                onChange={formik.handleChange}
                name="id_type"
                placeholder="Select option"
              >
                <option value="NIN">NIN</option>
                <option value="BVN">BVN</option>
                <option value="Driver Lisence">Driver's Lisence</option>
                <option value="Internation Passport">
                  Internation Passport
                </option>
                <option value="Voter Card">Voter's Card</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"idNumber"}>
                {"ID Number"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"idNumber"}
                  name={"id_number"}
                  type="text"
                  size={"xs"}
                  value={formik.values.id_number}
                  onChange={formik.handleChange}
                  placeholder="Enter Select ID Number"
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <Stack gap={5}>
            <Divider />
            <Flex justifyContent={"flex-end"} gap={3}>
              <Button colorScheme="purple" size={"xs"} type="submit">
                Update Changes
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </form>
    </>
  );
};

const Form2 = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const industries = [
    "Agricuture",
    "Commerce",
    "Finance",
    "Education",
    "Gaming",
    "Health",
    "Hospitality",
    "Entertainment",
    "Logistics",
    "Travel",
    "Utility",
  ];

  const businesses = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company (LLC)",
    "Corporation",
    "Nonprofit Organization",
    "Cooperative",
    "Franchise",
    "Social Enterprise",
    "Startup",
  ];
  const formik = useFormik({
    initialValues: {
      brand_name: currentUser?.brand_name || "",
      businessType: currentUser?.businessType || "",
      city: currentUser?.city || "",
      state: currentUser?.state || "",
      country: currentUser?.country || "",
      date: currentUser?.date || "",
      website: currentUser?.website || "",
      rc_number: currentUser?.rc_number || "",
      logo: currentUser?.logo || "",

      industry: currentUser?.industry || "",
      b_mail: currentUser?.mail || "",
      b_phone: currentUser?.phone || "",
    },
    async onSubmit(values) {
      console.log(values);
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
              <FormLabel fontSize={"xs"} htmlFor={"logo"}>
                {"Business Logo"}
              </FormLabel>
              <Text fontSize={"xs"}>Add a business logo</Text>
              <Input
                id={"logo"}
                name={"logo"}
                type="file"
                size={"xs"}
                onChange={(event) => {
                  formik.setFieldValue(
                    "logo",
                    event.currentTarget.files && event.currentTarget.files[0]
                  );
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"brand_name"}>
                {"Business Name"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"brand_name"}
                  name={"brand_name"}
                  type="text"
                  size={"xs"}
                  value={formik.values.brand_name}
                  onChange={formik.handleChange}
                  placeholder="Business Name"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"business Type"}>
                {"Business Type"}
              </FormLabel>
              <HStack>
                <Select
                  size={"xs"}
                  name="businessType"
                  placeholder="Select Type"
                  onChange={formik.handleChange}
                >
                  {businesses.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Select>
                <Select
                  size={"xs"}
                  onChange={formik.handleChange}
                  name="industry"
                  placeholder="Industry"
                >
                  {industries.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Select>
              </HStack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"name"}>
                {"Location"}
              </FormLabel>
              <HStack>
                <Select
                  size={"xs"}
                  onChange={formik.handleChange}
                  name="city"
                  placeholder="City"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Select
                  size={"xs"}
                  onChange={formik.handleChange}
                  name="state"
                  placeholder="State"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Select
                  size={"xs"}
                  onChange={formik.handleChange}
                  name="country"
                  placeholder="Country"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </HStack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"date"}>
                {"Date of Establishment"}
              </FormLabel>
              <Input
                id={"date"}
                name={"date"}
                type="date"
                size={"xs"}
                value={formik.values.date}
                onChange={formik.handleChange}
                placeholder="Enter Date"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"email"}>
                {"Email Address"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"email"}
                  name={"b_mail"}
                  type="email"
                  size={"xs"}
                  value={formik.values.b_mail}
                  onChange={formik.handleChange}
                  placeholder="Enter Email"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"phone"}>
                {"Phone Number"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"phone"}
                  name={"b_phone"}
                  type="number"
                  size={"xs"}
                  value={formik.values.b_phone}
                  onChange={formik.handleChange}
                  placeholder="090908678000"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"xs"} htmlFor={"website"}>
                {"Website"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"website"}
                  name={"website"}
                  type="text"
                  size={"xs"}
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  placeholder="www.enteryourwebsite.com"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"rcNumber"}>
                {"RC Number"}
              </FormLabel>
              <InputGroup>
                <Input
                  id={"rcNumber"}
                  name={"rc_number"}
                  type="text"
                  size={"xs"}
                  value={formik.values.rc_number}
                  onChange={formik.handleChange}
                  placeholder="Enter RC Number"
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <Stack gap={5}>
            <Divider />
            <Flex justifyContent={"flex-end"} gap={3}>
              <Button colorScheme="purple" size={"xs"} type="submit">
                Update Changes
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </form>
    </>
  );
};

const Form3 = () => {
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      bank: "",
      accountName: "",
    },
    async onSubmit(values) {
      console.log(values);
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
              <FormLabel fontSize={"xs"} htmlFor={"name"}>
                {"Account Number"}
              </FormLabel>
              <Input
                id={"name"}
                name={"accountNumber"}
                type="text"
                w={"full"}
                size={"xs"}
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                placeholder="0990987996"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"bank"}>
                {"Bank"}
              </FormLabel>
              <Select size={"xs"} placeholder="Select option">
                <option value="option1">GTBank</option>
                <option value="option2">UBA</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={"xs"} htmlFor={"name"}>
                {"Account Name"}
              </FormLabel>
              <Input
                id={"name"}
                name={"accountName"}
                type="text"
                w={"full"}
                size={"xs"}
                value={formik.values.accountName}
                onChange={formik.handleChange}
                placeholder="Spotify Nig Limited"
              />
            </FormControl>
          </Flex>
          <Stack gap={5}>
            <Divider />
            <Flex justifyContent={"flex-end"} gap={3}>
              <Button colorScheme="purple" size={"xs"} type="submit">
                Update Changes
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </form>
    </>
  );
};
const EditProfileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size={"sm"}
        variant={"outline"}
        leftIcon={<CiEdit />}
        onClick={onOpen}
      >
        Edit Details
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"sm"}>
            Edit Information{" "}
            <Text fontSize={"xs"} fontWeight={"light"}>
              Some information would require you contact Pyyr for edit Access
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <Tabs variant="soft-rounded" size={"sm"} colorScheme="purple">
              <TabList
                bgColor={"#f5f5f4"}
                borderRadius={"3xl"}
                p={1}
                fontSize={"sm"}
                justifyContent={"space-between"}
              >
                <Tab fontSize={"sm"}>Key Contact Info</Tab>
                <Tab fontSize={"sm"}>Business Details</Tab>
                <Tab fontSize={"sm"}>Account Info</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Form1 />
                </TabPanel>
                <TabPanel>
                  <Form2 />
                </TabPanel>
                <TabPanel>
                  <Form3 />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const MerchantProfile = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const [accountDetails, setAccountDetails] = useState([]);

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
          {currentUser?.email === "2" && <EditProfileDrawer />}
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
            <Text fontSize={"xs"}>Weblink</Text>
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
            <Text fontSize={"xs"}>{accountDetails[0]}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Bank Name</Text>
            <Text fontSize={"xs"}>{accountDetails[3]}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"xs"}>Account Name</Text>
            <Text fontSize={"xs"}>{accountDetails[1]}</Text>
          </Flex>
        </Stack>
      </Stack>
      <Stack gap={4}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          QR Code
        </Text>

        <Stack gap={3}>
          <QRCodeSVG value={currentUser?.wallet_id || "pyyr"} />
        </Stack>
      </Stack>
    </Stack>
  );
};
