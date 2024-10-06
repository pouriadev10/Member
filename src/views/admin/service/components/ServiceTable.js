import {
  Avatar,
  Box,
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
  useColorModeValue,
} from "@chakra-ui/react";
import { Modal } from "antd"
import { FaPlus } from "react-icons/fa";
import { Controller } from "Controller/Controller";
import React, { useMemo, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { Input, Divider, Popconfirm, InputNumber } from "antd"
import AddServiceModal from "./AddServiceModal";
import { Alert } from "components/Alert/Alert";

const { TextArea } = Input;

const ActionService = ({ row, handleUpdate }) => {

  const [openEdit, setOpenEdit] = useState(false)

  const [data, setData] = useState({
    name: "",
    cost: null,
    description: ""
  })


  useEffect(() => {
    console.log(row)
    setData(row)
  }, [row])

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setData(
      {
        ...data,
        [name]: value
      }
    )
  }

  const handleDeleteService = async (e) => {
    const response = await Controller.DeleteService(row.id)
    console.log(response)
    console.log(response.detail)
    if (response.status < 250) {
      handleUpdate()
      Alert.openNotification(response.message ? response.message : "Successful", "success")
    } else {
      Alert.openNotification(response.json.detail ? response.json.detail : "Error", "error")
    }
  }

  const editService = async () => {
    console.log(data)
    const response = await Controller.EditService(data)

    if (response.status < 250) {
      handleUpdate()
      Alert.openNotification(response.message ? response.message : "Successful", "success")
    } else {
      Alert.openNotification(response.json.detail ? response.json.detail : "Error", "error")
    }
    handleCloseEdit()
  }

  const confirm = (e) => {
    console.log(e);
    handleDeleteService()
  };
  const cancel = (e) => {
    console.log(e);

  };

  return (
    <div>
      <span style={{ color: "orange", cursor: "pointer" }} onClick={() => {
        setOpenEdit(true)
      }} >Update</span>
      <Divider type="vertical" />
      <Popconfirm
        title="Delete the service"
        description="Are you sure to delete this service?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <span style={{ color: "red", cursor: "pointer" }}>Delete</span>
      </Popconfirm>
      <Modal title="Select Office" visible={openEdit} footer={null} onCancel={handleCloseEdit}>
        <label className='formLabel'>Service Name</label>
        <Input
          className={"inputs"}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Service 1"
          value={data.name}
        />
        <label className='formLabel'>Cost</label>
        <InputNumber
          value={data.cost}
          name="cost"
          defaultValue={0}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          style={{ width: "100%" }}
          onChange={(e, value) => {
            console.log(e)
            setData(
              {
                ...data,
                cost: e
              }
            )
          }}
        />

        <label className='formLabel'>Description</label>

        <TextArea
          name="description"
          value={data.description}
          onChange={handleChange}
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="Description..."
        />
        <br />
        <p style={{marginTop:"5px"}}>Note: This service may have been used before</p>
        <div className="btnBox" style={{ display: "flex", justifyContent: "end", marginTop: "15px" }}>
          
          <Button
            onClick={handleCloseEdit}
            type="secondary" >
            Close
          </Button>
          <Button
            onClick={editService}
            type="primary" style={{ marginLeft: "5px" }}>
            Update
          </Button>

        </div>

      </Modal>
    </div>
  )
}

function ServiceTable(props) {
  console.log(props)

  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  console.log("data")
  console.log(data)
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
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("navy.700", "white");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  // states
  const [open, setOpen] = useState(false)


  // functions

  const handleOpen = () => {
    setOpen(true)
  }

  const onCancel = (e) => {
    if (e) {
      props.updateData()
      setOpen(false)
    }
  }

  const handleUpdate = () => {
    props.updateData()
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
            Service List

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
            onClick={handleOpen}
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
                {columnsData.map((column, index) => (
                  <Th
                    pe='10px'
                    key={index}
                    borderColor='transparent'>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.Header}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody>

            {props.tableData.map((row) => (
              <Tr key={row.id}>
                <Td>{row.name}</Td>
                <Td>{row.description}</Td>
                <Td>{"$ " + row.cost}</Td>
                <Td><ActionService row={row} handleUpdate={handleUpdate} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      </Flex>

      <AddServiceModal
        open={open}
        onCancel={onCancel}
      />
    </>
  );
}

export default ServiceTable;
