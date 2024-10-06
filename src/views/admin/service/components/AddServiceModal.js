import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  Button,
  InputNumber,
  DatePicker,
  Input,
  Form
} from "antd";
import dayjs from 'dayjs';
import { Controller } from "Controller/Controller";
import { Alert } from "components/Alert/Alert";
import { Rules } from "errorHandling/Rules";
const { Option } = Select;
const { TextArea } = Input;
const AddServiceModal = (props) => {
  const [form] = Form.useForm();
  const [createsService, setCreatesService] = useState({
    name: "",
    description: "",
    cost: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setCreatesService(
      {
        ...createsService,
        [name]: value
      }
    )
  }

  const handleCloseAddService = () => {
    props.onCancel(true)
    form.resetFields();
    setCreatesService(
      {
        name: "",
        description: "",
        cost: ""
      }
    )
  }

  const createService = async () => {
    const response = await Controller.CreateServiceList(createsService)
    if (response.status < 250) {
      props.onCancel(true)
      Alert.openNotification(response.message ? response.message : "Successful", "success")

      setCreatesService(
        {
          name: "",
          description: "",
          cost: ""
        }
      )
    } else {


      Alert.openNotification(response.detail ? response.detail : "Error", "error")

    }
  }

  return (
    <Modal
      title="Create new service"
      open={props.open}
      footer={null}
      onCancel={handleCloseAddService}
    >
      <Form form={form} onFinish={createService}>
        <label className='formLabel'>Service Name</label>
        <Form.Item
          name="name"
          value={createsService.name}
          rules={[{ required: true, message: 'This field is required' }, { validator: Rules.validateName }]}
        >
          <Input
            className={"inputs"}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Service 1"
            value={createsService.name}
          />
        </Form.Item>
        <label className='formLabel'>Cost</label>
        <InputNumber
          value={createsService.cost}
          name="cost"
          defaultValue={0}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          style={{ width: "100%" }}
          onChange={(e, value) => {
            console.log(e)
            setCreatesService(
              {
                ...createsService,
                cost: e
              }
            )
          }}
        />

        <label className='formLabel'>Description</label>

        <TextArea
          name="description"
          value={createsService.description}
          onChange={handleChange}
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="Description..."
        />
        <br />
        <div className="btnBox" style={{ display: "flex", justifyContent: "end", marginTop: "15px" }}>

          <Button
            onClick={handleCloseAddService}
            type="secondary" >
            Close
          </Button>
          <Button
              htmlType="submit"
            //onClick={createService}
            type="primary" style={{ marginLeft: "5px" }}>
            Create
          </Button>

        </div>
      </Form>
    </Modal>
  )
}

export default AddServiceModal;