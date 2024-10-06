import React, { Component } from 'react';

import { Button, Col, Input, InputNumber, Modal, Row, Select, Table, notification } from 'antd';

import { Controller } from 'Controller/Controller';

import { Alert } from 'components/Alert/Alert';
import {
  BsClockHistory
} from "react-icons/bs";
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;




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

  setServicesFromProps = (row) => {
    var temp = []
    console.log("asdasd")
    for (var i in row.services) {
      console.log(i)
      temp.push({
        Count: row.services[i].count,
        Name: row.services[i].service,
        Id: row.services[i].id,

      })
    }
    console.log(temp)
    this.setState({
      selectedServices: temp,
      changeStateTempForTestTableUpdate: !this.state.changeStateTempForTestTableUpdate
    })
  }

  constructor(props) {
    super(props)

    //this.getData();

    console.log(props)



    this.state = {
      loading: false,
      row: props.editRow,
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
          interval_count: 0,
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
        interval_count: 0,
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
      selectedServices: [
        {
          Name: "1",
          Count: "1",
        }
      ],
      currentState: "createNewPlan", // 1. customePlan 2. preDefinePlan 3.createNewPlan
    }

    /* 
 */

    //this.setServicesFromProps(props.editRow)
    this.setServicesFromProps = this.setServicesFromProps.bind(this)
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

  componentDidMount() {
    var temp = []
    console.log("asdasd")
    for (var i in this.props.editRow.services) {
      console.log(i)
      temp.push({
        Count: this.props.editRow.services[i].count,
        Name: this.props.editRow.services[i].service,
        id: this.props.editRow.services[i].id,
        Action:
          <button
            onClick={() => {
              var aaaa = this.state.selectedServices.filter((e) => e.id != this.props.editRow.services[i].id)
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
      })
    }
    console.log(temp)
    this.setState({
      selectedServices: temp,
      changeStateTempForTestTableUpdate: !this.state.changeStateTempForTestTableUpdate
    })

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

            interval_count: 0,
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
    this.setState({
      loading: true
    })
    console.log(this.state.row)

    var temp = []
    for (var i in this.state.row.services) {
      if (this.state.row.services[i].unit_price) {
        temp.push({
          count: this.state.row.services[i].count,
          service: this.state.row.services[i].service_id,
        })
      }
    }

    console.log(temp)
    /*this.setState({
      row:{
        ...this.state.row,
        services:temp
      }
    })*/



    const response = await Controller.EditMembershipPlan(
      {
        "services": temp,
        "name": this.state.row.name,
        "interval": this.state.row.interval,
        "active": true,
        "cost": this.state.row.cost,
        "description": "",
        "terms": this.state.row.terms
      },

      this.state.row.id,
      this.state.row.office.id,
    )
    console.log(response)
    if (response.status < 250) {
      this.setState({
        selectedServices: [],
        preDefinePlanForCreate: {
          name: "",
          interval: "",
          interval_count: 0,
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
      this.props.handleDoneEdit();
    } else {
      Alert.openNotification(
        response.json.services ? "Service : " + response.json.services :
          response.json.name ? "Plan Name : " + response.json.name :
            response.json.active ? "Active : " + response.json.active :
              response.json.cost ? "Cost : " + response.json.cost :
                response.json.description ? "Description : " + response.json.description :
                  response.json.terms ? "Term : " + response.json.terms
                    : "Error", "error")
    }
    this.setState({
      loading: false
    })
  }

  handleChangeCreatePlanData(e) {
    const { name, value } = e.target
    this.setState({
      row:
      {
        ...this.state.row,
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
      <div className="paymentRequestContent" style={{ width: "100%" }}>
        <div className="payreq-container" >
          <div className="content" >
            <React.Fragment>
              <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Plan name</label>
              <Input
                //prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                className={"inputs"}
                onChange={this.handleChangeCreatePlanData}
                type="text"
                name="name"
                placeholder="plan #1"
                value={this.state.row.name}
              />

              <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Billing Cycle</label>
              <Select
                className="inputs"
                style={{ minWidth: '100px' }}
                defaultValue={[]}
                placeholder="Select Cycle"
                name="interval"
                value={this.state.row.interval ? this.state.row.interval : null}
                onChange={(e, value) => {
                  this.setState({
                    row:
                    {
                      ...this.state.row,
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

              {/*<label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Commitment Term</label>
              <Input
                prefix={<BsClockHistory style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="interval_count"
                className={"inputs"}
                onChange={this.handleChangeCreatePlanData}
                type="text"

                placeholder="Commitment Term"
                value={this.state.row.interval_count}
              /> */}

              <label style={{ margin: "10px 0px 5px 0px" }} className='formLabel'>Price</label>
              <InputNumber
                value={this.state.row.cost}
                defaultValue={0}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: "100%" }}
                onChange={(e) => {
                  this.setState({
                    row: {
                      ...this.state.row,
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
                value={this.state.row.terms}
                onChange={(e) => {
                  //console.log(e.target.value)
                  this.setState({
                    row:
                    {
                      ...this.state.row,
                      terms: e.target.value
                    }
                  })
                }}
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder="Write Terms..."
              />

              <div className="btnBox" style={{ display: "flex" }}>
                <button
                    className='whiteBtn cancel-btn'
                  onClick={() => {
                    console.log(this.props)
                    this.props.handleBackEdit()
                  }}
                >
                  Back
                </button>

                <button
                  onClick={this.handleCreateNewPlanPreDefined01}
                  className='createBtn'
                  type="submit"
                  disabled={this.state.loading}
                >
                  {
                    this.state.loading ? "Updating..." : "Update"
                  }
                  {/*this.state.sending_data ? "Sending ..." : "Send"*/}
                </button>
              </div>

            </React.Fragment>

            <br />
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
                style={{ minWidth: '100px' }}
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
                type="primary" style={{ marginBottom: 16 }}>
                Add Service
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
                  row: {
                    ...this.state.row,
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
          visible={this.state.visibleAddservice}
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

      </div >
    )
  }
}




export default CreatePlan