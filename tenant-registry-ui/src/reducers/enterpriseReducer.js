import {
    FETCH_ENTERPRISE_HIERARCHY_PENDING, FETCH_ENTERPRISE_HIERARCHY_SUCCESS, FETCH_ENTERPRISE_HIERARCHY_ERROR
} from "../actions/index";

const initialState = {
    isLoading: false,
    enterpriseHierarchy: {},
    error: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ENTERPRISE_HIERARCHY_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_ENTERPRISE_HIERARCHY_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
                enterpriseHierarchy: action.payload.data.anchorEnterprise,
                error: {}
            });
        case FETCH_ENTERPRISE_HIERARCHY_ERROR:
            return (state = {
                ...state,
                isLoading: false,
                error: action.error
            });
        default:
            return state;
    }
}
