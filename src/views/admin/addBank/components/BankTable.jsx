import {
    Flex, Table,
    Tbody,
    Td, Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import { Checkbox, Input } from "antd";
import { Alert } from "components/Alert/Alert";
import { controllerAccount } from './controllerAccount';
const { TextArea } = Input;



function BankTable(props) {
    const textColor = useColorModeValue("navy.700", "white");
    console.log("propss")
    console.log(props)
    const activeCardAccount = async (id) => {

        const data = {
            "office": localStorage.getItem("selectedOffice"),
            "id": id
        }
        const response = await controllerAccount.active_cart_bank(data)
        console.log(response)
        if (response.status < 250) {
            Alert.openNotification(response.message ? response.message : "Successful", "success")
            props.getAccount()
        } else {
            Alert.openNotification(response.detail[0] ? response.detail[0] : "Error", "error")
        }

        //window.location.reload()

    }

    return (
        <>
            <Flex
                direction='column'
                w='100%'
                overflowX={{ sm: "scroll", lg: "hidden" }}>

                <Table variant='simple' color='gray.500'>
                    <Thead>

                        <Tr key={"index"}>
                            {props.columns.map((headerGroup, index) => (
                                <Th
                                    pe='10px'
                                    key={"index"}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {headerGroup.title}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>

                    </Thead>

                    <Tbody>

                        {props.dataSource.map((row) => (
                            <Tr key={row.id}>

                                <Td>{row.bank_name ? row.bank_name : "-"}</Td>
                                <Td>{row.type_of_source ? row.type_of_source : "-"}</Td>
                                <Td>
                                    {
                                        row.created ? new Date(row.created).toLocaleDateString() + " " + new Date(row.created).toLocaleTimeString() : "-"
                                    }
                                </Td>
                                <Td>{row.funding_id ? row.funding_id : "-"}</Td>
                                <Td>{row.fundingsource_name ? row.fundingsource_name : "-"}</Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            </Flex >


        </>
    );
}

export default BankTable;
