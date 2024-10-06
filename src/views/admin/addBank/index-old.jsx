import { ExclamationCircleOutlined, MailOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { Button as AntdButton } from "antd";
import { Input, Modal, Select, Spin, notification } from 'antd';
import { Alert } from "components/Alert/Alert";
import Card from "components/card/Card.js";
import { Component } from 'react';
import { MdViewList } from 'react-icons/md';
import AccountTable from "./components/AccountTable";
import { Error } from './components/ErrorHandeling';
import { controllerAccount } from './components/controllerAccount';
const { Option } = Select;

const PlanColumn = [
  {
    title: 'default',
    dataIndex: 'active',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Capabilities',
    dataIndex: 'capabilities',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Linked',
    dataIndex: 'action',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Country',
    dataIndex: 'country',
    render: text => <a>{text}</a>,
  },

]



class AddAccount extends Component {

  constructor(props) {
    super(props)

    this.state = {
      viewBankInfo: {},
      openModalViewBank: false,
      loadingstripeLink: false,
      openModalAddBank: false,
      addBankInfo: {
        office: localStorage.getItem("selectedOffice"),
        name: "",
        stripe_bank_id: "",
        stripe_account_id: "",
        account_number: "",
        routing_number: "",
        account_holder_name: "",
        account_holder_type: "",
        country: "",
        currency: "",
        description: "",

      },
      modalInfoIncompelete: false,
      serverLogo: "",
      openAddAccountModal: false,
      email: '',
      accountType: 'express',
      country: '',
      connectedAccounts: [],
      name: '',
      description: '',
      loadingNewAccount: false,
      loadingGetData: true,
      formError: {
        Name: {
          massage: "",
          status: true
        },
        Description: {
          massage: "",
          status: true
        },
        Email: {
          massage: "",
          status: true
        },
        AccountType: {
          massage: "",
          status: true
        },
        Country: {
          massage: "",
          status: true
        },
      }
    }

    this.stripeLink = this.stripeLink.bind(this)
    this.activeCardAccount = this.activeCardAccount.bind(this)
    this.viewBankAccount = this.viewBankAccount.bind(this)
    this.handleAddBank = this.handleAddBank.bind(this)
    this.handleActive = this.handleActive.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getAccount();
  }

  stripeLink = async () => {
    this.setState({
      loadingstripeLink: true
    })
    const response = await controllerAccount.accountlink(this.state.stripe_account_id);
    console.log(response)
    if (response.status < 250) {
      window.location.href = response.data
    }
  }


  activeCardAccount = async (id) => {

    const data = {
      "office": localStorage.getItem("selectedOffice"),
      "id": id
    }
    const response = await controllerAccount.active_cart_bank(data)
    console.log(response)
    if (response.status < 250) {
      Alert.openNotification(response.message ? response.message : "Successful", "success")
      this.getAccount()
    } else {
      Alert.openNotification(response.detail[0] ? response.detail[0] : "Error", "error")
    }

    //window.location.reload()

  }

  viewBankAccount = async (id) => {

    const response = await controllerAccount.view_bank_account(id)
    this.setState({
      openModalViewBank: true,
      viewBankInfo: response

    })
  }

  addBankAccount = async (stripe_account_id) => {
    const response = await controllerAccount.isenableaccount(
      localStorage.getItem("selectedOffice"),
      stripe_account_id
    )
    if (response.status < 250) {
      if (response.enable) {
        this.setState({
          openModalAddBank: true,
          addBankInfo: {
            ...this.state.addBankInfo,
            "stripe_account_id": stripe_account_id,
          }
        })
      }
      else {

        this.setState({
          modalInfoIncompelete: true,
          stripe_account_id: stripe_account_id
        })
      }

    }

  }

  getAccount = async () => {
    this.setState({ loadingGetData: true })
    const response = await controllerAccount.get_connected_account();


    var temp = []

    if (response.status < 250) {
      for (var i in response.json) {

        temp.push({
          default: response.json[i].default,
          bank: response.json[i].bank,
          capabilities: response.json[i].capabilities,
          country: response.json[i].country,
          created: response.json[i].created,
          description: response.json[i].description,
          email: response.json[i].email,
          enable: response.json[i].enable,
          id: response.json[i].id,
          office: response.json[i].office,
          stripe_account_id: response.json[i].stripe_account_id,
          type: response.json[i].type,
          name: response.json[i].name,
          uuid: response.json[i].uuid,
          action: <>
            {
              response.json[i].bank ?
                <button
                  style={{
                    border: "0px",
                    background: "transparent",
                    color: "#1677ff",
                    textAlign: "end",
                    cursor: "pointer"
                  }} onClick={() => this.viewBankAccount(response.json[i].bank)} >
                  <MdViewList />
                </button>
                :


                <button
                  style={{
                    border: "0px",
                    background: "transparent",
                    color: "#1677ff",
                    textAlign: "end",
                    cursor: "pointer"
                  }}
                  name={JSON.stringify(response.json[i])}
                  onClick={async (e) => {
                    console.log("ppppspdlcspdclps")
                    this.addBankAccount(response.json[i].id)
                  }}
                >Add Bank</button >
            }


          </>
        })

        console.log(temp)

      }
      console.log(temp)
      console.log(response.json)
      this.setState({ connectedAccounts: temp, loadingGetData: false })
    }


  }

  handleAddBank = (e) => {
    console.log(e)
  }

  handleChange(e) {
    const { name, value } = e.target
    //console.log(value)
    this.setState({ [name]: value })
  }



  visibleAddAccountModal = () => {
    this.setState({ openAddAccountModal: true })
  }
  InVisibleAddAccountModal = () => {
    this.setState({
      openAddAccountModal: false,
      name: '',
      description: '',
      email: '',
      accountType: '',
      country: '',
      formError: {
        Name: {
          massage: "",
          status: true
        },
        Description: {
          massage: "",
          status: true
        },
        Email: {
          massage: "",
          status: true
        },
        AccountType: {
          massage: "",
          status: true
        },
        Country: {
          massage: "",
          status: true
        },
      }
    })
    this.getAccount();
  }

  handleActive = async (event) => {
    this.setState({ connectedAccounts: [], loadingGetData: true })
    const response = await controllerAccount.get_connected_account();
    console.log(response)
    this.setState({ connectedAccounts: response, loadingGetData: false })
  }
  openNotification = (placement, message, status) => {
    notification.info({
      message: status,
      description: message,
      placement,
    });
  };
  handleOk = async () => {
    console.log(this.state.accountType)
    console.log(this.state.country)
    this.setState({ loadingNewAccount: true })


    const Name_validation = await Error.NameHandling(this.state.name)
    const country_validation = await Error.SelectItem(this.state.country)
    const description_validation = await Error.NameHandling(this.state.description)
    const email_validation = await Error.EmailHandling(this.state.email)
    const accountType_validation = await Error.SelectItem(this.state.accountType)

    if (
      Name_validation.status &&
      country_validation.status &&
      description_validation.status &&
      email_validation.status &&
      accountType_validation.status
    ) {
      this.setState({
        formError: {
          Name: {
            massage: "",
            status: true
          },
          Description: {
            massage: "",
            status: true
          },
          Email: {
            massage: "",
            status: true
          },
          AccountType: {
            massage: "",
            status: true
          },
          Country: {
            massage: "",
            status: true
          },
        }
      })
      console.log(this.state.email)

      console.log(this.state.country)
      console.log(this.state.accountType)
      const response = await controllerAccount.add_connected_account(
        localStorage.getItem("selectedOffice"),
        this.state.email,
        this.state.accountType,
        this.state.country,
        this.state.name,
        this.state.description,
      )
      if (response.status < 250) {
        this.setState({
          email: "",
          accountType: "",
          country: "",
          name: "",
          description: "",

        })

        const response_get_connected_account = await controllerAccount.get_connected_account();
        console.log(response_get_connected_account)
        this.setState({
          connectedAccounts: response_get_connected_account,

        })
        this.openNotification('bottom',
          response.message ?
            response.message
            :
            "Done"
          , "Successfull");
        this.setState({
          loadingNewAccount: false,
          name: '',
          description: '',
          email: '',
          accountType: '',
          country: ''
        })
        this.InVisibleAddAccountModal()
      } else {

        this.openNotification('bottom', response.detail ? response.detail[0] : response.massage, "Error");
        this.setState({
          loadingNewAccount: false,
          formError: {
            AccountType: {
              massage: response.type ? response.type[0] : "",
              status: response.type ? false : true
            },
            Name: {
              massage: response.name ? response.name[0] : "",
              status: response.name ? false : true
            },
            Country: {
              massage: response.country ? response.country[0] : "",
              status: response.country ? false : true
            },
            Email: {
              massage: response.email ? response.email[0] : "",
              status: response.email ? false : true
            },
            Description: {
              massage: response.description ? response.description[0] : "",
              status: response.description ? false : true
            },

          }

        })
        //this.InVisibleAddAccountModal()
      }


    } else {
      console.log(accountType_validation)
      console.log(country_validation)
      this.setState({
        loadingNewAccount: false,
        formError: {
          Name: Name_validation,
          Description: description_validation,
          Email: email_validation,
          AccountType: accountType_validation,
          Country: country_validation,
        }

      })
    }



  }


  render() {



    return (
      <div>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid>
            <Card px='0px' mb='20px'>


              <div className="">
                <Flex
                  align={{ sm: "flex-start", lg: "center" }}
                  justify='space-between'
                  w='100%'
                  px='22px'
                  pb='20px'
                  mb='10px'
                  boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
                  <Text color={"gray"} fontSize='xl' fontWeight='600'>
                    Accounts

                  </Text>

                  <p
                    style={{ cursor: "pointer", color: "#0981c8", fontSize: "16px", fontWeight: "bold" }}
                    onClick={this.visibleAddAccountModal}

                  >+ Add new connected account</p>
                </Flex>

                <div className="payreq-container">


                  {
                    this.state.loadingGetData ?
                      <div style={{ justifyContent: "center", display: "flex", height: "250px" }}>
                        <Spin size="large" style={{ alignSelf: "center" }} />

                      </div>


                      :
                      <div className="bank-account-card-row">
                        {/*
                          this.state.connectedAccounts.map((connectedAccount) =>
                            <CardAccount data={connectedAccount} onActiveCard={this.handleActive} />
                          )
                  */}
                        <div style={{ marginTop: "15px", width: "100%" }}>
                          {
                            this.state.connectedAccounts && this.state.connectedAccounts.length > 0 ?
                              <AccountTable style={{ width: "auto" }} columns={PlanColumn} dataSource={this.state.connectedAccounts}
                                getAccount={this.getAccount}
                                viewBankAccount={this.viewBankAccount}
                                addBankAccount={this.addBankAccount}
                              />
                              :
                              <div style={{ textAlign: "center" }}>
                                <ExclamationCircleOutlined style={{ fontSize: "3rem", marginBottom: "1rem" }} />
                                <h3 style={{ fontWeight: "bold" }}>No Data</h3>
                                <p style={{ fontSize: "1.2rem" }}>No data available in the table.</p>
                              </div>
                          }


                        </div>
                      </div>
                  }


                </div>
              </div>


            </Card>
          </SimpleGrid>
        </Box>

        <Modal title="Add Connected Account"
          onCancel={this.InVisibleAddAccountModal}
          visible={this.state.openAddAccountModal}
          onOk={this.handleOk}
          footer={null}
          okText={
            !this.state.loadingNewAccount ?
              'Create new connected account'
              :
              <Spin />
          }
        /*onCancel={this.InVisibleAddAccountModal}*/
        >
          <div className="content">
            <label className='formLabel'>Bank Name</label>
            <Input
              //disabled
              onChange={this.handleChange}
              className={this.state.formError &&
                this.state.formError.Name &&
                this.state.formError.Name.status ? "inputs" : "inputs-error"}
              name="name"
              placeholder="Bank Name"
              value={this.state.name}

            />
            {
              this.state.formError && this.state.formError.Name &&
                this.state.formError.Name.status ?
                <></>
                :
                <div className='error-text'>
                  {this.state.formError.Name.massage}
                </div>
            }
            <label className='formLabel'>Description</label>
            <Input
              //disabled
              onChange={this.handleChange}
              className={this.state.formError &&
                this.state.formError.Description &&
                this.state.formError.Description.status ? "inputs" : "inputs-error"}
              name="description"
              placeholder="text..."
              value={this.state.description}

            />
            {
              this.state.formError && this.state.formError.Description &&
                this.state.formError.Description.status ?
                <></>
                :
                <div className='error-text'>
                  {this.state.formError.Description.massage}
                </div>
            }
            <label className='formLabel'>Email</label>
            <Input
              //disabled
              onChange={this.handleChange}
              className={this.state.formError &&
                this.state.formError.Email &&
                this.state.formError.Email.status ? "inputs" : "inputs-error"}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="example@email.com"
              value={this.state.email}
              prefix={<MailOutlined type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            {
              this.state.formError && this.state.formError.Email &&
                this.state.formError.Email.status ?
                <></>
                :
                <div className='error-text'>
                  {this.state.formError.Email.massage}
                </div>
            }
            <label className='formLabel'>Account Type</label>
            <Select
              className={this.state.formError &&
                this.state.formError.AccountType &&
                this.state.formError.AccountType.status ? "inputs" : "inputs-error"}
              style={{ width: '100%' }}
              placeholder="Account Type"

              onChange={(event) => this.setState({ accountType: event })}
              value={this.state.accountType}
            >


              <Option key="express">express</Option>
              {/* <Option key="custom">custom</Option> */}
              {/*<Option key="standard">standard </Option>*/}


            </Select>

            {
              this.state.formError && this.state.formError.AccountType &&
                this.state.formError.AccountType.status ?
                <></>
                :
                <div className='error-text'>
                  {this.state.formError.AccountType.massage}
                </div>
            }

            <label className='formLabel'>Country</label>
            <Select
              className={this.state.formError &&
                this.state.formError.Country &&
                this.state.formError.Country.status ? "inputs" : "inputs-error"}
              style={{ width: '100%' }}
              placeholder="Country"
              value={this.state.country ? this.state.country : null}
              defaultValue={[]}
              onChange={(event) => this.setState({ country: event })}
            >
              <Option key="US">United States of America</Option>
              <Option key="CA">Canada</Option>
              <Option key="None">Other </Option>
            </Select>
            {
              this.state.formError && this.state.formError.Country &&
                this.state.formError.Country.status ?
                <></>
                :
                <div className='error-text'>
                  {this.state.formError.Country.massage}
                </div>
            }
          </div>
          <div className='modalButton'>
            <AntdButton type="secondary" onClick={this.InVisibleAddAccountModal}>cancel</AntdButton>
            {
              !this.state.loadingNewAccount ?
                <AntdButton
                 style={{ minWidth: "230px", marginLeft: "5px" }} onClick={this.handleOk} type="primary" >

                  Create new connected account
                </AntdButton>
                :
                <AntdButton style={{ minWidth: "230px", marginLeft: "5px" }}/*onClick={this.handleOk}*/ type="primary" >

                  Loading...
                </AntdButton>

            }
          </div>


        </Modal>
        <Modal title="Information Is Incompelete" visible={this.state.modalInfoIncompelete} footer={null} onCancel={() => {
          this.setState({
            modalInfoIncompelete: false
          })
        }}>
          Please complete your bank account link through Stripe
          <br />
          <br />
          {
            this.state.loadingstripeLink ?
              <Button style={{ width: "100%" }} type="primary">
                Loading ...
              </Button>
              :
              <Button onClick={this.stripeLink} style={{ width: "100%" }} type="primary">
                Compelete Information
              </Button>
          }

        </Modal>
        <Modal title="View Bank" open={this.state.openModalViewBank} footer={null} onCancel={() => {
          this.setState({
            openModalViewBank: false,
            viewBankInfo: {}

          })
        }}>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p className="cardHeadModal cardHeadLeft">Account Holder Name
                <br />
                <span className="cardContextModal">{(this.state.viewBankInfo.account_holder_name) ? this.state.viewBankInfo.account_holder_name : "-"}</span>
              </p>
            </div>
            <div>
              <p className="cardHeadModal cardHeadRight">Account HolderType
                <br />
                <span className="cardContextModal">{this.state.viewBankInfo.account_holder_type ? this.state.viewBankInfo.account_holder_type : "-"}</span>
              </p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p className="cardHeadModal cardHeadLeft">Bank Name
                <br />
                <span className="cardContextModal">{this.state.viewBankInfo.name ? this.state.viewBankInfo.name : "-"}</span>
              </p>
            </div>
            <p className="cardHeadModal cardHeadRight">Country
              <br />
              <span className="cardContextModal">{(this.state.viewBankInfo.country) ? this.state.viewBankInfo.country : "-"}</span>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p className="cardHeadModal cardHeadLeft">Account Number (last 4 digit)
                <br />
                <span className="cardContextModal">{this.state.viewBankInfo.last4 ? this.state.viewBankInfo.last4 : "-"}</span>
              </p>
            </div>
            <p className="cardHeadModal cardHeadRight">Routing Number
              <br />
              <span className="cardContextModal">{(this.state.viewBankInfo.routing_number) ? this.state.viewBankInfo.routing_number : "-"}</span>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p className="cardHeadModal cardHeadLeft">Description
                <br />
                <span className="cardContextModal">{this.state.viewBankInfo.description ? this.state.viewBankInfo.description : "-"}</span>
              </p>
            </div>

          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
            <Button onClick={() => {
              this.setState({
                openModalViewBank: false,
                viewBankInfo: {}

              })
            }} style={{ marginLeft: "5px" }} type="primary">
              Close
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}


export default AddAccount