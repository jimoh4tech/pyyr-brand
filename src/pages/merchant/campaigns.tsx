import {
  Avatar,
  Badge,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Progress,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { DisplayCard } from "./dashboard";
import { formatCurrency } from "../../util/format-currency.util";
import { MdOutlineCampaign } from "react-icons/md";
import {
  FaDotCircle,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ICampaign } from "../../interface/campaigns";
import { ItemCheck } from "./kyc";
import { useFormik } from "formik";
import { GrDocumentUpload } from "react-icons/gr";

const CampaignEmpty = ({
  setStatus,
}: {
  setStatus: (status: "list" | "create") => void;
}) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      direction="column"
      bgColor={"white"}
      minH={"70vh"}
      boxShadow={"lg"}
      rounded={"md"}
      gap={3}
    >
      <MdOutlineCampaign size={"30px"} />
      <Text fontWeight={"bold"}>No Active Campaigns Yet</Text>
      <Text fontSize={"small"}>
        You're just a step away reaching your customers, create a campaign now
      </Text>
      <Button
        leftIcon={<FaDotCircle />}
        colorScheme="purple"
        variant="solid"
        rounded={"xl"}
        size={"xs"}
        onClick={() => setStatus("create")}
      >
        Create Campaign
      </Button>
    </Flex>
  );
};

const Form1 = ({
  setStep,
  formik,
}: {
  setStep: (num: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the file input click
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      formik.setFieldValue(
        "customerFile",
        event.currentTarget.files && event.currentTarget.files[0]
      );
    }
  };
  return (
    <>
      <Flex bg={"white"} flex={1} flexDir={"column"}>
        <Flex p={5} flexDir={"column"} gap={3}>
          <Heading fontSize={"sm"}>Campaign Details</Heading>
          <Text fontSize={"xs"}>
            Kindly Provide the information below to create your campaign
          </Text>
          <Divider />
          <Flex p={5} bg={"white"}>
            <Flex flexDir={"column"} gap={1} w={"100%"}>
              <Stack border={"1px solid #e4e4e4"} p={5}>
                <Center onClick={handleButtonClick} cursor={"pointer"}>
                  <GrDocumentUpload size={"20px"} />
                </Center>

                <Text color="gray.600" fontSize="xs" textAlign={"center"}>
                  Selected File: <strong>{fileName}</strong>
                </Text>
                <Text fontSize={"xs"} color={"gray"} textAlign={"center"}>
                  Upload cover image
                </Text>
                <Input
                  type="file"
                  ref={inputRef}
                  display="none"
                  onChange={handleFileChange}
                />

                <Flex gap={1} justifyContent={"center"}>
                  <Text fontSize={"xs"} color={"gray"} textAlign={"center"}>
                    jpeg,png up to 2mb
                  </Text>
                </Flex>
              </Stack>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"worth"}>
                  Title
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"worth"}
                    name={"worth"}
                    type="text"
                    size={"xs"}
                    value={formik.values.worth}
                    onChange={formik.handleChange}
                    placeholder="Enter title"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"amount"}>
                  Description
                </FormLabel>
                <InputGroup>
                  <Textarea
                    id={"amount"}
                    name={"amount"}
                    size={"xs"}
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder="Enter description"
                  />
                </InputGroup>
              </FormControl>
              <Flex gap={3}>
                <FormControl isRequired>
                  <FormLabel fontSize={"xs"} htmlFor={"startdate"}>
                    Start date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id={"startdate"}
                      name={"startdate"}
                      type="date"
                      size={"xs"}
                      value={formik.values.worth}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={"xs"} htmlFor={"startdate"}>
                    End date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id={"startdate"}
                      name={"startdate"}
                      type="date"
                      size={"xs"}
                      value={formik.values.worth}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent={"flex-end"} gap={3}>
            <Button
              colorScheme="purple"
              rightIcon={<FaLongArrowAltRight />}
              size={"xs"}
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
const Form2 = ({
  setStep,
  formik,
}: {
  setStep: (num: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
}) => {
  return (
    <>
      <Flex bg={"white"} flex={1} flexDir={"column"}>
        <Flex p={5} flexDir={"column"} gap={3}>
          <Heading fontSize={"sm"}>Pricing</Heading>
          <Text fontSize={"xs"}>
            Kindly Provide the information below to create your campaign
          </Text>
          <Divider />
          <Flex p={5} bg={"white"}>
            <Flex flexDir={"column"} gap={3} w={"100%"}>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"worth"}>
                  Customers
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"worth"}
                    name={"worth"}
                    type="text"
                    size={"xs"}
                    value={formik.values.worth}
                    onChange={formik.handleChange}
                    placeholder="Select"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"amount"}>
                  Voucher
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"amount"}
                    name={"amount"}
                    type="text"
                    size={"xs"}
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder="Select"
                  />
                </InputGroup>
              </FormControl>
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent={"flex-end"} gap={3}>
            <Button
              onClick={() => setStep(1)}
              colorScheme="purple"
              leftIcon={<FaLongArrowAltLeft />}
              size={"xs"}
              variant={"ghost"}
            >
              Back
            </Button>
            <Button
              colorScheme="purple"
              rightIcon={<FaLongArrowAltRight />}
              size={"xs"}
              onClick={() => setStep(3)}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
