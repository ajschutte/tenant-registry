import {
    PROVISION_TENANT_PENDING,
    PROVISION_TENANT_SUCCESS,
    PROVISION_TENANT_ERROR,
    PROVISION_TENANT_DEPLOYMENT_PENDING,
    PROVISION_TENANT_DEPLOYMENT_SUCCESS,
    PROVISION_TENANT_DEPLOYMENT_ERROR
} from "../actions/index";

const initialState = {
    isLoading: false,
    error: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROVISION_TENANT_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case PROVISION_TENANT_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
                provisionResponse: action.payload.data,
                error: {}
            });
        case PROVISION_TENANT_ERROR:
            console.log(JSON.stringify(action.error.response));
            return (state = {
                ...state,
                isLoading: false,
                error: action.error
            });

        case PROVISION_TENANT_DEPLOYMENT_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case PROVISION_TENANT_DEPLOYMENT_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
                provisionDeploymentResponse: action.payload.data,
                error: {}
            });
        case PROVISION_TENANT_DEPLOYMENT_ERROR:
            return (state = {
                ...state,
                isLoading: false,
                error: action.error
            });
        default:
            return state;
    }
}
