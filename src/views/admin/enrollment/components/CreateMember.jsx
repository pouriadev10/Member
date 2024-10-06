
import { DatePicker, Select, Form, Row, Col, Input, Modal } from 'antd'
import { Button as AntdButton } from "antd";
import { Controller } from "Controller/Controller";
import { useEffect, useState } from "react";
import { Alert } from "components/Alert/Alert";
import { Rules } from "errorHandling/Rules";
const { Option } = Select;

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}




function CreateMember(props) {

    // windows width
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [openDatePicker, setOpenDatePicker] = useState(false)

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [form] = Form.useForm();
    const [loadingCreate, setLoadingCreate] = useState(false)
    // state
    const [visibleCreateMemberModal, setVisibleCreateMemberModal] = useState(false)
    const [newMember, setNewMember] = useState({
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        email: "",
        phone: "",
        zip_code: "",
        country: undefined,

    })



    // functions

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewMember({
            ...newMember,
            [name]: value
        })
    }

    const handleCreateMember = async () => {
        setLoadingCreate(true)
        if (form.getFieldsError().some(({ errors }) => errors.length)) {
            console.log('Please fix the errors before submitting');
        } else {
            form.validateFields().then(async () => {
                var temp = newMember;

                // backend says send full name too
                temp = {
                    ...newMember,
                    "fullname": newMember.first_name + " " + newMember.last_name,
                    address1: newMember.address,
                    postalCode: newMember.zip_code,
                }
                const response = await Controller.createNewMemberNew(temp)
                if (response.status < 250) {
                    Alert.openNotification(response.message ? response.message : "Successful", "success")
                    props.handleAddNewMember(response.json.id)
                    setVisibleCreateMemberModal(false)
                    setNewMember({
                        first_name: "",
                        last_name: "",
                        address: "",
                        city: "",
                        state: "",
                        email: "",
                        phone: "",
                        zip_code: "",
                        country: "ca",
                        dateOfBirth: null
                    })
                    form.resetFields();
                } else {
                    Alert.openNotification(response.detail[0] ? response.detail[0] : "Error", "error")
                    setNewMember(false)

                }
            });
        }
        setLoadingCreate(false)
    }

    const handleCloseAddMember = () => {
        form.resetFields();

        setNewMember({
            first_name: "",
            last_name: "",
            address: "",
            city: "",
            state: "",
            email: "",
            phone: "",
            zip_code: "",
        })
        props.handleCloseMember()
    }

    const handleOpenDatePicker = (e) => {
        setOpenDatePicker(e)
    }

    useEffect(() => {
        setVisibleCreateMemberModal(props.open)
    }, [props.open])

    return (
        <>
            <Modal
                title="Create Member"
                open={visibleCreateMemberModal}
                footer={null}
                //onOk={handleOk}
                onCancel={handleCloseAddMember}
                width={500}
                style={{
                    top: 20,
                    marginBottom: openDatePicker ? "220px" : ""
                }}
            >
                <Form form={form} onFinish={handleCreateMember}>
                    <Row type='flex' justify='space-between' gutter={[10]} >
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>First Name</label>
                            <Form.Item
                                name="first_name"
                                value={newMember.first_name}
                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
                            >
                                <Input

                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="first_name"
                                    placeholder="Alex"
                                    value={newMember.first_name}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>Last Name</label>
                            <Form.Item
                                name="last_name"
                                value={newMember.last_name}
                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
                            >
                                <Input
                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="last_name"
                                    placeholder="Doe"
                                    value={newMember.last_name}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row type='flex' justify='space-between' gutter={[10]} >
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>Phone</label>
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validatePhone }]}
                            >
                                <Input
                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={newMember.phone}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>Email</label>
                            <Form.Item
                                name="email"
                                value={newMember.email}
                                rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateEmail }]}
                            >
                                <Input

                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="email"
                                    placeholder="alex.doe@gmail.com"
                                    value={newMember.email}
                                />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row type='flex' justify='space-between' gutter={[10]} >
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>Country</label>
                            <Form.Item
                                name="country"
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Select className={"inputs"}
                                    name="country"
                                    placeholder="country"
                                    value={newMember.country}
                                    onChange={(value) => {
                                        setNewMember({

                                            ...newMember,
                                            country: value

                                        })
                                    }}
                                >
                                    <Option value="ca">Canada</Option>
                                    <Option value="us">United States of America</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>Birthdate</label>
                            <Form.Item
                                name="dateOfBirth"
                                value={newMember.dateOfBirth}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <DatePicker
                                    onOpenChange={handleOpenDatePicker}
                                    placement="bottomLeft"
                                    className="inputs"
                                    onChange={(date, dateString) =>
                                        setNewMember({
                                            ...newMember,
                                            dateOfBirth: dateString
                                        })}
                                    placeholder="Select a birth date"
                                />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row type='flex' justify='space-between' gutter={[10]} >
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>

                            <label className='formLabel'>Address</label>
                            <Form.Item
                                name="address"
                                value={newMember.address}
                                rules={[
                                    { required: true, message: 'This field is required' },
                                    { min: 10, message: 'Enter at least 10 chars.' }, // Add this rule
                                ]}
                            >
                                <Input

                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="address"
                                    placeholder="256 wfi street"
                                    value={newMember.address}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={windowDimensions.width < 450 ? 24 : 12}>

                            <label className='formLabel'>City</label>
                            <Form.Item
                                name="city"
                                value={newMember.city}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input

                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="city"
                                    placeholder="New york"
                                    value={newMember.city}
                                />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row type='flex' justify='space-between' gutter={[10]} >
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>State</label>
                            <Form.Item
                                name="state"
                                value={newMember.state}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input

                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="state"
                                    placeholder="Ny"
                                    value={newMember.state}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={windowDimensions.width < 450 ? 24 : 12}>
                            <label className='formLabel'>Zip Code</label>
                            <Form.Item
                                name="zip_code"
                                value={newMember.zip_code}
                                rules={[{ required: true, message: 'This field is required' }]}
                            >
                                <Input

                                    className={"inputs"}
                                    onChange={handleChange}
                                    type="text"
                                    name="zip_code"
                                    placeholder="12345"
                                    value={newMember.zip_code}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="btnBox" style={{ display: "flex", justifyContent: "end", marginTop: '15px' }}>

                        <AntdButton
                            onClick={handleCloseAddMember}

                            className="white-btn create-payment-request-btn">
                            Close
                        </AntdButton>
                        <AntdButton
                            htmlType="submit"
                            type='primary'
                            loading={loadingCreate}
                            disabled={loadingCreate}
                            //onClick={handleCreateMember}
                            className="login-btn create-payment-request-btn"
                            style={{ marginLeft: "5px", minWidth: "120px" }}>
                            {
                                loadingCreate ? "Creating..." : "Create"
                            }
                        </AntdButton>

                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default CreateMember;
