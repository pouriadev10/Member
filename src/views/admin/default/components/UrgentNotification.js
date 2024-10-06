import React, { useEffect, useState } from "react";
// Chakra imports
import {
  Box, Flex, Text,
  useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

// Custom components
import FailedPaymentUrgent from "./FailedPaymentUrgent";
import {
  Pagination, Row, Col
} from 'antd';
import { Controller } from "Controller/Controller";
import { controller } from "controller";

export default function UrgentNotification(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const columns = [
    {
      Header: 'First Name',
    },
    {
      Header: 'Last Name',
    },
    {
      Header: 'Plan Name',
    },
    {
      Header: 'Amount',
    },
  ]

  const [data, setData] = useState([])


  const readData = async () => {
    const response = await Controller.getUrgentNotification();
    setData(response.json.failed_memberships)
  }

  useEffect(() => {
    readData();
  }, [])

  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          URGENT NOTIFICATION
        </Text>

      </Flex>

      <Box>
        <Flex align="flex-start" w='100%' px='15px' py='10px'>
          <Text
            me='auto'
            color={"red"}
            fontSize='md'
            fontWeight='700'
            lineHeight='100%'>
            Failed Payments
          </Text>
        </Flex>
        <div
          style={{
            maxHeight: "220px",
            overflow: "auto",
            /* Customize scrollbar */
            WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS devices
            scrollbarWidth: "thin",
            scrollbarColor: "#888 transparent",
            scrollbarTrackColor: "transparent",
          }}
        >
          <FailedPaymentUrgent
            dataSource={data}
            columns={columns}
          />

        </div>


      </Box>
    </Card >
  );
}
