import React, { useState, useEffect } from "react"
import {
    Modal,
    Input,
    Form,
    Button,
    Select,
    DatePicker
} from "antd"
import { PaymentController } from "Controller/PaymentController";
import { Alert } from "components/Alert/Alert";

const { Option } = Select;


const AddConnectedAccountModal = (props) => {

    const [loadingSubmitNewConnectedAccount, setLoadingSubmitNewConnectedAccount] = useState(false)

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        setLoadingSubmitNewConnectedAccount(true)
        var data = {
            ...values,
            office: localStorage.getItem("selectedOffice"),
            type: 'express',
        }
        const response = await PaymentController.createConnectedAccount(data)

        if (response.status < 250) {
            Alert.openNotification(response.message ? response.message : "Successful", "success")
            props.handleSuccess()
        } else {
            Alert.openNotification(
                response.first_name ? "First Name: " + response.first_name :
                    response.last_name ? "Last Name: " + response.last_name :
                        response.email ? "Email : " + response.email :
                            response.dateOfBirth ? "Date of Birth : " + response.dateOfBirth :
                                response.phone ? "Phone : " + response.phone :
                                    response.city ? "City: " + response.city :
                                        response.address1 ? "Address1: " + response.address1 :
                                            response.address2 ? "Address2: " + response.address2 :
                                                response.ssn ? "ssn: " + response.ssn :
                                                    response.postalCode ? "Postal Code: " + response.postalCode :
                                                        response.state ? "State: " + response.state :
                                                            response.statement_descriptor ? "Statement Descriptor: " + response.statement_descriptor :
                                                                "Error", "error")
        }
        setLoadingSubmitNewConnectedAccount(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleClose = () => {
        form.resetFields();
        props.closeModal()
    }

    return (
        <Modal
            className="FormWrapperModal"
            open={props.open}
            footer={null}
            onCancel={handleClose}
            title="Add Connected Account"
        >
            <label>Please fill the form below to create an account</label>
            <Form
                form={form}
                style={{ marginTop: "2%" }}
                name="basic"
                initialValues={{
                    statement_descriptor: '',
                    email: '',
                    phone_number: '',
                    country: 'us',
                    address: '',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >



                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <br />

                

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Statement Descriptor"
                    name="statement_descriptor"
                    rules={[
                        { required: true, message: 'Please input Statement Descriptor!' },
                    ]}
                >
                    <Input placeholder="Statement Descriptor" />
                </Form.Item>
                <br />

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Phone"
                    name="phone_number"
                    rules={[
                        { required: true, message: 'Please input your phone number!' },
                        { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits!' }
                    ]}
                >
                    <Input placeholder="Phone Number" prefix="+1" />
                </Form.Item>
                <br />

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please select your country!' }]}
                >
                    <Select placeholder="Country">
                        <Option value="us">United States</Option>
                        <Option value="ca">Canada</Option>
                        {/* Add more options as needed */}
                    </Select>
                </Form.Item>
                <br />



                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input placeholder="Address" />
                </Form.Item>
                <br />

                <Form.Item
                    style={{
                        display: "flex",
                        justifyContent: "end"
                    }}
                    labelCol={{ span: 24 }}>
                    <Button
                        onClick={handleClose} style={{ width: "120px", marginRight: "5px" }}>
                        Close
                    </Button>
                    <Button
                        disabled={loadingSubmitNewConnectedAccount}
                        type="primary" htmlType="submit" style={{ minWidth: "120px" }}>
                        {
                            loadingSubmitNewConnectedAccount ? "Submiting..." : "Submit"
                        }
                    </Button>
                </Form.Item>
                <br />
            </Form>
        </Modal>
    )
}

export default AddConnectedAccountModal;