import React from "react";
import config from "Controller/config";
import { statusHandeling } from "statusHandeling";
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

const getStripeKey = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/get-stripe-public_key/', {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);
  const json = await response.json();
  return json;
};

const office_services = async (data) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/appointmenttype/?office=' + data, {
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

  //const req = new Request(config.apiGateway.URL + '/clinics/officeprofile/?office=' + data , {
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

  return json;
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

  const req = new Request(config.apiGateway.URL + `/clinics/paymentrequests/?page=${page}&page_size=${page_size}&search=${search_term}&office=${office}`, {
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

const createPatient = async (
  first_name,
  last_name,
  email,
  phone_number,
  city,
  birth_date,
  address,
  //provider
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
const createPayReq = async (
  formData
) => {
  const myHeaders = Object.assign(/*{ 'Content-Type': 'application/json' }, */authHeader())

  const req = new Request(config.apiGateway.URL + '/clinics/paymentrequest/', {
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
  const req = new Request(config.apiGateway.URL + '/dj-rest-auth/password/reset/confirm/', {

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
  const req = new Request(config.apiGateway.URL + '/dj-rest-auth/password/reset/', {

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


  const req = new Request(config.apiGateway.URL + '/clinics/provider/', {
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

const get_provider = async (
  office,
  appointment_type
) => {
  const myHeaders = Object.assign(authHeader())
  var url = ""
  if (appointment_type) {
    url = config.apiGateway.URL + '/clinics/provider/?office=' + office
      + "&appointment_type=" + appointment_type
  } else {
    url = config.apiGateway.URL + '/clinics/provider/?office=' + office
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

const changeOfficeLog = async (
  data
) => {
  const myHeaders = Object.assign(/*{'accept': 'application/json'},*/authHeader())

  /*const raw = JSON.stringify({
    "office": localStorage.getItem("selectedOffice"),
    "logo": data,
  })*/


  const req = new Request(config.apiGateway.URL + '/clinics/officeprofile/', {
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

const Publicregister = async (registerForm) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  const raw = JSON.stringify(registerForm)


  const req = new Request(config.apiGateway.URL + '/business-management/public-register/', {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  console.log(response.status)
  var json = {}
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const Register = async (registerForm) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = ""
  var url = ""

  if (registerForm.invite_token) {
    url = '/business-management/token-register/'
    raw = JSON.stringify(registerForm)
  } else {
    url = '/business-management/public-register/'
    raw = JSON.stringify({
      email: registerForm.email,
      password1: registerForm.password1,
      password2: registerForm.password2,

    })
  }


  const req = new Request(config.apiGateway.URL + url, {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  console.log(response.status)
  var json = {}
  json.status = response.status;
  //statusHandeling.statusCodeHandeling(response.status)
  return json;
};

export const controller = {
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
  Login,
  get_provider_times,
  add_provider_times,
  Register,
  Publicregister
};


