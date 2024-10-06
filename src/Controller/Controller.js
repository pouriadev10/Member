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


const officeprofile = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    //const req = new Request(config.apiGateway.URL + '/business-management/officeprofile/?office=' + data , {
    const req = new Request(config.apiGateway.URL + '/business-management/officeprofile/?office=' + data, {
        //mode: 'cors',
        //credentials: 'include',
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};

const changeOfficeLog = async (
    data, id
) => {
    const myHeaders = Object.assign(/*{'accept': 'application/json'},*/authHeader())

    /*const raw = JSON.stringify({
      "office": localStorage.getItem("selectedOffice"),
      "logo": data,
    })*/


    const req = new Request(config.apiGateway.URL + '/business-management/officeprofile/?office=' + id, {
        //mode: 'cors',
        //credentials: 'include',
        body: data,
        method: 'PUT',
        headers: myHeaders,
    });

    const response = await fetch(req);
    console.log(response.status)
    var json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)


    return json;
};

const TotalMembers = async (data) => {
    //return total member
    console.log("zeroooo")
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    console.log(myHeaders)
    const req = new Request(config.apiGateway.URL + '/membership_plans/office-total-members/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();

    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            Total_Members: 8,
        }
    }

    return response*/
}


const getUrgentNotification = async () => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    var url = config.apiGateway.URL + "/business-management/urgent-notifications/" + localStorage.getItem("selectedOffice") + "/";
    const req = new Request(url, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();

    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const GetAllMembership = async (page) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    var url = "";
    if (page) {
        url = config.apiGateway.URL + '/membership_plans/membership-plan-list/' + "?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice")
    } else {
        url = config.apiGateway.URL + '/membership_plans/membership-plan-list/' + "?office_id=" + localStorage.getItem("selectedOffice")
    }

    const req = new Request(url, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();

    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {

            count: 3,
            next: null,
            previous: null,
            results: [
                {
                    id: 2,
                    clinic: {
                        id: 1,
                        name: "first office"
                    },
                    services: [
                        {
                            id: 1,
                            service: "oon yeki",
                            count: 2
                        }
                    ],
                    uuid: "e55d6b04-5f97-4323-ae9e-a9c31a6ac7ef",
                    name: "changed",
                    interval: "daily",
                    interval_count: 24,
                    active: true,
                    cost: "78.32",
                    description: "changed",
                    type: "predefined",
                    is_delete: false,
                    date: "2022-12-19T05:57:05.712981Z",
                    plan_cost: null
                },
                {
                    id: 1,
                    clinic: {
                        id: 1,
                        name: "first office"
                    },
                    services: [
                        {
                            id: 1,
                            service: "oon yeki",
                            count: 2
                        },
                        {
                            id: 2,
                            service: "hamine",
                            count: 1
                        },
                        {
                            id: 3,
                            service: "yeki dige",
                            count: 7
                        }
                    ],
                    uuid: "b40055b8-2102-4037-8848-785d11e60157",
                    name: "first and last plan",
                    interval: "monthly",
                    interval_count: 12,
                    active: false,
                    cost: "24.00",
                    description: "asdfasfsdf",
                    type: "predefined",
                    is_delete: false,
                    date: "2022-12-19T05:57:05.712981Z",
                    plan_cost: null
                }
            ]
        }
    }


    return response*/
}

const GetMembershipServices = async ({ id }) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/member-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();

    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {

            count: 3,
            next: null,
            previous: null,
            results: [
                {
                    customer_name: "patient one",
                    plan_name: "string",
                    status: "active"
                },
                {
                    customer_name: "patient two",
                    plan_name: "dec15",
                    status: "active"
                },
                {
                    customer_name: null,
                    plan_name: "4_plan",
                    status: "asa"
                }
            ]
        }
    }


    return response*/
}

const GetListofBusiness = async () => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/business-management/select-business/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();

    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const GetCustomers = async (page) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/customer-list/?page=' + page + "&office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();

    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {

            count: 3,
            next: null,
            previous: null,
            results: [
                {
                    customer_name: "patient one",
                    plan_name: "string",
                    status: "active"
                },
                {
                    customer_name: "patient two",
                    plan_name: "dec15",
                    status: "active"
                },
                {
                    customer_name: null,
                    plan_name: "4_plan",
                    status: "asa"
                }
            ]
        }
    }


    return response*/
}

const GetMRR = async () => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/monthly-recurring-revenue/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            result: "20970"
        }
    }


    return response*/
}

