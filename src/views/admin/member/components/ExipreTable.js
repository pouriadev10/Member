import {
  Avatar, Flex, Table,
  Tbody,
  Td, Th,
  Thead,
  Tr
} from "@chakra-ui/react";


function ExipreTable(props) {
  console.log(props)



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
              <Tr key={row.customer_id}>
                <Td style={{
                  display: "flex",
                  alignItems: "center"
                }}><Avatar size="sm" style={{ marginRight: "5px" }} src={row.profile_picture} />{row.customer_name}</Td>
                <Td>
                <a  style={{ color: "#5B46F8" }}  href={"#/admin/member-detail/" + row.customer_id}>View</a>
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      </Flex>

    </>
  );
}

export default ExipreTable;
