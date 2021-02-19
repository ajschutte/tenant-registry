import axios from "axios";
import {
    BASE_URL,
    HEADERS,
    QUERY_TENANTS_BY_HID_PENDING,
    QUERY_TENANTS_BY_HID_SUCCESS,
    QUERY_TENANTS_BY_HID_ERROR,
    PROVISION_TENANT_PENDING,
    PROVISION_TENANT_SUCCESS,
    PROVISION_TENANT_ERROR,
    PROVISION_TENANT_DEPLOYMENT_PENDING,
    PROVISION_TENANT_DEPLOYMENT_SUCCESS,
    PROVISION_TENANT_DEPLOYMENT_ERROR
} from "./index";

export function queryTenant(environmentContext, enterpriseHID) {
    const url = BASE_URL + "/tenants/deployments/provisioning/byEnterpriseHid";

    return function (dispatch) {
        dispatch({
            type: QUERY_TENANTS_BY_HID_PENDING
        });

        axios({
            method: "POST",
            url: url,
            headers: HEADERS,
            params: {},
            data: {
                "@class" : "com.mg.tenant.models.TenantProvisioning",
                "applicationId": {
                    "id": environmentContext.applicationId
                },
                "environmentId": {
                    "id": environmentContext.environmentId
                },
                "enterpriseHid": {
                    "hid": enterpriseHID
                }
            }
        })
            .then(response => {
                dispatch({
                    type: QUERY_TENANTS_BY_HID_SUCCESS,
                    payload: response
                });
            })
            .catch(error => dispatch({
                type: QUERY_TENANTS_BY_HID_ERROR,
                error: error
            }));
    };
}

export function provisionTenant(environmentContext, tenantHid, tenantId, scopeId, tenantAliases ) {
    const url = BASE_URL + "/tenants/provisioning";

    // Optional Params
    let aliasJSON;
    let scopeIdJSON;

    // Generate JSON object to send
    const json = {
        "@class" : "com.mg.tenant.models.TenantProvisioning",
        "tenantId": {
            "id": tenantId
        },
        "applicationId": {
            "id": environmentContext.applicationId
        },
        "environmentId": {
            "id": environmentContext.environmentId
        },
        "tenantHid": {
            "hid": tenantHid
        }
    };

    // Generate JSON for optional params if they are defined
    if (tenantAliases.length > 0) {
        aliasJSON = generateTenantAliasJSON(tenantAliases);
        json.tenantAliases = aliasJSON;
    }
    if (scopeId) {
        scopeIdJSON = {"id" : scopeId};
        json.scopeId = scopeIdJSON;
    }


    return function (dispatch) {
        dispatch({
            type: PROVISION_TENANT_PENDING
        });

        axios({
            method: "POST",
            url: url,
            headers: HEADERS,
            params: {},
            data: json
        })
            .then(response => {
                dispatch({
                    type: PROVISION_TENANT_SUCCESS,
                    payload: response
                });
            })
            .catch(error => dispatch({
                type: PROVISION_TENANT_ERROR,
                error: error
            }));
    };
}

export function provisionTenantDeployment(tenantObject, scopeId) {
    const url = BASE_URL + "/tenants/deployments/provisioning";

    // Generate JSON object to send
    const json = {
        "@class" : "com.mg.tenant.models.TenantProvisioning",
        "tenantId": tenantObject.tenantId,
        "applicationId": tenantObject.applicationId,
        "environmentId": tenantObject.environmentId,
        "tenantHid": tenantObject.tenantHid,
        "scopeId": {
           "id" : scopeId
        }
    };

    if (tenantObject.hasOwnProperty('tenantAliases')) {
        json.tenantAliases = tenantObject.tenantAliases
    }

    return function (dispatch) {
        dispatch({
            type: PROVISION_TENANT_DEPLOYMENT_PENDING
        });

        axios({
            method: "POST",
            url: url,
            headers: HEADERS,
            params: {},
            data: json
        })
            .then(response => {
                dispatch({
                    type: PROVISION_TENANT_DEPLOYMENT_SUCCESS,
                    payload: response
                });
            })
            .catch(error => dispatch({
                type: PROVISION_TENANT_DEPLOYMENT_ERROR,
                error: error
            }));
    };
}


function generateTenantAliasJSON(tenantAlias) {
    let tenantAliasJSON = [];

    tenantAlias.map((id) => {
        tenantAliasJSON.push({"id" : id.displayValue});
    });

    return tenantAliasJSON;
}


