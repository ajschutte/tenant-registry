import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {queryTenant} from '../../actions/tenantActions';
import {fetchEnterpriseHierarchy} from "../../actions/actions";
import MGEnterprisePicker from '../EnterpriseTree/MGEnterprisePicker';
import {history} from '../../helpers/history';
import BreadCrumbs from "./BreadCrumbs";


class EnterpriseHierarchy extends Component {
    state = {
        enterpriseName: [""],
        treeData: {},
        tenantId: "",
        selectedEnterprise: {},
        previousEnterprises: [],
        queryTenant: false
    };

    componentDidMount() {
        const {isLoadingEnterprises, enterprises, location, environmentContext} = this.props;

        // Convert the scopeIds to a list and save for later use
        localStorage.setItem("scopeIds", JSON.stringify(environmentContext.scopeIds[0].split(',')));

        // Put root enterprise in breadcrumb
        this.setState(prevState => ({
            previousEnterprises: [...prevState.previousEnterprises, location.enterpriseName],
            selectedEnterprise: {}
        }));


        //If user refreshes then send back to Home to avoid state errors
        if (!isLoadingEnterprises && JSON.stringify(enterprises) === '{}') {
            history.replace("/Home");
            window.location.reload(false);
        }
    }

    handleSubmit = () => {
        const {selectedEnterprise} = this.state;

        const provisioned = JSON.stringify(this.props.tenantData) !== '[]';
        const enterpriseSelected = Object.entries(selectedEnterprise).length !== 0;

        //A enterprise must be selected before submitting
        if (enterpriseSelected) {
            // Persist name and hid to be used later
            localStorage.setItem("enterpriseHid", selectedEnterprise.hid);
            localStorage.setItem("enterpriseName", selectedEnterprise.name);

            if (!provisioned) {
                history.push({
                    pathname: '/provisionTenantForm'
                });
            } else {
                history.push({
                    pathname: '/scopeDeploymentForm'
                });
            }
        }
    };

    fetchChildren = e => {
        const {selectedEnterprise, previousEnterprises} = this.state;

        const enterpriseSelected = Object.entries(selectedEnterprise).length !== 0;
        const provisioned = JSON.stringify(this.props.tenantData) !== '[]';

        // Prevent duplicates and null values
        if (enterpriseSelected && !previousEnterprises.includes(selectedEnterprise.name) && !provisioned) {

            // Keep track of parent enterprises
            this.setState(prevState => ({
                previousEnterprises: [...prevState.previousEnterprises, selectedEnterprise.name],
                selectedEnterprise: {}
            }));

            //fetch children
            this.props.fetchEnterpriseHierarchy(this.state.selectedEnterprise.name);
        }
    }

    fetchParent = parentEnterprise => {

        const {previousEnterprises} = this.state;

        // Find index of selected parent and remove everything after
        previousEnterprises.length = previousEnterprises.indexOf(parentEnterprise) + 1;

        this.setState(prevState => ({
            previousEnterprises,
            selectedEnterprise: {}
        }));

        this.props.fetchEnterpriseHierarchy(parentEnterprise);
    }

    renderAlert = (tenantId, scopeIds) => {
        scopeIds = scopeIds.map(scope => scope.scopeId.id);
        if (tenantId) {
            return (<div className="alert alert-info mt-2" role="alert">
                    A tenant with one or more deployments have already been associated at this
                    level with <strong>tenantID = {tenantId}</strong> and <strong>scopeID(s) = {scopeIds.join(",")}</strong>
                </div>);
        }
    }

    handleRowSelect = (row) => {
        this.setState({selectedEnterprise: row});
    };


    render() {
        const {isLoadingEnterprises, isLoadingTenant, tenantData} = this.props;
        const {previousEnterprises, selectedEnterprise} = this.state;
        let hasTenantProvisioned = false;

        if (tenantData && JSON.stringify(tenantData) !== '[]' && JSON.stringify(selectedEnterprise) !== '{}') {
            hasTenantProvisioned = true;
        }

        if (!isLoadingEnterprises) {
            return (<div className="container">
                <h2 className="mt-2 pt-2 pb-2 text-center">Select Enterprise</h2>
                <nav>
                    <ol className="breadcrumb">
                        {previousEnterprises.map(enterprise => {
                            return <BreadCrumbs onBreadCrumbClick={this.fetchParent} value={enterprise}/>
                        })}
                    </ol>
                </nav>
                <MGEnterprisePicker onClick={this.handleRowSelect}/>
                <hr/>
                {isLoadingTenant ? (<div>
                        <button className="btn-custom disabled" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                            Loading...
                        </button>
                        <button className="btn-custom disabled float-right" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                            Loading...
                        </button>
                    </div>) : (<div>
                        <button className="btn-custom" onClick={this.handleSubmit}>Next</button>
                        <button className="btn-custom float-right" onClick={this.fetchChildren}>Get Children</button>
                    </div>)}
                {hasTenantProvisioned ? this.renderAlert(tenantData[0].tenantId.id, tenantData) : ""}
            </div>);
        }
        else {
            return (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>);
        }
    }
}

function mapStateToProps(state) {
    return {
        enterprises: state.enterpriseHierarchy.enterpriseHierarchy,
        isLoadingEnterprises: state.enterpriseHierarchy.isLoading,
        isLoadingTenant: state.tenant.isLoading,
        tenantData: state.tenant.response,
        error: state.enterpriseHierarchy.error,
        environmentContext: state.environmentContext
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        queryTenant,
        fetchEnterpriseHierarchy
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterpriseHierarchy);
