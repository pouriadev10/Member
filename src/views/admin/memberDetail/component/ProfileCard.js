import { Avatar, Col, Row, Typography } from "antd";
import placeHolderImage from "assets/img/avatars/avatar-placeholder.png";
import Card from "components/card/Card.js";

const ProfileCard = ({ data }) => {
    return (
        <Card className="paymentRequestContent" style={{ width: "100%" }}>
            <Col>
                <Row type="flex" justify="center">
                    <Row style={{ display: "block" }}>
                        <Col style={{ textAlign: "center" }}>

                            <Avatar size={100} src={data.profile_picture ? placeHolderImage : placeHolderImage} />
                            {/* data.profile_picture send 404 */}

                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            <Typography.Text strong={true}>{data.fullname ? data.fullname : data.first_name + " " + data.last_name} </Typography.Text>
                        </Col>
                    </Row>
                </Row>
                <br />
                <Row type="flex" justify="space-between">
                    <Typography.Text disabled={true}>Email </Typography.Text>
                    <Typography.Text >{data.email} </Typography.Text>
                </Row>
                <Row type="flex" justify="space-between" style={{ marginTop: "5px" }}>
                    <Typography.Text disabled={true}>Phone </Typography.Text>
                    <Typography.Text >{data.phone} </Typography.Text>
                </Row>


                <Row type="flex" justify="space-between" style={{ marginTop: "5px" }}>
                    <Typography.Text disabled={true}>State </Typography.Text>
                    <Typography.Text >{data.state} </Typography.Text>
                </Row>
                <Row type="flex" justify="space-between" style={{ marginTop: "5px" }}>
                    <Typography.Text disabled={true}>City </Typography.Text>
                    <Typography.Text >{data.city} </Typography.Text>
                </Row>
                <Row type="flex" justify="space-between" style={{ marginTop: "5px" }}>
                    <Typography.Text disabled={true}>Address </Typography.Text>
                    <Typography.Text >{data.address} </Typography.Text>
                </Row>
                <Row type="flex" justify="space-between" style={{ marginTop: "5px" }}>
                    <Typography.Text disabled={true}>Zip code </Typography.Text>
                    <Typography.Text >{data.zip_code} </Typography.Text>
                </Row>
            </Col>

        </Card>
    )
}

export default ProfileCard;