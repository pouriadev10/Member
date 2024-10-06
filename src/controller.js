import config from './Controller/config'
import Axios from 'axios'
import { statusHandeling } from './statusHandeling'

function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    if (
      user.key /*&& user.tokens && user.tokens.access && user.tokens.access.token*/
    ) {
      console.log({ Authorization: 'Token  ' + user.key })
      return { Authorization: 'Token  ' + user.key }
    } else {
      return {}
    }
  } else {
    return {}
  }
}

const getData = async () => {
  const Config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'Token ' + JSON.parse(localStorage.getItem('user')).key
        : ''
    }
  }
  console.log(Config)
  const response = await Axios.get(
    config.apiGateway.URL + `/business-management/selectoffice/`,
    Config
  )
  console.log('res', response)

  var chengedResponse = response.data
  for (var i = 0; i < chengedResponse.length; i++)
    chengedResponse[i].office_id = chengedResponse[i].id

  localStorage.setItem('office_ids', JSON.stringify(chengedResponse))
  localStorage.setItem(
    'selectedOffice',
    eval(JSON.stringify(chengedResponse[0].office_id))
  )
  localStorage.setItem(
    'selectedOfficeName',
    eval(JSON.stringify(chengedResponse[0].office_name))
  )
  window.location.href = '/'
  return response
}

const Login = async (email, pass) => {
  const myHeaders = Object.assign(
    { 'Content-Type': 'application/json' },
    authHeader()
  )

  const raw = JSON.stringify({
    email: email,
    password: pass
  })

  const req = new Request(config.apiGateway.URL + '/dj-rest-auth/login/', {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders
  })

  const response = await fetch(req)
  var json = await response.json()
  json.status = response.status
  statusHandeling.statusCodeHandeling(response.status)
  return json
}

const Register = async (...values) => {
  const myHeaders = Object.assign(
    { 'Content-Type': 'application/json' },
    authHeader()
  )
  const raw = JSON.stringify(...values)
  const req = new Request(config.apiGateway.URL + '/accounts/user-sign-up/', {
    //mode: 'cors',
    //credentials: 'include',
    body: raw,
    method: 'POST',
    headers: myHeaders
  })

  const response = await fetch(req)
  var json = await response.json()
  json.status = response.status
  statusHandeling.statusCodeHandeling(response.status)
  return json
}

export const controller = {
  Login,
  Register,
  getData
}
