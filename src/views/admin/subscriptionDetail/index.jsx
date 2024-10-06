import React, { useEffect, useState } from "react";
import {
    Box,
    SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { Row, Col } from "antd";
import Payment from "./component/Payment";
import History from "./component/History";

const subscriptionDetail = () => {

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid>
                <Row type="flex" justify={"space-between"}>
                    <Card >
                        <div style={{ width: "100%" }}>
                            <Payment />
                        </div>
                    </Card>
                </Row>
                <br />
                <br />
                <Row >
                    <Card >
                        <div style={{ width: "100%" }}>
                            <History />
                        </div>
                    </Card>
                </Row>


            </SimpleGrid>
        </Box>
    )

}

export default subscriptionDetail;