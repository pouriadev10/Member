import {
  Avatar, Flex, Table,
  Tbody,
  Td, Th,
  Thead,
  Tr, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react";
import { Controller } from "Controller/Controller";
import { Spin, message } from "antd";
import { useState } from "react";



function FailedPaymentDetailTable(props) {



  const columns = [
    {
      Header: 'Amount',
    },
    {
      Header: 'Created Date',
    },
    {
      Header: 'Status',
    },
    {
      Header: 'Invoice',
    },
  ]

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>

        <Table variant='simple' color='gray.500'>
          <Thead>

            <Tr>
              {columns && columns.map((column, index) => (
                <Th
                  pe='10px'
                  key={index}
                  borderColor='transparent'>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.Header}
                  </Flex>
                </Th>
              ))}
            </Tr>

          </Thead>

          <Tbody>

            {props.dataSource && props.dataSource.map((row) => (
              <Tr key={row.id}>
                <Td>{"$ " + row.amount} </Td>
                <Td>
                  {
                    row.created ? new Date(row.created).toLocaleDateString() + " " + new Date(row.created).toLocaleTimeString() : "-"
                  }
                </Td>
                <Td> {row.status} </Td>
                <Td style={{ color: "#5B46F8" }}>
                  Invoice
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      </Flex>

    </>
  );
}

export default FailedPaymentDetailTable;
