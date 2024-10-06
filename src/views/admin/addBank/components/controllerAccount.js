import React from "react";
import config from 'Controller/config';
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

const accountlink = async (
  account_id
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "account_id": account_id,

  })

  const req = new Request(config.apiGateway.URL + '/business-management/accountlink/?id=' + account_id + '&office=' + localStorage.getItem("selectedOffice"), {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const add_bank_account = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "office": data.office,
    "name": data.name,
    "stripe_bank_id": data.stripe_bank_id,
    "stripe_account_id": data.stripe_account_id,
    "account_number": data.account_number,
    "routing_number": data.routing_number,
    "account_holder_name": data.account_holder_name,
    "account_holder_type": data.account_holder_type,
    "country": data.country,
    //"currency": data.currency,
    "description": data.description,
  })

  const req = new Request(config.apiGateway.URL + '/business-management/bankaccount/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const active_cart_bank = async (
  data
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "office": data.office,
    "id": data.id,
  })

  const req = new Request(config.apiGateway.URL + '/business-management/set-default-connectedaccount/', {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const add_connected_account = async (
  office,
  email,
  accountType,
  country,
  name,
  description
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())

  var raw = JSON.stringify({
    "office": office,
    "type": accountType,
    "country": country,
    "email": email,
    "name": name,
    "description": description
  })

  const req = new Request(config.apiGateway.URL + '/business-management/connectedaccount/?office_id=' + localStorage.getItem("selectedOffice"), {
    body: raw,
    method: 'POST',
    headers: myHeaders,
  });

  const response = await fetch(req);
  var json = await response.json();
  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const get_connected_account = async () => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/business-management/connectedaccount/?office_id=' + localStorage.getItem("selectedOffice"), {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json =
  {
    json : await response.json(),
    status: response.status
  } 
  //console.log(json)
  
  //json.status = response.status;
  return json;
};

const view_bank_account = async (id) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/business-management/bankaccount/?id=' + id, {
    method: 'GET',
    headers: myHeaders,
  });

  const response = await fetch(req);

  var json = await response.json();
  //console.log(json)

  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

const isenableaccount = async (
  office_id,
  account_id
) => {
  const myHeaders = Object.assign({ 'Content-Type': 'application/json' }, authHeader())
  const req = new Request(config.apiGateway.URL + '/business-management/isenableaccount/?office='
    + office_id +
    "&id=" + account_id,
    {
      method: 'GET',
      headers: myHeaders,
    });

  const response = await fetch(req);

  var json = await response.json();
  //console.log(json)

  json.status = response.status;
  statusHandeling.statusCodeHandeling(response.status)
  return json;
};

export const controllerAccount = {
  add_connected_account,
  get_connected_account,
  view_bank_account,
  add_bank_account,
  active_cart_bank,
  isenableaccount,
  accountlink
};


