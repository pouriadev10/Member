import React, { useEffect, useState } from "react";
import {
    Box,
    SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import General from 'views/admin/profile/components/General';
import ProfileCard from "./component/ProfileCard";
import SubscriptionTable from "./component/SubscriptionTable";
import { Row, Col } from "antd";
import { Controller } from "Controller/Controller";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const tableColumnsTopCreators = [
    {
        Header: " Plan",
        accessor: "plan_name",
    },
    {
        Header: "Start",
        accessor: "start_date",
    },
    {
        Header: "Expire",
        accessor: "expiration_date",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const ViewSubscription = ({ row, changeCurrentStateToshowSubscription }) => {
    return (
        <p style={{ color: "#0981C8" }} onClick={() => {
            changeCurrentStateToshowSubscription(row);
        }} >
            View
        </p >
    )
}


const MemberDetail = () => {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    // state 

    const [subscriptionRows, setSubscriptionRows] = useState([
        {
            id: "",
            plan_name: "",
            start_date: "",
            expiration_date: "",
            status: "",
        }
    ])

    const [memberProfile, setMemberProfile] = useState({
        "fullname": "",
        "first_name": "",
        "middle_name": null,
        "last_name": "",
        "address": "",
        "city": "",
        "state": "",
        "email": null,
        "phone": null,
        "zip_code": null,
        "profile_picture": ""
    })
    // functions

    const updateData = () => {
        getData();
    }

    const changeCurrentStateToshowSubscription = () => {
        console.log("hi")
    }

    const getData = async () => {
        const url = window.location.href
        const parts = url.split("/");
        const id = parts.pop();


        const response = await Controller.GetMemberDetail(id);
        const responseSubscriptions = await Controller.GetSubscriptions(id);

        var tempSub = []

        for (var i in responseSubscriptions.json.results) {
            var temp = {
                key: i,
                name: responseSubscriptions.json.results[i].plan_name,
                start: responseSubscriptions.json.results[i].start_date,
                exp: responseSubscriptions.json.results[i].expiration_date,
                status: responseSubscriptions.json.results[i].status,
                action: <ViewSubscription row={responseSubscriptions.json.results[i]} changeCurrentStateToshowSubscription={changeCurrentStateToshowSubscription} />,
            }
            tempSub.push(temp)
        }

        setMemberProfile(response.json)
        setSubscriptionRows(responseSubscriptions.json.results)

    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
      
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid>
                <Row type="flex" justify={"space-between"} gutter={[32]}>
                    <Col span={10}>
                        <Row>
                            <ProfileCard data={memberProfile} />
                        </Row>

                    </Col>
                    <Col span={14}>
                        <Row>
                            <Col style={{ width: "100%" }}>
                                <Card >
                                    <div style={{ width: "100%" }}>
                                        <SubscriptionTable
                                            updateData={updateData}
                                            tableData={subscriptionRows}
                                            columnsData={tableColumnsTopCreators}
                                            handleUpdateList={getData}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>


                    </Col>
                </Row>


            </SimpleGrid>
        </Box>
    )

}

export default MemberDetail;