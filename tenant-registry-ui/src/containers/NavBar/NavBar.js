import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import "./NavBar.css"

class NavBar extends Component {
    render() {
        const {environmentContext} = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark nav-custom mb-2">
                <a className="navbar-brand">Tenant Registry | </a>
                <button className="navbar-toggler" type="button"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="btn btn-sm btn-outline-light" to="/Home">Home</Link>
                        </li>
                    </ul>
                    <span className="nav-custom-text">
                        <strong> App ID: </strong> {environmentContext.applicationId} |
                        <strong> Env ID: </strong>{environmentContext.environmentId}  |
                        <strong> Scope Ids: </strong>[{environmentContext.scopeIds ?
                            environmentContext.scopeIds.map((scopeId) => {
                                return scopeId;
                            })
                         : ""}]
                    </span>
                </div>
            </nav>);
    }
}

function mapStateToProps(state) {
    return {
        environmentContext: state.environmentContext
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {},
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
