import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { notification } from 'antd'
import { Form, Formik } from 'formik'
// Custom components
import DefaultAuth from 'layouts/auth/Default'
// Assets
// Error Handling
import { Error } from './../../../errorHandling/ErrorHandeling'
import { Controller } from 'Controller/Controller'
import { Alert } from 'components/Alert/Alert'

// import images
import mainLogo from "../../../assets/img/logo.png"

function ForgotPassword() {
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




  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    setLoginLoading(true)
    const email_validation = await Error.EmailHandling(email)

    if (email_validation.status) {
      setFormErrors({
        Email: {
          massage: '',
          status: true
        }
      })


      if (email_validation.status) {
        const data = {
          email: email
        }
        const response = await Controller.ForgotPassword(data)

        if (response.status < 250) {
          console.log(response)
          Alert.openNotification(response.message ? response.message : "Check your inox", "success")
          setEmail("")
        } else {
          Alert.openNotification(response.detail && response.detail[0] ? response.detail[0] : "Error", "error")
        }
      }
      setLoginLoading(false)



    }
  }

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
            Forgot Password
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'
          >
            Enter your email and we will send you a link to reset your password.
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
                  type={"email"}
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: '0px', md: '0px' }}
                  value={email}
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Flex justifyContent='space-between' align='center' mb='24px'>

                  <NavLink to='/auth/signin'>
                    <Text
                      color={textColorBrand}
                      fontSize='sm'

                      fontWeight='500'
                    >
                      Back to Sign-In page
                    </Text>
                  </NavLink>
                </Flex>
                <Button
                  onClick={handleSubmit}
                  type='submit'
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'
                >
                  {loginLoading ? 'Submiting ...' : '  Submit'}
                </Button>
              </FormControl>
            </Form>
          </Formik>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'
          >

          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  )
}

export default ForgotPassword
