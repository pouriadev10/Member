import React, { useEffect, useState } from "react";
// Chakra imports
import {
  Box, Flex, Text,
  useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import {
  Pagination, Row, Col
} from 'antd';
import { Controller } from "Controller/Controller";
import RecentMemberTable from "views/admin/member/components/RecentMemberTable";
export default function RecentlyActiveMembers(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
 
  const columns = [
    {
      Header: 'Member',
    },
    {
      Header: 'Action',
    },
  ];
  const [members, setMembers] = useState([])
  const [pageCount, setPageCount] = useState(1);
  const [current, setCurrent] = useState(1);

  const getMemberData = async () => {
    const response = await Controller.RecentlyActiveMembers(current);
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

    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Recently Active Members
        </Text>

      </Flex>

      <Box>
        <RecentMemberTable
          dataSource={members}
          columns={columns}
        />
        <Row type="flex" justify={"center"} style={{ marginTop: "12px" }}>
          <Pagination showSizeChanger={false} current={current} total={pageCount*2} hideOnSinglePage={true} onChange={onPageChange} />
        </Row>

      </Box>
    </Card>
  );
}
