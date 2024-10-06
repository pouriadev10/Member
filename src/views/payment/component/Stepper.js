import { CheckCircleOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import React, { useState, useEffect } from "react";
const Stepper = (props) => {
    const [status, setStatus] = useState({
        Verification: 'process',
        Pay: 'wait',
        Done: 'wait',
    }) // another step is finish

    useEffect(() => {
        if (props.current == "verification") {
            setStatus({
                Verification: 'process',
                Pay: 'wait',
                Done: 'wait',
            })
        } else if (props.current == "pay") {
            setStatus({
                Verification: 'finish',
                Pay: 'process',
                Done: 'wait',
            })
        } else if (props.current == "done") {
            setStatus({
                Verification: 'finish',
                Pay: 'finish',
                Done: 'process',
            })
        } else {
            setStatus({
                Verification: 'finish',
                Pay: 'finish',
                Done: 'finish',
            })
        }
    }, [props])
    return (
        <Steps
            items={[

                {
                    title: 'Verify',
                    status: status.Verification,
                    icon: <SolutionOutlined />,
                },
                {
                    title: 'Pay',
                    status: status.Pay,
                    icon: <CreditCardOutlined />,
                },
                {
                    title: status.Done == "finish" ? "Paid" : 'Approve',
                    status: status.Done,
                    icon: status.Done == "finish" ? <SmileOutlined /> :
                        status.Done == "process" ? <LoadingOutlined /> : <CheckCircleOutlined />,
                },
            ]}
        />
    );
}
export default Stepper;