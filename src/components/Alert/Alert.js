import { notification } from 'antd';

const openNotification = (message, status) => {
    notification.config({
        placement: 'bottom',
    });

    notification[status]({
        message: status == "error" ? "Error" : "Success",
        description: message,
        duration: 3,
    });

};

export const Alert = {
    openNotification
};