const RecentlyActiveMembers = async (page) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/recently-active-members/' + "?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();

    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            "count": 5,
            "next": null,
            "previous": null,
            "results": [
                {
                    "customer_name": "john doe",
                    "plan_name": "dec14",
                    "status": "d",
                    "profile_picture": null
                },
                {
                    "customer_name": null,
                    "plan_name": "dec15",
                    "status": "active",
                    "profile_picture": null
                },
                {
                    "customer_name": "patient one",
                    "plan_name": "22ne",
                    "status": "active",
                    "profile_picture": "http://localhost:8000/media/profile_pictures/sample_profile_VqR8za1.png"
                },
                {
                    "customer_name": "patient one",
                    "plan_name": "withp",
                    "status": "active",
                    "profile_picture": "http://localhost:8000/media/profile_pictures/sample_profile_VqR8za1.png"
                },
                {
                    "customer_name": null,
                    "plan_name": "4_plan",
                    "status": "asa",
                    "profile_picture": null
                }
            ]
        }
    }
    return response*/
}

const MembershipExpire = async () => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-expire-soon/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
    /*
    const response = {
        status: 200,
        message: "successful",
        json: {
            "count": 2,
            "next": null,
            "previous": null,
            "results": [
                {
                    "customer_name": "patient one",
                    "plan_name": "onee",
                    "status": "active",
                    "profile_picture": "http://localhost:8000/media/profile_pictures/sample_profile_VqR8za1.png"
                },
                {
                    "customer_name": "patient two",
                    "plan_name": "2_plan",
                    "status": "asas",
                    "profile_picture": null
                }
            ]
        }
    }
    return response*/
}

const GetTotalMember = async (id) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/plan-total-members/' + { id } + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            "number_of_members": 3
        }
    }


    return response*/
}

const GetMOM = async (id) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/monthly-growth/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            "mom": 102.07209107468124
        }
    }


    return response*/
}

const GetDashboardBarChart = async (id) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/barchart-data/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
    /*const response = {
        status: 200,
        message: "successful",
        json: {

            "December": 12,
            "November": 1,
            "October": 0,
            "September": 0,
            "August": 0,
            "July": 0,
            "June": 0,
            "May": 0,
            "April": 0,
            "March": 0,
            "February": 0,
            "January": 0

        }
    }


    return response*/
}

const GetDashboardPyChart = async (period) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/piechart-data/?period=' + period + "&office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            "dec15": 71,
            "22ne": 29
        }
    }


    return response*/
}

const SubmitCardInformation = async (id, data) => {

    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    data = {
        ...data,
        membership: id
    }

    const raw = JSON.stringify(data)
    const req = new Request(config.apiGateway.URL + '/business-management/paymentmethod/', {
        method: 'POST',
        headers: myHeaders,
        body: raw
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

}

const EditMemberInformation = async (id, data) => {

    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    if (data.profile_picture) {
        delete data.profile_picture;
    }
    const raw = JSON.stringify(data)
    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-customer-detail/' + id + '/', {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

}

const GetMemberInformation = async (id) => {
    //new endpoint
    // this endpoint used in verification step in payment flow - step 1
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-customer-detail/' + id + '/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            name: "test member",
            type: "express",
            country: "CA",
            email: "test@gamil.com",
            description: "string",
            office: 1
        }
    }


    return response*/
}

const FinalPaymentInformation = async (id) => {

    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/business-management/subscription/?id=' + id, {
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

}

const CheckPaymentStatus = async (id) => {

    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/business-management/subscription-status/' + id + '/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

}

const GetPaymentInformation = async (id) => {

    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/business-management/subscription/?id=' + id, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

}

const GetMembershipInformation = async (id) => {
    //new endpoint
    // this endpoint used in verification step in payment flow - step 1
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-detail/' + id + '/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /* const response = {
         status: 200,
         message: "successful",
         json: {
             "plan_name": "12.00",
             "amount": "12.00",
             "billing_cycle": "Weekly"
         }
     }*/


    return response
}

const GetMembershipDetail = async (id) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/member-ship-plan-detail/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            name: "first and last plan",
            cost: "24.00",
            member_count: 17,
            active_member_count: 5,
        }
    }


    return response*/
}

const GetServicesofPlan = async (id) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/msplan-services-list/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            count: 3,
            next: null,
            previous: null,
            results: [
                {
                    id: 1,
                    service: "oon yeki",
                    count: 2
                },
                {
                    id: 2,
                    service: "hamine",
                    count: 1
                },
                {
                    id: 3,
                    service: "yeki dige",
                    count: 7
                }
            ]
        }
    }


    return response*/
}

