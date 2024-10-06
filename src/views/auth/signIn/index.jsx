import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// Chakra imports
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
import { Form, Formik, Field } from 'formik'
import { notification, Modal } from 'antd'
// Custom components
import { HSeparator } from 'components/separator/Separator'
import DefaultAuth from 'layouts/auth/Default'
// Assets
import illustration from 'assets/img/auth/auth.png'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
// Error Handling
import { Controller } from './../../../Controller/Controller'
import { Error } from './../../../errorHandling/ErrorHandeling'
import { controller } from './../../../controller'
import { logDOM } from '@testing-library/react'

import config from './../../../Controller/config'

// import icons
import mainLogo from "../../../assets/img/logo.png"

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({
    Email: {
      message: '',
      status: true
    },
    Password: {
      massage: '',
      status: true
    }
  })

  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const brandStars = useColorModeValue('brand.500', 'brand.400')
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200')
  const googleText = useColorModeValue('navy.700', 'white')
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' }
  )
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' }
  )
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const openNotification = (placement, message, status) => {
    notification.info({
      message: status,
      description: message,
      placement
    })
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    setLoginLoading(true)



    const response = await controller.Login(email, password)

    if (response.status < 250) {
      localStorage.setItem('user', JSON.stringify(response))
      openNotification('bottom', 'login was successful', 'successful')
      const resp1 = await Controller.getOnboardingStage()
      if (resp1.json.status == 'complete') {
        const res = await controller.getData()
        console.log('lres', res)
        window.location.href = '/'
      } else {
        window.location.href = '/'
      }
    } else {
      openNotification('bottom', response.detail, 'Error')
      setLoginLoading(false)
      setFormErrors({
        Email: {
          massage: response.email ? response.email[0] : '',
          status: response.email ? false : true
        },
        Password: {
          massage: response.password ? response.password[0] : '',
          status: response.password ? false : true
        }
      })
    }
  }


  const checkInvite = () => {
    const url = window.location.href

    if (url.search("invite") != -1) {
      localStorage.setItem("inViteToken", window.location.href.split("/")[window.location.href.split("/").length - 2])
      window.location.href = "/#/auth/signup/"
    }
  }

  useEffect(() => {
    // check data ivite

    checkInvite();
  }, [])

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
        mb={{ base: '10px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '10vh' }}
        flexDirection='column'
      >
        <Flex justifyContent="center" alignItems="center" w={"100%"} mb="50px" >
          <img src={mainLogo} alt="logo" width={300} />
        </Flex>

        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'
          >
            Enter your email and password to sign in
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

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormControl>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: '0px', md: '0px' }}
                  type='email'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display='flex'
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Min. 8 characters'
                    mb='24px'
                    size='lg'
                    type={show ? 'text' : 'password'}
                    variant='auth'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement
                    display='flex'
                    alignItems='center'
                    mt='4px'
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent='space-between' align='center' mb='24px'>
                  <FormControl display='flex' alignItems='center'>
                    <Checkbox
                      id='remember-login'
                      colorScheme='brandScheme'
                      me='10px'
                    />
                    <FormLabel
                      htmlFor='remember-login'
                      mb='0'
                      fontWeight='normal'
                      color={textColor}
                      fontSize='sm'
                    >
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <NavLink to='/auth/forgot-password'>
                    <Text
                      color={textColorBrand}
                      fontSize='sm'
                      w='124px'
                      fontWeight='500'
                    >
                      Forgot password?
                    </Text>
                  </NavLink>
                </Flex>
                <Button
                  type='submit'
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'
                >
                  {loginLoading ? 'Go To Dashboard ...' : '  Sign In'}
                </Button>
              </FormControl>
            </Form>
          </Formik>
          {/* <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'
          >
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/signup'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'
                >
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </DefaultAuth>
  )
}

export default SignIn
