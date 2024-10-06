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
import { Radio, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
const History = () => {
    const textColor = useColorModeValue("navy.700", "white");
    const [items, setItems] = useState([])


    const getRoadMap = async () => {
        const url = window.location.href
        const parts = url.split("/");
        const id = parts.pop();

        const response = await Controller.GetMembershipHistory(id)
        console.log(response)

        var temp = [];
        for (var i in response.json) {

            var item = response.json[i]

            var label = new Date(item.date).toLocaleDateString() + " " + new Date(item.date).toLocaleTimeString();


            var changes = {}

            if (item.change_data_for_custom_membership) {
                changes = item.change_data_for_custom_membership
            } else if (item.change_data_for_predefiend_membership) {
                changes = item.change_data_for_predefiend_membership
            }

            var children = ""

            if (
                changes.after_cost != changes.before_cost
            ) {
                children += "cost changed from $" + changes.before_cost + " to $" + changes.after_cost + "\n"
                temp.push({
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    label: <p style={{ color: "#1677ff", fontWeight: "bold" }}>{label}</p>,
                    children: "cost changed from $" + changes.before_cost + " to $" + changes.after_cost + "\n"
                })
            }

            if (
                changes.after_description != changes.before_description
            ) {
                children += "Description changed from " + changes.before_description + " to $" + changes.after_description + "\n"
                temp.push({
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    label: <p style={{ color: "#1677ff", fontWeight: "bold" }}>{label}</p>,
                    children: "Description changed from " + changes.before_description + " to $" + changes.after_description + "\n"
                })
            }


            if (
                changes.after_interval != changes.before_interval
            ) {
                children += "Description changed from " + changes.before_interval + " to $" + changes.after_interval + "\n"
                temp.push({
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    label: <p style={{ color: "#1677ff", fontWeight: "bold" }}>{label}</p>,
                    children: "Description changed from " + changes.before_interval + " to $" + changes.after_interval + "\n"
                })
            }

            if (
                changes.after_name != changes.before_name
            ) {
                children += "Name changed from " + changes.before_name + " to " + changes.after_name + "\n"
                temp.push({
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    label: <p style={{ color: "#1677ff", fontWeight: "bold" }}>{label}</p>,
                    children: "Name changed from " + changes.before_name + " to " + changes.after_name + "\n"
                })
            }

        }




        setItems(temp)


    }

    useEffect(() => {
        // get change log
        getRoadMap();
    }, [])

    return (
        <React.Fragment>
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
                >
                    <Text color={textColor} fontSize='xl' fontWeight='600'>
                        History

                    </Text>


                </Flex>
                <Timeline
                    mode={"alternate"}
                    items={items}
                />
            </Flex>
        </React.Fragment>
    )
}

export default History;