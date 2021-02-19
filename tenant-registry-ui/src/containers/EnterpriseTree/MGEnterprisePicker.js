import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {refit_keys} from '../../helpers/renameKey';
import TreeMenu from 'react-simple-tree-menu';
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import "./MGEnterprisePicker.css"
import {queryTenant} from '../../actions/tenantActions';
import {fetchEnterpriseHierarchy} from '../../actions/actions';

class MGEnterprisePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodeRoot: [],
            parentEnterprise: ""
        };
    }

    componentDidMount() {
        // Rename object keys to work with TreeMenu component
        this.setState({nodeRoot: refit_keys(this.props.enterprises)});
    }

    onRowClick = (row) => {
        this.setState({ parentEnterprise: row.name });
        this.props.queryTenant(this.props.environmentContext, row.hid);
    }

    render() {
        return (<div className="enterpriseTree card">
                <TreeMenu data={[this.state.nodeRoot]} onClickItem={({key, label, ...props}) => {
                    this.onRowClick({
                        hid: props.enterpriseHid.hid,
                        name: label
                    });
                    this.props.onClick({
                        hid: props.enterpriseHid.hid,
                        name: label
                    });
                }}/>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        enterprises: state.enterpriseHierarchy.enterpriseHierarchy,
        tenants: state.tenant.response,
        environmentContext: state.environmentContext
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        queryTenant,
        fetchEnterpriseHierarchy
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MGEnterprisePicker);
