import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DisplayCard } from "./dashboard";
import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ICustomer } from "../../interface/customer";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import info from "../../assets/info.svg";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import customersService from "../../services/customers";
import { GrDocumentUpload } from "react-icons/gr";
import { LuUpload } from "react-icons/lu";

const AddCustomerModal = ({
  refetch,
  setRefetch,
}: {
  refetch: boolean;
  setRefetch: (val: boolean) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      cfname: "",
      lname: "",
      email: "",
      gender: "",
      phone: "",
      interests: "",
      ig: "",
      twitter: "",
      city: "",
      state: "",
    },
    async onSubmit(values) {
      console.log(values);
      try {
        const user_token = localStorage.getItem("PYMAILYR") || "";
        const res = await customersService.addCustomer({
          ...values,
          user_token,
        });
        console.log({ res });
        if (res.responseCode == 200) {
          toast({
            title: "Customer Successfully Added",
            description: res.responseMessage,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
          setRefetch(!refetch);
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
    <>
      <Button
        colorScheme="purple"
        size={"xs"}
        leftIcon={<IoMdAdd />}
        onClick={onOpen}
      >
        Add Customer
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader fontSize={"sm"}>
              Add Customer{" "}
              <Text fontSize={"xs"} fontWeight={"light"}>
                Kindly add all the customers on your sales database
              </Text>
            </ModalHeader>

            <ModalCloseButton />
            <Divider />
            <ModalBody>
              <Stack>
                <Flex gap={2}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="cfname" fontSize={"xs"}>
                      First Name
                    </FormLabel>
                    <Input
                      name="cfname"
                      value={formik.values.cfname}
                      id="cfname"
                      onChange={formik.handleChange}
                      type="text"
                      placeholder="Enter Name"
                      size={"xs"}
                      width={"full"}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="lname" fontSize={"xs"}>
                      Last Name
                    </FormLabel>
                    <Input
                      name="lname"
                      value={formik.values.lname}
                      id="lname"
                      onChange={formik.handleChange}
                      type="text"
                      placeholder="Enter Name"
                      size={"xs"}
                      width={"full"}
                    />
                  </FormControl>
                </Flex>
                <FormControl isRequired>
                  <FormLabel htmlFor="email" fontSize={"xs"}>
                    Email Address
                  </FormLabel>
                  <Input
                    name="email"
                    value={formik.values.email}
                    id="email"
                    onChange={formik.handleChange}
                    type="email"
                    placeholder="Enter email address"
                    size={"xs"}
                    width={"full"}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="gender" fontSize={"xs"}>
                    Gender
                  </FormLabel>

                  <Select
                    placeholder="Select Gender"
                    name="gender"
                    value={formik.values.gender}
                    id="gender"
                    onChange={formik.handleChange}
                    size={"xs"}
                    width={"full"}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="phone" fontSize={"xs"}>
                    Phone Number
                  </FormLabel>
                  <Input
                    name="phone"
                    value={formik.values.phone}
                    id="phone"
                    onChange={formik.handleChange}
                    type="tel"
                    placeholder="Enter Phone No"
                    size={"xs"}
                    width={"full"}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="state" fontSize={"xs"}>
                    Location
                  </FormLabel>
                  <Flex gap={2}>
                    <Input
                      placeholder="State"
                      name="state"
                      value={formik.values.state}
                      id="state"
                      onChange={formik.handleChange}
                      size={"xs"}
                      width={"full"}
                    />
                    <Input
                      placeholder="City"
                      name="city"
                      value={formik.values.city}
                      id="city"
                      onChange={formik.handleChange}
                      size={"xs"}
                      width={"full"}
                    />
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="interests" fontSize={"xs"}>
                    Interests
                  </FormLabel>

                  <Select
                    placeholder="Select Interests"
                    name="interests"
                    value={formik.values.interests}
                    id="interests"
                    onChange={formik.handleChange}
                    size={"xs"}
                    width={"full"}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="ig" fontSize={"xs"}>
                    Social website
                  </FormLabel>
                  <Flex gap={2}>
                    <InputGroup>
                      <Input
                        name="ig"
                        value={formik.values.ig}
                        id="ig"
                        onChange={formik.handleChange}
                        type="text"
                        placeholder="Add URL"
                        size={"xs"}
                        width={"full"}
                      />
                      <InputRightElement mt={-2}>
                        <FaInstagram />
                      </InputRightElement>
                    </InputGroup>
                    <InputGroup>
                      <Input
                        name="twitter"
                        value={formik.values.twitter}
                        id="twitter"
                        onChange={formik.handleChange}
                        type="text"
                        placeholder="Add URL"
                        size={"xs"}
                        width={"full"}
                      />
                      <InputRightElement mt={-2}>
                        <FaXTwitter />
                      </InputRightElement>
                    </InputGroup>
                  </Flex>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                size={"sm"}
                type="submit"
                isLoading={formik.isSubmitting}
              >
                Add Customer
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
const DeactivateCustomerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem onClick={onOpen}>
        <Flex gap={5}>
          <RiDeleteBin6Line size={"15px"} color="red" cursor={"pointer"} />
          <Text fontSize={"small"}>Delete</Text>
        </Flex>
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"sm"}></ModalHeader>

          <ModalCloseButton />
          <Divider mt={3} />
          <ModalBody p={12}>
            <Center>
              <Avatar src={info} />
            </Center>
            <Stack>
              <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"center"}>
                Delete Customer
              </Text>
              <Text fontSize={"xs"} textAlign={"center"}>
                Are you sure you want to deactivate this Customer?
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant={"outline"} mr={3} onClick={onClose} size={"xs"}>
              Cancel
            </Button>
            <Button colorScheme="red" size={"xs"} onClick={onClose}>
              Yes, Deactivate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const ImportCustomerModal = ({
  refetch,
  setRefetch,
}: {
  refetch: boolean;
  setRefetch: (val: boolean) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const formik = useFormik({
    initialValues: { customerFile: "" },
    async onSubmit(values) {
      console.log(values);
      try {
        const token = localStorage.getItem("PYMAILYR") || "";
        const res = await customersService.addCustomersFromFile({
          ...values,
          fileupload: token,
        });
        console.log({ res });
        if (res.responseCode == 200) {
          toast({
            title: "Customer Successfully Added",
            description: res.responseMessage,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
          setRefetch(!refetch);
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
      <Button size={"xs"} leftIcon={<LuUpload />} onClick={onOpen}>
        Import File
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader fontSize={"sm"}>
              Import Customer
              <Text fontSize={"xs"} color={"gray"}>
                Kindly upload a file with your customer's information
              </Text>
            </ModalHeader>

            <ModalCloseButton />
            <Divider mt={3} />
            <ModalBody p={12}>
              <VStack>
                <Center onClick={handleButtonClick} cursor={"pointer"}>
                  <GrDocumentUpload size={"20px"} />
                </Center>
                {fileName && (
                  <Text color="gray.600" fontSize="xs">
                    Selected File: <strong>{fileName}</strong>
                  </Text>
                )}
              </VStack>
              <Stack mt={"4"}>
                <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"center"}>
                  Upload document
                </Text>
                <Input
                  type="file"
                  ref={inputRef}
                  display="none"
                  onChange={handleFileChange}
                  accept="*.csv"
                />

                <Flex mt={4} gap={1}>
                  <Link
                    fontSize={"xs"}
                    color={"purple"}
                    href="https://boltspecta.com/pyyr/template.php?template=1"
                  >
                    Click here
                  </Link>
                  <Text fontSize={"xs"} color={"gray"}>
                    to download a pre-designed contact from template
                  </Text>
                </Flex>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant={"outline"} mr={3} onClick={onClose} size={"xs"}>
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                size={"xs"}
                type="submit"
                isLoading={formik.isSubmitting}
              >
                Import
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
const CustomerTable = ({
  customers,
  refetch,
  setRefetch,
}: {
  customers: ICustomer[];
  refetch: boolean;
  setRefetch: (val: boolean) => void;
}) => {
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

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
          <ImportCustomerModal refetch={refetch} setRefetch={setRefetch} />
          <AddCustomerModal refetch={refetch} setRefetch={setRefetch} />
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
                Email
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Gifted Voucher
              </Th>
              <Th fontSize={"xs"} textTransform={"capitalize"}>
                Date Added
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
            {customers
              ?.filter(
                (c) =>
                  c.fname.toLowerCase().includes(filterText.toLowerCase()) ||
                  c.email.toLowerCase().includes(filterText.toLowerCase()) ||
                  c.date.toLowerCase().includes(filterText.toLowerCase()) ||
                  c.lname.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((t) => (
                <Tr fontSize={"xs"} key={t.email}>
                  <Td fontSize={"xs"}>
                    <Stack gap={2}>
                      <Text fontSize={"xs"} fontWeight={"semibold"}>
                        {`${t.fname} ${t.lname}`}
                      </Text>
                    </Stack>
                  </Td>
                  <Td fontSize={"xs"}>{t.email}</Td>
                  <Td fontSize={"xs"}>{t.gender}</Td>
                  <Td fontSize={"xs"}>{t.date}</Td>
                  <Td fontSize={"xs"}>{t.state}</Td>
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
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export const CustomerPage = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const [refetch, setRefetch] = useState(true);
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("PYMAILYR") || "";
      const res = await customersService.getAllCustomers({
        list_customer: token,
      });
      console.log({ res });
      setCustomers(res[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refetch]);
  return (
    <Stack gap={5}>
      {" "}
      <Flex gap={{ base: 1, md: 3 }}>
        <DisplayCard
          value="5,200"
          label="Total No of Customers"
          isChecked={true}
        />
        <DisplayCard
          value="700 "
          label="Total No of Customers Rewarded "
          isChecked={true}
        />
        <DisplayCard
          value="200"
          label="Total No Active Customers"
          isChecked={true}
        />
      </Flex>
      <CustomerTable
        customers={customers}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </Stack>
  );
};
