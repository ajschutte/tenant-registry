import React from 'react';
import {Link} from 'react-router-dom';

const TenantResult = ({enterpriseName, tenantId, tenantHid, scopeId, scopeIds, aliasIds, header, info}) => {

    return (<div className="container text-center">
            <div className="row mt-3 pt-3">
                <div className="col-sm-12">
                    <h2>{header}</h2>
                    <p>{info}</p>
                    <hr/>
                    <ul className="list-group list-group-horizontal p-3 justify-content-center">
                        <li className="list-group-item list-group-item-secondary"><strong>Enterprise Name:</strong> {enterpriseName}
                        </li>
                    </ul>
                    <ul className="list-group list-group-horizontal p-3 justify-content-center">
                        <li className="list-group-item list-group-item-secondary"><strong>Tenant HID:</strong> {tenantHid}</li>
                        <li className="list-group-item list-group-item-secondary"><strong>Tenant ID:</strong> {tenantId}</li>
                        {scopeId ?
                            <li className="list-group-item list-group-item-secondary"><strong>Scope ID:</strong> {scopeId} </li> :
                            <li className="list-group-item list-group-item-secondary"><strong>Scope ID(s):</strong> {scopeIds.join(
                                ",")} </li>}

                    </ul>
                    {aliasIds ? <ul className="list-group list-group-horizontal p-3 justify-content-center">
                        {aliasIds.map(alias => {
                            return <li key={alias.id} className="list-group-item list-group-item-secondary"><strong>Alias
                                ID:</strong> {alias.id}</li>
                        })}
                    </ul> : ""}
                    <Link className="btn-custom" to="/Home">Return Home</Link>
                </div>
            </div>
        </div>);
}

export default TenantResult;
