import React, { Component } from 'react'

import Axios from 'axios'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue
} from '@chakra-ui/react'


import { notification, Modal, Tooltip } from 'antd';
import { controller } from './controller';


import { MailOutlined, LockOutlined, HomeOutlined, EyeOutlined } from "@ant-design/icons"

import config from 'Controller/config';
import DefaultAuth from 'layouts/auth/Default'

// import icons
import mainLogo from "../../../assets/img/logo.png"

class LoginPage extends Component {

  constructor(props) {
    super(props)
    // reset login status



    this.state = {
      serverLogo: "",
      loginLoading: false,
      email: this.props.match.params.email,
      password: '',
      submitted: false,
      type: 'password',
      show: 'Show',
      showMargin: '12px',
      forgetPassModal: false,
      sendingData: false,
      registerForm: {
        invite_token: localStorage.getItem("inViteToken"),
        email: "",
        password1: "",
        password2: "",
      },
      formErrors: {
        Email: {
          massage: "",
          status: true

        },

        Password1: {
          massage: "",
          status: true

        },

        Password2: {
          massage: "",
          status: true

        }
      }
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getData = this.getData.bind(this)

  }

  getData = async () => {
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
    localStorage.setItem("selectedOffice", eval(JSON.stringify(chengedResponse[0].office_id)))
    localStorage.setItem("selectedOfficeName", eval(JSON.stringify(chengedResponse[0].office_name)))
    window.location.href = "/"
    return response

  }

  openNotification = (placement, message, status) => {
    notification.info({
      message: status,
      description: message,
      placement,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault()
    // Submit form
    this.setState({ loginLoading: true })
    console.log(this.state.registerForm)

    const response = await controller.Register(this.state.registerForm);
    console.log(response)

    if (response.status > 250) {
      this.openNotification("bottom", "Error", "error")
    } else {
      window.location.href = "/#/auth/verify-register"
      this.openNotification('bottom', "register was successful. login to your account right now", "successful");
      localStorage.removeItem("inViteToken")
      //const res = await this.getData();
      //console.log(res)



      //  this.openNotification("bottom", "created successfully", "successful")

      //window.location.href = "/"
    }
    this.setState({
      loginLoading: false
    })

  }

  handleChange(e) {
    console.log(e)
    console.log(e.target.value)
    const { name, value } = e.target
    this.setState({
      registerForm:
      {
        ...this.state.registerForm,
        [name]: value
      }
    })
  }

  render() {
    const { loginEmailSent, error } = this.props

    const className = 'content' +
      (error || (this.state.submitted && (!this.state.email || !this.state.password)) ? ' login_errors_container' : '')

    return (
      <DefaultAuth>
        <Flex
          maxW={{ base: '100%', md: 'max-content' }}
          w='100%'
          mx={{ base: 'auto', lg: '0px' }}
          me='auto'
          h='100%'
          alignItems='start'
          justifyContent='center'
          mb={{ base: '30px', md: '60px' }}
          px={{ base: '25px', md: '0px' }}
          mt={{ base: '40px', md: '14vh' }}
          flexDirection='column'
        >
          <Flex justifyContent="center" alignItems="center" w={"100%"} mb="50px" >
            <img src={mainLogo} alt="logo" width={300} />
          </Flex>
          <Box me='auto'>
            <Heading fontSize='36px' mb='10px' style={{ color: "var(--chakra-colors-navy-700)" }}>
              Sign Up
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              style={{ color: "var(--chakra-colors-gray-400)" }}
              fontWeight='400'
              fontSize='md'
            >
              Create Your Account
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: '100%', md: '420px' }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: 'auto', lg: 'unset' }}
            me='auto'
            mb={{ base: '20px', md: 'auto' }}
          >
            <form name="form" onSubmit={this.handleSubmit}>
              {!loginEmailSent &&
                <div className="emailpass-form">

                  < div >
                    <FormLabel
                      display='flex'
                      ms='4px'
                      fontSize='sm'
                      fontWeight='500'
                      style={{ color: "var(--chakra-colors-navy-700)" }}
                      mb='8px'
                    >
                      Email
                    </FormLabel>
                    <Input
                      onChange={this.handleChange}
                      className={this.state.formErrors && this.state.formErrors.Email && this.state.formErrors.Email.massage == '' ? "inputs" : "inputs-error"}
                      isRequired={true}
                      variant='auth'
                      fontSize='sm'
                      ms={{ base: '0px', md: '0px' }}
                      type='email'
                      placeholder='mail@simmmple.com'
                      mb='24px'
                      fontWeight='500'
                      size='lg'
                      name="email"
                      value={this.state.registerForm.email}
                    />
                    {
                      this.state.formErrors && this.state.formErrors.Email && this.state.formErrors.Email.massage == "" ?
                        <div className='error-text-empty'></div>
                        :
                        <div className='error-text'>
                          {this.state.formErrors.Email.massage}
                        </div>
                    }
                  </div>
                  <div>

                    <FormLabel
                      display='flex'
                      ms='4px'
                      fontSize='sm'
                      fontWeight='500'
                      style={{ color: "var(--chakra-colors-navy-700)" }}
                      mb='8px'
                    >
                      Password
                    </FormLabel>
                    <Input
                      onChange={this.handleChange}
                      className={this.state.formErrors && this.state.formErrors.Email && this.state.formErrors.Email.massage == '' ? "inputs" : "inputs-error"}
                      name="password1"
                      isRequired={true}
                      variant='auth'
                      fontSize='sm'
                      ms={{ base: '0px', md: '0px' }}
                      type={'password'}
                      placeholder='*********'
                      mb='24px'
                      fontWeight='500'
                      size='lg'
                      prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                    {
                      this.state.formErrors && this.state.formErrors.Password1 && this.state.formErrors.Password1.massage == "" ?
                        <div className='error-text-empty'></div>
                        :
                        <div className='error-text'>
                          {this.state.formErrors.Password1.massage}
                        </div>
                    }
                  </div>
                  <div>

                    <FormLabel
                      display='flex'
                      ms='4px'
                      fontSize='sm'
                      fontWeight='500'
                      style={{ color: "var(--chakra-colors-navy-700)" }}
                      mb='8px'
                    >
                      Confirm Password
                    </FormLabel>
                    <Input
                      onChange={this.handleChange}
                      className={this.state.formErrors && this.state.formErrors.Password2 && this.state.formErrors.Email.massage == '' ? "inputs" : "inputs-error"}
                      name="password2"
                      variant='auth'
                      fontSize='sm'
                      ms={{ base: '0px', md: '0px' }}
                      type={'password'}
                      placeholder='*********'
                      mb='24px'
                      fontWeight='500'
                      size='lg'
                      value={this.state.registerForm.password}
                      prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                    {
                      this.state.formErrors && this.state.formErrors.Password2 && this.state.formErrors.Password2.massage == "" ?
                        <div className='error-text-empty'></div>
                        :
                        <div className='error-text'>
                          {this.state.formErrors.Password2.massage}
                        </div>
                    }
                  </div>
                  {/* <div>
                      <label className='inputLabel'>UUID</label>

                      <Input
                        onChange={this.handleChange}
                        className={this.state.formErrors && this.state.formErrors.Password2 && this.state.formErrors.Email.massage == '' ? "inputs" : "inputs-error"}
                        name="invite_token"
                        autoComplete="uuid"
                        placeholder="uuid"
                        value={this.state.registerForm.invite_token}
                      //prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                      />
                    </div> */}
                </div>
              }
              <div className="btn-container">
                <Button
                  type='submit'
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'
                >
                  {this.state.loginLoading ? "Registering ..." : "Register"}
                </Button>
              </div>
            </form>


          </Flex>
        </Flex>
      </DefaultAuth>

    )
  }
}




export default LoginPage