import config from './config';
import { statusHandeling } from "./statusHandeling";
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

const getSubcriptionDetail = async (id) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/membership_plans/membership-detail/' + id + '/', {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getMaxAmountAR = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/max-ar-amount/?office_id=' + localStorage.getItem("selectedOffice"), {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getReasonsList = async (id) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/payment-reason-list/', {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getIntervalsForPayment = async (id) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/pr-available-intervals/?id=' + id, {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getAvailableIntervals = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/payment-interval-list/', {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const searchGuarantor = async (search) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/guarantor-lc/?page=0&search=' + search + '&office_id=' + localStorage.getItem("selectedOffice"), {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getGuarantor = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/guarantor-lc/?page=0&office_id=' + localStorage.getItem("selectedOffice"), {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getStripeKey = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })

  const req = new Request(config.apiGateway.URL + '/membership_plans/subscription-payment-view/' + window.location.href.split("/")[window.location.href.split("/").length - 2]+'/', {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getARDetail = async (data, page) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  console.log("data", data)
  const req = new Request(config.apiGateway.URL + '/clinics/ar-detail/' + data.split("?id=")[1] + '/?page=' + page, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const updateGetAR = async (
  guarantor,
  practice_id,
  min_date,
  max_date,
  entry_id,
  min_amount,
  max_amount,
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  console.log(min_amount)
  console.log(max_amount)

  var url = '/clinics/ar-list/?office_id=' + localStorage.getItem("selectedOffice")
  if (entry_id && entry_id.length > 0)
    url += "&entry_id=" + entry_id

  if (guarantor && guarantor > -1)
    url += "&guarantor=" + guarantor

  if (practice_id && practice_id > -1)
    url += "&practice_id=" + practice_id

  if (min_date && min_date.length > 0)
    url += "&min_date=" + min_date

  if (max_date && max_date.length > 0)
    url += "&max_date=" + max_date

  if (min_amount && min_amount > 0)
    url += "&min_amount=" + min_amount

  if (max_amount && max_amount > -1)
    url += "&max_amount=" + max_amount


  const req = new Request(config.apiGateway.URL + url, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const updateGetAR2 = async (
  guarantor,
  practice_id,
  min_date,
  max_date,
  entry_id,
  min_amount,
  max_amount,
  dueDate,
  page
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  console.log(min_amount)
  console.log(max_amount)

  var url = '/clinics/ar-list/?office_id=' + localStorage.getItem("selectedOffice")
  if (guarantor && guarantor > -1)
    url += "&guarantor=" + guarantor

  if (practice_id && practice_id > -1)
    url += "&practice_id=" + practice_id

  if (min_date && min_date.length > 0)
    url += "&min_date=" + min_date

  if (max_date && max_date.length > 0)
    url += "&max_date=" + max_date

  if (min_amount && min_amount > 0)
    url += "&min_amount=" + min_amount

  if (max_amount && max_amount > -1)
    url += "&max_amount=" + max_amount
  url += "&amounts_between=" + dueDate

  url += "&page=" + page

  const req = new Request(config.apiGateway.URL + url, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const getAR = async (page) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/ar-list/?page=' + page + '&office_id=' + localStorage.getItem("selectedOffice"), {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const office_services = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/booking/get-appointment-type/?office=' + data, {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const officeprofile = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/get-office-profile/' + data + '/', {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  statusHandeling.statusCodeHandeling(response.status)
  const json = await response.json();
  json.status = response.status;
  localStorage.setItem("officeLogo", JSON.stringify(json))
  return json;
};

const get_patient_search = async (data, search) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/patient/?office=' + data + "&search=" + search, {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });
  console.log("req", req)
  const response = await fetch(req);
  console.log("response", response)
  if (response.status != 204) {
    const json = await response.json();

    return json;
  } else {
    console.log("response", response)
    return { data: {} };
  }
};

const get_guarantor_search = async (data, search) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/guarantor-lc/?page=0&office_id=' + data + "&search=" + search, {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });
  console.log("req", req)
  const response = await fetch(req);
  console.log("response", response)
  if (response.status != 204) {
    const json = await response.json();

    return json;
  } else {
    console.log("response", response)
    return { data: {} };
  }
};

const get_patient = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/patient/?office=' + data, {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });
  console.log("req", req)
  const response = await fetch(req);
  console.log("response", response)
  if (response.status != 204) {
    const json = await response.json();

    return json;
  } else {
    console.log("response", response)
    return { data: {} };
  }
};

const get_payment_requests = async (
  page_size,
  page,
  search_term,
  office
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + `/billpay/paymentrequests/?page=${page}&page_size=${page_size}&search=${search_term}&office=${office}`, {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const declineAppointment = async (
  id,

) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const raw = JSON.stringify({
    "approved": false,
  })
  const req = new Request(config.apiGateway.URL + '/booking/approve-appointment/' + id + "/", {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const getUserOffices = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/practice-users/', {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  //json.status = response.status;
  return json;
};

const createUser = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const raw = JSON.stringify({
    email: data.email,
    username: data.username,
    phone_number: data.phone_number,
  })
  const req = new Request(config.apiGateway.URL + '/clinics/create-user/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const setOfficeAdmin = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const raw = JSON.stringify({
    username: data.username,
    office_id: data.office_id,
  })
  const req = new Request(config.apiGateway.URL + '/clinics/set-office-access/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const approveAppointment = async (
  time,
  id,
  approve
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const raw = JSON.stringify({
    "approved": approve,
    "appointment_datetime": time,
  })
  const req = new Request(config.apiGateway.URL + '/booking/approve-appointment/' + id + "/", {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const createGuarantor = async (
  first_name,
  last_name,
  email,
  phone_number,
  city,
  birth_date,
  address,
  patient_state,
  Zipcode,
  //provider
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const raw = JSON.stringify({
    "firstname": first_name,
    "lastname": last_name,
    "email": email,
    "cell": phone_number,
    "city": city,
    "birthdate": birth_date,
    "address_line1": address,
    "zipcode": Zipcode,
    "state": patient_state,
    //"provider": provider,
    "office": localStorage.getItem("selectedOffice")
  })
  const req = new Request(config.apiGateway.URL + '/clinics/guarantor-lc/', {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const createPatient = async (
  first_name,
  last_name,
  email,
  phone_number,
  city,
  birth_date,
  address,
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const raw = JSON.stringify({
    "first_name": first_name,
    "last_name": last_name,
    "email": email,
    "phone": phone_number,
    "city": city,
    "birth_date": birth_date,
    "address": address,
    //"provider": provider,
    "office": localStorage.getItem("selectedOffice")
  })
  const req = new Request(config.apiGateway.URL + '/clinics/patient/', {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const createPayReqAR = async (
  formData
) => {
  const myHeaders = Object.assign(/*{ 'Content-Type': 'application/json' }, */authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/paymentrequest/', {
    //mode: 'cors',
    //credentials: 'include',
    body: (formData),
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const createPayReq = async (
  formData
) => {
  const myHeaders = Object.assign(/*{ 'Content-Type': 'application/json' }, */authHeader())

  const req = new Request(config.apiGateway.URL + '/billpay/paymentrequest/', {
    //mode: 'cors',
    //credentials: 'include',
    body: (formData),
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  //console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const resetConfirm = async (
  password1,
  password2,
  uid,
  token
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
  const raw = JSON.stringify({
    "new_password1": password1,
    "new_password2": password2,
    "uid": uid,
    "token": token
  })
  const req = new Request(config.apiGateway.URL + '/password/reset/confirm/', {

    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();
  json.status = response.status;
  return json;
};
const passwordReset = async (
  email,
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' })
  const raw = JSON.stringify({
    "email": email,
  })
  const req = new Request(config.apiGateway.URL + '/password/reset/', {

    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const upload_pdf_file = async (
  formData
) => {
  const myHeaders = Object.assign(/*{ 'Content-Type': 'application/json' },*/ authHeader())
  //formData = JSON.stringify({ formData })
  const req = new Request(config.apiGateway.URL + '/clinics/file/', {
    //mode: 'cors',
    //credentials: 'include',
    body: formData,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const add_provider = async (
  data
) => {
  const myHeaders = Object.assign(authHeader())

  /*const raw = JSON.stringify({
    "name": data.name,
    "phone": data.phone,
    "email": data.email,
    "office": data.office,
    "specialty": data.specialty,
    "image": data.image,
    "appointment_type": data.appointment_type && data.appointment_type.length == 1 ?
     data.appointment_type[0].toString() : data.appointment_type.toString(),
  })*/


  const req = new Request(config.apiGateway.URL + '/clinics/create-provider/', {
    //mode: 'cors',
    //credentials: 'include',
    body: data,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  console.log(response.status)
  var json = await response.json();
  statusHandeling.statusCodeHandeling(response.status)
  json.status = response.status;
  return json;
};

const unApprovedAppointment = async (page) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  url = config.apiGateway.URL + "/booking/unapproved-appointments-list/?office_id=" + localStorage.getItem("selectedOffice") + "&page=" + page
  const req = new Request(url, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  //statusHandeling.statusCodeHandeling(response.status)

  return json;


};

const get_provider = async (
  office,
  appointment_type
) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  if (appointment_type) {
    url = config.apiGateway.URL + '/clinics/get-provider/?office=' + office
      + "&appointment_type=" + appointment_type
  } else {
    url = config.apiGateway.URL + '/clinics/get-provider/?office=' + office
  }
  const req = new Request(url, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)

  return json;
};


const add_provider_times = async (
  weekday,
  start,
  end,
  provider,

) => {
  const myHeaders = Object.assign(authHeader(), { 'Content-Type': 'application/json' })
  var url = ""

  url = config.apiGateway.URL + '/clinics/providerschedules/'

  const raw = JSON.stringify({
    weekday,
    start,
    end,
    provider,
  })

  const req = new Request(url, {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;

  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const getLogo = async () => {
  const myHeaders = Object.assign(authHeader())
  var url = ""

  url = config.apiGateway.URL + '/clinics/get-smilin-logo/'


  const req = new Request(url, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  localStorage.setItem("smilepassLogo", JSON.stringify(json))
  return json;
};

const get_provider_times = async (
  id,

) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""

  url = config.apiGateway.URL + '/clinics/providerschedules/?provider=' + id


  const req = new Request(url, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const getPracticeOffices = async () => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  url = config.apiGateway.URL + '/clinics/get-practice-offices/'

  const req = new Request(url, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};


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

const DeletePlan = async (id) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  url = config.apiGateway.URL + '/membership_plans/membership-plan-delete/' + id + '/'

  const req = new Request(url, {

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
};

const deleteService = async (id) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  url = config.apiGateway.URL + '/membership_plans/services-update-delete/' + id + '/'

  const req = new Request(url, {

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
};

const getServiceList = async (page) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  url = config.apiGateway.URL + '/membership_plans/services-list-create/?page=' + page + "&office_id=" + localStorage.getItem("selectedOffice")

  const req = new Request(url, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;

  return json;
};

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
  return res;
}


const GetTransaction = async (state, page) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  url = config.apiGateway.URL + '/billpay/transaction-state-list/?state=' + state + "&page=" + page + "&office_id=" + localStorage.getItem("selectedOffice")

  const req = new Request(url, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const checkPracticeAdmin = async () => {
  const myHeaders = Object.assign(authHeader())
  var url = ""

  url = config.apiGateway.URL + '/clinics/check-practice-admin/'


  const req = new Request(url, {

    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json1 = await response.json();
  var json = {};
  json.data = json1;
  json.status = response.status;
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const changeOfficeLog = async (
  data
) => {
  const myHeaders = Object.assign(/*{'accept': 'application/json'},*/authHeader())

  /*const raw = JSON.stringify({
    "office": localStorage.getItem("selectedOffice"),
    "logo": data,
  })*/


  const req = new Request(config.apiGateway.URL + '/clinics/update-office-profile/' + localStorage.getItem("selectedOffice") + '/', {
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

const UpdateTransactionState = async (
  state, id
) => {
  const myHeaders = Object.assign(authHeader(), { 'Content-Type': 'application/json' })

  const raw = JSON.stringify({
    state: state
  })
  const req = new Request(config.apiGateway.URL + '/billpay/update-transaction-state/' + id + '/', {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
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

const Login = async (
  email,
  pass
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const raw = JSON.stringify({
    "email": email,
    "password": pass,
  })


  const req = new Request(config.apiGateway.URL + '/dj-rest-auth/login/', {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  console.log(response.status)
  var json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};


const FailedPayments = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  /*const req = new Request(config.apiGateway.URL + '/billpay/list-repay-paymentrequests/', {
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

  return res;*/

  const response = {
    status: 200,
    message: "successful",
    json: {
      "count": 1,
      "next": null,
      "previous": null,
      "results": [
        {
          "id": 2,
          "payment_type": "repay",
          "uuid": "ffe8013c-d1a0-4cb5-b73f-bb43b88adeca",
          "created_at": "2023-07-17T12:40:46.918866Z",
          "paid": false,
          "canceled": false,
          "subscription_transaction": "30f52cdf-9d95-40d9-8d3a-ed61ff580d84",
          "office": 1,
          "accounts_receivable": null,
          "available_interval": []
        }
      ]
    }
  }


  return response
}


const GetAllMembership = async () => {
  //return list of members
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/membership_plans/membership-plan-list/' + "?office_id=" + localStorage.getItem("selectedOffice"), {
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

  return res;

}

export const controller = {
  declineAppointment,
  approveAppointment,
  unApprovedAppointment,
  getStripeKey,
  getLogo,
  officeprofile,
  office_services,
  get_patient,
  createPatient,
  get_payment_requests,
  upload_pdf_file,
  add_provider,
  passwordReset,
  resetConfirm,
  changeOfficeLog,
  get_provider,
  createPayReq,
  createPayReqAR,
  Login,
  get_provider_times,
  add_provider_times,
  get_patient_search,
  updateGetAR2,
  checkPracticeAdmin,
  getPracticeOffices,
  createUser,
  getUserOffices,
  setOfficeAdmin,

  updateGetAR,
  getAR,
  getARDetail,

  createGuarantor,
  getGuarantor,
  searchGuarantor,
  get_guarantor_search,

  GetTransaction,
  UpdateTransactionState,

  getAvailableIntervals,
  getIntervalsForPayment,

  getReasonsList,

  getMaxAmountAR,

  FailedPayments,

  getSubcriptionDetail,

  getServiceList,
  deleteService,
  CreateServiceList,
  EditService,

  GetAllMembership,
  DeletePlan
};


