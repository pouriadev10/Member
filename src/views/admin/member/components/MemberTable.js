import {
  Avatar,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import { Button as AntdButton, Col, DatePicker, Divider, Input, message, Modal, Popconfirm, Row, Select, Spin } from "antd";
import { Alert } from "components/Alert/Alert";
import { Controller } from "Controller/Controller";
import { Rules } from "errorHandling/Rules";
import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const { Option } = Select;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function MemberTable(props) {
  // windows width
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  useEffect(() => {
    checkAccount();

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const [loadingCreate, setLoadingCreate] = useState(false)

  const data = useMemo(() => tableData, [tableData]);
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const handleCloseEditMember = async () => {
    setOpenModalEdit(false);
    setBasicEditValues({
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      zip_code: "",
      country: "ca",
      dateOfBirth: null
    });
  };

  const handleDeleteMember = async (id) => {
    console.log(id)
    const response = await Controller.deleteMember(id);

    if (response.status < 250) {
      message.success("Member deleted successfully!")
      props.getMemberData()
    } else {
      message.error("Error deleting member")
    }
  }

  // state
  const [basicEditValues, setBasicEditValues] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    zip_code: "",
    country: "ca",
    dateOfBirth: null,
    id: -1
  })
  const [visibleCreateMemberModal, setVisibleCreateMemberModal] = useState(false)
  const [newMember, setNewMember] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    zip_code: "",
    country: undefined,
    dateOfBirth: null
  })
  const [permission, setPermission] = useState("loading")

  // functions

  const checkAccount = async () => {
    const response = await Controller.checkConnectedAccount();
    if (
      !response.detail

    ) {
      setPermission(false)
    }
    else if (!response.detail.is_verified) {
      setPermission(false)

    }
    else {
      setPermission(false)
    }
  }

  const handleChangeEdit = (e) => {
    const { name, value } = e.target
    setBasicEditValues({
      ...basicEditValues,
      [name]: value
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewMember({
      ...newMember,
      [name]: value
    })
  }

  const handleEditMember = async () => {
    setLoadingCreate(true)
    const temp = {
      ...basicEditValues,
      id: basicEditValues.id,
      //"fullname": basicEditValues.first_name + " " + basicEditValues.last_name,
      //address1: basicEditValues.address,
      //postalCode: basicEditValues.zip_code,
    };

    delete temp.customer_plan;
    delete temp.profile_picture;
    delete temp.id;

    const response = await Controller.editMember(temp,basicEditValues.id);
    if (response.status < 250) {
      Alert.openNotification(response.message ? response.message : "Successful", "success");
      props.getMemberData();
      setOpenModalEdit(false);
      setBasicEditValues({
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        email: "",
        phone: "",
        zip_code: "",
        country: "ca",
        dateOfBirth: null
      });
    } else {
      Alert.openNotification(response.detail[0] ? response.detail[0] : "Error", "error");
    }
    setLoadingCreate(false)
  }

  const handleCreateMember = async () => {

    setLoadingCreate(true)
    const temp = {
      ...newMember,
      "fullname": newMember.first_name + " " + newMember.last_name,
      address1: newMember.address,
      postalCode: newMember.zip_code,
    };
    try {
      const response = await Controller.createNewMemberNew(temp);
      if (response.status < 250) {
        Alert.openNotification(response.message ? response.message : "Successful", "success");
        props.getMemberData();
        setVisibleCreateMemberModal(false);
        setNewMember({
          first_name: "",
          last_name: "",
          address: "",
          city: "",
          state: "",
          email: "",
          phone: "",
          zip_code: "",
          country: "ca",
          dateOfBirth: null
        });
      } else {
        Alert.openNotification(response.detail[0] ? response.detail[0] : "Error", "error");
      }
    } catch (error) {
      console.log(error)

    }

    setLoadingCreate(false)
  }

  const handleOpenDatePicker = (e) => {
    setOpenDatePicker(e);
  }

  const handleCloseAddMember = () => {
    setNewMember({
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      zip_code: "",
      country: "ca",
      dateOfBirth: null
    });
    setVisibleCreateMemberModal(false);
  }

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>

        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify='space-between'
          w='100%'
          px='22px'
          pb='20px'
          mb='10px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            Members
          </Text>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            onClick={() => { setVisibleCreateMemberModal(true) }}
            lineHeight='100%'
            borderRadius='10px'
          >
            <Icon as={FaPlus} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>

        <Table {...getTableProps()} variant='simple' color='gray.500'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor='transparent'>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Name") {
                      data = (
                        <Flex align='center'>
                          <Avatar
                            src={cell.row.original.profile_picture}
                            w='30px'
                            h='30px'
                            me='8px'
                          />
                          <Text
                            fontSize='sm'
                            fontWeight='600'>
                            {cell.row.original.first_name + " " + cell.row.original.last_name}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "Action") {
                      data = (
                        <Row>
                          <Text
                            color={"brand.500"}
                            fontSize='sm'
                            style={{ cursor: "pointer" }}
                            fontWeight='500'>
                            <a href={"#/admin/member-detail/" + cell.row.original.id}>View</a>
                          </Text>
                          <Divider type="vertical" />
                          <Text
                            color={"green"}
                            fontSize='sm'
                            style={{ cursor: "pointer" }}
                            fontWeight='500'
                            onClick={() => {
                              setBasicEditValues(cell.row.original);
                              setOpenModalEdit(true);
                            }}
                          >
                            Edit
                          </Text>
                          <Divider type="vertical" />
                          <Text
                            color={"red"}
                            fontSize='sm'
                            style={{ cursor: "pointer" }}
                            fontWeight='500'>
                            <Popconfirm
                              title="Delete the task"
                              description="Are you sure to delete this member?"
                              onConfirm={() => {
                                setLoading(true);
                                handleDeleteMember(cell.row.original.id).finally(() => setLoading(false));
                              }}
                              okButtonProps={{
                                loading: loading,
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <div>
                                Delete
                              </div>
                            </Popconfirm>
                          </Text>
                        </Row>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>

      <Modal
        title="Create Member"
        open={visibleCreateMemberModal}
        footer={null}
        onCancel={handleCloseAddMember}
        width={500}
        style={{
          top: 20,
          marginBottom: openDatePicker ? "220px" : ""
        }}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleCreateMember(); }}>
        <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>First Name</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="first_name"
                placeholder="Alex"
                value={newMember.first_name}
                required
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Last Name</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="last_name"
                placeholder="Doe"
                value={newMember.last_name}
                required
              />
            </Col>
          </Row>

           <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Phone</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="phone"
                placeholder="Phone"
                value={newMember.phone}
                required
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Email</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="alex.doe@gmail.com"
                value={newMember.email}
                required
              />
            </Col>
          </Row>

           <Row type='flex' justify='space-between' gutter={[25]} >
           <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Country</label>
              <Select
                className="inputs"
                name="country"
                placeholder="country"
                value={newMember.country}
                onChange={(value) => setNewMember({ ...newMember, country: value })}
                required
              >
                <Option value="ca">Canada</Option>
                <Option value="us">United States of America</Option>
              </Select>
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Birthdate</label>
              <DatePicker
                placement="bottomLeft"
                onOpenChange={handleOpenDatePicker}
                className="inputs"
                onChange={(date, dateString) => setNewMember({ ...newMember, dateOfBirth: dateString })}
                placeholder="Select a birth date"
                required
              />
            </Col>
          </Row>

           <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Address</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="address"
                placeholder="256 wfi street"
                value={newMember.address}
                required
                minLength={10}
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>City</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="city"
                placeholder="New york"
                value={newMember.city}
                required
              />
            </Col>
          </Row>

           <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>State</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="state"
                placeholder="Ny"
                value={newMember.state}
                required
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Zip Code</label>
              <Input
                className="inputs"
                onChange={handleChange}
                type="text"
                name="zip_code"
                placeholder="12345"
                value={newMember.zip_code}
                required
              />
            </Col>
          </Row>

          <div className="btnBox" style={{ display: "flex", justifyContent: "end", marginTop: '15px' }}>
            <AntdButton onClick={handleCloseAddMember} className="white-btn create-payment-request-btn">
              Close
            </AntdButton>
            <AntdButton
              htmlType="submit"
              type='primary'
              loading={loadingCreate}
              className="login-btn create-payment-request-btn"
              style={{ marginLeft: "5px", minWidth: "120px" }}
            >
              {loadingCreate ? "Creating..." : "Create"}
            </AntdButton>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={`Edit Member`}
        open={openModalEdit}
        footer={null}
        onCancel={handleCloseEditMember}
        width={500}
        style={{
          top: 20,
          marginBottom: openDatePicker ? "220px" : ""
        }}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleEditMember(); }}>
           <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>First Name</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="first_name"
                placeholder="Alex"
                value={basicEditValues.first_name}
                required
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Last Name</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="last_name"
                placeholder="Doe"
                value={basicEditValues.last_name}
                required
              />
            </Col>
          </Row>

           <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Phone</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="phone"
                placeholder="Phone"
                value={basicEditValues.phone}
                required
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Email</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="email"
                placeholder="alex.doe@gmail.com"
                value={basicEditValues.email}
                required
              />
            </Col>
          </Row>

           <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Address</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="address"
                placeholder="256 wfi street"
                value={basicEditValues.address}
                required
                minLength={10}
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>City</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="city"
                placeholder="New york"
                value={basicEditValues.city}
                required
              />
            </Col>
          </Row>

           <Row type='flex' justify='space-between' gutter={[25]} >
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>State</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="state"
                placeholder="Ny"
                value={basicEditValues.state}
                required
              />
            </Col>
            <Col span={windowDimensions.width < 450 ? 24 : 12}>
              <label className='formLabel'>Zip Code</label>
              <Input
                className="inputs"
                onChange={handleChangeEdit}
                type="text"
                name="zip_code"
                placeholder="12345"
                value={basicEditValues.zip_code}
                required
              />
            </Col>
          </Row>

          <div className="btnBox" style={{ display: "flex", justifyContent: "end", marginTop: '15px' }}>
            <AntdButton onClick={handleCloseEditMember} className="white-btn create-payment-request-btn">
              Close
            </AntdButton>
            <AntdButton
              htmlType="submit"
              type='primary'
              loading={loadingCreate}
              className="login-btn create-payment-request-btn"
              style={{ marginLeft: "5px", minWidth: "120px" }}
            >
              {loadingCreate ? "Editing..." : "Edit"}
            </AntdButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default MemberTable;
