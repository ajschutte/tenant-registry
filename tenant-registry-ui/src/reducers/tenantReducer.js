import {
    QUERY_TENANTS_BY_HID_PENDING,
    QUERY_TENANTS_BY_HID_SUCCESS,
    QUERY_TENANTS_BY_HID_ERROR
} from "../actions/index";

const initialState = {
    isLoading: false,
    error: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case QUERY_TENANTS_BY_HID_PENDING:
            return {
                ...state,
                isLoading: true,
                response: []
            };
        case QUERY_TENANTS_BY_HID_SUCCESS:
            return (state = {
                ...state,
                isLoading: false,
                response: action.payload.data,
                error: {}
            });
        case QUERY_TENANTS_BY_HID_ERROR:
            return (state = {
                ...state,
                isLoading: false,
                error: action.error
            });
        default:
            return state;
    }
}
