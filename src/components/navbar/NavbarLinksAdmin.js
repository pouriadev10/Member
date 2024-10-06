import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import config from './../../Controller/config'
// Custom Components
import { SidebarResponsive } from 'components/sidebar/Sidebar'
import PropTypes from 'prop-types'
import FailedPaymentDetailTable from "../../views/admin/default/components/FailedPaymentDetailTable"


// Modal components
import OfficeInformation from './components/Modal/OfficeInformation'
import SelectOffice from './components/Modal/SelectOffice'

// Assets
import { MdPerson, MdAddAlert } from 'react-icons/md'
import routes from 'routes.js'
import { Col, Row, Spin, message } from 'antd'


import { Controller } from 'Controller/Controller'


const columns = [
  {
    Header: 'First Name',
  },
  {
    Header: 'Last Name',
  },
  {
    Header: 'Plan Name',
  },
  {
    Header: 'Amount',
  },
]

export default function HeaderLinks(props) {
  const { secondary } = props
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white')
  let menuBg = useColorModeValue('white', 'navy.800')
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.700', 'brand.400')
  const ethColor = useColorModeValue('gray.700', 'white')
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)')
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900')
  const ethBox = useColorModeValue('white', 'navy.800')
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  )
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200')

  // state
  const [openSelectOffice, setOpenSelectOffice] = useState(false);
  const [openOfficeInformation, setOpenOfficeInformation] = useState(false);
  const [currentOfficeName, setCurrentOfficeName] = useState("")
  const [loading, setLoading] = useState({
    status: false,
    id: -1
  })
  const [detailData, setDetailData] = useState([])
  const [openDetail, setOpenDetail] = useState(false)
  const handleOpenDetail = async (id) => {
    setLoading({
      status: true,
      id: id
    })
    try {
      const response = await Controller.GetMemberPayment(id)
      setDetailData(response.json.results)
      setOpenDetail(true)
    } catch (e) {

      message.error("No Data!")
    }

    setLoading({
      status: false,
      id: -1
    })

  }

  // functions

  const handleOpen = () => setOpenDetail(true);
  const handleClose = () => setOpenDetail(false);

  const handleCloseSelectOffice = () => {
    setOpenSelectOffice(false)
  }

  const handleCloseOfficeInfo = () => {
    setOpenOfficeInformation(false)
  }

  const handleCreateOffice = () => {
    // redirect to create office page
  }

  const setOfficeName = () => {
    var selectedOffice = localStorage.getItem("selectedOffice")
    var offices = JSON.parse(localStorage.getItem("office_ids"))

    for (var i in offices) {
      if (offices[i].id == selectedOffice)
        setCurrentOfficeName(offices[i].office_name)
    }

  }
  const [data, setData] = useState([])


  const readData = async () => {
    const response = await Controller.getUrgentNotification();
    console.log(response.json)
    setData(response.json.failed_memberships)
  }

  useEffect(() => {
    readData();
  }, [])

  useEffect(() => {
    //check user stage

    setOfficeName()

  })

  return (
    <Row>

      <SidebarResponsive routes={routes} />
      <Flex
        style={{ marginRight: "10px" }}
        w={{ md: 'auto' }}
        alignItems='center'
        flexDirection='row'
        bg={menuBg}
        flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
        p='10px'
        borderRadius='30px'
        boxShadow={shadow}
      >


        <Menu>
          <MenuButton p='0px'>
            {
              data.length > 0 &&
              <div className='notification-counter'>{data.length >= 10 ? "+9" : data.length}</div>
            }
            <Icon
              colorProfile={"red"}
              mt='6px'
              as={MdAddAlert}
              color={navbarIcon}
              w='18px'
              h='18px'
              me='10px'
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p='0px'
            mt='10px'
            borderRadius='20px'
            bg={menuBg}
            border='none'
            className='custom-scrollbar'
            style={{ maxHeight: "500px", overflow: "auto" }}
          >

            <Flex w='100%' mb='0px'>
              <Text
                ps='20px'
                pt='16px'
                pb='10px'
                w='100%'
                borderBottom='1px solid'
                borderColor={borderColor}
                fontSize='sm'
                fontWeight='700'
                color={textColor}
              >
                {"Notifications"}
              </Text>
            </Flex>
            {
              data.map((data) => (
                <>


                  <Flex w='100%' mb='0px'>

                    <div style={{ width: "100%", padding: "15px" }}>
                      <Row style={{ width: "100%" }} justify={"center"}>
                        Failed Memberships
                      </Row>
                      <br />
                      <Row style={{ width: "100%" }} justify={"space-between"}>
                        <div className='label-notif'>Member</div>
                        <div>{data.first_name + " " + data.last_name}</div>
                      </Row>
                      <Row justify={"space-between"}>
                        <div className='label-notif'>Plan</div>
                        <div>{data.plan_name}</div>
                      </Row>
                      <Row justify={"space-between"}>
                        <div className='label-notif'>Amount</div>
                        <div>{"$" + data.amount}</div>
                      </Row>
                      <Row justify={"center"}>
                        <div style={{ color: "#5B46F8", cursor: "pointer" }}
                          onClick={() => { handleOpenDetail(data.id) }}>
                          {
                            data.id == loading.id && loading.status ? <Spin /> : "View"
                          }

                        </div>
                      </Row>
                      <hr />
                    </div>
                  </Flex>
                </>
              ))
            }

          </MenuList>
        </Menu>



      </Flex>
      <Flex
        w={{ md: 'auto' }}
        alignItems='center'
        flexDirection='row'
        bg={menuBg}
        flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
        p='10px'
        borderRadius='30px'
        boxShadow={shadow}
      >

        {/* <SidebarResponsive routes={routes} /> */}

        <Menu>
          <MenuButton p='0px'>
            <Icon
              mt='6px'
              as={MdPerson}
              color={navbarIcon}
              w='18px'
              h='18px'
              me='10px'
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p='0px'
            mt='10px'
            borderRadius='20px'
            bg={menuBg}
            border='none'
          > <Flex w='100%' mb='0px'>
              <Text
                ps='20px'
                pt='16px'
                pb='10px'
                w='100%'
                borderBottom='1px solid'
                borderColor={borderColor}
                fontSize='sm'
                fontWeight='700'
                color={textColor}
              >
                {currentOfficeName}
              </Text>
            </Flex>

            <Flex flexDirection='column' p='10px'>

              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                borderRadius='8px'
                px='14px'
                onClick={() => { setOpenSelectOffice(true) }}
              >
                <Text fontSize='sm'>Select Office</Text>
              </MenuItem>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                borderRadius='8px'
                px='14px'
                onClick={() => {
                  setOpenOfficeInformation(true)
                }}
              >
                <Text fontSize='sm'>Office Information</Text>
              </MenuItem>
              {/* <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius='8px'
              px='14px'
            >
              <Text fontSize='sm'>Newsletter Settings</Text>
              </MenuItem>*/}
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                borderRadius='8px'
                px='14px'
                onClick={handleCreateOffice}
              >
                <NavLink
                  //key={row.id}
                  to={'/admin/create-office'}
                >
                  <Text fontSize='sm'>Create New Office</Text>
                </NavLink>


              </MenuItem>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                color='red.400'
                borderRadius='8px'
                px='14px'
              >
                <NavLink
                  to='/auth'
                  onClick={async () => {
                    const Config = {
                      headers: {
                        Authorization: localStorage.getItem('user')
                          ? 'Token ' +
                          JSON.parse(localStorage.getItem('user')).key
                          : ''
                      }
                    }

                    const response = await Axios.get(
                      config.apiGateway.URL + `/dj-rest-auth/logout/`,
                      Config
                    )
                    //localStorage.setItem("office_ids", JSON.stringify(response.data))
                    //localStorage.setItem("selectedOffice", JSON.stringify(response.data[0].office_id))
                    localStorage.removeItem('user')
                    localStorage.removeItem('office_ids')
                    localStorage.removeItem('selectedOffice')
                    /* window.location.href = '/auth' */
                    return response
                  }}
                >
                  <Text fontSize='sm'>Log out</Text>
                  {/*  <LogoutOutlined
                  style={
                    windowDimensions
                      ? windowDimensions.width > '700'
                        ? { fontSize: '25px', color: '#0981C8' }
                        : windowDimensions.width > '450'
                        ? { fontSize: '20px', color: '#0981C8' }
                        : { fontSize: '15px', color: '#0981C8' }
                      : { fontSize: '25px', color: '#0981C8' }
                  }
                /> */}
                </NavLink>
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>

        <OfficeInformation
          openOfficeInformation={openOfficeInformation}
          handleCloseOfficeInfo={handleCloseOfficeInfo}
        />

        <SelectOffice
          openSelectOffice={openSelectOffice}
          handleCloseSelectOffice={handleCloseSelectOffice}
        />

      </Flex>
      <Modal isOpen={openDetail} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Failed Payments Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FailedPaymentDetailTable
              columns={columns}
              dataSource={detailData}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Row>

  )
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func
}
