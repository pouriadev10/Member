// Chakra imports
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import Footer from 'components/footer/FooterAuth'
import FixedPlugin from 'components/fixedPlugin/FixedPlugin'
// Custom components
import { NavLink } from 'react-router-dom'
// Assets
import { FaChevronLeft } from 'react-icons/fa'

import { Col, Row } from "antd"

function AuthIllustration(props) {
  const { children, illustrationBackground } = props
  // Chakra color mode
  return (
    <>
      <Row type="flex" justify={"center"}>
        {children}
        <Box
          display={{ base: 'none', md: 'block' }}
          h='100%'
          minH='100vh'
          w={{ lg: '50vw', '2xl': '44vw' }}
          position='absolute'
          right='0px'
        >
        </Box>

      </Row>
    </>

  )
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any
}

export default AuthIllustration
