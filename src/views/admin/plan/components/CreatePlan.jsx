import React, {Component} from 'react'

import {Col, Button, Input, InputNumber, message, Modal, notification, Radio, Row, Select, Table, Icon} from 'antd'

import {Controller} from 'Controller/Controller';
import {Alert} from 'components/Alert/Alert';
import {
    BsClockHistory
} from "react-icons/bs";

import {Error} from 'errorHandling/ErrorHandeling';

const {TextArea} = Input;
const {Option} = Select;


const serviceColumns = [
    /*{
      title: 'Id',
      dataIndex: 'Id',
      render: text => <a>{text}</a>,
    },*/
    {
        title: 'Name',
        dataIndex: 'Name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Count',
        dataIndex: 'Count',
        render: text => <a>{text}</a>,
    },
    /*  {
        title: 'Price',
        dataIndex: 'Price',
        render: text => <a>{text}</a>,
      },*/
    {
        title: 'Action',
        dataIndex: 'Action',
        render: text => <a>{text}</a>,
    },
]


class CreatePlan extends Component {

    openNotification = (placement, message, status) => {
        notification.info({
            message: status,
            description: message,
            placement,
        });
    };

    getPlan = async () => {
        const response = await Controller.GetAllPlans()
        this.setState({
            planList: response.json
        })
    }

    getCycle = async () => {
        const response = await Controller.getCycles()
        console.log("response.json")
        console.log(response.json)
        this.setState({
            Cycle: response.json

        })
    }

    getMember = async () => {
        const response = await Controller.GetAllMember()
        console.log("response.json")
        this.setState({
            membersList: response.json

        })
    }

    handleCloseMember = () => {
        this.setState({
            openCreateMember: false
        })
    }

    handleAddNewMember = (id) => {
        console.log(id)
        this.getMember()

        this.setState({
            newCustomerid: id,
            openCreateMember: false
        })
    }

    handleAddMember = () => {
        this.setState({
            openCreateMember: true
        })
    }

    getData = () => {
        // get billing cycle
        this.getCycle();

        //Get member list
        this.getMember();

        //Get Plan list
        this.getPlan();
    }

    constructor(props) {
        super(props)

        this.getData();

        console.log(props)

        this.state = {

            formError: {
                planName: {
                    status: true,
                    massage: "",
                },
                billingCycle: {
                    status: true,
                    massage: "",
                },
                // intervalCount: {
                //   status: true,
                //   massage: "",
                // },
                price: {
                    status: true,
                    massage: "",
                },
                service: {
                    status: true,
                    massage: "",
                },
                term: {
                    status: true,
                    massage: "",
                },
            },


            newCustomerid: "",
            openCreateMember: false,
            membershipCreateDataCustom: {
                membership: {
                    customer: 0,
                    is_active: true,
                    automatic_renewal: false,
                },
                membership_plan: {
                    services: [],
                    name: "",
                    interval: "",
                    //interval_count: 0,
                    active: true,
                    cost: "",
                    description: "",
                    type: "custom",
                    terms: "",
                }
            },
            membershipCreateData: {
                customer: "",
                plan: "",
                automatic_renewal: false,
            },
            changeStateTempForTestTableUpdate: true,
            SelectedServicesFromSelectBox: "",
            SelectedCountFromSelectBox: "",
            preDefinePlanForCreate: {
                name: "",
                interval: "",
                cost: "",
                description: "",
                active: true,
                office: localStorage.getItem("selectedOffice"),
                type: "predefined",
                services: [
                    /*{
                      count: 0,
                      service: 0
                    }*/
                ],
                terms: ""
            },
            createsService: {
                name: "",
                description: "",
                cost: ""
            },
            NpServices: [
                {
                    cost: "",
                    description: "",
                    id: 1,
                    name: ""
                }
            ],
            openAddNewRowVisible: false,
            membersList: [],
            Cycle: [],
            planList: [],
            visibleAddservice: false,
            selectedServices: [],
            currentState: "createNewPlan", // 1. customePlan 2. preDefinePlan 3.createNewPlan
        }


        this.updateServiceList = this.updateServiceList.bind(this)
        this.handleCloseMember = this.handleCloseMember.bind(this)
        this.handleAddNewMember = this.handleAddNewMember.bind(this)
        this.handleCreateCustomPlan = this.handleCreateCustomPlan.bind(this)
        this.handleAddMember = this.handleAddMember.bind(this)
        this.getCycle = this.getCycle.bind(this)
        this.getData = this.getData.bind(this)
        this.getPlan = this.getPlan.bind(this)
        this.handleOpenAddService = this.handleOpenAddService.bind(this)
        this.handleCloseAddService = this.handleCloseAddService.bind(this)
        this.addNewRow = this.addNewRow.bind(this)
        this.addNewRowModal = this.addNewRowModal.bind(this)
        this.handleCreateNewPlan = this.handleCreateNewPlan.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCreateService = this.handleCreateService.bind(this)
        this.handleChangeCreatePlanData = this.handleChangeCreatePlanData.bind(this)
        this.handleCreateNewPlanPreDefined01 = this.handleCreateNewPlanPreDefined01.bind(this)
        //this.handleSelectMemberInModal = this.handleSelectMemberInModal.bind(this)
        this.handleSubmitCreateNewMembershipWithMemberAndPlan = this.handleSubmitCreateNewMembershipWithMemberAndPlan.bind(this)
    }

