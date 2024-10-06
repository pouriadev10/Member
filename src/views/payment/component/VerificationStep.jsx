import React, { useState, useEffect } from "react";
import {
    Input,
    Row,
    Col,
    Form,
    Select,
    Divider,
    InputNumber,
    Checkbox

} from "antd";
import { Button as AntdButton } from "antd";
import { Box, Text, Stack, Heading } from "@chakra-ui/react";
import { Controller } from "Controller/Controller";
import { Rules } from "errorHandling/Rules";


const { TextArea } = Input;
const { Option } = Select;
const VerificationStep = (props) => {
    const [form] = Form.useForm();
    const [paymentInfo, setPaymentInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [checkedTerms, setCheckedTerms] = useState(false)
    const [checkedTerms1, setCheckedTerms1] = useState(false)

    const getMemberInfo = async () => {
        const response = await Controller.GetMemberInformation(window.location.href.split("/")[window.location.href.split("/").lastIndexOf("payment") + 1]);
        console.log(response)
        setUserInfo(response.json)
    }

    const getPaymentInfo = async () => {
        const response = await Controller.GetMembershipInformation(window.location.href.split("/")[window.location.href.split("/").lastIndexOf("payment") + 1]);
        setPaymentInfo(response.json)
    }

    const handleSubmit = async () => {
        if (form.getFieldsError().some(({ errors }) => errors.length)) {
            console.log('Please fix the errors before submitting');
        } else {
            form.validateFields().then(async () => {
                props.handleDoneVerfication(userInfo);
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    useEffect(() => {
        // get payment data
        getPaymentInfo();

        // get user Info
        getMemberInfo();
    }, [])

    const handleCheckboxChange = (e) => {
        setCheckedTerms(!checkedTerms);
    };

    const handleCheckboxChange1 = (e) => {
        setCheckedTerms1(!checkedTerms1);
    };


    useEffect(() => {

        form.setFieldsValue({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            city: userInfo.city,
            zip_code: userInfo.zip_code,
            state: userInfo.state,
            phone: userInfo.phone,

        });
    }, [userInfo]);

    return (
        <React.Fragment>
            <Heading size="md">Payment Information</Heading>
            <Row type="flex" style={{ marginTop: "3%" }} justify={"space-between"}>
                <Col >
                    <Text fontWeight="bold">Plan Name</Text>
                    <Text>{paymentInfo.plan_name ? paymentInfo.plan_name : "-"}</Text>
                </Col>
                <Divider type="vertical" />
                <Col>
                    <Text fontWeight="bold">Amount</Text>
                    <Text>{paymentInfo.amount ? "$ " + paymentInfo.amount : "-"}</Text>
                </Col>
                <Divider type="vertical" />
                <Col >
                    <Text fontWeight="bold">Billing Cycle</Text>
                    <Text>{paymentInfo.billing_cycle ? paymentInfo.billing_cycle : "-"}</Text>
                </Col>
            </Row>
            <br />
            <hr /><br />
            <Heading size="md">Customer Information</Heading>

            <Form form={form} onFinish={handleSubmit}>
                <Row type="flex" style={{ marginTop: "1%" }} justify={"space-between"}>
                    <Col span={11}>

                        <label className='formLabel' onClick={() => { console.log(userInfo) }}>First Name </label>
                        <Form.Item
                            name="first_name"
                            value={userInfo.first_name}
                            rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
                        >
                            <Input
                                className={"inputs"}
                                onChange={handleChange}
                                type="text"
                                name="first_name"
                                placeholder="Alex"
                                value={userInfo.first_name}
                                defaultValue={userInfo.first_name}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>

                        <label className='formLabel' onClick={() => { console.log(userInfo) }}>Last Name </label>
                        <Form.Item
                            name="last_name"
                            value={userInfo.last_name}
                            rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
                        >
                            <Input
                                className={"inputs"}
                                onChange={handleChange}
                                type="text"
                                name="last_name"
                                placeholder="Doe"
                                value={userInfo.last_name}
                                defaultValue={userInfo.last_name}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <label className='formLabel'>Email</label>
                        <Form.Item
                            name="email"
                            value={userInfo.email}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required'
                                },
                                { validator: Rules.validateEmail }]}
                        >
                            <Input

                                className={"inputs"}
                                onChange={handleChange}
                                type="text"
                                name="email"
                                placeholder="alex.doe@example.com"
                                defaultValue={userInfo.email}
                                value={userInfo.email}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={11}>
                        <label className='formLabel'>Phone</label>
                        <Form.Item
                            name="phone"
                            value={userInfo.phone}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required'
                                },
                                { validator: Rules.validatePhone }]}
                        >
                            <Input

                                className={"inputs"}
                                onChange={handleChange}
                                type="text"
                                name="phone"
                                placeholder="phone number"
                                defaultValue={userInfo.phone}
                                value={userInfo.phone}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={11}>
                        <label className='formLabel'>City</label>
                        <Form.Item
                            name="city"
                            value={userInfo.city}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required'
                                },
                                { validator: Rules.validateName }]}
                        >
                            <Input

                                className={"inputs"}
                                onChange={handleChange}
                                type="text"
                                name="city"
                                placeholder="Berlin"
                                defaultValue={userInfo.city}
                                value={userInfo.city}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={11}>
                        <label className='formLabel'>State</label>
                        <Form.Item
                            name="state"
                            value={userInfo.state}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required'
                                },
                                { validator: Rules.validateState }]}
                        >
                            <Input

                                className={"inputs"}
                                onChange={handleChange}
                                type="text"
                                name="state"
                                placeholder="state"
                                defaultValue={userInfo.state}
                                value={userInfo.state}
                            />
                        </Form.Item>
                    </Col>


                    <Col span={11}>
                        <label className='formLabel'>Zip Code</label>
                        <Form.Item
                            name="zip_code"
                            value={form.zip_code}
                            rules={[
                                {
                                    required: true,
                                    message: 'This field is required'
                                },
                                // { validator: Rules.validateZipCode }
                            ]}
                        >
                            <Input

                                className={"inputs"}
                                onChange={handleChange}
                                type="text"
                                name="zip_code"
                                placeholder="53210"

                                value={userInfo.zip_code}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ marginTop: "2%" }}></div>

                <Row justify={"space-between"}>
                    <Col span={1}>
                        <Checkbox checked={checkedTerms} onChange={handleCheckboxChange} >

                        </Checkbox>
                    </Col>
                    <Col span={23} style={{ paddingLeft: "15px" }}>
                        <div onClick={handleCheckboxChange}>
                            <p className="terms" style={{ display: "inline" }}>
                                By checking this box you agree {" "}
                                <a href="https://memberpoint.io/terms-conditions/" style={{ color: "#1677ff", cursor: "pointer" }}>
                                    Our Terms of Service {" "}
                                </a>
                                and {" "}
                                <a href="https://memberpoint.io/privacy-policy/" style={{ color: "#1677ff", cursor: "pointer" }}>
                                    Privacy Policy {" "}
                                </a>.
                                as well as our partner {" "}
                                <a href="https://www.dwolla.com/legal/tos/" style={{ color: "#1677ff", cursor: "pointer" }}>
                                    Stripe's Terms of Service {" "}
                                </a>
                                and {" "}
                                <a href="https://www.dwolla.com/legal/privacy" style={{ color: "#1677ff", cursor: "pointer" }}> Privacy Policy</a>.
                            </p>
                        </div>
                    </Col>

                </Row>

                <Row justify={"space-between"}>
                    <Col span={1}>
                        <Checkbox checked={checkedTerms1} onChange={handleCheckboxChange1} >
                        </Checkbox>
                    </Col>



                    <Col span={23} style={{ paddingLeft: "15px" }}>
                        <div onClick={handleCheckboxChange1}>
                            <p>I agree to the terms of service of the service provider as follows:</p>
                            <p>
                                {paymentInfo.plan_terms}
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row type="flex" style={{ marginTop: "4%" }} justify={"end"}>

                    <AntdButton
                        disabled={!checkedTerms || !checkedTerms1}
                        htmlType="submit"
                        type='primary'
                        //onClick={handleCreateMember}
                        className="login-btn create-payment-request-btn"
                        style={{ marginLeft: "5px" }}>
                        Verify
                    </AntdButton>
                </Row>
            </Form>


        </React.Fragment>
    )

}

export default VerificationStep;