const GetMembersOfPlan = async (id) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/msplan-members-list/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    id: 1,
                    fullname: "first patient",
                    email: null,
                    phone: null,
                    status: "canceled"
                }
            ]
        }
    }


    return response*/
}

const GetMemberDetail = async (id) => {
    //return list of members
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/customer-detail/' + id + '/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            "fullname": "first patient",
            "first_name": "first",
            "middle_name": "none",
            "last_name": "patient",
            "birth_date": "1999-02-02",
            "address": "some where",
            "city": "here",
            "state": "there",
            "email": null,
            "phone": null,
            "zip_code": null,
            "profile_picture": "http://127.0.0.1:8000/media/profile_pictures/sample_profile.png"
        }
    }


    return response*/
}

const GetSubscriptions = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/member-memberships/?member=' + id + "&office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /* const response = {
         status: 200,
         message: "successful",
         json: {
             "count": 2,
             "next": null,
             "previous": null,
             "results": [
                 {
                     "plan_name": "withp",
                     "start_date": "2022-12-19T07:06:04.186167Z",
                     "expiration_date": null,
                     "status": "active"
                 },
                 {
                     "plan_name": "22ne",
                     "start_date": "2022-12-19T07:06:04.186167Z",
                     "expiration_date": null,
                     "status": "active"
                 }
             ]
         }
     }
 
 
     return response*/
}

const GetAllSubscriptions = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-member-memberships/?member=' + id + "&office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
    /*const response = {
        status: 200,
        message: "successful",
        json: [
            {
                "id": 1,
                "plan_name": "first and last plan",
                "start_date": "2022-12-18T11:11:03.150883Z",
                "expiration_date": null,
                "status": "canceled"
            },
            {
                "id": 2,
                "plan_name": "yeah",
                "start_date": "2022-12-18T11:11:03.150883Z",
                "expiration_date": null,
                "status": "canceled"
            }
        ]

    }


    return response*/
}

const GetMembershipHistory = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membershipplan-history/' + id + '/', {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            "count": 2,
            "next": null,
            "previous": null,
            "results": [
                {
                    "amount": 175.0,
                    "status": "paid",
                    "invoice_link": "http://invoice-link.com/fsdf"
                },
                {
                    "amount": 200.0,
                    "status": "paid",
                    "invoice_link": null
                }
            ]

        }
    }


    return response*/
}

const GetMemberPayment = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-payments/?id=' + id, {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json: {
            "count": 2,
            "next": null,
            "previous": null,
            "results": [
                {
                    "amount": 175.0,
                    "status": "paid",
                    "invoice_link": "http://invoice-link.com/fsdf"
                },
                {
                    "amount": 200.0,
                    "status": "paid",
                    "invoice_link": null
                }
            ]

        }
    }


    return response*/
}

const GetAllMember = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-member-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json:
            [
                {
                    "id": 2,
                    "fullname": "patient two"
                },
                {
                    "id": 3,
                    "fullname": "w1"
                },
                {
                    "id": 4,
                    "fullname": "john doe"
                },
                {
                    "id": 10,
                    "fullname": "2w"
                },
                {
                    "id": 12,
                    "fullname": "3w"
                },
                {
                    "id": 14,
                    "fullname": "5W"
                }
            ]


    }


    return response*/
}

const GetAllPlans = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-plan-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json:
            [
                {
                    "id": 4,
                    "name": "onee"
                },
                {
                    "id": 5,
                    "name": "onee"
                },
                {
                    "id": 6,
                    "name": "onee"
                },
                {
                    "id": 7,
                    "name": "onee"
                },
                {
                    "id": 8,
                    "name": "22ne"
                }
            ]


    }


    return response*/
}

const GetAllServices = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const req = new Request(config.apiGateway.URL + '/membership_plans/np-plan-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json:
            [
                {
                    "id": 1,
                    "name": "hamine",
                    "description": "ine discription",
                    "cost": "6000.00"
                },
                {
                    "id": 2,
                    "name": "oon yeki",
                    "description": "taghirat",
                    "cost": "55.00"
                },
                {
                    "id": 3,
                    "name": "yeki dige",
                    "description": "are inam des",
                    "cost": "122.20"
                }
            ]


    }


    return response*/
}

const DeleteService = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + '/membership_plans/services-update-delete/' + id + '/', {

        method: 'DELETE',
        headers: myHeaders,
    });

    const response = await fetch(req);



    if (response.status > 250) {
        const json = await response.json();
        const res = {
            json: json,
            status: response.status,
            message: response.message,

        }

        statusHandeling.statusCodeHandeling(res.status)
        return res;
    } else {
        const res = {
            json: { message: "succssfull" },
            status: 204,
            message: "Service deleted successfully",

        }

        statusHandeling.statusCodeHandeling(res.status)
        return res;
    }

}

