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
import {
    Pagination
} from 'antd';
import React, { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

function PlanTable(props) {
    const { columnsData, tableData } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
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


    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

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
                        Plans
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
                        onClick={() => { props.handleShowCreatePlan() }}
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

                                        data = (
                                            <Flex align='center'>
                                                <Text
                                           
                                                    fontSize='sm'
                                                >
                                                    {cell.value}
                                                </Text>
                                            </Flex>
                                        );

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

        </>
    );
}

export default PlanTable;
