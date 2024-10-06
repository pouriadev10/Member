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

import { FaPlus } from "react-icons/fa";
import { Controller } from "Controller/Controller";
import React, { useMemo, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import VisitModal from "../../visit/components/VisitModal";

function VisitTable(props) {
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
            Visit List

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
                <Td>{row.member_info.first_name + " " + row.member_info.last_name}</Td>
                <Td>{row.service_name}</Td>
                <Td>{row.count}</Td>
                <Td>{row.date ? new Date(row.date).toLocaleDateString() + " " + new Date(row.date).toLocaleTimeString() : row.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      </Flex>

      <VisitModal
        open={open}
        onCancel={onCancel}
      />
    </>
  );
}

export default VisitTable;
