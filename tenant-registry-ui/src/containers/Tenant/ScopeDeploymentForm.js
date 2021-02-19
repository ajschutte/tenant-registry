import React, {Component, useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {provisionTenant, provisionTenantDeployment} from '../../actions/tenantActions';
import TenantResult from '../../components/Tenant/TenantResult';


class ScopeDeploymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enterpriseHid: "",
            enterpriseName: "",
            scopeId: "",
            unprovisionedScopes: [],
            validationError: false,
            validationErrorMsg: "",
            submitted: ""
        };
    }

    componentDidMount() {
        const enterpriseHid = localStorage.getItem("enterpriseHid");
        const enterpriseName = localStorage.getItem("enterpriseName");
        const scopeIds = JSON.parse(localStorage.getItem("scopeIds"));

        // get list of scopes that tenant has not been provisioned on
        const tenantScopeIds = this.props.tenants.map(scope => scope.scopeId.id);
        const unprovisionedScopes = scopeIds.filter(a => !tenantScopeIds.includes(a));

        this.setState({
            enterpriseHid,
            enterpriseName,
            unprovisionedScopes,
            scopeId: unprovisionedScopes
        });

    }

    handleChange = e => {
        this.setState({
            [e.target.id]: [e.target.value]
        });
    };

    // Used when tenant is already provisioned but needs a scope id
    handleScopeSubmit = () => {
        const {scopeId} = this.state;
        const {provisionTenantDeployment, tenants} = this.props;

        this.setState({submitted: true});
        provisionTenantDeployment(tenants[0], scopeId[0]);
    };

    render() {
        const {tenants, isLoading, provisionDeploymentResponse, error} = this.props;
        const {enterpriseName, enterpriseHid, submitted, unprovisionedScopes} = this.state;

        let aliasIds = false;
        let tenant = tenants[0];
        const tenantScopeIds = tenants.map(scope => scope.scopeId.id);

        // Check if tenant is already deployed on all scopes
        if (unprovisionedScopes.length < 1) {
            return (<TenantResult enterpriseName={enterpriseName} tenantHid={enterpriseHid}
                                  tenantId={tenant.tenantId.id}
                                  scopeIds={tenantScopeIds}
                                  aliasIds={tenant.hasOwnProperty("aliases") ? tenant.aliases : false}
                                  header={"Heads Up!"} info={"Tenant has already been deployed on all available scopes"}/>);
        }

        if (tenant.hasOwnProperty("tenantAliases")) {
            aliasIds = true;
        }


        // Display deployment success
        if (!isLoading) {
            if (submitted && !error) {
                console.log(JSON.stringify(provisionDeploymentResponse));
                return (<TenantResult enterpriseName={enterpriseName} tenantHid={enterpriseHid}
                                      tenantId={provisionDeploymentResponse.id.id} scopeId={this.state.scopeId[0]}
                                      aliasIds={provisionDeploymentResponse.hasOwnProperty("aliases") ? provisionDeploymentResponse.aliases : false}
                                      header={"Success!"} info={"Tenant Deployment Complete"}/>);
            }
        }
        return (<div className="container">
            <div className="row">
                <div className="col-sm-12">

                    <h2 className="p-2 text-center">Tenant Provisioning Found</h2>
                    <p className="text-center">Scope ID has not been provisioned for this Tenant yet</p>
                    <hr/>
                    <div className="row justify-content-center">
                        <div className="alert alert-secondary text-center col-md-6">
                            <strong>Enterprise: </strong>{enterpriseName}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Tenant Hid</label>
                        <input className="form-control" id="tenantHid"
                               value={enterpriseHid} readOnly/>
                    </div>

                    <div className="form-group">
                        <label>Tenant Id</label>
                        <input id="tenantId" className="form-control" value={tenant.tenantId.id}
                               readOnly/>
                    </div>

                    <div className="form-group">
                        <label>Scope Id</label>
                        {unprovisionedScopes ?
                            <select className="custom-select my-1 mr-sm-2" id="scopeId" onChange={this.handleChange}
                                    defaultValue={'default'}>
                                {unprovisionedScopes.map((scopeId) => {
                                    return <option value={scopeId}>{scopeId}</option>;
                                })}
                            </select> : ": None"}
                    </div>

                    <div className="form-group">
                        <label>Tenant Alias Id's</label>
                        {aliasIds ? <ul className="list-group list-group-horizontal pb-2">
                            {tenant.tenantAliases.map(alias => {
                                return <li key={alias.id} className="list-group-item list-group-item-secondary"><strong>Alias
                                    ID:</strong> {alias.id}</li>
                            })}
                        </ul> : ""}
                    </div>

                    {isLoading ? (<div>
                        <button className="btn-custom disabled" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                            Loading...
                        </button>
                    </div>) : (<div>
                        <button onClick={this.handleScopeSubmit} className="btn-custom">Submit</button>
                    </div>)}

                </div>
            </div>
        </div>);


    }
}

function mapStateToProps(state) {
    return {
        tenants: state.tenant.response,
        isLoading: state.provisioning.isLoading,
        provisionDeploymentResponse: state.provisioning.provisionDeploymentResponse,
        environmentContext: state.environmentContext
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        provisionTenant,
        provisionTenantDeployment
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScopeDeploymentForm);
