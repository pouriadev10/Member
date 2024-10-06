import React, { useState, useEffect } from "react";
import Card from "components/card/Card";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Stepper from "../component/Stepper";
import VerificationStep from "../component/VerificationStep";
import { Controller } from "Controller/Controller";
import { Alert } from "components/Alert/Alert";
import Payment from "../component/Payment";
import Done from "../component/Done";
import SuccessPage from "../component/SuccessPage";
const PaymentFlow = () => {

  const [current, setCurrent] = useState(""); // 1.verification 2.pay 3.done 4.success

  const handleDoneVerfication = async (userInfo) => {
    // write here
    console.log(userInfo)
    const response = await Controller.EditMemberInformation(window.location.href.split("/")[window.location.href.split("/").lastIndexOf("payment") + 1], userInfo);

    if (response.status < 250) {
      setCurrent("pay")
      Alert.openNotification(response.message ? response.message : "Successful", "success")
    } else {
      Alert.openNotification(response.detail && response.detail[0] ? response.detail[0] : "Error", "error")
    }
  }

  const handleDonePayment = async (paymentInfo) => {
    setCurrent("success")
    Alert.openNotification("Paid successfully", "success")
  }

  const handleSubmitDone = async () => {
    const response = await Controller.FinalPaymentInformation(window.location.href.split("/")[window.location.href.split("/").lastIndexOf("payment") + 1])
    if (response.status < 250) {
      setCurrent("success")
      Alert.openNotification(response.message ? response.message : "Successful", "success")
    } else {
      Alert.openNotification(response.detail && response.detail[0] ? response.detail[0] : "Error", "error")
    }
  }

  const handleCheckStatus = async () => {
    const response = await Controller.CheckPaymentStatus(window.location.href.split("/")[window.location.href.split("/").lastIndexOf("payment") + 1]);
    console.log("response.json")
    console.log(response.json)
    console.log(response.json.is_active)
    if (response.json && response.json.status) {
      setCurrent("success")
      Alert.openNotification(response.message ? response.message : "Already paid", "success")
    } else {
      setCurrent("verification")
    }
  }

  useEffect(() => {
    // check payment status
    handleCheckStatus();
  }, [])

  return (
    <React.Fragment>
      <div className="payment-page">

        <Stepper current={current} />
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} style={{ paddingTop: "40px" }}>
          <SimpleGrid>
            <Card px='0px' mb='20px' style={{ padding: "35px 30px", marginTop: "5px" }}>
              {
                current == "verification" ?
                  <VerificationStep
                    handleDoneVerfication={handleDoneVerfication}
                    current={current}
                  />
                  :
                  current == "pay" ?
                    <Payment
                      handleDonePayment={handleDonePayment}
                    />
                    :
                    current == "done" ?
                      <Done
                        handleSubmitDone={handleSubmitDone}
                      />
                      :
                      current == "success" ?
                        <SuccessPage />
                        :
                        <></>
              }
            </Card>
          </SimpleGrid>
        </Box>
      </div>
    </React.Fragment>

  );
}

export default PaymentFlow;