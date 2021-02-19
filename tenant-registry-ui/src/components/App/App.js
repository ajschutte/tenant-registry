import React from 'react';
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { history } from "../../helpers/history";

import Home from "../../containers/Home/Home";
import EnterpriseHierarchy from '../../containers/Main/EnterpriseHierarchy';
import TenantProvisioningForm from '../../containers/Tenant/TenantProvisioningForm';
import ScopeDeploymentForm from '../../containers/Tenant/ScopeDeploymentForm';

import NavBar from '../../containers/NavBar/NavBar';
import "./App.css"

function App() {
    return (
      <Router history={history}>
          <NavBar />
          <Switch>
              <Redirect exact from="/" to="/Home" />
              <Route path="/Home" component={Home} />
              <Route path="/enterprise-hierarchy"  component={EnterpriseHierarchy}/>
              <Route path="/provisionTenantForm" component={TenantProvisioningForm} />
              <Route path="/scopeDeploymentForm" component={ScopeDeploymentForm} />
              <Redirect from="*" to="/Home" />
          </Switch>
      </Router>
  );
}

export default App;
