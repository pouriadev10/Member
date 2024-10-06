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
import { Divider, Popconfirm } from "antd";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import React, { useMemo, useState, useEffect } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import { Controller } from "Controller/Controller";
import { Alert } from "../../../../components/Alert/Alert";

function SubscriptionTable(props) {
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

    const handleCancelSubscription = async (e) => {
        var payload = {
            membership_id: e
        }
        const response = await Controller.cancelSubscription(payload)
        if (response.status < 250) {
            props.handleUpdateList()
            Alert.openNotification(response.message ? response.message : "Successful", "success")
            // this.getAccount()
        } else {
            console.log(response)
            Alert.openNotification(response.detail[0] ? response.detail : "Error", "error")
        }


    }

    

    const handleResendSubscription = async (e) => {
       
          var id = e
        const response = await Controller.resendSubscription(id)
        if (response.status < 250) {
            props.handleUpdateList()
            Alert.openNotification(response.message ? response.message : "Successful", "success")
            // this.getAccount()
        } else {
            console.log(response)
            Alert.openNotification(response.detail[0] ? response.detail : "Error", "error")
        }


    }

    useEffect(() => {
        var b = window.location.href;
        localStorage.setItem("viewMember", b.split("/")[b.split("/").length - 1])
    }, [])

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
                        Subscriptions

                    </Text>


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
                                <Td>{row.plan_name}</Td>
                                <Td>
                                    {
                                        row.start_date ?
                                            new Date(row.start_date)
                                                .toISOString()
                                                .replace(/T/, " ")
                                                .replace(/\.\d+Z$/, "")
                                            :
                                            "-"
                                    }
                                </Td>
                                <Td>
                                    {
                                        row.expiration_date ?
                                            new Date(row.expiration_date)
                                                .toISOString()
                                                .replace(/T/, " ")
                                                .replace(/\.\d+Z$/, "")
                                            :
                                            "-"
                                    }
                                </Td>
                                <Td>{row.is_active ? "Active" : "Deactive"}</Td>
                                <Td style={{ cursor: "pointer" }}>
                                    <NavLink
                                        key={row.id}
                                        to={'/admin/subscription-detail/' + row.id}
                                        style={{ maxWidth: "max-content", marginLeft: "40px" }}>
                                        View
                                    </NavLink>

                                    {
                                        row.status !== "canceled" ?
                                            <>
                                                <Divider type={"vertical"} />
                                                <Popconfirm
                                                    title="Delete the task"
                                                    description="Are you sure to delete this task?"
                                                    onConfirm={() => handleCancelSubscription(row.id)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <span className={"cancel_subscruption"}>
                                                        Cancel
                                                    </span>
                                                </Popconfirm>
                                            </>

                                            :
                                            <></>
                                    }

                                    <>
                                        <span className={"resend_subscruption"} onClick={() => handleResendSubscription(row.id)} style={{marginLeft: 10}}>
                                            Resend
                                        </span>
                                    </>



                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            </Flex>

        </>
    );
}

export default SubscriptionTable;
