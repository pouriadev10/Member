import { Controller } from 'Controller/Controller';
import React, { useEffect, useState } from 'react';
import { Box, Text, Stack, Heading } from "@chakra-ui/react";
import {
    Input,
    Row,
    Col,
    Form,
    Select,
    Divider,
    Button

} from "antd";
const Done = (props) => {

    const [paymentInfo, setPaymentInfo] = useState({
        customer_fullname: "",
        customer_email: "",
        customer_phone: "",
        cost: "",
        interval: "",
    });
    const getPayInfo = async () => {
        const response = await Controller.GetPaymentInformation(
            window.location.href.split("/")[window.location.href.split("/").lastIndexOf("payment")+1]
        )
        if (response.status < 250) {
            setPaymentInfo(response.json)
        }
    }

    const handleSubmit = async () => {
        props.handleSubmitDone()
    }

    useEffect(() => {
        // get payment information
        getPayInfo();
    }, [])

    return (

        <>
            <Heading size="md">Payment Information</Heading>
            <Row type="flex" style={{ marginTop: "3%", lineHeight: "25px" }} justify={"space-between"}>
                <Col span={12} >
                    <Text >Customer</Text>
                    <Text fontWeight="bold" style={{ marginLeft: "5px", marginBottom: "15px" }}>{paymentInfo.customer_fullname ? paymentInfo.customer_fullname : "-"}</Text>
                </Col>

                <Col span={12} >
                    <Text >Email</Text>
                    <Text fontWeight="bold" style={{ marginLeft:"5px",marginBottom: "15px"}}>{paymentInfo.customer_email ? "$ " + paymentInfo.customer_email : "-"}</Text>
                </Col>

                <Col span={12} >
                    <Text >Phone</Text>
                    <Text fontWeight="bold" style={{ marginLeft: "5px", marginBottom: "15px" }}>{paymentInfo.customer_phone ? paymentInfo.customer_phone : "-"}</Text>
                </Col>
                <Col span={12} >
                    <Text >Cost</Text>
                    <Text fontWeight="bold" style={{ marginLeft: "5px", marginBottom: "15px" }}>{paymentInfo.cost ? "$" + paymentInfo.cost : "-"}</Text>
                </Col>
                <Col span={12} >
                    <Text >Interval</Text>
                    <Text fontWeight="bold" style={{ marginLeft: "5px", marginBottom: "15px" }}>{paymentInfo.interval ? paymentInfo.interval : "-"}</Text>
                </Col>
            </Row>
            <Row type="flex" style={{ marginTop: "4%" }} justify={"end"}>

                <Button type="primary" onClick={handleSubmit}>
                    Approve
                </Button>

            </Row>
        </>


    );
};

export default Done;