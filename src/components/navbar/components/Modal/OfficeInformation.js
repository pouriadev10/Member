import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Select, Spin, DatePicker, Input, Layout, Modal } from 'antd'
import { Controller } from "Controller/Controller";
import config from "Controller/config";
import { UserAddOutlined, SettingOutlined, LogoutOutlined, CloudUploadOutlined } from "@ant-design/icons"

const { Option } = Select;

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const OfficeInformation = (props) => {
    const [officeID, setOfficeID] = useState(JSON.parse(localStorage.getItem("office_ids")))
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [officeData, setOfficeData] = useState({});
    const [modalOfficeId, setModalOfficeId] = useState()
    const [officeLogo, setOfficeLogo] = useState()
    const [uploadingImage, setUploadingImage] = useState(false)

    const changeProfileImage = async (event) => {
        setUploadingImage(true)
        let formData = new FormData();
        formData.append('office', modalOfficeId);
        if (event)
            formData.append('logo', event.target.files[0]);
        const response = await Controller.changeOfficeLog(formData,modalOfficeId)

        const responseGeyOfficeprofile = await Controller.officeprofile(modalOfficeId);
        setOfficeData(responseGeyOfficeprofile)
        setOfficeLogo(responseGeyOfficeprofile.logo)
        setUploadingImage(false)
    }

    const handleSelectOfficeID = async (event) => {
        setOfficeData({})
        const response = await Controller.officeprofile(event);
        setOfficeData(response)
        console.log(response)
        setModalOfficeId(event)
        setOfficeLogo(response.logo)
    }

    useEffect(() => {
        console.log(props)
    }, [props])

    useEffect(() => {
        handleSelectOfficeID(JSON.parse(localStorage.getItem("office_ids"))[0].office_id)
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <React.Fragment>
            <Modal footer={null} title="Office Information" open={props.openOfficeInformation} onOk={props.handleCloseOfficeInfo} onCancel={props.handleCloseOfficeInfo}>
                Office ID : {" "}
                <Select
                    style={{ width: "340px", marginBottom: "15px" }}
                    showSearch
                    defaultValue={JSON.parse(localStorage.getItem("office_ids"))[0].office_id}
                    //placeholder="Select a person"
                    optionFilterProp="children"
                    //onSearch={(event) => handleSearchOfficeID(event)}
                    onSelect={(event) => handleSelectOfficeID(event)}
                >
                    {
                        officeID.map((key) =>
                            <Option value={key.office_id}>{key.office_name}</Option>
                        )
                    }
                </Select>
                <hr />
                <div>
                    <div style={{ margin: "15px 0px" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                            {

                                !uploadingImage ?
                                    officeData && officeData.logo ?
                                        <div style={{ textAlign: "center" }}>
                                            <label style={{ marginBottom: "15px" }}>Click on the logo image and upload the new logo image</label><br />

                                            <label for="fileUpload" class="custom-file-upload" style={{ display: "flex", justifyContent: "center" }}>
                                                <img alt="logo" className="large-logo" style={{ cursor: "pointer", width: "225px", height: "90px", marginTop: "10px" }}
                                                    src={officeLogo ? config.apiGateway.URL + officeLogo : ""} />
                                            </label>
                                            {/*<input id="file-upload" type="file" />*/}

                                            <input

                                                style={{ display: "none" }}
                                                type="file"
                                                id="fileUpload"
                                                title="profile_photo"
                                                required={true} //onChange={handleInput}
                                                onChange={
                                                    e => changeProfileImage(e)
                                                }
                                                accept="image/png, image/jpeg"
                                            />
                                            <br /><span style={{ fontSize: "12px" }}>(recommendation size = 150*50px)</span><br />
                                        </div>
                                        :
                                        <div style={{ textAlign: "center" }}>

                                            <label for="fileUpload" className='formLabel '
                                                style={{
                                                    color: "#111",
                                                    backgroundColor: "#E4DCF5",
                                                    display: "flex",
                                                    minHeight: "80px",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: "1px dashed #0981C8",
                                                    cursor: "pointer",
                                                    maxWidth: "360px",
                                                    minWidth: "unset",
                                                    padding: "15px"
                                                }
                                                }
                                            >
                                                <div style={{ marginRight: "8px" }}>
                                                    <CloudUploadOutlined style={{ fontSize: "25px" }} />
                                                </div>
                                                <div>Click here to uploading new Logo</div>
                                                <div className="upload-peyment-pdf" style={{ marginBottom: '50px' }}>

                                                </div>
                                            </label>

                                            {/*<input id="file-upload" type="file" />*/}

                                            <input

                                                style={{ display: "none" }}
                                                type="file"
                                                id="fileUpload"
                                                title="profile_photo"
                                                required={true} //onChange={handleInput}
                                                onChange={
                                                    e => changeProfileImage(e)
                                                }
                                                accept="image/png, image/jpeg"
                                            />
                                            <br /><span style={{ fontSize: "12px" }}>(recommendation size = 150*50px)</span><br />
                                        </div>

                                    :
                                    <div style={{ height: "60px", marginTop: "35px" }}>
                                        <Spin />
                                    </div>

                            }

                        </div>
                    </div>
                    <hr />
                    <br />

                    <div style={{ display: "flex" }}>

                        <p style={{ width: "50%" }}>Office ID : <b>{officeData && officeData.office_id ? officeData.office_id : "-"}</b></p>
                        <p>Web : <b>{officeData && officeData.domain ? officeData.domain : "-"}</b></p>
                    </div>
                    <br />
                    {/*  <div style={{display:"flex"}}>
            
            <p style={{width:"50%"}}>office_id : {officeData.office_id}</p>
            <p>user : {officeData.user}</p>
          </div>*/}
                    <div style={{ display: "flex" }}>

                        <p style={{ width: "50%" }}>PMS : <b>{officeData && officeData.practice_management_system ? officeData.practice_management_system : "-"}</b></p>
                        <p>Address : <b>{officeData && officeData.address ? officeData.address : "-"}</b></p>
                    </div>
                </div>


            </Modal>
        </React.Fragment>
    );
}

export default OfficeInformation;