import {
    Box,
    SimpleGrid,
} from "@chakra-ui/react";
import { Controller } from "Controller/Controller";
import config from "Controller/config";
import { Button, Col, Form, Input, Row, Select, Typography, notification } from "antd";
import Axios from "axios";
import Card from "components/card/Card";
import { Rules } from "errorHandling/Rules";
import React, { useEffect, useState } from "react";
const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const CreateOffice = () => {
    const [form] = Form.useForm();
    const [businessList, setBusinessList] = useState([])
    const [office, setOffice] = useState({
        name: "",
        state: "",
        city: "",
        address: "",
        admin_email: "",
        business: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOffice({
            ...office,
            [name]: value
        })
    }

    const openNotification = (placement, message, status) => {
        notification.info({
            message: status,
            description: message,
            placement,
        });
    }



    const getDataSelectOffice = async () => {
        const Config = {
            headers: {
                Authorization: localStorage.getItem('user')
                    ? 'Token ' + JSON.parse(localStorage.getItem('user')).key
                    : ''
            }
        }
        console.log(Config)
        const response = await Axios.get(
            config.apiGateway.URL + `/business-management/selectoffice/`,
            Config
        )
        console.log('res', response)

        var chengedResponse = response.data
        for (var i = 0; i < chengedResponse.length; i++)
            chengedResponse[i].office_id = chengedResponse[i].id

        localStorage.setItem('office_ids', JSON.stringify(chengedResponse))
        localStorage.setItem(
            'selectedOffice',
            eval(JSON.stringify(chengedResponse[0].office_id))
        )
        localStorage.setItem(
            'selectedOfficeName',
            eval(JSON.stringify(chengedResponse[0].office_name))
        )
        window.location.href = '/'
        return response
    }

    const handleCreateOffice = async () => {
        form.resetFields();
        const response = await Controller.CreateOffice(office);
        if (response.status < 250) {
            openNotification('bottom', "create successful", "successful")
            setOffice({
                name: "",
                state: "",
                city: "",
                address: "",
                admin_email: ""
            })
            getData()
            if (window.location.href.search('create/off') != -1) {
                getDataSelectOffice()

                // const resp = await Controller.GetFinishOnBoarding();
                // if (resp.status < 250) {
                //     window.location.href = "/"

                // } else {
                //     openNotification('bottom', "Error in creating office", "Error");
                // }
            }


        } else {
            openNotification('bottom', response.detail ? response.detail : "Error", "Error");
        }
    }

    const getData = async () => {
        const Config = {
            headers: {
                Authorization: localStorage.getItem("user") ? "Token " + JSON.parse(localStorage.getItem("user")).key : "",
            }
        }
        console.log(Config)
        const response = await Axios.get(config.apiGateway.URL + `/business-management/selectoffice/`, Config);
        var chengedResponse = response.data;
        for (var i = 0; i < chengedResponse.length; i++)
            chengedResponse[i].office_id = chengedResponse[i].id

        localStorage.setItem("office_ids", JSON.stringify(chengedResponse))
        // localStorage.setItem("selectedOffice", eval(JSON.stringify(chengedResponse[0].office_id)))
        // localStorage.setItem("selectedOfficeName", eval(JSON.stringify(chengedResponse[0].office_name)))
        //window.location.reload();
        //return response
    }

    const getBusinessList = async () => {
        const response = await Controller.GetListofBusiness();
        setBusinessList(response.json)
    }

    useEffect(() => {
        getBusinessList();
    }, [])



    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }


    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (

        <React.Fragment>
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <SimpleGrid>
                    <Row type="flex" justify="center">
                        <Card style={
                            window.location.href.search('create/off') == -1 ?
                                { margin: "0% 2%", minWidth: windowDimensions.width < 600 ? "" : "500px" }
                                :
                                { margin: "5%", minWidth: windowDimensions.width < 600 ? "" : "500px", minHeight: "300px" }

                        }>
                            <Title level={2}>Create Office</Title>
                            <Form form={form} onFinish={handleCreateOffice}>
                                <Row type={"flex"} justify={"space-between"} style={{ marginTop: "15px" }} >
                                    <Col span={11}>
                                        <div className="code-form">
                                            <label className='inputLabel'>Office Name</label>
                                            <Form.Item
                                                name="name"
                                                value={office.name}
                                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
                                            >
                                                <Input
                                                    onChange={handleChange}
                                                    className="inputs"
                                                    name="name"
                                                    placeholder="Name of Your Office"
                                                    value={office.name}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>
                                <Row type={"flex"} justify={"space-between"} style={{ marginTop: "15px" }} >
                                    <Col span={11}>
                                        <div className="code-form">
                                            <label className='inputLabel'>Business</label>
                                            <Form.Item
                                                name="business"
                                                value={office.business}
                                                rules={[{ required: true, message: 'This field is required' }]}
                                            >
                                                <Select
                                                    onChange={(e) => {
                                                        setOffice({
                                                            ...office,
                                                            business: e
                                                        })
                                                    }}
                                                    className="inputs"
                                                    name="business"
                                                    placeholder="Select business"
                                                    value={office.business}
                                                >
                                                    {
                                                        businessList.map((business) => (
                                                            <Option key={business.id}>
                                                                {business.name}
                                                            </Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={11}>
                                        <div className="code-form">
                                            <label className='inputLabel'>Admin Email</label>
                                            <Form.Item
                                                name="admin_email"
                                                value={office.admin_email}
                                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateEmail }]}
                                            >
                                                <Input rows={4}
                                                    type="email"
                                                    onChange={handleChange}
                                                    className="inputs"
                                                    name="admin_email"
                                                    placeholder="admin_email"
                                                    value={office.admin_email}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>
                                <Row type={"flex"} justify={"space-between"} style={{ marginTop: "15px" }}>
                                    <Col span={11}>
                                        <div className="code-form">
                                            <label className='inputLabel'>State</label>
                                            <Form.Item
                                                name="state"
                                                value={office.state}
                                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateState }]}
                                            >
                                                <Input
                                                    onChange={handleChange}
                                                    className="inputs"
                                                    name="state"
                                                    placeholder="State"
                                                    value={office.state}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={11}>
                                        <div className="code-form">
                                            <label className='inputLabel'>City</label>
                                            <Form.Item
                                                name="city"
                                                value={office.city}
                                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
                                            >
                                                <Input
                                                    onChange={handleChange}
                                                    className="inputs"
                                                    name="city"
                                                    placeholder="City"
                                                    value={office.city}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>


                                <div className="code-form" style={{ marginTop: "15px" }}>
                                    <label className='inputLabel'>Address</label>
                                    <Form.Item
                                        name="address"
                                        value={office.address}
                                        rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
                                    >
                                        <TextArea rows={4}
                                            onChange={handleChange}
                                            className="inputs"
                                            name="address"
                                            placeholder="address"
                                            value={office.address}
                                        />
                                    </Form.Item>
                                </div>


                                <div className="btnBox" style={{ display: "flex", justifyContent: "end" }}>

                                    <Button
                                        //onClick={handleCreateOffice}
                                        htmlType="submit"
                                        type="primary" style={{ marginLeft: "5px" }}>
                                        Create
                                    </Button>

                                </div>
                            </Form>
                        </Card>
                    </Row>
                </SimpleGrid>
            </Box>

        </React.Fragment>
    )
}

export default CreateOffice;