const Form3 = ({
  setStep,
  formik,
}: {
  setStep: (num: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
}) => {
  const toast = useToast();
  return (
    <>
      <Flex bg={"white"} flex={1} flexDir={"column"}>
        <Flex p={5} flexDir={"column"} gap={3}>
          <Heading fontSize={"sm"}>Pricing</Heading>
          <Text fontSize={"xs"}>
            Please perform an error check on the information provided before
            launching the campaign.
          </Text>
          <Divider />
          <Flex p={1} bg={"white"} direction={"column"} gap={1}>
            <Stack
              bgColor={"#fdfdfd"}
              rounded={"lg"}
              p={3}
              border={"1px solid #e4e4e4"}
              w={"full"}
            >
              <Avatar name="Wedding" />
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"} color={"gray"}>
                  Wedding
                </Text>
                <Text fontSize={"small"} color={"gray"}>
                  Duration
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"}>#13433535</Text>
                <Flex gap={1}>
                  <Badge textTransform={"capitalize"} size={"sm"}>
                    1 week
                  </Badge>
                  <Badge textTransform={"capitalize"} size={"sm"}>
                    12-03-
                  </Badge>
                </Flex>
              </Flex>
            </Stack>
            <Text fontSize={"small"}>Description</Text>
            <Text fontSize={"small"} color={"gray"}>
              The wedding is one that is
            </Text>
            <Text fontSize={"small"}>Customers</Text>
            <Stack
              bgColor={"#fdfdfd"}
              rounded={"lg"}
              p={3}
              border={"1px solid #e4e4e4"}
              w={"full"}
            >
              <Text fontSize={"small"} color={"gray"}>
                No. of customers added
              </Text>
              <Text fontSize={"small"} fontWeight={"semibold"}>
                129,000
              </Text>
            </Stack>
            <Text fontSize={"small"}>Voucher Details</Text>
            <Flex>
              <Text fontSize={"x-small"} color={"gray"} w={28}>
                Name
              </Text>
              <Text fontSize={"x-small"} color={"gray"}>
                Emerand
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"x-small"} color={"gray"} w={28}>
                Brand
              </Text>
              <Text fontSize={"x-small"} color={"gray"}>
                Spotify
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"x-small"} color={"gray"} w={28}>
                Redeemable at
              </Text>
              <Text fontSize={"x-small"} color={"gray"}>
                www.google.com
              </Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent={"flex-end"} gap={3}>
            <Button
              onClick={() => setStep(2)}
              colorScheme="purple"
              leftIcon={<FaLongArrowAltLeft />}
              size={"xs"}
              variant={"ghost"}
            >
              Go Back
            </Button>
            <Button
              colorScheme="purple"
              rightIcon={<FaLongArrowAltRight />}
              size={"xs"}
              onClick={() => {
                if (
                  formik.values.amount &&
                  formik.values.worth &&
                  formik.values.visibility &&
                  formik.values.promotional_title &&
                  formik.values.visibility &&
                  formik.values.voucher_name
                )
                  setStep(4);
                else {
                  toast({
                    title: "Error",
                    description: "Some required fields are empty",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right",
                  });
                }
              }}
            >
              Launch Campaign
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
const CreateCampaign = ({
  setStatus,
}: {
  setStatus: (status: "list" | "create") => void;
}) => {
  const [step, setStep] = useState(1);
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  const formik = useFormik({
    initialValues: {
      voucher_name: "",
      promotional_title: "",
      voucher_des: "",
      redemption: "",
      visibility: "",
      worth: "",
      amount: "",
      image: "",
      location_name: [],
      url: "",
      description: "",
      redeem: "",
      video: "",
    },
    async onSubmit(values) {
      try {
        const token = localStorage.getItem("PYMAILYR") || "";
        const newVal = {
          ...values,
          add_voucher: token,
        };
        console.log({ newVal });
        setStatus("create");

        // const res = await voucherService.createVoucher(newVal);
        // console.log(res);

        // if (res.responseCode == 200) {
        //   toast({
        //     title: "Vocuher successfully created.",
        //     description: res.responseMessage,
        //     status: "success",
        //     duration: 9000,
        //     isClosable: true,
        //     position: "top-right",
        //   });
        //   setStatus("list");
        // } else {
        //   toast({
        //     title: "Error",
        //     description:
        //       res.responseMessage ||
        //       "Opps! Something went wrong, try again later",
        //     status: "error",
        //     duration: 9000,
        //     isClosable: true,
        //     position: "top-right",
        //   });
        // }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Flex
      color={"black"}
      boxShadow={"md"}
      minH={"90vh"}
      p={3}
      flexDir={"column"}
      mt={2}
      bgColor={"white"}
    >
      <Text>New Campaign</Text>
      <Flex justify={"center"} display={isLessThan600 ? "flex" : "none"}>
        <CircularProgress value={step * 34} size={"70px"} color="#825ee4">
          <CircularProgressLabel fontSize={"xs"}>
            {step} of 3
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
      <Flex gap={2}>
        <Flex
          flex={1}
          flexDir={"column"}
          p={5}
          boxShadow={"md"}
          fontSize={"xs"}
          gap={3}
          display={isLessThan600 ? "none" : "flex"}
        >
          <Text>Steps</Text>
          <Flex alignItems={"center"} gap={2} justifyContent={"space-between"}>
            <Progress
              value={step * 34}
              colorScheme="purple"
              w="130px"
              size="xs"
              borderRadius={"md"}
            />
            <Text width={"32px"}>{step} of 3</Text>
          </Flex>

          <ItemCheck label="Campaign Details" value={1} step={step} />
          <ItemCheck label="Add Customers" value={2} step={step} />
          <ItemCheck label="Preview" value={3} step={step} />
        </Flex>
        <Flex bg={"#fbfbfb"} flex={3} p={isLessThan600 ? 1 : 5}>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            {step === 1 ? (
              <Form1 setStep={setStep} formik={formik} />
            ) : step === 2 ? (
              <Form2 setStep={setStep} formik={formik} />
            ) : (
              <Form3 setStep={setStep} formik={formik} />
            )}
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};
const CampaignList = ({
  setStatus,
}: {
  setStatus: (status: "list" | "create") => void;
}) => {
  const [filterText, setFilterText] = useState("");
  const campaigns: ICampaign[] = [
    {
      amount: "20000",
      brand: "Spotify",
      endDate: "12-03-2023",
      startDate: "12-04-2024",
      name: "Wedding",
      noOfCustomers: "120",
      status: "Claimed",
    },
    {
      amount: "20000",
      brand: "Nike",
      endDate: "12-03-2023",
      startDate: "12-04-2024",
      name: "Lover's Day",
      noOfCustomers: "4",
      status: "Claimed",
    },
    {
      amount: "20000",
      brand: "Slot",
      endDate: "12-03-2023",
      startDate: "12-04-2024",
      name: "Make a child happy",
      noOfCustomers: "35",
      status: "Claimed",
    },
  ];

  if (campaigns.length === 0) return <CampaignEmpty setStatus={setStatus} />;
  return (
    <Stack p={2} bgColor={"white"} boxShadow={"lg"} borderRadius={"lg"}>
      <Flex justifyContent={"space-between"} flexWrap={"wrap"} gap={2}>
        <Flex alignItems={"center"}>
          <InputGroup p={1} maxW={"sm"}>
            <InputLeftElement alignItems={"center"}>
              <FiSearch size={"15px"} />
            </InputLeftElement>
            <Input
              placeholder="Search Customer"
              size={"sm"}
              borderRadius={"md"}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Button
            leftIcon={<FaDotCircle />}
            colorScheme="purple"
            variant="solid"
            rounded={"xl"}
            size={"xs"}
            onClick={() => setStatus("create")}
          >
            Create Campaign
          </Button>
        </Flex>
      </Flex>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Name
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Start Date
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                End Date
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                No of Customers
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Amount
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Brand
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Status
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns
              ?.filter(
                (c) =>
                  c.name.toLowerCase().includes(filterText.toLowerCase()) ||
                  c.brand.toLowerCase().includes(filterText.toLowerCase()) ||
                  c.noOfCustomers
                    .toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  c.amount.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((t) => (
                <Tr fontSize={"xs"} key={t.name}>
                  <Td fontSize={"xs"}>
                    <Stack gap={2}>
                      <Text
                        fontSize={"xs"}
                        fontWeight={"semibold"}
                        color={"gray"}
                      >
                        {t.name}
                      </Text>
                    </Stack>
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {t.startDate}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {t.endDate}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {t.noOfCustomers}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {formatCurrency(t.amount)}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {t.brand}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    <Badge
                      textTransform={"capitalize"}
                      rounded={"lg"}
                      colorScheme={`${
                        t.status === "Claimed" ? "purple" : "red"
                      }`}
                    >
                      {" "}
                      {t.status}
                    </Badge>{" "}
                  </Td>
                  <Td>
                    {" "}
                    <Flex justifyContent={"center"} alignItems={"center"}>
                      <Menu>
                        <MenuButton>
                          <Flex>
                            <Text
                              fontSize={"large"}
                              fontWeight={"bold"}
                              textAlign={"center"}
                            >
                              ...{" "}
                            </Text>
                          </Flex>
                        </MenuButton>
                        <MenuList>
                          {/* <MenuItem
                            onClick={() =>
                              navigate(`/merchant/customers/${t.city}`)
                            }
                          >
                            <Flex gap={4} alignItems={"center"}>
                              <IoEyeOutline size={"20px"} cursor={"pointer"} />
                              <Text fontSize={"small"}>View</Text>
                            </Flex>
                          </MenuItem>
                          <DeactivateCustomerModal /> */}
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
export const CampaignPage = () => {
  const [status, setStatus] = useState<"list" | "create">("list");
  return (
    // <Flex justifyContent={"center"} alignItems={"center"} h={"80vh"}>
    //   <Text color={"purple"} fontSize={"x-large"} fontWeight={"semibold"}>
    //     Coming Soon
    //   </Text>
    // </Flex>

    <Flex direction={"column"} gap={5}>
      {status === "list" ? (
        <>
          <Flex gap={{ base: 1, md: 3 }} flexWrap={"wrap"}>
            <DisplayCard value={0} label="Active Campaigns" isChecked={true} />
            <DisplayCard
              value={0}
              label="Qualified Customers"
              isChecked={true}
            />
            <DisplayCard
              value={formatCurrency(0)}
              label="Redeemed Vouchers"
              isChecked={true}
            />
            <DisplayCard
              value={formatCurrency(0)}
              label="Unredeemed Vouchers"
              isChecked={true}
            />
          </Flex>
          <CampaignList setStatus={setStatus} />
        </>
      ) : (
        <CreateCampaign setStatus={setStatus} />
      )}
    </Flex>
  );
};