    handleCreateCustomPlan = async () => {
        console.log(this.state.membershipCreateDataCustom)


        const response = await Controller.CreateCustomMembership(this.state.membershipCreateDataCustom)
        console.log(response)
        if (response.status < 250) {
            this.openNotification('bottom',
                response.message ?
                    response.message
                    :
                    "Done"
                , "Successfull");
            this.setState({
                membershipCreateDataCustom: {
                    ...this.state.membershipCreateDataCustom,
                    membership_plan: {
                        ...this.state.membershipCreateDataCustom.membership_plan,
                        services: [],
                        name: "",

                        //interval_count: 0,
                        active: true,
                        cost: "",
                        description: "",
                        type: "custom",
                        terms: "",
                    }
                },
            })
        }
    }

    handleSubmitCreateNewMembershipWithMemberAndPlan = async () => {
        const response = await Controller.CreateMembershipnPreDefined(this.state.membershipCreateData)
        if (response.status < 250) {
            this.setState({
                membershipCreateData: {
                    ...this.state.membershipCreateData,
                    plan: "",
                },
            })
            this.openNotification('bottom',
                response.message ?
                    response.message
                    :
                    "Done"
                , "Successfull");
        }
    }

    handleCloseAddRowModal = () => {
        this.setState({
            openAddNewRowVisible: false,
            SelectedServicesFromSelectBox: "",
            SelectedCountFromSelectBox: "",

        })
    }

    updateServiceList = async () => {
        const response = await Controller.GetServiceNP();

        this.setState({
            NpServices: response.json
        })
    }

    addNewRowModal = async () => {
        const response = await Controller.GetServiceNP();


        this.setState({
            openAddNewRowVisible: true,
            NpServices: response.json
        })
    }

    handleCreateService = async () => {
        const response = await Controller.CreateServiceList(this.state.createsService);
        if (response.status < 250) {
            this.updateServiceList()
            this.openNotification('bottom', "Create service successful", "successful");
            this.handleCloseAddService();
            this.setState({
                createsService: {
                    name: "",
                    description: "",
                    cost: ""
                }
            })
        } else {
            this.openNotification('bottom', response.detail ? response.detail : "Error!", "Error");
        }


    }


    handleCreateNewPlanPreDefined01 = async () => {
        console.log()
        var planNameHandling = await Error.NameHandling(this.state.preDefinePlanForCreate.name)
        var billingCycleHandling = await Error.SelectItem(this.state.preDefinePlanForCreate.interval)
        var serviceHandling = await Error.ServiceHandling(this.state.preDefinePlanForCreate.services)
        //var intervalCountHandling = await Error.AmountHandlingAccept1(this.state.preDefinePlanForCreate.interval_count)
        var priceHandling = await Error.AmountHandlingAccept1(this.state.preDefinePlanForCreate.cost)
        var termHandling = await Error.NameHandling(this.state.preDefinePlanForCreate.terms)


        this.setState({
            formError: {
                planName: planNameHandling,
                billingCycle: billingCycleHandling,
                //intervalCount: intervalCountHandling,
                price: priceHandling,
                service: serviceHandling,
                term: termHandling,
            }
        })
        if (
            planNameHandling.status &&
            billingCycleHandling.status &&
            priceHandling.status &&
            serviceHandling.status &&
            //intervalCountHandling.status &&
            termHandling.status
        ) {
            const response = await Controller.CreatePlan(this.state.preDefinePlanForCreate)
            console.log(response)
            if (response.status < 250) {
                this.setState({
                    selectedServices: [],
                    preDefinePlanForCreate: {
                        name: "",
                        interval: "",
                        //interval_count: 0,
                        cost: "",
                        description: "",
                        active: true,
                        clinic: localStorage.getItem("selectedOffice"),
                        type: "predefined",
                        services: [
                            /*{
                              count: 0,
                              service: 0
                            }*/
                        ],
                        terms: ""

                    }
                })
                Alert.openNotification(response.message ? response.message : "Successful", "success")
                this.props.handleCreate();
            } else {
                Alert.openNotification(response.json.detail ? response.json.detail : "Error", "error")
            }
        } else {
            console.table(planNameHandling)
            console.table(billingCycleHandling)
            //console.table(intervalCountHandling)
        }

    }

