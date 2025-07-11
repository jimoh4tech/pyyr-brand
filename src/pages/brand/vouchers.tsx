import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  CircularProgressLabel,
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
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import empty from "../../assets/voucher_empty.svg";
import verified from "../../assets/verified.svg";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { ItemCheck } from "./kyc/index";
import { DisplayCard } from "./dashboard";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { IVoucherTable } from "../../interface/voucher";
import voucherService from "../../services/voucher";
import { formatCurrency } from "../../util/format-currency.util";
import { CurrentUserContext } from "../../context/user.context";
import authService from "../../services/auth";
import { IManager } from "../../interface/customer";

import { Select as MultiSelect } from "chakra-react-select";

const ModalForm1 = () => {
  return (
    <>
      <Text fontSize={"sm"} fontWeight={"semibold"}>
        Does your business sell vouchers/gift card currently?
      </Text>
      <RadioGroup defaultValue="yes" colorScheme="purple" mt={4}>
        <Stack spacing={2}>
          <Radio size={"sm"} value="yes">
            Yes
          </Radio>
          <Radio size={"sm"} value="no">
            No
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};

const ModalForm2 = () => {
  return (
    <>
      <Text fontSize={"sm"} fontWeight={"semibold"}>
        Are you the principal owner/sole decision maker for this brand or
        business in relations to voucher sales?
      </Text>
      <RadioGroup defaultValue="yes" colorScheme="purple" mt={4}>
        <Stack spacing={2}>
          <Radio size={"sm"} value="yes">
            Yes, i am the owner
          </Radio>
          <Radio size={"sm"} value="no">
            No, i’m gathering information on behalf of the owner
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};
const ModalForm3 = () => {
  return (
    <>
      <Text fontSize={"sm"} fontWeight={"semibold"}>
        When would you like to go live with voucher/gift card sales
      </Text>
      <RadioGroup defaultValue="1" colorScheme="purple" mt={4}>
        <Stack spacing={2}>
          <Radio size={"sm"} value="1">
            Immediately
          </Radio>
          <Radio size={"sm"} value="2">
            In a week
          </Radio>
          <Radio size={"sm"} value="3">
            In a Month
          </Radio>
          <Radio size={"sm"} value="4">
            In 6-12 Weeks
          </Radio>
          <Radio size={"sm"} value="5">
            In 6 Month
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};

const CreateVoucherModal = ({
  setStatus,
}: {
  setStatus: (status: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);

  return (
    <>
      <Button
        loadingText="Submitting"
        size="sm"
        colorScheme="purple"
        mt={2}
        onClick={onOpen}
        rightIcon={<IoIosArrowForward />}
      >
        Create Voucher
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent gap={4}>
          <ModalHeader fontSize={"md"}>Create Voucher</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            {step === 1 ? (
              <ModalForm1 />
            ) : step === 2 ? (
              <ModalForm2 />
            ) : (
              <ModalForm3 />
            )}
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              size={"sm"}
              onClick={() =>
                step < 2 ? setStep(step + 1) : setStatus("create")
              }
              colorScheme="purple"
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Empty = ({ setStatus }: { setStatus: any }) => {
  return (
    <>
      <Flex
        gap={3}
        flexDir={"column"}
        boxShadow={"md"}
        minH={"80vh"}
        justifyContent={"center"}
      >
        <Flex justify={"center"}>
          <Image src={empty} />
        </Flex>
        <Flex color={"black"} flexDir={"column"} alignItems={"center"} gap={2}>
          <Text fontWeight={"bold"} fontSize={"sm"}>
            You Presently have no Vouchers created
          </Text>
          <Text textAlign={"center"} fontSize={"xs"}>
            Kindly create a voucher to start selling to <br /> merchants
          </Text>
        </Flex>
        <Flex justify={"center"} color={"black"}>
          <Stack gap={3}>
            <CreateVoucherModal setStatus={setStatus} />
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
const Form1 = ({
  setStep,
  formik,
  setStatus,
}: {
  setStep: (num: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStatus: any;
}) => {
  return (
    <>
      <Flex bg={"white"} flex={1} flexDir={"column"}>
        <Flex p={5} flexDir={"column"} gap={3}>
          <Heading fontSize={"sm"}>Voucher Details</Heading>
          <Text fontSize={"xs"}>
            Kindly Provide the information below to create your voucher
          </Text>
          <Divider />
          <Flex p={5} bg={"white"}>
            <Flex flexDir={"column"} gap={3} w={"100%"}>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"image"}>
                  {"Cover Image"}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"image"}
                    name={"image"}
                    type="file"
                    size={"xs"}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image",
                        event.currentTarget.files &&
                          event.currentTarget.files[0]
                      );
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"title"}>
                  {"Voucher Title"}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"title"}
                    name={"voucher_name"}
                    type="text"
                    size={"xs"}
                    maxLength={30}
                    value={formik.values.voucher_name}
                    onChange={formik.handleChange}
                    placeholder="Enter the name you’d like to display on this voucher"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={"xs"} htmlFor={"promotion"}>
                  {"Promotional Title"}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"promotion"}
                    name={"promotional_title"}
                    type="text"
                    size={"xs"}
                    maxLength={50}
                    value={formik.values.promotional_title}
                    onChange={formik.handleChange}
                    placeholder="Additional subtext that’d catch the attention of your merchants"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"description"}>
                  {"Description"}
                </FormLabel>
                <InputGroup>
                  <Textarea
                    id={"description"}
                    name={"voucher_des"}
                    size={"xs"}
                    maxLength={100}
                    value={formik.values.voucher_des}
                    onChange={formik.handleChange}
                    placeholder="Give more context to the value of this voucher card. E.g Perfect for Staff, Customers and friends incentives"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"role"}>
                  {"Visibility"}
                </FormLabel>
                <Select
                  size={"xs"}
                  placeholder="Select Visibility"
                  name="visibility"
                  onChange={formik.handleChange}
                >
                  <option value="Draft">Draft</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </Select>
              </FormControl>
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent={"flex-end"} gap={3}>
            <Button
              onClick={() => setStatus("list")}
              colorScheme="purple"
              size={"xs"}
              variant={"ghost"}
              disabled={true}
            >
              Back
            </Button>
            <Button colorScheme="purple" size={"xs"} onClick={() => setStep(2)}>
              Proceed
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
  managers,
}: {
  setStep: (num: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  managers: IManager[];
}) => {
  const [value, setValue] = useState<
    readonly { label: string; value: string }[]
  >([]);

  const managersList = managers.map((m) => {
    return { label: m.location, value: m.code };
  });
  return (
    <>
      <Flex bg={"white"} flex={1} flexDir={"column"}>
        <Flex p={5} flexDir={"column"} gap={3}>
          <Heading fontSize={"sm"}>Redeem Location(s)</Heading>
          <Text fontSize={"xs"}>
            Kindly Provide the information below to create your voucher
          </Text>
          <Divider />
          <Flex p={5} bg={"white"}>
            <Flex flexDir={"column"} gap={3} w={"100%"}>
              {/* <FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'location'}>
									{'Locations'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'location'}
										name={'location_name'}
										type='text'
										size={'xs'}
										value={formik.values.location_name}
										onChange={formik.handleChange}
										placeholder='Enter location'
									/>
								</InputGroup>
							</FormControl> */}
              {/* <MultiSelect
								options={managers.map((m) => {
									return { label: m.location, value: m.code };
								})}
								value={value}
								label='Select Locations'
								onChange={setValue}
								size='sm'
							/> */}
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"location"}>
                  {"Locations"}
                </FormLabel>
                <MultiSelect
                  isMulti
                  name="location_name"
                  options={managersList}
                  placeholder="Select locations"
                  closeMenuOnSelect={false}
                  value={value}
                  onChange={setValue}
                  size={"sm"}
                />
              </FormControl>

              {/* <FormControl>
								<FormLabel fontSize={'xs'} htmlFor={'url'}>
									{'URL Location'}
								</FormLabel>
								<InputGroup>
									<Input
										id={'url'}
										name={'url'}
										type='text'
										size={'xs'}
										value={formik.values.url}
										onChange={formik.handleChange}
										placeholder='Enter Link'
									/>
								</InputGroup>
							</FormControl> */}
              {/* <FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'description'}>
									{'Description'}
								</FormLabel>
								<InputGroup>
									<Textarea
										id={'description'}
										name={'description'}
										size={'xs'}
										value={formik.values.description}
										onChange={formik.handleChange}
										placeholder='Give more context to the value of this voucher card. E.g Perfect for Staff, Customers and friends incentives'
									/>
								</InputGroup>
							</FormControl> */}

              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"how"}>
                  {"How to Redeem Voucher"}
                </FormLabel>
                <InputGroup>
                  <Textarea
                    id={"how"}
                    name={"redeem"}
                    size={"xs"}
                    value={formik.values.redeem}
                    onChange={formik.handleChange}
                    placeholder="1. Present your voucher card at any of our store during checkout.\n
2. Scan barcode using a barcode scanner at checkout\n 
3. Enter the unique voucher code at the online checkout on our website to enjoy the virtual shopping experience."
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={"xs"} htmlFor={"video"}>
                  {"Embed Explainer Video"}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"video"}
                    name={"video"}
                    type="text"
                    size={"xs"}
                    value={formik.values.video}
                    onChange={formik.handleChange}
                    placeholder="Enter Link"
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
              size={"xs"}
              variant={"ghost"}
            >
              Back
            </Button>
            <Button
              colorScheme="purple"
              size={"xs"}
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  location_name: value.map((v) => v.value),
                });
                // console.log(formik.values)
                setStep(3);
              }}
            >
              Proceed
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
            Kindly Provide the information below to create your voucher
          </Text>
          <Divider />
          <Flex p={5} bg={"white"}>
            <Flex flexDir={"column"} gap={3} w={"100%"}>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"worth"}>
                  {"Voucher’s Monetary Worth"}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"worth"}
                    name={"worth"}
                    type="text"
                    size={"xs"}
                    value={formik.values.worth}
                    onChange={formik.handleChange}
                    placeholder="What’s the worth of this voucher. E.g ₦20,000"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={"xs"} htmlFor={"amount"}>
                  {"Voucher Amount"}
                </FormLabel>
                <InputGroup>
                  <Input
                    id={"amount"}
                    name={"amount"}
                    type="text"
                    size={"xs"}
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder="How much would you sell this voucher for?"
                  />
                </InputGroup>
              </FormControl>

              {/* <FormControl isRequired>
								<FormLabel fontSize={'xs'} htmlFor={'role'}>
									{'Should this Voucher be redeemable once?'}
								</FormLabel>
								<Select size={'xs'} placeholder='Draft'>
									<option value='option1'>Yes, it should</option>
									<option value='option2'>
										No, it can be redeemable multiple times
									</option>
								</Select>
							</FormControl> */}
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent={"flex-end"} gap={3}>
            <Button
              onClick={() => setStep(2)}
              colorScheme="purple"
              size={"xs"}
              variant={"ghost"}
            >
              Back
            </Button>
            <Button
              colorScheme="purple"
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
              Proceed
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const VoucherCard = ({
  image,
  amount,
  worth,
  redemption,
  voucher_name,
}: {
  image: File;
  amount: string;
  worth: string;
  voucher_name: string;
  redemption: string;
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Card backgroundImage={URL.createObjectURL(image)}>
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Avatar src={currentUser?.logo} name={voucher_name} size={"xs"} />
          <Text>#763</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack gap={10}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Text fontWeight={"bold"} fontSize={"x-large"}>
              {voucher_name}
            </Text>
            <Text>{redemption}</Text>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Stack>
              <Text fontWeight={"semibold"}>{formatCurrency(amount)}</Text>
              <Text>{`Cost Price: ${formatCurrency(worth)}`}</Text>
            </Stack>

            <Button variant={"outline"}>Buy Now</Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

const Form4 = ({
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
          <Heading fontSize={"sm"}>Preview</Heading>
          <Text fontSize={"xs"}>
            A sneak peak on how the vouchers would look to your merchant
          </Text>
          <Divider />
          <Flex p={5} bg={"white"}>
            <Flex flexDir={"column"} gap={3} w={"100%"}>
              <VoucherCard {...formik.values} />
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent={"flex-end"} gap={3}>
            <Button
              onClick={() => setStep(3)}
              colorScheme="purple"
              size={"xs"}
              variant={"ghost"}
            >
              Back
            </Button>
            <Button
              colorScheme="purple"
              size={"xs"}
              type="submit"
              isLoading={formik.isSubmitting}
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateVoucher = ({ setStatus }: { setStatus: any }) => {
  const [step, setStep] = useState(1);
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  const toast = useToast();
  const [managers, setManagers] = useState<IManager[]>([]);

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

        const res = await voucherService.createVoucher(newVal);
        console.log(res);

        if (res.responseCode == 200) {
          toast({
            title: "Vocuher successfully created.",
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

  useEffect(() => {
    const fetchManagers = async () => {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await authService.getManagers({ get_managers: token });
      console.log(res);
      setManagers(res[1]);
    };
    fetchManagers();
  }, []);

  return (
    <>
      <Flex
        color={"black"}
        boxShadow={"md"}
        minH={"90vh"}
        p={3}
        flexDir={"column"}
        mt={2}
        bgColor={"white"}
      >
        <Text>Create Voucher</Text>
        <Flex justify={"center"} display={isLessThan600 ? "flex" : "none"}>
          <CircularProgress value={step * 25} size={"70px"} color="#825ee4">
            <CircularProgressLabel fontSize={"xs"}>
              {step} of 4
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
            <Flex
              alignItems={"center"}
              gap={2}
              justifyContent={"space-between"}
            >
              <Progress
                value={step * 25}
                colorScheme="purple"
                w="130px"
                size="xs"
                borderRadius={"md"}
              />
              <Text width={"32px"}>{step} of 4</Text>
            </Flex>

            <ItemCheck label="Voucher Details" value={1} step={step} />
            <ItemCheck label="Redeem Location(s)" value={2} step={step} />
            <ItemCheck label="Pricing " value={3} step={step} />
            <ItemCheck label="Preview" value={4} step={step} />
          </Flex>
          <Flex bg={"#fbfbfb"} flex={3} p={isLessThan600 ? 1 : 5}>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              {step === 1 ? (
                <Form1
                  setStep={setStep}
                  formik={formik}
                  setStatus={setStatus}
                />
              ) : step === 2 ? (
                <Form2 setStep={setStep} formik={formik} managers={managers} />
              ) : step === 3 ? (
                <Form3 setStep={setStep} formik={formik} />
              ) : (
                <Form4 setStep={setStep} formik={formik} />
              )}
            </form>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const ViewVoucherDrawer = ({
  code,
  worth,
  Name,
  amount,
  redemption,
  description,
}: // image,
IVoucherTable) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IoEyeOutline size={"20px"} onClick={onOpen} cursor={"pointer"} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"sm"}>View Voucher</DrawerHeader>
          <Divider />
          <DrawerBody>
            <Stack gap={5}>
              <Avatar name={Name} />
              <Flex justifyContent={"space-between"} width={"400px"}>
                <Text
                  fontSize={"xs"}
                  fontWeight={"bold"}
                  isTruncated
                >{`${Name} Voucher ${code}`}</Text>
                <HStack px={"3"} borderRadius={"lg"} boxShadow={"md"}>
                  <Image src={verified} alt={Name} />
                </HStack>
                <Text
                  fontSize={"xs"}
                  px={"3"}
                  borderRadius={"lg"}
                  boxShadow={"md"}
                >
                  {" "}
                  {formatCurrency(worth)}
                </Text>
                <Text
                  fontSize={"xs"}
                  px={"3"}
                  borderRadius={"lg"}
                  boxShadow={"md"}
                >{`@ ${formatCurrency(amount)}`}</Text>
              </Flex>
              <Divider />
              <Text
                fontSize={"xs"}
                fontWeight={"semibold"}
                textDecor={"underline"}
              >
                Description
              </Text>
              <Text fontSize={"xs"}>{description}</Text>
              <Text
                fontSize={"xs"}
                fontWeight={"semibold"}
                textDecor={"underline"}
              >
                How to Redeem Voucher
              </Text>
              <Text fontSize={"xs"}>{description}</Text>
              <Text
                fontSize={"xs"}
                fontWeight={"semibold"}
                textDecor={"underline"}
              >
                Where to Redeem
              </Text>
              <Text fontSize={"xs"}>{redemption}</Text>
              <Text
                fontSize={"xs"}
                fontWeight={"semibold"}
                textDecor={"underline"}
              >
                Expiry
              </Text>
              <Text fontSize={"xs"}>
                This Voucher Expires 1 month after purchase, after which becomes
                irredeemable.
              </Text>
              {/* <Text fontSize={'xs'} fontWeight={'semibold'}>
									Additional Information
								</Text>
								<Flex justifyContent={'space-between'} gap={3}>
									<Card size={'sm'} flex={1}>
										<CardBody>
											<Stack spacing={'5'}>
												<Text fontSize={'xs'}>No of times sold</Text>
												<Text fontSize={'xs'} fontWeight={'semibold'}>
													35
												</Text>
											</Stack>
										</CardBody>
									</Card>
									<Card size={'sm'} flex={1}>
										<CardBody>
											<Stack spacing={'5'}>
												<Flex justifyContent={'space-between'}>
													<Text fontSize={'xs'}>Merchants</Text>
													<Text
														fontSize={'xs'}
														textDecor={'underline'}
														textColor={'#825EE4'}
													>
														View
													</Text>
												</Flex>
												<Text fontSize={'xs'} fontWeight={'semibold'}>
													5
												</Text>
											</Stack>
										</CardBody>
									</Card>
									<Card size={'sm'} flex={1}>
										<CardBody>
											<Stack spacing={'5'}>
												<Text fontSize={'xs'}>Quantity Sold</Text>
												<Text fontSize={'xs'} fontWeight={'semibold'}>
													350
												</Text>
											</Stack>
										</CardBody>
									</Card>
								</Flex> */}
            </Stack>
            <Divider />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const VoucherTable = ({
  vouchers,
  update,
  setUpdate,
}: {
  vouchers: IVoucherTable[]; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUpdate: any;
  update: number;
}) => {
  const toast = useToast();

  const handleToggleAvailability = async (voucher_code: string) => {
    try {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await voucherService.toggleVoucherAvailabiility({
        update_availability: token,
        voucher_code,
      });
      if (res.responseCode == 200) {
        setUpdate(update + 1);
        toast({
          title: "Voucher successfully updated",
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
    <>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Voucher Name
              </Th>

              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Worth
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Voucher ID
              </Th>

              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Sales Price
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
            {vouchers?.map((v) => (
              <Tr fontSize={"xs"} key={v.code}>
                <Td fontSize={"xs"} isTruncated>
                  <Stack width={"100px"}>
                    <Text fontSize={"xs"} isTruncated>
                      {v.Name}
                    </Text>
                  </Stack>
                </Td>

                <Td fontSize={"xs"}>{formatCurrency(v.worth)}</Td>
                <Td fontSize={"xs"}>{v.code}</Td>

                <Td fontSize={"xs"}>{formatCurrency(v.amount)}</Td>
                <Td fontSize={"xs"}>
                  <Badge
                    bgColor={
                      v.visibility === "Available" ? "#d4f7e1" : "#ffd5d0"
                    }
                    textTransform={"capitalize"}
                    borderRadius={"10px"}
                  >
                    {v.visibility}
                  </Badge>{" "}
                </Td>
                <Td>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Switch
                      colorScheme="purple"
                      onChange={() => handleToggleAvailability(v.code)}
                      size={"sm"}
                      isChecked={v.visibility === "Available" ? true : false}
                    />{" "}
                    <ViewVoucherDrawer {...v} />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const VoucherContent = ({
  setStatus,
  vouchers,
  vData,
  setUpdate,
  update,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStatus: any;
  vouchers: IVoucherTable[];
  vData: {
    total_purchase: string;
    total_used: string;
    total_voucher: number;
  } | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUpdate: any;
  update: number;
}) => {
  const [filterText, setFilterText] = useState("");
  // const [filter, setFilter] = useState<'All' | 'Draft' | 'Private' | 'Public'>(
  // 	'All'
  // );
  return (
    <>
      <Flex gap={{ base: 1, md: 3 }}>
        <DisplayCard
          value={vData?.total_voucher || 0}
          label="Total No Vouchers"
          isChecked={true}
        />
        <DisplayCard
          value={formatCurrency(vData?.total_purchase?.replace(",", "") || "")}
          label="Total Purchased"
          isChecked={true}
        />
        <DisplayCard
          value={formatCurrency(vData?.total_used?.replace(",", "") || "")}
          label="Total Used"
          isChecked={true}
        />
      </Flex>
      <Flex
        flex={1}
        bg={"white"}
        borderRadius={"md"}
        boxShadow={"lg"}
        p={5}
        flexDir={"column"}
        gap={3}
      >
        <Flex
          justifyContent={"space-between"}
          flex={1}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
        >
          <Text fontSize={"sm"}>Vouchers</Text>
          <InputGroup p={1} maxW={"60%"}>
            <InputLeftElement alignItems={"center"}>
              <FiSearch size={"15px"} />
            </InputLeftElement>
            <Input
              placeholder="Search"
              size={"sm"}
              borderRadius={"30px"}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </InputGroup>
          {/* <Menu>
						<MenuButton
							fontSize={'sm'}
							as={Button}
							rightIcon={<MdKeyboardArrowDown />}
						>
							All
						</MenuButton>
						<MenuList
							defaultValue={'All'}
							// onChange={(e) => setFilter(e.target)}
						>
							<MenuItem fontSize={'sm'} value={'All'}>
								All
							</MenuItem>
							<MenuItem fontSize={'sm'} value={'Draft'}>
								Draft
							</MenuItem>
							<MenuItem fontSize={'sm'} value={'Private'}>
								Private
							</MenuItem>
							<MenuItem fontSize={'sm'} value={'Public'}>
								Public
							</MenuItem>
						</MenuList>
					</Menu> */}
          <CreateVoucherModal setStatus={setStatus} />
        </Flex>
        <Divider />
        <VoucherTable
          vouchers={vouchers.filter(
            (v) =>
              v.Name.toLowerCase().includes(filterText.toLowerCase()) ||
              v.code.toLowerCase().includes(filterText.toLowerCase()) ||
              v.amount.toLowerCase().includes(filterText.toLowerCase()) ||
              v.worth.toLowerCase().includes(filterText.toLowerCase()) ||
              v.visibility.toLowerCase().includes(filterText.toLowerCase())
          )}
          setUpdate={setUpdate}
          update={update}
        />
      </Flex>
    </>
  );
};

export const Voucher = () => {
  const [status, setStatus] = useState<"empty" | "create" | "list">("empty");
  const [vouchers, setVouchers] = useState<IVoucherTable[]>([]);
  const [update, setUpdate] = useState(0);
  const [vData, setVData] = useState<{
    total_purchase: string;
    total_used: string;
    total_voucher: number;
  } | null>(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await voucherService.getVouchers({ get_voucher: token });
      setVouchers(res[1]);
      setVData(res[0]);
      setStatus(res[0] ? "list" : "empty");
      console.log({ res, data: res[1] });
    };

    try {
      if (!vData || status === "list") fetchVouchers();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, update]);
  return (
    <>
      <Flex flexDir={"column"} gap={3} justifyContent={"space-between"}>
        {status === "empty" ? (
          <Empty setStatus={setStatus} />
        ) : status === "create" ? (
          <CreateVoucher setStatus={setStatus} />
        ) : (
          <VoucherContent
            setStatus={setStatus}
            vouchers={vouchers}
            vData={vData}
            setUpdate={setUpdate}
            update={update}
          />
        )}
      </Flex>
    </>
  );
};
