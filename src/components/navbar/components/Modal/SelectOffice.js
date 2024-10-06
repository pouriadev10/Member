import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Select, Spin, DatePicker, Input, Layout, Modal } from 'antd'

const { Option } = Select;

const SelectOffice = (props) => {
    const [officeID, setOfficeID] = useState(JSON.parse(localStorage.getItem("office_ids")))

    const handleSelectDefualtOfficeID = (event) => {
        localStorage.setItem("selectedOffice", event + "")
        var a = JSON.parse(localStorage.getItem("office_ids"))
        for (var i = 0; i < a.length; i++) {
            if (a[i].id == event + "") {
                localStorage.setItem("selectedOfficeName", a[i].office_name)
            }
        }

        window.location.reload();
    }

    useEffect(()=>{
        setOfficeID(JSON.parse(localStorage.getItem("office_ids")))
    },[])

    useEffect(()=>{
        setOfficeID(JSON.parse(localStorage.getItem("office_ids")))
    },[props])


    return (
        <React.Fragment>
            <Modal title="Select Office" visible={props.openSelectOffice} footer={null} onCancel={props.handleCloseSelectOffice}>
                <div className="seperator" style={{ marginTop: "10px" }}>

                    {
                        officeID ?
                            officeID.length > 1 ?
                                <>

                                    <p style={{color:"#777" , marginBottom:"5px"}}>Select an item from the list below</p>

                                    <Select
                                        style={{ width: "100%" }}
                                        showSearch
                                        defaultValue={localStorage.getItem("selectedOffice") ? eval(localStorage.getItem("selectedOffice")) : eval(officeID[0].office_id)}
                                        //placeholder="Select a person"
                                        optionFilterProp="children"
                                        onSelect={(event) => handleSelectDefualtOfficeID(event)}
                                    >
                                        {
                                            officeID.map((key) =>
                                                <Option value={key.office_id}>{key.office_name}</Option>
                                            )
                                        }
                                    </Select>
                                </>
                                :
                                <>  Office ID: {" "} {officeID ? officeID[0].office_id : ""}</>
                            :
                            <p>
                                Office ID: {" "} {officeID ? officeID[0].office_id : ""}
                            </p>
                    }

                </div>
            </Modal>
        </React.Fragment>
    );
}

export default SelectOffice;