    handleChangeCreatePlanData(e) {
        const {name, value} = e.target
        this.setState({
            preDefinePlanForCreate:
                {
                    ...this.state.preDefinePlanForCreate,
                    [name]: value
                }
        })
    }

    handleChange(e) {
        console.log(e.target)
        const {name, value} = e.target
        console.log(name)
        console.log(value)
        this.setState({
            createsService:
                {
                    ...this.state.createsService,
                    [name]: value
                }
        })
    }

    handleCreateNewPlan = () => {
        this.setState({
            currentState: "createNewPlan"
        })
    }

    addNewRow = async () => {
        var temp = this.state.selectedServices
        const response = await Controller.GetServiceNP();
        temp.push({
            Id: this.state.selectedServices.length,
            Name:
                <Select
                    className="inputs"
                    style={{minWidth: '100px'}}
                    placeholder="Select Service"
                    defaultValue={[]}
                    onChange={(e, value) => {
                        console.log(this.state.services)
                        console.log(e)
                        this.setState({
                            preDefinePlanForCreate:
                                {
                                    ...this.state.preDefinePlanForCreate,
                                    services: this.state.preDefinePlanForCreate.services.push(e)
                                }
                        })
                    }}
                >
                    {
                        response.json.map((service) => (
                            <Option key={service.id}>{service.name}</Option>
                        ))
                    }

                </Select>,
            Count: <InputNumber
                defaultValue={0}
                min={0}
                //max={10}
                formatter={value => `${value}x`}
                parser={value => value.replace('x', '')}
                //onChange={onChange}
            />,
            Price: <p>$ 0</p>,
            Action:
                <button
                    value={this.state.selectedServices.length}
                    onClick={(e) => {
                        e.preventDefault()
                        console.log(e.target.value)
                        /*console.log(this.state.selectedServices)
                        var temp = this.state.selectedServices
                        console.log(temp)
                        console.log(e.target.value)*/
                        var temp = this.state.selectedServices.filter((t) => t.Id != e.target.value)
                        if (temp.length < 1) {
                            this.setState({
                                selectedServices: []
                            })
                        } else {

                            console.log(temp)
                            this.setState({
                                selectedServices: temp
                            })
                        }

                    }}
                    style={{border: "0px", backgroundColor: "transparent", color: "#0981C8"}}
                >
                    Delete
                </button>
            ,
        })

        this.setState({
            selectedServices: temp,
            changeStateTempForTestTableUpdate: !this.state.changeStateTempForTestTableUpdate
        })
    }

    handleChangeCurrentState = e => {
        this.setState({currentState: e.target.value});
    };

    handleOpenAddService = () => {
        this.setState({
            visibleAddservice: true
        })
    }
    handleCloseAddService = () => {
        this.setState({
            createsService: {
                name: "",
                description: "",
                cost: ""
            },
            visibleAddservice: false
        })
    }

    handleDateChange(value, dateString) {
        this.setState({
            ...this.state,
            appointment_datetime: dateString
        })
    }


