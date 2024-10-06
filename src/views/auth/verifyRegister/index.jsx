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
import { Button, Result } from 'antd'

// import icons
import mainLogo from "../../../assets/img/logo.png"

function VerifyRegister() {

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


            <Result
              icon={<SmileOutlined />}
              title="Great, now check your inbox & click the link to activate your account."
              extra={<Button type="primary" onClick={() => { window.location.href = "#/auth/signin" }}>Back to login</Button>}
            />




          </Flex>
        </Box>
      </Flex>

    </DefaultAuth >
  )
}

export default VerifyRegister
