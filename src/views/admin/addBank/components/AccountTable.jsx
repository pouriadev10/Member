import {
    Flex, Table,
    Tbody,
    Td, Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import { Input, Checkbox } from "antd";
import { CheckCircleOutlined, MailOutlined } from "@ant-design/icons";
import { controllerAccount } from './controllerAccount';
import { MdVisibility, MdAdd } from 'react-icons/md';
import { Alert } from "components/Alert/Alert";
const { TextArea } = Input;



function AccountTable(props) {
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
                                <Td>
                                    <button
                                        style={{
                                            border: "0px",
                                            background: "transparent",
                                            color: "#0981c8"
                                        }}


                                    >{row.default ? <Checkbox checked={true} /> : <Checkbox checked={false} onClick={() => {
                                        activeCardAccount(row.id)
                                    }

                                    } />}</button >

                                </Td>
                                <Td>{row.name}</Td>
                                <Td>{row.type}</Td>
                                <Td>{row.description}</Td>
                                <Td>{row.capabilities}</Td>
                                <Td
                                style={{maxWidth:"250px"}}
                                >{row.email}</Td>

                                <Td>
                                    {
                                        row.bank ?
                                            <button
                                                style={{
                                                    border: "0px",
                                                    background: "transparent",
                                                    color: "green",
                                                    textAlign: "end",
                                                    cursor: "pointer"
                                                }} onClick={() => props.viewBankAccount(row.bank)} >
                                                COMPLETE
                                            </button>
                                            :


                                            <button
                                                style={{
                                                    border: "0px",
                                                    background: "transparent",
                                                    color: "red",
                                                    textAlign: "end",
                                                    cursor: "pointer"
                                                }}

                                                onClick={async (e) => {
                                                    props.addBankAccount(row.id)
                                                }}
                                            >
                                               INCOMPLETE
                                            </button >
                                    }

                                </Td>
                                <Td>{row.country}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            </Flex >


        </>
    );
}

export default AccountTable;
