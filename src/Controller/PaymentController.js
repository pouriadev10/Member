import config from "./config";
import { statusHandeling } from './../views/admin/addBank/components/statusHandeling';
function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (user.key /*&& user.tokens && user.tokens.access && user.tokens.access.token*/) {
            console.log({ 'Authorization': 'Token  ' + user.key })
            return { 'Authorization': 'Token  ' + user.key };
        }
        else {
            return {};
        }
    }
    else {
        return {};
    }
}

// const createConnectedAccount = async (data) => {
//     const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
//     const raw = JSON.stringify(data)
//     const req = new Request(config.apiGateway.URL + '/payment/api/create-business/', {
//         body: raw,
//         method: 'PUT',
//         headers: myHeaders,
//     });

//     const response = await fetch(req);

//     const json = await response.json();
//     json.status = response.status;
//     statusHandeling.statusCodeHandeling(response.status)

//     return json;
// };

const createConnectedAccount = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    const raw = JSON.stringify(data)
    const req = new Request(config.apiGateway.URL + '/business-management/create-connected-account/', {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};

const checkIsEnable = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/business-management/newisenableaccount/?office_id=' + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};

const getEnableAccount = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/payment/api/generate-account-link/?business_id=' + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};

const getBanks = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/business-management/list-banks/?office_id=' + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};

const checkConnectedAccount = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/business-management/check-connected-account/?office_id=' + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};



export const PaymentController = {
    checkConnectedAccount,
    checkIsEnable,
    createConnectedAccount,
    getEnableAccount,
    getBanks
}