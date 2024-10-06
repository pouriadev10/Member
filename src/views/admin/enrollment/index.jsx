import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import PlanTable from "./components/PlanTable";
import CreatePlan from "./components/CreatePlan";
import { Controller } from "Controller/Controller";
import { Divider } from "antd"
import { Alert } from "components/Alert/Alert";
const ActionPlan = ({ id }) => {
  return (
    <a href="/">
      <a href={"/#/plan-detail/" + id}>View</a>
      <Divider type="vertical" />
      <span style={{ color: "orange" , cursor: "pointer" }}>Update</span>
      <Divider type="vertical" />
      <span style={{ color: "red", cursor: "pointer" }}>Delete</span>
    </a>
  )
}

const Enrollment = () => {
  const [currentState, setCurrentState] = useState("createPlan") // 1.showTable 2.createPlan
  const [tableData, setTableData] = useState([])
  const [datCount, setDataCount] = useState(0)

  const handleShowCreatePlan = async () => {
    const response = await Controller.checkConnectedAccount()
    if (!response.detail){
      Alert.openNotification("Please create your connected account!", "error")
    }else{
      setCurrentState("createPlan")
    }
  }

  const tableColumnsTopCreators = [
    {
      Header: " Membership Plan",
      accessor: "name",
    },
    {
      Header: "Members",
      accessor: "member",
    },
    {
      Header: "Cost",
      accessor: "cost",
    },
    {
      Header: "Services",
      accessor: "services",
    },
    {
      Header: "Status",
      accessor: "active",
    },
    {
      Header: "Action",
      accessor: "action",
    },


  ];


  const getData = async () => {
    const response = await Controller.GetAllMembership();

    var memberRows = []

    var result = response.json.results

    if (response.status < 250 && response.json.count > 0) {
      for (var i in response.json.results) {
        var services = ""

        for (var j in response.json.results[i].services) {
          if (j == 0)
            services = services + response.json.results[i].services[j].service
          else
            services = services + ", " + response.json.results[i].services[j].service

        }
        var temp = {
          key: response.json.results[i].id,
          name: response.json.results[i].name,
          member: response.json.results[i].member_count,
          active: response.json.results[i].active ? <p style={{ color: "green" }}>Active</p> : <p style={{ color: "red" }}>Inactive</p>,
          cost: response.json.results[i].cost + "$",
          services: services,
          action: <ActionPlan id={response.json.results[i].id} />,
        }
        memberRows.push(temp)
        //console.table(response.json.results[i])
      }
      setTableData(memberRows)
      setDataCount(response.json.count)
      /*this.setState({
        memberships: memberRows,
        membershipsCount: response.json.count,
      })*/
    }


  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      {
        currentState == "showTable" ?
          <SimpleGrid>
            <Card px='0px' mb='20px'>
              <PlanTable
                tableData={tableData}
                columnsData={tableColumnsTopCreators}
                handleShowCreatePlan={handleShowCreatePlan}
              />

            </Card>


          </SimpleGrid>
          :
          <SimpleGrid>
            <Card px='0px' mb='20px'>
              <CreatePlan />
            </Card>


          </SimpleGrid>
      }

    </Box>
  )
}

export default Enrollment;