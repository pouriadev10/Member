import React, { useState } from 'react';
import {  Heading } from "@chakra-ui/react";
import App from "../stripe/App";

const Payment = (props) => {


    return (
        <>
            <Heading size="md">Card Information</Heading>
            <App />
        </>

    );
};

export default Payment;