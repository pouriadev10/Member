import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  Button,
  InputNumber,
  DatePicker,
  Form,
  Input,
  message
} from "antd";
import dayjs from 'dayjs';
import { Controller } from "Controller/Controller";
import { Alert } from "components/Alert/Alert";
import { Rules } from "errorHandling/Rules";

const { Option } = Select;

const VisitModal = (props) => {
  const [form] = Form.useForm();
  const [membersList, setMembersList] = useState([]);
  const [VisitData, setVisitData] = useState({
    date: dayjs(new Date),
    count: 0,
    membership: "",
    service: "",
  });
  const [serviceOfMembership, setServiceOfMembership] = useState([]);
  const [selectedMemberInModal, setSelectedMemberInModal] = useState("");
  const [selectedMemberShipInModal, setSelectedMemberShipInModal] = useState("");
  const [membershipsOfMember, setMembershipsOfMember] = useState([]);
  const [loading, setLoading] = useState(false)

  const getMember = async () => {
    const response = await Controller.GetAllMember();
    console.log(response)
    setMembersList(response.json)
  }

  useEffect(() => {
    getMember()
  }, [props.open])

  const createServiceUsage = async () => {
    setLoading(true)
    const response = await Controller.serviceUsage(VisitData)
    if (response.status < 250) {
      //getData()

      setSelectedMemberInModal("")
      setSelectedMemberShipInModal("")
      setVisitData({
        date: dayjs(new Date),
        count: 0,
        membership: "",
        service: "",
      })
      props.onCancel(true)

      Alert.openNotification(response.message ? response.message : "Successful", "success")
    } else {
      // setSelectedMemberInModal("")
      // setSelectedMemberShipInModal("")
      // setVisitData({
      //   date: dayjs(new Date),
      //   count: 0,
      //   membership: "",
      //   service: "",
      // })
      console.log(response)
      Alert.openNotification(response?.json?.detail ? response.json.detail : "Error", "error")
      //this.openNotification("bottom", "Error", "error")
    }
    setLoading(false)
  }

  const handleSelectMembership = async (value) => {
    const response = await Controller.getServicesOfMembership(value)
    setSelectedMemberShipInModal(value)
    setServiceOfMembership(response.json)
  }

  const handleSelectMemberInModal = async (value) => {
    console.log(value)
    const response = await Controller.GetAllSubscriptions(value)
    console.log(response.json)

    setSelectedMemberInModal(value)
    setSelectedMemberShipInModal("")
    setMembershipsOfMember(response.json)

  }

  return (
    <Modal
      title="Add Visit"
      visible={props.open}
      footer={null}

      onCancel={() => {
        props.onCancel(true)
        setSelectedMemberInModal("")
        setSelectedMemberShipInModal("")
        setVisitData({
          date: dayjs(new Date),
          count: 0,
          membership: "",
          service: "",
        })
      }}
    >
      <Form form={form} onFinish={createServiceUsage}>
        <label className='formLabel'>Member</label>
        <Select
          showSearch
          value={selectedMemberInModal ? selectedMemberInModal : null}
          style={{ width: "100%" }}
          placeholder="Search Member"
          optionFilterProp="children"
          onChange={(e, value) => {
            handleSelectMemberInModal(e)
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            membersList ?
              membersList.map((member0) => (
                <Option value={member0.id}>{member0.first_name + " " + member0.last_name}</Option>
              ))
              :
              <></>
          }
        </Select>

        {
          selectedMemberInModal ?
            <>
              <label className='formLabel'>MemberShip</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search MemberShip"
                optionFilterProp="children"

                onChange={(e, value) => {
                  handleSelectMembership(e)
                  console.log(e)
                  console.log(value)
                  setVisitData({
                    ...VisitData,
                    membership: e
                  })
                }}
                //onFocus={onFocus}
                //onBlur={onBlur}
                //onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  membershipsOfMember ?
                    membershipsOfMember.map((member0) => (
                      <Option value={member0.id}>{member0.plan_name}</Option>
                    ))
                    :
                    <></>
                }
              </Select>
              <br />
              {
                selectedMemberShipInModal ?
                  <>
                    <label className='formLabel'>Service</label>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="search Service"
                      optionFilterProp="children"
                      onChange={(e, value) => {
                        setVisitData({
                          ...VisitData,
                          service: e
                        })

                      }}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {
                        serviceOfMembership ?
                          serviceOfMembership.map((service0) => (
                            <Option value={service0.service_info[0].service_id}>{service0.service_info[0].service_name}</Option>
                          ))
                          :
                          <></>
                      }
                    </Select>
                    <br />
                    {
                      VisitData.service ?
                        <>
                          <label className='formLabel'>Count</label>

                          <Input name="count" style={{ width: "100%" }} placeholder='count'
                            value={VisitData.count}
                            onChange={(e) => {
                              if (isNaN(e.target.value)) {
                                message.error("Input Number")
                              } else {
                                setVisitData({
                                  ...VisitData,
                                  count: e.target.value
                                })
                              }
                            }}
                          />


                          <label className='formLabel'>Time</label>
                          <DatePicker
                            style={{ width: "100%" }}
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={(e, value) => {
                              setVisitData({
                                ...VisitData,
                                date: e
                              })
                            }}
                            value={VisitData.date ?
                              dayjs(VisitData.date) : dayjs(new Date)}
                            showTime={{
                              defaultValue: dayjs(new Date),
                            }}
                          />


                          <div className="btnBox" style={{ marginBottom: "0px", display: "flex", justifyContent: "end" }}>

                            <Button style={{ marginTop: "5px" }}
                              onClick={() => {
                                setSelectedMemberInModal("")
                                setSelectedMemberShipInModal("")
                                setVisitData({
                                  date: dayjs(new Date),
                                  count: 0,
                                  membership: "",
                                  service: "",
                                })

                                props.onCancel(true)
                              }}
                              type="secondary" >
                              Close
                            </Button>
                            <Button
                              htmlType="submit"
                              //onClick={createServiceUsage}
                              loading={loading}
                              type="primary" style={{ marginLeft: "5px" }}>
                              Create
                            </Button>

                          </div>
                        </>
                        :
                        <>
                          <div className="btnBox" style={{ marginBottom: "0px", display: "flex", justifyContent: "end" }}>
                            <Button style={{ marginTop: "5px" }}
                              onClick={() => {
                                setSelectedMemberInModal("")
                                setSelectedMemberShipInModal("")
                                setVisitData({
                                  date: dayjs(new Date),
                                  count: 0,
                                  membership: "",
                                  service: "",
                                })

                                props.onCancel(true)
                              }}
                              type="secondary" >
                              Close
                            </Button>
                          </div>
                        </>
                    }

                  </>
                  :
                  <>
                    <div className="btnBox" style={{ marginBottom: "0px", display: "flex", justifyContent: "end" }}>
                      <Button style={{ marginTop: "5px" }}
                        onClick={() => {
                          setSelectedMemberInModal("")
                          setSelectedMemberShipInModal("")
                          setVisitData({
                            date: dayjs(new Date),
                            count: 0,
                            membership: "",
                            service: "",
                          })

                          props.onCancel(true)
                        }}
                        type="secondary" >
                        Close
                      </Button>
                    </div>
                  </>
              }
            </>
            :
            <>
              <div className="btnBox" style={{ marginBottom: "0px", display: "flex", justifyContent: "end" }}>

                <Button style={{ marginTop: "5px" }}
                  onClick={() => {
                    setSelectedMemberInModal("")
                    setSelectedMemberShipInModal("")
                    setVisitData({
                      date: dayjs(new Date),
                      count: 0,
                      membership: "",
                      service: "",
                    })

                    props.onCancel(true)
                  }}
                  type="secondary" >
                  Close
                </Button>


              </div>
            </>
        }
      </Form>
    </Modal>
  )
}

export default VisitModal;