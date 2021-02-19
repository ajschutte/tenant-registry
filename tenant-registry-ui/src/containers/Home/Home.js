import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import{history} from '../../helpers/history';

//Actions
import {fetchEnterpriseHierarchy, fetchEnvironmentContext} from "../../actions/actions";


class Home extends Component {
    state = {
        enterpriseName: [""],
        submitted: false
    };

    componentDidMount() {
        this.props.fetchEnvironmentContext();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.submitted && !this.props.isLoading && !this.props.error.error.message) {
            history.push({
                pathname: '/enterprise-hierarchy',
                enterpriseName: this.state.enterpriseName[0]
            });
        }
    }


    handleChange = e => {
        this.setState({
            [e.target.id]: [e.target.value]
        });
    };


    handleSubmit = e => {
        e.preventDefault();

        const {environmentContextError} = this.props;

        // Make sure EnvironmentContext is configured
        if (JSON.stringify(environmentContextError) === '{}') {
            this.props.fetchEnterpriseHierarchy(this.state.enterpriseName[0]);
            this.setState({submitted: true});
        }
    };

    renderAlert() {
        if (this.props.error.error.message) {
            return (<div className="alert alert-danger fade show mt-2" role="alert">
                    <strong>Error:</strong> No enterprises's found!
                </div>);
        }
        if (this.props.environmentContextError && this.props.environmentContextError.message) {
            return (<div className="alert alert-danger fade show mt-2" role="alert">
                <strong>Error:</strong> Application ID and/or Environment ID not configured
            </div>);
        }
    }


    render() {
        const {isLoading} = this.props;

        return (
            <div className="container">
                <div className="row justify-content-center mt-5 mb-3">
                    <div className="col">
                        <h1 className="text-center">Welcome Admin</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 form">
                        <div className="form-group">
                            <label>Enterprise Name</label>
                            <input className="form-control" id="enterpriseName" onChange={this.handleChange}
                                   placeholder="e.g: MercuryGate"/>
                        </div>
                        {isLoading ? (
                            <button className="btn-custom disabled" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                                Loading...
                            </button>
                        ) : (
                            <button type="submit" id="searchEnterprise" className="btn-custom" onClick={this.handleSubmit}>Search</button>
                        )}
                        <hr/>
                        {this.renderAlert()}
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        error: state.enterpriseHierarchy,
        environmentContextError: state.environmentContext.error,
        isLoading: state.enterpriseHierarchy.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchEnterpriseHierarchy,
        fetchEnvironmentContext
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
