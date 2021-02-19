import React, {Component, useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {provisionTenant} from '../../actions/tenantActions';
import {performValidation} from '../../helpers/validations';
import {TagInput} from 'reactjs-tag-input';
import {TenantAliasInputStyle, TenantAliasInputWrapperStyle} from './TenantStyles';
import TenantResult from '../../components/Tenant/TenantResult';


class TenantProvisioningForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enterpriseHid: "",
            enterpriseName: "",
            tenantId: "",
            scopeId: "",
            scopeIds: [],
            tenantAlias: [],
            validationError: false,
            validationErrorMsg: "",
            submitted: false
        };
    }

    componentDidMount() {
        const enterpriseHid = localStorage.getItem("enterpriseHid");
        const enterpriseName = localStorage.getItem("enterpriseName");
        const scopeIds = JSON.parse(localStorage.getItem("scopeIds"));

        this.setState({
            enterpriseHid,
            enterpriseName,
            scopeIds
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: [e.target.value]
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const {tenantAlias, tenantId, enterpriseHid, scopeIds} = this.state;
        let {scopeId} = this.state;

        // Validate all fields
        const validations = performValidation(tenantId, null, tenantAlias);

        this.setState({
            validationError: validations.validationError,
            validationErrorMsg: validations.validationErrorMsg
        });

        // If no validation errors then provision/deploy tenant
        if (!validations.validationError) {
            this.setState({submitted: true});
            this.props.provisionTenant(this.props.environmentContext, enterpriseHid, tenantId[0], scopeId[0], tenantAlias);
        }
    };

    onAliasChange = tenantAlias => {
        this.setState({tenantAlias})
    }

    //Display Alert Box with error info
    renderAlert() {
        const {error} = this.props;
        const {validationError} = this.state;

        if (error.response || validationError) {
            return (<div className="alert alert-danger fade show mt-2" role="alert">
                <strong>Error:</strong> {validationError ? this.state.validationErrorMsg : error.response.data.message}
            </div>);
        }
    }


    render() {
        const {enterpriseName, enterpriseHid, tenantAlias, submitted, scopeIds, scopeId} = this.state;
        const {error, provisionResponse, isLoading} = this.props;

        if (!isLoading) {
            if (submitted && !error.response) {
                return (<TenantResult enterpriseName={enterpriseName} tenantHid={enterpriseHid}
                                      tenantId={provisionResponse.id.id} scopeId={scopeId ? scopeId : [scopeIds[0]]}
                                      aliasIds={provisionResponse.hasOwnProperty("aliases") ? provisionResponse.aliases : false}
                                      header={"Success!"} info={"Tenant Provisioning Complete"}/>);
            }
        }

            return (<div className="container">
                <div className="row">
                    <div className="col-sm-12">

                        <h2 className="p-2 text-center">No Tenant Provisioning's Found</h2>
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
                            <input id="tenantId" className="form-control" onChange={this.handleChange}
                                   placeholder="Custom Tenant ID"/>
                        </div>

                        <div className="form-group">
                            <label>Scope Id (Optional)</label>
                            {scopeIds ?
                                <select className="custom-select my-1 mr-sm-2" id="scopeId" onChange={this.handleChange}
                                        defaultValue={'default'}>
                                    {scopeIds.map((scopeId) => {
                                        return <option value={scopeId}>{scopeId}</option>;
                                    })}
                                </select> : ": None"}
                        </div>

                        <div className="form-group">
                            <label>Tenant Alias Id's (Optional)</label>
                            <TagInput tags={tenantAlias} onTagsChanged={this.onAliasChange}
                                      inputStyle={TenantAliasInputStyle} wrapperStyle={TenantAliasInputWrapperStyle}
                            />
                        </div>

                        {isLoading ? (<div>
                            <button className="btn-custom disabled" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                                Loading...
                            </button>
                        </div>) : (<div>
                            <button onClick={this.handleSubmit} className="btn-custom">Submit</button>
                        </div>)}

                        {this.renderAlert()}
                    </div>
                </div>
            </div>);

    }
}

function mapStateToProps(state) {
    return {
        tenant: state.tenant.response[0],
        isLoading: state.provisioning.isLoading,
        provisionResponse: state.provisioning.provisionResponse,
        provisionDeploymentResponse: state.provisioning.provisionDeploymentResponse,
        error: state.provisioning.error,
        environmentContext: state.environmentContext
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        provisionTenant
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TenantProvisioningForm);
