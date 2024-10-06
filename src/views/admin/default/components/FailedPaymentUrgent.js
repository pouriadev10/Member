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
import FailedPaymentDetailTable from "./FailedPaymentDetailTable"


function FailedPaymentUrgent(props) {
  const [loading, setLoading] = useState({
    status: false,
    id: -1
  })
  const [detailData, setDetailData] = useState([])
  const [openDetail, setOpenDetail] = useState(false)

  const handleOpen = () => setOpenDetail(true);
  const handleClose = () => setOpenDetail(false);

  const handleOpenDetail = async (id) => {
    setLoading({
      status: true,
      id: id
    })
    try {
      const response = await Controller.GetMemberPayment(id)
      setDetailData(response.json.results)
      setOpenDetail(true)
    } catch (e) {
      message.error("No Data!")
    }

    setLoading({
      status: false,
      id: -1
    })

  }


  const columns = [
    {
      Header: 'First Name',
    },
    {
      Header: 'Last Name',
    },
    {
      Header: 'Plan Name',
    },
    {
      Header: 'Amount',
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
              {props.columns && props.columns.map((column, index) => (
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
                <Td>{row.first_name} </Td>
                <Td>{row.last_name} </Td>
                <Td>{row.plan_name} </Td>
                <Td> {"$ " + row.amount} </Td>
                <Td style={{ color: "#5B46F8" }}>
                  <div style={{ color: "#5B46F8", cursor: "pointer" }}
                    onClick={() => { handleOpenDetail(row.id) }}>
                    {
                      row.id == loading.id && loading.status ? <Spin /> : "View"
                    }

                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      </Flex>
      <Modal isOpen={openDetail} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Failed Payments Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FailedPaymentDetailTable
              columns={columns}
              dataSource={detailData}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FailedPaymentUrgent;
