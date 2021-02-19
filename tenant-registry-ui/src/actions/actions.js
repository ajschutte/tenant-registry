import axios from "axios";
import {
    BASE_URL,
    FETCH_ENVIRONMENT_CONTEXT_SUCCESS,
    FETCH_ENVIRONMENT_CONTEXT_ERROR,
    FETCH_ENTERPRISE_HIERARCHY_PENDING,
    FETCH_ENTERPRISE_HIERARCHY_SUCCESS,
    FETCH_ENTERPRISE_HIERARCHY_ERROR
} from "./index";
import {history} from '../helpers/history';


export function fetchEnvironmentContext() {
    const url = BASE_URL + "/environment-context";

    return function (dispatch) {
        axios({
            method: "GET",
            url: url
        })
            .then(response => {
                dispatch({
                    type: FETCH_ENVIRONMENT_CONTEXT_SUCCESS,
                    payload: response
                });
            })
            .catch(error => dispatch({
                type: FETCH_ENVIRONMENT_CONTEXT_ERROR,
                error: error
            }));
    };
}

export function fetchEnterpriseHierarchy(enterprise) {
    const url = BASE_URL + "/enterprise-hierarchy";

    return function (dispatch) {
        dispatch({
            type: FETCH_ENTERPRISE_HIERARCHY_PENDING
        });

        axios({
            method: "GET",
            url: url,
            headers: {},
            params: {
                maxDepth: 1,
                anchorEnterpriseName: enterprise
            }
        })
            .then(response => {
                dispatch({
                    type: FETCH_ENTERPRISE_HIERARCHY_SUCCESS,
                    payload: response
                });
            })
            .catch(error => dispatch({
                type: FETCH_ENTERPRISE_HIERARCHY_ERROR,
                error: error
            }));
    };
}

