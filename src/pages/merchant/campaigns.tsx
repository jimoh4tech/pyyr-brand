import {
  Avatar,
  AvatarGroup,
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
  Progress,
  Select,
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
import { MdOutlineCampaign } from "react-icons/md";
import {
  FaDotCircle,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ICampaign } from "../../interface/campaigns";
import { ItemCheck } from "./kyc";
import { useFormik } from "formik";
import { GrDocumentUpload } from "react-icons/gr";
import { Select as MultiSelect } from "chakra-react-select";
import customersService from "../../services/customers";
import { ICustomer } from "../../interface/customer";
import { IVoucherTable } from "../../interface/voucher";
import voucherService from "../../services/voucher";
import { getDaysBetweenDates } from "../../util/format-date.util";
import campaignService from "../../services/campaign";

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
  setStatus,
}: {
  setStep: (num: number) => void;
  setStatus: (status: "list" | "create") => void;
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
        "image",
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
                  name="image"
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
                <FormLabel fontSize={"xs"} htmlFor={"campaign_name"}>
                  Title
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"campaign_name"}
                    name={"campaign_name"}
                    type="text"
                    size={"xs"}
                    value={formik.values.campaign_name}
                    onChange={formik.handleChange}
                    placeholder="Enter title"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"campaign_des"}>
                  Description
                </FormLabel>
                <InputGroup>
                  <Textarea
                    id={"campaign_des"}
                    name={"campaign_des"}
                    size={"xs"}
                    value={formik.values.campaign_des}
                    onChange={formik.handleChange}
                    placeholder="Enter description"
                  />
                </InputGroup>
              </FormControl>
              <Flex gap={3}>
                <FormControl isRequired>
                  <FormLabel fontSize={"xs"} htmlFor={"sdate"}>
                    Start date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id={"sdate"}
                      name={"sdate"}
                      type="date"
                      size={"xs"}
                      value={formik.values.sdate}
                      onChange={formik.handleChange}
                      min={new Date().toISOString().slice(0, -14)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={"xs"} htmlFor={"edate"}>
                    End date
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id={"edate"}
                      name={"edate"}
                      type="date"
                      size={"xs"}
                      value={formik.values.edate}
                      onChange={formik.handleChange}
                      min={new Date().toISOString().slice(0, -14)}
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent={"flex-end"} gap={3}>
          <Button
              onClick={() => setStatus("list")}
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
  customers,
  vouchers,
}: {
  setStep: (num: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  customers: ICustomer[];
  vouchers: IVoucherTable[];
}) => {
  const [value, setValue] = useState<
    readonly { label: string; value: string }[]
  >([]);
  const customerList = customers.map((c) => {
    return { label: c.email, value: c.code };
  });
  return (
    <>
      <Flex bg={"white"} flex={1} flexDir={"column"}>
        <Flex p={5} flexDir={"column"} gap={3}>
          <Heading fontSize={"sm"}>Add Customers</Heading>
          <Text fontSize={"xs"}>
            Select one or more customers and assign them to your campaign
          </Text>
          <Divider />
          <Flex p={2} bg={"white"}>
            <Flex flexDir={"column"} gap={3} w={"100%"}>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"campaign_voucher"}>
                  Assign customers to vouchers
                </FormLabel>
                <Flex gap={1}>
                  <Select
                    placeholder="Select voucher"
                    size={"sm"}
                    onChange={formik.handleChange}
                    w={"60"}
                    name="campaign_voucher"
                  >
                    {vouchers.map((v) => (
                      <option key={v.code} value={v.code}>
                        {`${v.Name} | ${v.amount}`}
                      </option>
                    ))}
                  </Select>
                  <MultiSelect
                    isMulti
                    placeholder="Select customers"
                    name="campaign_customers"
                    options={customerList}
                    closeMenuOnSelect={false}
                    value={value}
                    onChange={setValue}
                    size={"sm"}
                  />
                </Flex>
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
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  campaign_customer: value.map((v) => v.value),
                });
                // console.log(formik.values)
                setStep(3);
              }}
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
  vouchers,
}: {
  setStep: (num: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  vouchers: IVoucherTable[];
}) => {
  const [upload, setUpload] = useState<string | undefined>(undefined);
  const reader = new FileReader();
  reader.onload = () => {
    setUpload(reader.result as string);
  };
  reader.readAsDataURL(formik.values.image);
  const selectedVoucher = vouchers.find(
    (v) => v.code === formik.values.campaign_voucher
  );
  return (
    <>
      <Flex bg={"white"} flex={1} flexDir={"column"}>
        <Flex p={5} flexDir={"column"} gap={3}>
          <Heading fontSize={"sm"}>Preview</Heading>
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
              <Avatar name={formik.values.campaign_name} src={upload} />
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"} color={"gray"}>
                  {formik.values.campaign_name}
                </Text>
                <Text fontSize={"small"} color={"gray"}>
                  Duration
                </Text>
              </Flex>
              <Flex justifyContent={"flex-end"}>
                <Flex gap={1}>
                  <Badge textTransform={"capitalize"} size={"sm"}>
                    {`${getDaysBetweenDates(
                      formik.values.sdate,
                      formik.values.edate
                    )} days`}
                  </Badge>
                  <Badge textTransform={"capitalize"} size={"sm"}>
                    {`${formik.values.sdate} - ${formik.values.edate}`}
                  </Badge>
                </Flex>
              </Flex>
            </Stack>
            <Text fontSize={"small"}>Description</Text>
            <Text fontSize={"small"} color={"gray"}>
              {formik.values.campaign_des}
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
              <Flex justifyContent={"space-between"}>
                <Text fontSize={"small"} fontWeight={"semibold"}>
                  {formik.values.campaign_customer.length}
                </Text>
                <AvatarGroup size="xs" max={5}>
                  {formik.values.campaign_customer?.map((c: string) => (
                    <Avatar name={c} key={c} />
                  ))}
                </AvatarGroup>
              </Flex>
            </Stack>
            <Text fontSize={"small"}>Voucher Details</Text>
            <Flex>
              <Text fontSize={"x-small"} color={"gray"} w={28}>
                Name
              </Text>
              <Text fontSize={"x-small"} color={"gray"}>
                {selectedVoucher?.Name}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"x-small"} color={"gray"} w={28}>
                Description
              </Text>
              <Text fontSize={"x-small"} color={"gray"}>
                {selectedVoucher?.description}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"x-small"} color={"gray"} w={28}>
                Redeemable at
              </Text>
              <Text fontSize={"x-small"} color={"gray"}>
                {selectedVoucher?.redemption}
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
              type="submit"
              isLoading={formik.isSubmitting}
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
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("PYMAILYR") || "";

      const res = await customersService.getAllCustomers({
        list_customer: token,
      });

      console.log({ res });
      setCustomers(res[1]);
      const resV = await voucherService.getAllMerchantVouchers({
        list_voucher: token,
      });

      console.log({ resV });
      setVouchers(resV[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const formik = useFormik({
    initialValues: {
      campaign_name: "",
      campaign_des: "",
      sdate: "",
      edate: "",
      image: "",
      campaign_voucher: "",
      campaign_customer: [],
    },
    async onSubmit(values) {
      try {
        if (
          !formik.values.campaign_name &&
          !formik.values.campaign_des &&
          !formik.values.sdate &&
          !formik.values.edate &&
          !formik.values.image &&
          !formik.values.campaign_customer &&
          !formik.values.campaign_voucher
        ) {
          toast({
            title: "Error",
            description: "Some required fields are empty",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
        const token = localStorage.getItem("PYMAILYR") || "";
        const newVal = {
          ...values,
          user_campaign: token,
        };
        console.log({ newVal });

        const res = await campaignService.addCampaign(newVal);
        console.log(res);

        if (res.responseCode == 200) {
          toast({
            title: "Campaign successfully created.",
            description: res.responseMessage,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setStatus("list");
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
              <Form1 setStep={setStep} formik={formik} setStatus={setStatus}/>
            ) : step === 2 ? (
              <Form2
                setStep={setStep}
                formik={formik}
                customers={customers}
                vouchers={vouchers}
              />
            ) : (
              <Form3 setStep={setStep} formik={formik} vouchers={vouchers} />
            )}
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};
const CampaignList = ({
  setStatus,
  campaigns,
}: {
  setStatus: (status: "list" | "create") => void;
  campaigns: ICampaign[] | null;
}) => {
  const [filterText, setFilterText] = useState("");

  if (campaigns && campaigns?.length === 0)
    return <CampaignEmpty setStatus={setStatus} />;
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
            </Tr>
          </Thead>
          <Tbody>
            {campaigns
              ?.filter(
                (c) =>
                  c.name.toLowerCase().includes(filterText.toLowerCase()) ||
                  c.businessName
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
                    {t.sdate}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {t.edate}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {t.no_customer}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    {`₦${t.amount}`}
                  </Td>
                  <Td fontSize={"xs"} color={"gray"}>
                    <Flex alignItems={"center"} gap={1}>
                      <Avatar src={t.logo} size={"xs"} />
                      <Text fontSize={"x-small"}>{t.businessName}</Text>
                    </Flex>
                  </Td>
                  {/* <Td fontSize={"xs"} color={"gray"}>
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
                  </Td> */}
                  {/* <Td>
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
                          <MenuItem
                            onClick={() =>
                              navigate(`/merchant/customers/${t.city}`)
                            }
                          >
                            <Flex gap={4} alignItems={"center"}>
                              <IoEyeOutline size={"20px"} cursor={"pointer"} />
                              <Text fontSize={"small"}>View</Text>
                            </Flex>
                          </MenuItem>
                          <DeactivateCustomerModal />
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Td> */}
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
  const [campaigns, setCampaigns] = useState<ICampaign[] | null>(null);
  const [cData, setCData] = useState<{
    active: number;
    customers: string;
    redeemed: string;
    unredeemed: string;
  } | null>(null);
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await campaignService.getAllCampaigns({
        list_campaign: token,
      });
      console.log({ res });
      setCData(res[0]);
      setCampaigns(res[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);
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
            <DisplayCard
              value={cData?.active || 0}
              label="Active Campaigns"
              isChecked={true}
            />
            <DisplayCard
              value={cData?.customers || 0}
              label="Qualified Customers"
              isChecked={true}
            />
            <DisplayCard
              value={`₦${cData?.redeemed}`}
              label="Redeemed Vouchers"
              isChecked={true}
            />
            <DisplayCard
              value={`₦${cData?.unredeemed}`}
              label="Unredeemed Vouchers"
              isChecked={true}
            />
          </Flex>
          <CampaignList setStatus={setStatus} campaigns={campaigns} />
        </>
      ) : (
        <CreateCampaign setStatus={setStatus} />
      )}
    </Flex>
  );
};
