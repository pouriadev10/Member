import React, { useEffect } from 'react'
// Chakra imports
import {
  Box,
  Flex
} from '@chakra-ui/react'
// Custom components
import DefaultAuth from 'layouts/auth/Default'
// Assets
// Error Handling


import { SmileOutlined } from '@ant-design/icons'
import { Button, Result, Spin } from 'antd'

// import icons
import mainLogo from "../../../assets/img/logo.png"
import { Controller } from 'Controller/Controller'

function VerifyMail() {

  const [status, setStatus] = React.useState("loading") // 1. Success 2. Failed

  const verifyEmail = async () => {
    const data = {
      key: window.location.hash.split("/")[window.location.hash.split("/").length - 1]
    }
    const response = await Controller.verifyEmail(data)
    if (response.status < 250) {
      setStatus("Success")
    } else {
      setStatus("Failed")
    }
  }

  useEffect(() => {
    verifyEmail();
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
            {
              status == "loading" && (
                <Spin
                />
              )
            }
            {
              status == "Success" && (
                <Result
                  icon={<SmileOutlined />}
                  title={"Great. You are all set! Login Now"}
                  extra={<Button type="primary" onClick={() => { window.location.href = "#/auth/signin" }}>Login</Button>}
                />
              )
            }
            {
              status == "Failed" &&
              (
                <Result
                  status="error"
                  title="Failed"
                  subTitle="An error occurred.! Please sign-up."
                  extra={
                    <Button type="primary" onClick={() => { window.location.href = "#/auth/signup" }}>Sign-up</Button>
                  }
                />
              )
            }

          </Flex>
        </Box>
      </Flex>

    </DefaultAuth >
  )
}

export default VerifyMail
