import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import ErrorLayout from "layouts/error";
import AdminLayout from "layouts/admin";
import PaymentLayout from "layouts/payment";
import CreateLayout from "layouts/create";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { Controller } from "Controller/Controller";
const App = () => {

  const [stage, setStage] = useState("")


  const getStage = async () => {
    if (localStorage.getItem("user")) {
      const res = await Controller.getOnboardingStage();
      if (res.json.status == "create_office" && window.location.href.search("office" == -1)) {
        window.location.href = "#/create/office"
      }
      setStage(res.json.status)
    }

    //getStage()
  }



  useEffect(() => {
    //check user stage
    getStage()


  })

  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <HashRouter>
            {
              JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).key ?
                (stage == "complete" || stage == "completed") ?
                  <Switch>
                    <Route path={`/error`} component={ErrorLayout} />
                    <Route path={`/auth`} component={AuthLayout} />
                    <Route path={`/admin`} component={AdminLayout} />
                    <Route path={`/payment`} component={PaymentLayout} />
                    <Route path={`/create`} component={CreateLayout} />
                    <Redirect from='/' to='/admin' />
                  </Switch>
                  :

                  stage == "create_office" ?
                    <Switch>
                      <Route path={`/create`} component={CreateLayout} />
                      <Route path={`/error`} component={ErrorLayout} />
                      <Redirect from='/' to='/create/office' />
                    </Switch>
                    :
                    stage == "create_business" ?
                      <Switch>
                        <Route path={`/create`} component={CreateLayout} />
                        <Route path={`/error`} component={ErrorLayout} />
                        <Redirect from='/' to='/create/business' />
                      </Switch>
                      :
                      <></>

                :
                <Switch>
                  <Route path={`/error`} component={ErrorLayout} />
                  <Route path={`/auth`} component={AuthLayout} />
                  <Route path={`/payment`} component={PaymentLayout} />
                  <Redirect from='/forget-passwordreset/:id/:token/' to='/auth/reset-password/:id/:token/' />
                  <Redirect from='/' to='/auth' />
                </Switch>
            }
          </HashRouter>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
