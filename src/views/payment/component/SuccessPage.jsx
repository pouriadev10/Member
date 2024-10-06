import React, { useState, useEffect } from "react";
import {
    Input,
    Row,
    Col,
    Form,
    Select,
    Divider,
    Button

} from "antd";
import { Button as AntdButton } from "antd";
import { Box, Text, Stack, Heading } from "@chakra-ui/react";
import { Controller } from "Controller/Controller";
import { Rules } from "errorHandling/Rules";


const { TextArea } = Input;
const { Option } = Select;
const SuccessPage = (props) => {
    const [paymentInfo, setPaymentInfo] = useState({
        customer_fullname: "",
        customer_email: "",
        customer_phone: "",
        cost: "",
        interval: "",
    });
    const getPaymentInfo = async () => {
        const response = await Controller.GetPaymentInformation(
            window.location.href.split("/")[window.location.href.split("/").lastIndexOf("payment")+1]
        )
        if (response.status < 250) {
            setPaymentInfo(response.json)
        }
    }

    useEffect(() => {
        // get Payment information
        getPaymentInfo()
    }, [])

    return (
        <React.Fragment>
            <Heading size="md" style={{ color: "#1bad1b" , marginBottom:"1px"}}>Successful</Heading>
            <Row type="flex" style={{ marginTop: "3%", lineHeight:"25px" }} justify={"space-between"}>
                <Col span={12} >
                    <Text >Customer</Text>
                    <Text fontWeight="bold" style={{ marginLeft:"5px",marginBottom: "15px"}}>{paymentInfo.customer_fullname ? paymentInfo.customer_fullname : "-"}</Text>
                </Col>
        
                <Col span={12} >
                    <Text >Email</Text>
                    <Text fontWeight="bold" style={{ marginLeft:"5px",marginBottom: "15px"}}>{paymentInfo.customer_email ? paymentInfo.customer_email : "-"}</Text>
                </Col>
           
                <Col span={12}  >
                    <Text >Phone</Text>
                    <Text fontWeight="bold" style={{ marginLeft:"5px",marginBottom: "15px"}}>{paymentInfo.customer_phone ? paymentInfo.customer_phone : "-"}</Text>
                </Col>

                <Col span={12}  >
                    <Text >Cost</Text>
                    <Text fontWeight="bold" style={{ marginLeft:"5px",marginBottom: "15px"}}>{paymentInfo.cost ? "$" + paymentInfo.cost : "-"}</Text>
                </Col>
                
                <Col span={12}  >
                    <Text >Interval</Text>
                    <Text fontWeight="bold" style={{ marginLeft:"5px",marginBottom: "15px"}}>{paymentInfo.interval ? paymentInfo.interval : "-"}</Text>
                </Col>
            </Row>

        </React.Fragment>
    )

}

export default SuccessPage;