const DeleteMembershipPlan = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-plan-delete/' + id + '/', {

        method: 'DELETE',
        headers: myHeaders,
    });

    const response = await fetch(req);



    if (response.status > 250) {
        const json = await response.json();
        const res = {
            json: json,
            status: response.status,
            message: response.message,

        }

        statusHandeling.statusCodeHandeling(res.status)
        return res;
    } else {
        const res = {
            json: { message: "succssfull" },
            status: 204,
            message: "Service deleted successfully",

        }

        statusHandeling.statusCodeHandeling(res.status)
        return res;
    }

}

const EditMembershipPlan = async (data, id, officeId) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + '/membership_plans/membership-plan-update/' + id + "/?office_id=" + officeId, {
        body: raw,
        method: 'PUT',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const EditService = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + '/membership_plans/services-update-delete/' + data.id + "/", {
        body: raw,
        method: 'PUT',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const CreatePlan = async (plan) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    var myPlan =
    {
        "services": plan.services,
        "name": plan.name,
        "interval": plan.interval,
        "active": plan.active,
        "cost": plan.cost,
        "description": "",
        "terms": plan.terms
    }



    const raw = JSON.stringify(plan)



    const req = new Request(config.apiGateway.URL + '/membership_plans/create-membership-plan/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const CreateOffice = async (office) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(office)

    const req = new Request(config.apiGateway.URL + '/business-management/create-office/', {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const CreateBusiness = async (business) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(business)

    const req = new Request(config.apiGateway.URL + '/business-management/create-business/', {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const serviceUsage = async (visit) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(visit)

    const req = new Request(config.apiGateway.URL + '/membership_plans/create-member-usage/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json:
        {
            "detail": [
                "You used hamine service from your membership"
            ]
        }

    }


    return response*/
}

const GetServiceNP = async () => {
    // NP = None Pagination
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    const req = new Request(config.apiGateway.URL + '/membership_plans/services-list-create/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,
    }
    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const GetService = async (page) => {
    // NP = None Pagination
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    const req = new Request(config.apiGateway.URL + '/membership_plans/services-list-create/' + "?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'GET',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,
    }
    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const CreateServiceList = async (Sservice) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(Sservice)

    const req = new Request(config.apiGateway.URL + '/membership_plans/services-list-create/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,
    }
    statusHandeling.statusCodeHandeling(res.status)
    return res;
}


const getAllCategoryBusiness = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/business-management/list-business-categories/", {
        method: 'Get',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,
    }
    statusHandeling.statusCodeHandeling(res.status)
    return res;
}


const getOnboardingStage = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/business-management/get-onboarding-step/", {
        method: 'Get',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    // const res = {
    //     //json: json,
    //     json: { status: "complete" },
    //     // status: response.status,
    //     status: 200,
    //     // message: response.message,
    //     message: ""
    // }

    const res = {
        json: json,

        status: response.status,

        message: response.message,

    }
    console.log(res)
    statusHandeling.statusCodeHandeling(res.status)

    return res;


}

const GetFinishOnBoarding = async () => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/business-management/finish-office-create/", {
        method: 'Get',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

}

const getCycles = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/membership_plans/list-interval/", {
        method: 'Get',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const getServicesOfMembership = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/membership_plans/np-membership-service-info/" + id + "/" + "?office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'Get',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}
const getAllVisit = async (page) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + "/membership_plans/service-usage-list/" + "?page=" + page + "&office_id=" + localStorage.getItem("selectedOffice"), {
        method: 'Get',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;

    /*const response = {
        status: 200,
        message: "successful",
        json:
        {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "service_name": "ortodonci",
                    "count": 21,
                    "date": "2023-01-05T12:02:42Z",
                    "member_info": {
                        "id": 4,
                        "fullname": "john doe",
                        "profile_picture": null
                    }
                },
                {
                    "service_name": "bleaching",
                    "count": 21,
                    "date": "2023-01-05T11:57:02Z",
                    "member_info": {
                        "id": 1,
                        "fullname": "patient one",
                        "profile_picture": "http://localhost:8000/media/profile_pictures/sample_profile_VqR8za1.png"
                    }
                },
                {
                    "service_name": "bleaching",
                    "count": 23,
                    "date": "2023-01-05T14:43:06Z",
                    "member_info": {
                        "id": 4,
                        "fullname": "john doe",
                        "profile_picture": null
                    }
                }
            ]
        }

    }


    return response*/
}

const createNewMemberNew = async (newMember) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    var raw = {
        ...newMember,
        office: localStorage.getItem("selectedOffice")
    }
    const req = new Request(config.apiGateway.URL + '/membership_plans/create-customer-billing/?office_id=' + localStorage.getItem("selectedOffice"), {
        body: JSON.stringify(raw),
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const createNewMember = async (newMember) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
    var raw = {
        ...newMember,
        office: localStorage.getItem("selectedOffice")
    }
    const req = new Request(config.apiGateway.URL + '/membership_plans/create-member/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: JSON.stringify(raw),
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}


const CreateCustomMembership = async (input) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(input)

    const req = new Request(config.apiGateway.URL + '/membership_plans/create-custom-membership/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const CreateMembershipnPreDefined = async (memberShip) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(memberShip)

    const req = new Request(config.apiGateway.URL + '/membership_plans/create-membership/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const ForgotPassword = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + '/password/reset/', {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}

const resetPassword = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + '/password/reset/confirm/', {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);
    const json = await response.json();
    const res = {
        json: json,
        status: response.status,
        message: response.message,

    }

    statusHandeling.statusCodeHandeling(res.status)
    return res;
}


const cancelSubscription = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + '/membership_plans/cancel-membership/', {
        body: raw,
        method: 'Post',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};

const resendSubscription = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    // const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + '/membership_plans/resend-membership-notification/' + id + "/" , {
        method: 'Post',
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

const verifyEmail = async (data) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    var raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL + '/dj-rest-auth/registration/verify-email/', {
        body: raw,
        method: 'POST',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    //statusHandeling.statusCodeHandeling(response.status)

    return json;
};


const deleteMember = async (id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())


    const req = new Request(config.apiGateway.URL + '/business-management/customer-update-delete/' + id + '/', {

        method: 'DELETE',
        headers: myHeaders,
    });

    const response = await fetch(req);



    if (response.status > 250) {
        const json = await response.json();
        const res = {
            json: json,
            status: response.status,
            message: response.message,

        }

        statusHandeling.statusCodeHandeling(res.status)
        return res;
    } else {
        const res = {
            json: { message: "succssfull" },
            status: 204,
            message: "Member deleted successfully",

        }

        statusHandeling.statusCodeHandeling(res.status)
        return res;
    }

}


const editMember = async (data,id) => {
    const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

    const raw = JSON.stringify(data)

    const req = new Request(config.apiGateway.URL +  '/business-management/customer-update-delete/' + id + '/', {
        body: raw,
        method: 'PATCH',
        headers: myHeaders,
    });

    const response = await fetch(req);

    const json = await response.json();
    json.status = response.status;
    statusHandeling.statusCodeHandeling(response.status)

    return json;
};


export const Controller = {
    resetPassword,
    ForgotPassword,
    TotalMembers,
    GetListofBusiness,
    GetCustomers,
    GetAllMembership,
    GetMembershipServices,
    GetMRR,
    RecentlyActiveMembers,
    MembershipExpire,
    GetTotalMember,
    GetMOM,
    GetDashboardBarChart,
    GetDashboardPyChart,
    GetMembershipDetail,
    GetServicesofPlan,
    GetMembersOfPlan,
    GetMemberDetail,
    GetSubscriptions,
    GetMemberPayment,
    GetAllMember,
    GetAllPlans,
    GetAllServices,
    serviceUsage,
    getAllVisit,
    GetAllSubscriptions,
    createNewMember,
    CreateServiceList,
    GetServiceNP,
    GetService,
    CreateBusiness,
    getAllCategoryBusiness,
    resendSubscription,
    getOnboardingStage,
    CreateOffice,
    GetFinishOnBoarding,
    getServicesOfMembership,
    CreatePlan,
    CreateMembershipnPreDefined,
    CreateCustomMembership,
    changeOfficeLog,
    officeprofile,
    getCycles,
    DeleteMembershipPlan,
    EditMembershipPlan,
    GetMembershipHistory,
    cancelSubscription,
    // services
    DeleteService,
    EditService,

    // payment flow
    GetMembershipInformation,
    GetMemberInformation,
    EditMemberInformation,
    SubmitCardInformation,
    GetPaymentInformation,
    FinalPaymentInformation,
    CheckPaymentStatus,
    createNewMemberNew,
    checkConnectedAccount,
    verifyEmail,
    getUrgentNotification,

    // rud member
    deleteMember,
    editMember
}