import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import VisitTable from 'views/admin/visit/components/VisitTable';
import { Controller } from "Controller/Controller";
import {
  Pagination, Row, Col
} from 'antd';
const tableColumnsTopCreators = [
  {
    Header: "Member",
    accessor: "member",
  },
  {
    Header: "Service",
    accessor: "service_name",
  },
  {
    Header: "Count",
    accessor: "count",
  },
  {
    Header: "Date",
    accessor: "date",
  },

];

const Visit = () => {
  const [visits, setVisits] = useState([])
  const [pageCount, setPageCount] = useState(1);
  const [current, setCurrent] = useState(1);
  const updateData = () => {
    getData();
  }
  const getData = async () => {
    const response = await Controller.getAllVisit(current);
    if (response.status < 250) {
      var temp = [];
      setPageCount(response.json.count)
      for (var i in response.json.results) {
        temp.push(response.json.results[i])
      }
      console.log(temp)
      setVisits(temp)
    }

  }

  const onPageChange = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    getData()
  }, [current])

  useEffect(() => {
    getData()
  }, [])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid>
        <Card px='0px' mb='20px'>
          <VisitTable
            updateData={updateData}
            tableData={visits}
            columnsData={tableColumnsTopCreators}
          />
          <Row type="flex" justify={"center"} style={{ marginTop: "12px" }}>
            <Pagination showSizeChanger={false} current={current} total={pageCount} hideOnSinglePage={true} onChange={onPageChange} />
          </Row>

        </Card>

      </SimpleGrid>
    </Box>
  )
}

export default Visit;