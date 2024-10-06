import React, { Component } from 'react'
import { Col, Button, Input, InputNumber, message, Modal, notification, Radio, Row, Select, Table, Icon, Spin } from 'antd'
import { Controller } from 'Controller/Controller';
import CreateMember from './CreateMember';
import {
  BsClockHistory
} from "react-icons/bs";
import { Alert } from 'components/Alert/Alert';
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;

const Config = {
  headers: {
    Authorization: localStorage.getItem("user") ? "Token " + JSON.parse(localStorage.getItem("user")).key : "",
  }
}

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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

  checkPrmission = async () => {
    const response = await Controller.checkConnectedAccount();
    if (
      !response.detail

    ) {
      this.setState({
        permission: false
      })
    }
    else if (!response.detail.is_verified) {
      this.setState({
        permission: false
      })
    }
    else {
      this.setState({
        permission: true
      })
    }
  }

  constructor(props) {
    super(props)
    this.checkPrmission();
    this.getData();


    this.state = {
      permission: "loading",
      loadingCreatePreDefined: false,
      newCustomerid: "",
      openCreateMember: false,
      membershipCreateDataCustom: {
        commitment_term: 1,
        membership: {
          customer: "",
          is_active: true,
          automatic_renewal: true,
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
        commitment_term: 1,
        customer: "",
        plan: "",
        automatic_renewal: true,
      },
      changeStateTempForTestTableUpdate: true,
      SelectedServicesFromSelectBox: "",
      SelectedCountFromSelectBox: "",
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
      currentState: "preDefinePlan", // 1. customePlan 2. preDefinePlan 3.createNewPlan
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
  updateServiceList = async () => {
    const response = await Controller.GetServiceNP();

    this.setState({
      NpServices: response.json
    })
  }
  handleCreateCustomPlan = async () => {
    const response = await Controller.CreateCustomMembership(this.state.membershipCreateDataCustom)
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
          commitment_term: 1,
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
    this.setState({
      loadingCreatePreDefined: true
    })
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
    this.setState({
      loadingCreatePreDefined: false
    })
  }

  handleCloseAddRowModal = () => {
    this.setState({
      openAddNewRowVisible: false,
      SelectedServicesFromSelectBox: "",
      SelectedCountFromSelectBox: "",

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
    console.log(response)
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
    } else {
      Alert.openNotification(response.json.detail ? response.json.detail : "Error", "error")
    }
  }

  handleChangeCreatePlanData(e) {
    const { name, value } = e.target
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
    const { name, value } = e.target
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
    this.getPlan()
  }

  addNewRow = async () => {
    var temp = this.state.selectedServices
    const response = await Controller.GetServiceNP();
    temp.push({
      Id: this.state.selectedServices.length,
      Name:
        <Select
          className="inputs"
          style={{ minWidth: '100px' }}
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
          style={{ border: "0px", backgroundColor: "transparent", color: "#0981C8" }}
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
    this.setState({ currentState: e.target.value });
    this.getPlan()
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

  handleMenuClick(e) {
    this.setState({
      ...this.state,
      reason: e.item.props.children[1]
    })
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentState !== this.state.currentState) {
      console.log('New value:', this.state.currentState);

      if (this.state.currentState == 'preDefinePlan') {
        this.setState({
          membershipCreateDataCustom: {
            ...this.state.membershipCreateDataCustom,
            membership: {
              ...this.state.membershipCreateDataCustom.membership,
              automatic_renewal: true
            },
          },
          membershipCreateData: {
            ...this.state.membershipCreateData,
            automatic_renewal: true
          }
        })
      } else {
        this.setState({
          membershipCreateDataCustom: {
            ...this.state.membershipCreateDataCustom,
            membership: {
              ...this.state.membershipCreateDataCustom.membership,
              automatic_renewal: true
            },
          },
          membershipCreateData: {
            ...this.state.membershipCreateData,
            automatic_renewal: false
          }
        })
      }
    }
  }

  render() {
    //const { currentState } = this.state;
    const {
      profileSummary,
    } = this.props
    return (

      <div className="paymentRequestContent" style={{ width: "100%" }}>
        {
          this.state.permission == "loading" ?
            <div className="payreq-container" >
              <div className="content" style={{ textAlign: "center" }} >
                <Spin />
              </div>
            </div>
            :
            !this.state.permission ?
              <div className="payreq-container" >
                <div className="content" style={{ textAlign: "center", color: "red" }} >
                  Please add and verify your bank account!
                </div>
              </div>
              :
              <div className="payreq-container" >

                <div className="content" >

                  {
                    this.state.currentState != "createNewPlan" ?
                      <React.Fragment>
                        <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Member</label>
                        <Row type="flex" justify={"space-between"}>
                          <Col span={18}>
                            <Select
                              showSearch
                              style={{ width: "100%" }}
                              placeholder="Search Member"
                              optionFilterProp="children"
                              //onChange={onChange}
                              //onFocus={onFocus}
                              //onBlur={onBlur}
                              //onSearch={onSearch}
                              value={this.state.newCustomerid ? this.state.newCustomerid :
                                this.state.membershipCreateDataCustom.membership.customer ? this.state.membershipCreateDataCustom.membership.customer : null
                              }
                              onChange={(e) => {
                                console.log(e)

                                this.setState({
                                  newCustomerid: "",
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
                            </Select>
                          </Col>
                          <Col span={5}>
                            <Button type='primary'
                              style={{
                                height: "30px",
                                width: "100%",
                                padding: "0"
                              }}
                              onClick={this.handleAddMember}
                            >
                              + New
                            </Button>
                          </Col>
                        </Row>


                        <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Renewal</label>
                        <Radio.Group
                          disabled={this.state.currentState == "preDefinePlan"}
                          onChange={(e) => {
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
                          <Radio value={true}>Automatic</Radio><br />
                          <Radio value={false}>Manual</Radio>
                        </Radio.Group>
                        <br />  <br />
                        <Row type='flex' justify='center'>
                          <Radio.Group value={this.state.currentState} onChange={this.handleChangeCurrentState}>
                            <Radio.Button value="preDefinePlan">Membership Plan </Radio.Button>
                            <Radio.Button value="customePlan">Installment Plan</Radio.Button>

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
                        <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Plan name</label>
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

                        <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Billing Cycle</label>
                        <Select
                          className="inputs"
                          style={{ minWidth: '100px' }}
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
                          type="text"
                          name="name"
                          placeholder="Commitment Term"
                        /> */}

                        <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Commitment Term</label>
                        <InputNumber
                          defaultValue={0}
                          //formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          style={{ width: "100%" }}
                          value={this.state.membershipCreateDataCustom.commitment_term}
                          onChange={(e) => {
                            this.setState({
                              membershipCreateDataCustom: {
                                ...this.state.membershipCreateDataCustom,
                                commitment_term: e
                              }
                            })
                          }}
                        />

                        <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Price</label>
                        <InputNumber
                          defaultValue={0}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          style={{ width: "100%" }}
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



                        <br />
                        <br />

                        {/*---------------------------------Add service in Create member ship---------------------------*/}
                        <Row type="flex" justify="space-between">
                          <label style={{ margin: "10px 0px 5px 0px" }}>Service {/*<span
                      style={{ cursor: "pointer" }}
                  onClick={this.addNewRowModal}>+</span>*/}</label>
                          <Button
                            //onClick={this.handleOpenAddService}
                            onClick={
                              //this.addNewRow
                              this.addNewRowModal
                            }
                            type="primary" style={{ marginBottom: 16 }}>
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
                              Pagination={false} columns={serviceColumns} dataSource={this.state.selectedServices} />
                            :
                            <div>
                              <Table
                                style={{
                                  width: "auto",
                                  overflow: "auto",
                                }}
                                Pagination={false} columns={serviceColumns} dataSource={this.state.selectedServices} />
                            </div>

                        }

                        <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Terms</label>


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
                          autoSize={{ minRows: 3, maxRows: 5 }}
                          placeholder="Write Terms..."
                        />

                        {/* <Button className='whiteBtn cancel-btn'
                            onClick={() => {
                              this.props.back(true)
                            }}
                          >Back</Button> */}
                        <Row justify="end" style={{ marginTop: "25px", padding: "8px" }} gutter={[16]}>
                          <Button
                            style={{ width: "100%" }}
                            onClick={this.handleCreateCustomPlan}
                            type="primary"
                          >
                            Create
                            {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                          </Button>
                        </Row>


                      </React.Fragment>
                      :
                      /*------------------------------Create mebership-------------------------------*/
                      this.state.currentState == "preDefinePlan" ?
                        <React.Fragment>
                          <br />
                          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Commitment Term</label>
                          <InputNumber
                            defaultValue={0}
                            //formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: "100%" }}
                            value={this.state.membershipCreateData.commitment_term}
                            onChange={(e) => {
                              this.setState({
                                membershipCreateData: {
                                  ...this.state.membershipCreateData,
                                  commitment_term: e
                                }
                              })
                            }}
                          />
                          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Membership Plans</label>
                          <Row type="flex" justify={"space-between"} gutter={[16]} align="middle">
                            <Col span={17}>
                              <Select
                                showSearch
                                placeholder="Search Membership Plans"
                                optionFilterProp="children"
                                disabled={this.state.planList.length > 0 ? false : true}
                                //onChange={onChange}
                                //onFocus={onFocus}
                                //onBlur={onBlur}
                                //onSearch={onSearch}
                                style={{ width: "100%" }}
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
                            </Col>
                            <Col span={7}>
                              <Button
                                style={{ width: "100%" }}
                                onClick={this.handleCreateNewPlan}

                                type="primary"

                              >
                                +Add
                                {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                              </Button>
                            </Col>
                          </Row>



                          {/* <label className='formLabel'>Terms</label>


                    <TextArea
                      //value={value}
                      //onChange={this.onChange}

                      autoSize={{ minRows: 3, maxRows: 5 }}
                      placeholder="Write Terms..."
                      />*/}
                          <Row justify="end" style={{ marginTop: "25px", padding: "8px" }} gutter={[16]}>



                            <Button
                              onClick={this.handleSubmitCreateNewMembershipWithMemberAndPlan}
                              style={{ width: "100%" }}
                              type="primary"
                              disabled={this.state.loadingCreatePreDefined}
                            >
                              {this.state.loadingCreatePreDefined ? "Creating..." : "Create"}

                              {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                            </Button>
                          </Row>
                          {/* <Row justify="end" style={{ padding: "8px" }} gutter={[16]}>
                            <Button
                              style={{ width: "100%" }}
                              onClick={() => {
                                this.setState({
                                  currentState: "preDefinePlan"
                                })
                                this.getPlan()
                              }}
                            >Back</Button>
                          </Row> */}
                        </React.Fragment>
                        :
                        <React.Fragment>
                          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Plan name</label>
                          <Input
                            //prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            className={"inputs"}
                            onChange={this.handleChangeCreatePlanData}
                            type="text"
                            name="name"
                            placeholder="plan #1"
                            value={this.state.preDefinePlanForCreate.name}
                          />

                          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Billing Cycle</label>
                          <Select
                            className="inputs"
                            style={{ minWidth: '100px' }}
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

                          {/* <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Interval Count</label>
                          <Input
                            prefix={<BsClockHistory style={{ color: 'rgba(0,0,0,.25)' }} />}
                            name="interval_count"
                            className={"inputs"}
                            onChange={this.handleChangeCreatePlanData}
                            type="text"

                            placeholder="Interval Count"
                            value={this.state.preDefinePlanForCreate.interval_count}
                          /> */}

                          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Price</label>
                          <InputNumber
                            value={this.state.preDefinePlanForCreate.cost}
                            defaultValue={0}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              this.setState({
                                preDefinePlanForCreate: {
                                  ...this.state.preDefinePlanForCreate,
                                  cost: e
                                }
                              })
                            }}
                          />

                          <br />
                          <br />
                          <Row type="flex" justify="space-between">
                            <label >Service {/*<span
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
                              type="primary" style={{ marginBottom: 16 }}>
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
                                Pagination={false} columns={serviceColumns} dataSource={this.state.selectedServices} />
                              :
                              <div>
                                <Table
                                  style={{
                                    width: "auto",
                                    overflow: "auto",
                                  }}
                                  Pagination={false} columns={serviceColumns} dataSource={this.state.selectedServices} />
                              </div>

                          }



                          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Terms</label>


                          <TextArea
                            name="terms"
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
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            placeholder="Write Terms..."
                          />

                          <Row justify="end" style={{ marginTop: "25px", padding: "8px" }} gutter={[16]}>
                            {/* <button className='whiteBtn cancel-btn'
                              onClick={() => {
                                this.setState({
                                  currentState: "preDefinePlan"
                                })
                                this.getPlan()
                              }}
                            >Back</button> */}

                            <Button
                              onClick={this.handleCreateNewPlanPreDefined01}
                              style={{ width: "100%" }}
                              type="primary"

                            >
                              Create
                              {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                            </Button>
                          </Row>
                          <Row justify="end" style={{ padding: "8px" }} gutter={[16]}>
                            <Button
                              style={{ width: "100%" }}
                              onClick={() => {
                                this.setState({
                                  currentState: "preDefinePlan"
                                })
                                this.getPlan()
                              }}
                            >
                              Back
                            </Button>
                          </Row>
                        </React.Fragment>
                  }
                  <br />
                </div>
              </div>
        }


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
            <Col span={17}>
              <Select
                className="inputs"
                style={{ minWidth: '100px' }}
                placeholder="Select Service"
                value={this.state.SelectedServicesFromSelectBox ? this.state.SelectedServicesFromSelectBox : null}
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
                type="primary" style={{
                  marginBottom: 16,
                  height: "30px",
                  width: "100%",
                  padding: "0"
                }}>
                + Add
              </Button>
            </Col>
          </Row>


          <br />

          Count<br />
          <InputNumber
            style={{ width: "100%" }}
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
          <br />
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "end"
            }}
          >
            <Button
              onClick={this.handleCloseAddRowModal}
              type="secondary" >
              Close
            </Button>
            <Button
              type="primary" style={{ marginLeft: "5px" }}
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
                      style={{ border: "0px", backgroundColor: "transparent", color: "#0981C8" }}
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
                this.handleCloseAddRowModal();
              }}
            >
              Create
            </Button>
          </div>
        </Modal>

        <Modal
          title="Add new service"
          open={this.state.visibleAddservice}
          footer={null}
          //onOk={this.handleOk}
          onCancel={this.handleCloseAddService}
        >
          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Service Name</label>

          <Input

            className={"inputs"}
            onChange={this.handleChange}
            type="text"
            name="name"
            placeholder="Service 1"
            value={this.state.createsService.name}
          />

          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Cost</label>
          <InputNumber
            value={this.state.createsService.cost}
            name="cost"
            defaultValue={0}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: "100%" }}
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

          <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Description</label>

          <TextArea
            name="description"
            value={this.state.createsService.description}
            onChange={this.handleChange}
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="Description..."
          />
          <br />
          <div className="btnBox" style={{ display: "flex", justifyContent: "end" }}>

            <Button
              onClick={this.handleCloseAddService}
              type="secondary" >
              Close
            </Button>
            <Button
              onClick={this.handleCreateService}
              type="primary" style={{ marginLeft: "5px" }}>
              Create
            </Button>

          </div>
        </Modal>

        <CreateMember
          open={this.state.openCreateMember}
          handleAddNewMember={this.handleAddNewMember}
          handleCloseMember={this.handleCloseMember}
        />
      </div >
    )
  }
}




export default CreatePlan