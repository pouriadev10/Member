import React, { useState, useEffect } from "react";
import {
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
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Controller } from "Controller/Controller";
import { DownloadOutlined } from '@ant-design/icons';
const Payment = () => {
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

    const [tableData, setTableData] = useState([{}])

    const getData = async () => {
        const url = window.location.href
        const parts = url.split("/");
        const id = parts.pop();

        const response = await Controller.GetMemberPayment(id)
        console.log("response")
        console.log(response)
        setTableData(response.json.results)
    }

    useEffect(() => {
        getData();


    }, [])

    return (
        <React.Fragment>
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
                            Payment

                        </Text>


                    </Flex>
                    <Table variant='simple' color='gray.500'>
                        <Thead>

                            <Tr key={"index"}>

                                <Th
                                    pe='10px'
                                    key={"index"}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        Amount
                                    </Flex>
                                </Th>
                                <Th
                                    pe='10px'
                                    key={"index"}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        Status
                                    </Flex>
                                </Th>
                                <Th
                                    pe='10px'
                                    key={"index"}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        Date
                                    </Flex>
                                </Th>
                                <Th
                                    pe='10px'
                                    key={"index"}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        Invoice
                                    </Flex>
                                </Th>

                            </Tr>

                        </Thead>

                        <Tbody>

                            {tableData.map((row) => (

                                <Tr key={"row.id"}>
                                    <Td>{"$ " + row.amount}</Td>
                                    <Td>{row.status}</Td>
                                    <Td>{row.created}</Td>
                                    <Td><a href={row.invoice_link}><DownloadOutlined /></a></Td>

                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                </Flex>

            </>
        </React.Fragment>
    )
}

export default Payment;