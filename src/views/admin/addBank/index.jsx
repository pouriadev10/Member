import {
  Box,
  Flex,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { Row, Spin } from 'antd';
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import { PaymentController } from '../../../Controller/PaymentController';
import AddConnectedAccountModal from "./components/AddConnectedAccountModal";

import BankTable from "./components/BankTable";


const BankColumn = [
  {
    title: 'Name',
    dataIndex: 'bank_name',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Type',
    dataIndex: 'type_of_source',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Created Date',
    dataIndex: 'created',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Funding Id',
    dataIndex: 'funding_id',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Fundingsource',
    dataIndex: 'fundingsource_name',
    render: text => <span>{text}</span>,
  },
]

const AddBank = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [banks, setBanks] = useState([{
    bank_name: "",
    created: "",
    deleted: false,
    funding_id: "",
    fundingsource_name: "",
    id: 1,
    is_default: false,
    type_of_source: "",
  }])
  const [isAccount, setIsAccount] = useState("") // 1. NoAccount 2. HaveAccount, 2. Complete

  const getAccounts = async () => {
    setLoading(true)
    console.log("z")
    const response = await PaymentController.getBanks()
    setBanks(response.bank_list)
    setLoading(false)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleSuccess = () => {
    setOpen(false)
    checkAccounts()
  }


  const checkAccounts = async () => {
    setLoading(true)
    const response = await PaymentController.checkConnectedAccount()
    if (response.detail) {
      // Check is enable or not
      const response = await PaymentController.checkIsEnable()
      if (response.enable) {
        console.log("gz0")
        getAccounts();
        setIsAccount("Complete")
      } else {
        console.log("gz0")
        setIsAccount("HaveAccount")
      }
    } else {
      console.log("gz0")
      setIsAccount("NoAccount")
    }
    setLoading(false)
  }

  const handleEnableAccount = async () => {
    const response = await PaymentController.getEnableAccount()
    window.open(response.url, '_blank');
  }

  useEffect(() => {
    checkAccounts();
  }, [])

  return (
    <React.Fragment>
      <div>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid>
            <Card px='0px' mb='20px' style={{ minHeight: "400px" }}>
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
                {
                  isAccount == "NoAccount" && (
                    <p
                      onClick={() => { setOpen(true) }}
                      style={{ cursor: "pointer", color: "#0981c8", fontSize: "16px", fontWeight: "bold" }}>
                      + Connect Bank Account
                    </p>
                  )
                }

              </Flex>

              <div className="payreq-container">
                {
                  loading ?
                    <div style={{ justifyContent: "center", display: "flex", height: "250px" }}>
                      <Spin size="large" style={{ alignSelf: "center" }} />

                    </div>
                    :
                    isAccount == "NoAccount" ?
                      <Row type="flex" justify={"center"}>
                        <div style={{ marginTop: "10%", fontSize: "18px", textAlign: "center" }}>Please connect your bank account to start collecting payments. <br /><span className="blodText" onClick={() => { setOpen(true) }}> Connect Now! </span> </div>
                      </Row>
                      :
                      isAccount == "HaveAccount" ?
                        <Row type="flex" justify={"center"}>
                          <div style={{ marginTop: "10%", lineHeight:"50px", fontSize: "18px", textAlign: "center" }}>
                            <span style={{color:"green"}}>
                              You're almost done!</span><br />Please provide your banking information to complete the setup.
                            <br />   <span className="blodText" onClick={handleEnableAccount}> Provide Banking Information </span> </div>
                        </Row>
                        :
                        <div>
                          <BankTable style={{ width: "auto" }} columns={BankColumn} dataSource={banks}
                            getAccount={getAccounts}


                          />
                        </div>
                }
              </div>
            </Card>
          </SimpleGrid>
        </Box>
      </div>
      <AddConnectedAccountModal
        open={open}
        closeModal={closeModal}
        handleSuccess={handleSuccess}
      />
    </React.Fragment>
  )
}

export default AddBank;