import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import PlanTable from "./components/PlanTable";
import CreatePlan from "./components/CreatePlan";
import EditPlan from "./components/EditPlan";
import { Controller } from "Controller/Controller";
import { Divider, Popconfirm, Pagination, Row, Col } from "antd"
import { Alert } from "components/Alert/Alert";
const ActionPlan = ({ row, handleUpdate, handleEdit }) => {

  const confirm = async () => {
    if (row && row.id) {
      const response = await Controller.DeleteMembershipPlan(row.id)
      if (response.status < 250) {
        handleUpdate()
        Alert.openNotification(response.message ? response.message : "Successful", "success")
      } else {
        Alert.openNotification(response.json.detail ? response.json.detail : "Error", "error")
      }
    }

  }

  const cancel = (e) => {
    console.log(e);
  }

  return (
    <div>
      <span style={{ color: "orange", cursor: "pointer" }}
        onClick={() => { handleEdit(row) }}
      >Update</span>
      <Divider type="vertical" />
      <Popconfirm
        title="Are you sure to delete this plan? "
        description="This Plan may have been used before!"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <span style={{ color: "red", cursor: "pointer" }}>Delete</span>
      </Popconfirm>
    </div>
  )
}

const Plan = () => {
  const [pageCount, setPageCount] = useState(1);
  const [current, setCurrent] = useState(1);
  const [currentState, setCurrentState] = useState("showTable") // 1.showTable 2.createPlan 3.editTable
  const [tableData, setTableData] = useState([])
  const [datCount, setDataCount] = useState(0)
  const [editRow, setEditRow] = useState({
    key: "",
    name: "",
    member: "",
    active: "",
    cost: "",
    services: [],

  })


  const handleBack = () => {
    setCurrentState("showTable")
  }

  const handleCreate = () => {
    getData()
    setCurrentState("showTable")
  }

  const handleShowCreatePlan = async () => {
    const response = await Controller.checkConnectedAccount()
    if (!response.detail) {
      Alert.openNotification("Please create your connected account!", "error")
    } else {
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

  const handleUpdate = () => {
    getData()
  }

  const handleEdit = (row) => {
    setEditRow(row)
    setCurrentState("editTable")
  }

  const getData = async () => {
    const response = await Controller.GetAllMembership(current);

    var memberRows = []

    var result = response.json.results

    if (response.status < 250 && response.json.count > 0) {
      setPageCount(response.json.count)
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
          cost: "$ " + response.json.results[i].cost,
          services: services,
          action: <ActionPlan row={response.json.results[i]} handleUpdate={handleUpdate} handleEdit={handleEdit} />,
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

  const onPageChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    console.log("zzz")
    getData();

  }, [current])


  const handleDoneEdit = () => {
    setCurrentState("showTable")
  }

  const handleBackEdit = () => {
    setCurrentState("showTable")
  }

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
              <Row type="flex" justify={"center"} style={{ marginTop: "12px" }}>
                <Pagination showSizeChanger={false} current={current} total={pageCount} hideOnSinglePage={true} onChange={onPageChange} />
              </Row>
            </Card>


          </SimpleGrid>
          :
          currentState == "editTable" ?
            <SimpleGrid>
              <Card px='0px' mb='20px'>
                <EditPlan
                  handleBackEdit={handleBackEdit}
                  handleDoneEdit={handleDoneEdit}
                  editRow={editRow}
                />
              </Card>
            </SimpleGrid>
            :
            <SimpleGrid>
              <Card px='0px' mb='20px'>
                <CreatePlan
                  handleBack={handleBack}
                  handleCreate={handleCreate}
                />
              </Card>


            </SimpleGrid>
      }

    </Box>
  )
}

export default Plan;