    render() {
        //const { currentState } = this.state;
        return (
            <div className="paymentRequestContent" style={{width: "100%"}}>
                <div className="payreq-container">
                    <div className="content">
                        {
                            this.state.currentState != "createNewPlan" ?
                                <React.Fragment>

                                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Member</label>
                                    <Row type="flex" justify={"space-between"}>
                                        <Col span={19}>
                                            {/* <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Search Member"
                        optionFilterProp="children"
                        //onChange={onChange}
                        //onFocus={onFocus}
                        //onBlur={onBlur}
                        //onSearch={onSearch}
                        value={this.state.newCustomerid ? this.state.newCustomerid : undefined}
                        onChange={(e) => {
                          console.log(e)

                          this.setState({

                            membershipCreateDataCustom: {
                              ...this.state.membershipCreateDataCustom,
                              membership: {
                                ...this.state.membershipCreateDataCustom.membership,
                                customer: e
                              },
                            },
                            membershipCreateData: {
                              ...this.state.membershipCreateData,
                              customer: e
                            }
                          })
                        }}
                        filterOption={(input, option) =>
                          option.props.children
                        }
                      >
                        {
                          this.state.membersList ?
                            this.state.membersList.map((member0) => (
                              <Option value={member0.id} key={member0.id}>{member0.id + " " + member0.first_name + " " + member0.last_name}</Option>
                            ))
                            :
                            <></>
                        }
                      </Select>*/}
                                        </Col>
                                        <Col span={4}>
                                            <Button type='primary'
                                                    onClick={this.handleAddMember}
                                            >
                                                + new
                                            </Button>
                                        </Col>
                                    </Row>


                                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Renewal</label>
                                    <Radio.Group onChange={(e) => {
                                        this.setState({
                                            membershipCreateDataCustom: {
                                                ...this.state.membershipCreateDataCustom,
                                                membership: {
                                                    ...this.state.membershipCreateDataCustom.membership,
                                                    automatic_renewal: e.target.value
                                                },
                                            },
                                            membershipCreateData: {
                                                ...this.state.membershipCreateData,
                                                automatic_renewal: e.target.value
                                            }
                                        })
                                    }} value={this.state.membershipCreateData.automatic_renewal}>
                                        <Radio value={true}>Automatic</Radio><br/>
                                        <Radio value={false}>Manual</Radio>
                                    </Radio.Group>
                                    <br/> <br/>
                                    <Row type='flex' justify='center'>
                                        <Radio.Group value={this.state.currentState}
                                                     onChange={this.handleChangeCurrentState}>
                                            <Radio.Button value="customePlan">Custom plan</Radio.Button>
                                            <Radio.Button value="preDefinePlan">Membership Plan </Radio.Button>
                                        </Radio.Group>
                                    </Row>
                                </React.Fragment>
                                :
                                <React.Fragment></React.Fragment>
                        }


                        {
                            //--------------------------------------Create custom plan --------------------------
                            this.state.currentState == "customePlan" ?
                                <React.Fragment>
                                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Plan name</label>
                                    <Input
                                        //prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        className={"inputs"}
                                        onChange={(e) => {
                                            this.setState({
                                                membershipCreateDataCustom: {
                                                    ...this.state.membershipCreateDataCustom,
                                                    membership_plan: {
                                                        ...this.state.membershipCreateDataCustom.membership_plan,
                                                        name: e.target.value
                                                    }
                                                }
                                            })
                                        }}
                                        type="text"
                                        name="name"
                                        placeholder="plan-1"
                                        value={this.state.membershipCreateDataCustom.membership_plan.name}
                                    />

                                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Billing
                                        Cycle</label>
                                    <Select
                                        className="inputs"
                                        style={{minWidth: '100px'}}
                                        defaultValue={[]}
                                        placeholder="Select Cycle"
                                        value={
                                            this.state.membershipCreateDataCustom.membership_plan.interval
                                                ?
                                                this.state.membershipCreateDataCustom.membership_plan.interval
                                                :
                                                null

                                        }
                                        onChange={(e) => {
                                            this.setState({
                                                membershipCreateDataCustom: {
                                                    ...this.state.membershipCreateDataCustom,
                                                    membership_plan: {
                                                        ...this.state.membershipCreateDataCustom.membership_plan,
                                                        interval: e
                                                    }
                                                }
                                            })
                                        }}
                                    >
                                        {
                                            this.state.Cycle && this.state.Cycle.map((cycle) => (
                                                <>

                                                    <Option key={cycle}>{cycle}</Option>
                                                </>
                                            ))
                                        }

                                    </Select>

                                    {/* <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Interval Count</label>
                  <Input
                    prefix={<BsClockHistory style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={this.state.membershipCreateDataCustom.membership_plan.interval_count}
                    onChange={(e) => {
                      this.setState({
                        membershipCreateDataCustom: {
                          ...this.state.membershipCreateDataCustom,
                          membership_plan: {
                            ...this.state.membershipCreateDataCustom.membership_plan,

                            interval_count: e.target.value
                          }
                        }
                      })
                    }}
                    className={"inputs"}
                    //onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Interval Count"
                  //value={this.state.membershipCreateDataCustom.membership_plan.interval}
                  /> */}

                                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Price</label>
                                    <InputNumber
                                        defaultValue={0}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        style={{width: "100%"}}
                                        value={this.state.membershipCreateDataCustom.membership_plan.cost}
                                        onChange={(e) => {
                                            this.setState({
                                                membershipCreateDataCustom: {
                                                    ...this.state.membershipCreateDataCustom,
                                                    membership_plan: {
                                                        ...this.state.membershipCreateDataCustom.membership_plan,

                                                        cost: e
                                                    }
                                                }
                                            })
                                        }}
                                        //onChange={onChange}
                                    />


                                    <br/>
                                    <br/>

                                    {/*---------------------------------Add service in Create member ship---------------------------*/}
                                    <Row type="flex" justify="space-between">
                                        <label style={{margin: "10px 0px 5px 0px"}}>Service {/*<span
                      style={{ cursor: "pointer" }}
                  onClick={this.addNewRowModal}>+</span>*/}</label>
                                        <Button
                                            //onClick={this.handleOpenAddService}
                                            onClick={
                                                //this.addNewRow
                                                this.addNewRowModal
                                            }
                                            type="primary" style={{marginBottom: 16}}>
                                            + New
                                        </Button>
                                    </Row>
                                    {
                                        this.state.changeStateTempForTestTableUpdate ?
                                            <Table
                                                style={{
                                                    width: "auto",
                                                    overflow: "auto",
                                                }}
                                                Pagination={false} columns={serviceColumns}
                                                dataSource={this.state.selectedServices}/>
                                            :
                                            <div>
                                                <Table
                                                    style={{
                                                        width: "auto",
                                                        overflow: "auto",
                                                    }}
                                                    Pagination={false} columns={serviceColumns}
                                                    dataSource={this.state.selectedServices}/>
                                            </div>

                                    }
                                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Terms</label>


                                    <TextArea
                                        //value={this.state.terms}


                                        onChange={(e) => {
                                            this.setState({
                                                membershipCreateDataCustom: {
                                                    ...this.state.membershipCreateDataCustom,
                                                    membership_plan: {
                                                        ...this.state.membershipCreateDataCustom.membership_plan,

                                                        terms: e.target.value
                                                    }
                                                }
                                            })
                                        }}
                                        autoSize={{minRows: 3, maxRows: 5}}
                                        placeholder="Write Terms..."
                                    />
                                    <div className="btnBox" style={{display: "flex", justifyContent: "space-between"}}>
                                        <Button className='whiteBtn cancel-btn'
                                                onClick={() => {
                                                    this.props.back(true)
                                                }}
                                        >Back</Button>

                                        <Button
                                            onClick={this.handleCreateCustomPlan}
                                            // className='createBtn'
                                            type="primary"
                                        >
                                            Create
                                            {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                                        </Button>
                                    </div>

                                </React.Fragment>
                                :
                                /*------------------------------Create mebership-------------------------------*/
                                this.state.currentState == "preDefinePlan" ?
                                    <React.Fragment>
                                        <br/>

                                        <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Membership
                                            Plans</label>
                                        <Select
                                            showSearch
                                            style={{width: 220}}
                                            placeholder="Search Membership Plans"
                                            optionFilterProp="children"
                                            disabled={this.state.planList.length > 0 ? false : true}
                                            //onChange={onChange}
                                            //onFocus={onFocus}
                                            //onBlur={onBlur}
                                            //onSearch={onSearch}
                                            onChange={(e) => {
                                                this.setState({
                                                    membershipCreateData: {
                                                        ...this.state.membershipCreateData,
                                                        plan: e
                                                    }
                                                })
                                            }}
                                            value={this.state.membershipCreateData.plan ? this.state.membershipCreateData.plan : null}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                this.state.planList ?
                                                    this.state.planList.map((plan0) => (
                                                        <Option value={plan0.id}>{plan0.name}</Option>
                                                    )) :
                                                    <></>
                                            }


                                        </Select>
                                        <button
                                            onClick={this.handleCreateNewPlan}
                                            className='createBtn'
                                            type="submit"
                                            style={{
                                                height: "30px",
                                                width: "90px"
                                            }}
                                        >
                                            +Add
                                            {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                                        </button>

                                        {/* <label className='formLabel'>Terms</label>


                    <TextArea
                      //value={value}
                      //onChange={this.onChange}

                      autoSize={{ minRows: 3, maxRows: 5 }}
                      placeholder="Write Terms..."
                      />*/}
                                        <div className="btnBox" style={{display: "flex"}}>
                                            <Button className='whiteBtn cancel-btn'
                                                    onClick={() => {
                                                        this.props.back(true)
                                                    }}
                                            >Back</Button>

                                            <Button
                                                onClick={this.handleSubmitCreateNewMembershipWithMemberAndPlan}
                                                // className='createBtn'
                                                type="primary"
                                            >
                                                Create
                                                {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Plan
                                            name</label>
                                        <Input

                                            //prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            className={this.state.formError.planName.status ? "inputs" : "inputs-error"}
                                            onChange={this.handleChangeCreatePlanData}
                                            type="text"
                                            name="name"
                                            placeholder="plan #1"
                                            value={this.state.preDefinePlanForCreate.name}
                                        />

                                        <div
                                            className='error-text'>{this.state.formError.planName.status ? "" : this.state.formError.planName.massage}</div>

                                        <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Billing
                                            Cycle</label>
                                        <Select
                                            className={this.state.formError.billingCycle.status ? "inputs" : "inputs-error-select"}
                                            style={{minWidth: '100px'}}
                                            defaultValue={[]}
                                            placeholder="Select Cycle"
                                            name="interval"
                                            value={this.state.preDefinePlanForCreate.interval ? this.state.preDefinePlanForCreate.interval : null}
                                            onChange={(e, value) => {
                                                this.setState({
                                                    preDefinePlanForCreate:
                                                        {
                                                            ...this.state.preDefinePlanForCreate,
                                                            interval: e
                                                        }
                                                })
                                            }}
                                        >
                                            {
                                                this.state.Cycle && this.state.Cycle.map((cycle) => (
                                                    <>

                                                        <Option key={cycle}>{cycle}</Option>
                                                    </>
                                                ))
                                            }
                                        </Select>

                                        <div
                                            className='error-text'>{this.state.formError.billingCycle.status ? "" : this.state.formError.billingCycle.massage}</div>

                                        {/* <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Interval Count</label>
                    <Input
                      name="interval_count"
                      className={this.state.formError.intervalCount.status ? "inputs" : "inputs-error"}
                      onChange={this.handleChangeCreatePlanData}
                      type="text"

                      placeholder="Interval Count"
                      value={this.state.preDefinePlanForCreate.interval_count}
                    />
                    <div className='error-text'>{this.state.formError.intervalCount.status ? "" : this.state.formError.intervalCount.massage}</div> */}

                                        <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Price</label>
                                        <InputNumber
                                            className={this.state.formError.price.status ? "inputs" : "inputs-error"}
                                            value={this.state.preDefinePlanForCreate.cost}
                                            defaultValue={0}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={{width: "100%"}}
                                            onChange={(e) => {
                                                this.setState({
                                                    preDefinePlanForCreate: {
                                                        ...this.state.preDefinePlanForCreate,
                                                        cost: e
                                                    }
                                                })
                                            }}
                                        />
                                        <div
                                            className='error-text'>{this.state.formError.price.status ? "" : this.state.formError.price.massage}</div>


                                        <br/>
                                        <br/>
                                        <Row type="flex" justify="space-between">
                                            <label>Service {/*<span
                        style={{ cursor: "pointer" }}
                        onClick={
                          //this.addNewRow
                          this.addNewRowModal
                        }>+</span>*/}</label>
                                            <Button
                                                //onClick={this.handleOpenAddService}
                                                onClick={
                                                    //this.addNewRow
                                                    this.addNewRowModal
                                                }
                                                type="primary" style={{marginBottom: 16}}>
                                                + New
                                            </Button>
                                        </Row>
                                        {
                                            this.state.changeStateTempForTestTableUpdate ?
                                                <Table
                                                    style={{
                                                        width: "auto",
                                                        overflow: "auto",
                                                    }}
                                                    Pagination={false} columns={serviceColumns}
                                                    dataSource={this.state.selectedServices}/>
                                                :
                                                <div>
                                                    <Table
                                                        style={{
                                                            width: "auto",
                                                            overflow: "auto",
                                                        }}
                                                        Pagination={false} columns={serviceColumns}
                                                        dataSource={this.state.selectedServices}/>
                                                </div>

                                        }
                                        <div
                                            className='error-text'>{this.state.formError.service.status ? "" : this.state.formError.service.massage}</div>

                                        <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Terms</label>


                                        <TextArea
                                            name="terms"
                                            className={this.state.formError.term.status ? "inputs" : "inputs-error"}
                                            value={this.state.preDefinePlanForCreate.terms}
                                            onChange={(e) => {
                                                //console.log(e.target.value)
                                                this.setState({
                                                    preDefinePlanForCreate:
                                                        {
                                                            ...this.state.preDefinePlanForCreate,
                                                            terms: e.target.value
                                                        }
                                                })
                                            }}
                                            autoSize={{minRows: 3, maxRows: 5}}
                                            placeholder="Write Terms..."
                                        />
                                        <div
                                            className='error-text'>{this.state.formError.term.status ? "" : this.state.formError.term.massage}</div>

                                        <Row justify={"space-between"} gutter={[10]} style={{marginTop:"15px"}}>
                                            <Col span={12}>
                                                <Button
                                                    /*className='whiteBtn cancel-btn' */
                                                    onClick={() => {
                                                        console.log(this.props)
                                                        this.props.handleBack()
                                                    }}
                                                >Back</Button>
                                            </Col>
                                            <Col span={12}>
                                                <Button
                                                    onClick={this.handleCreateNewPlanPreDefined01}
                                                    // className='createBtn'
                                                    type="primary"
                                                >
                                                    Create
                                                    {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                                                </Button>
                                            </Col>


                                        </Row>

                                    </React.Fragment>
                        }
                        <br/>
                    </div>
                </div>

                {/*---------------------------Add new service-------------------------*/}

                <Modal
                    title="Add new service"
                    visible={this.state.openAddNewRowVisible}
                    footer={null}
                    //onOk={this.handleOk}
                    onCancel={this.handleCloseAddRowModal}
                >
                    Service
                    <Row type="flex" justify='space-between'>
                        <Col span={18}>
                            <Select
                                className="inputs"
                                style={{minWidth: '100px'}}
                                placeholder="Select Service"
                                value={this.state.SelectedServicesFromSelectBox ? this.state.SelectedServicesFromSelectBox : undefined}
                                //defaultValue={this.state.NpServices[0] && this.state.NpServices[0].id ? this.state.NpServices[0].name : ""}
                                onChange={(e, value) => {
                                    console.log(e)
                                    console.log(value)
                                    this.setState({
                                        SelectedServicesFromSelectBox: e,
                                    })
                                    /*this.setState({
                                      preDefinePlanForCreate:{
                                        ...this.state.preDefinePlanForCreate,
                                        services: {
                                          ...this.state.preDefinePlanForCreate.services,

                                        }
                                      }
                                    })*/
                                }}
                            >
                                {
                                    this.state.NpServices.map((service) => (
                                        <Option key={service.id}>{service.name}</Option>
                                    ))
                                }

                            </Select>
                        </Col>
                        <Col span={5}>
                            <Button
                                onClick={this.handleOpenAddService}
                                /*onClick={
                                  //this.addNewRow
                                  this.addNewRowModal
                                }*/
                                type="primary" style={{marginBottom: 16}}>
                                Add Service
                            </Button>
                        </Col>
                    </Row>


                    <br/>

                    Count<br/>
                    <InputNumber
                        style={{width: "100%"}}
                        defaultValue={0}
                        min={0}
                        //max={10}
                        value={this.state.SelectedCountFromSelectBox}
                        formatter={value => `${value}x`}
                        parser={value => value.replace('x', '')}
                        onChange={(e) => {
                            this.setState({
                                SelectedCountFromSelectBox: e
                            })
                            //console.log(e)
                        }}
                    />
                    <br/>
                    <div
                        style={{
                            marginTop: "15px",
                            display: "flex",
                            justifyContent: "end"
                        }}
                    >
                        <Button
                            onClick={this.handleCloseAddRowModal}
                            type="secondary">
                            Close
                        </Button>
                        <Button
                            type="primary" style={{marginLeft: "5px"}}
                            onClick={() => {

                                var t = {
                                    count: this.state.SelectedCountFromSelectBox,
                                    service: this.state.SelectedServicesFromSelectBox,
                                }

                                var h = this.state.preDefinePlanForCreate.services
                                h.push(t)
                                console.log("zsd")
                                var NameSelectedService = ""

                                for (var i in this.state.NpServices) {

                                    if (this.state.NpServices[i].id == this.state.SelectedServicesFromSelectBox) {
                                        NameSelectedService = this.state.NpServices[i]
                                    }
                                }
                                console.log("conocl")

                                console.log(NameSelectedService.id)
                                console.log(this.state.selectedServices)
                                var flagggg = 0;
                                for (var i in this.state.selectedServices) {
                                    if (NameSelectedService.id == this.state.selectedServices[i].id)
                                        flagggg = 1
                                }
                                if (flagggg == 1) {
                                    console.log("err")
                                    Alert.openNotification("This service is already available in the list", "error")
                                } else {
                                    var h10 = {
                                        id: NameSelectedService.id,
                                        Name: NameSelectedService.name,
                                        Count: this.state.SelectedCountFromSelectBox,
                                        Action:
                                            <button
                                                onClick={() => {
                                                    console.log(NameSelectedService.name)
                                                    console.log(NameSelectedService.id)
                                                    console.log(h10)
                                                    console.log(this.state.selectedServices)
                                                    console.log(NameSelectedService.id)
                                                    var aaaa = this.state.selectedServices.filter((e) => e.id != NameSelectedService.id)
                                                    console.log(aaaa)
                                                    this.setState({
                                                        selectedServices: aaaa
                                                    })
                                                }}

                                                value={this.state.selectedServices.length}
                                                style={{
                                                    border: "0px",
                                                    backgroundColor: "transparent",
                                                    color: "#0981C8"
                                                }}
                                            >
                                                Delete
                                            </button>
                                    }

                                    var h100 = this.state.selectedServices.push(h10)

                                    console.log(h10)

                                    console.log(this.state.selectedServices)
                                    this.setState({
                                        //selectedServices: h100,
                                        preDefinePlanForCreate: {
                                            ...this.state.preDefinePlanForCreate,
                                            services: h
                                        },
                                        membershipCreateDataCustom: {
                                            ...this.state.membershipCreateDataCustom,
                                            membership_plan: {
                                                ...this.state.membershipCreateDataCustom.membership_plan,

                                                services: h
                                            }
                                        },
                                        //selectedServices:this.state.selectedServices.push(h),
                                        //SelectedServicesFromSelectBox: "",
                                        //SelectedCountFromSelectBox: "",
                                        changeStateTempForTestTableUpdate: !this.state.changeStateTempForTestTableUpdate
                                    })
                                }


                                this.handleCloseAddRowModal();
                            }}
                        >
                            Create
                        </Button>
                    </div>
                </Modal>

                <Modal
                    title="Add new service"
                    visible={this.state.visibleAddservice}
                    footer={null}
                    //onOk={this.handleOk}
                    onCancel={this.handleCloseAddService}
                >
                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Service Name</label>

                    <Input

                        className={"inputs"}
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        placeholder="Service 1"
                        value={this.state.createsService.name}
                    />

                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Cost</label>
                    <InputNumber
                        value={this.state.createsService.cost}
                        name="cost"
                        defaultValue={0}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        style={{width: "100%"}}
                        onChange={(e, value) => {
                            console.log(e)

                            this.setState({
                                createsService:
                                    {
                                        ...this.state.createsService,
                                        cost: e
                                    }
                            })
                        }}
                    />

                    <label style={{margin: "10px 0px 5px 0px"}} className='formLabel'>Description</label>

                    <TextArea
                        name="description"
                        value={this.state.createsService.description}
                        onChange={this.handleChange}
                        autoSize={{minRows: 3, maxRows: 5}}
                        placeholder="Description..."
                    />
                    <br/>
                    <div className="btnBox" style={{display: "flex", justifyContent: "end"}}>

                        <Button
                            onClick={this.handleCloseAddService}
                            type="secondary">
                            Close
                        </Button>
                        <Button

                            onClick={this.handleCreateService}
                            type="primary" style={{marginLeft: "5px"}}>
                            Create
                        </Button>

                    </div>
                </Modal>

            </div>
        )
    }
}


export default CreatePlan