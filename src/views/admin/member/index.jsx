import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import MemberTable from "views/admin/member/components/MemberTable";
import {
  Pagination, Row, Col
} from 'antd';
import { Controller } from "Controller/Controller";

const tableColumnsTopCreators = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "action",
  },

];


const Member = () => {

  const [members, setMembers] = useState([])
  const [pageCount, setPageCount] = useState(1);
  const [current, setCurrent] = useState(1);

  const getMemberData = async () => {
    const response = await Controller.GetCustomers(current);
    if (response.status < 250) {
      var temp = [];
      setPageCount(response.json.count)
      for (var i in response.json.results) {
        temp.push(response.json.results[i])
      }
      console.log(temp)
      setMembers(temp)
    }
  }

  const onPageChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    getMemberData()
  }, [current])

  useEffect(() => {
    getMemberData();
  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid>
        <Card px='0px' mb='20px'>
          <MemberTable
            tableData={members}
            columnsData={tableColumnsTopCreators}
            getMemberData={getMemberData}
          />
          <Row type="flex" justify={"center"} style={{marginTop:"12px"}}>
            <Pagination showSizeChanger={false} current={current} total={pageCount} hideOnSinglePage={true} onChange={onPageChange} />
          </Row>


        </Card>

      </SimpleGrid>
    </Box>
  )
}

export default Member;