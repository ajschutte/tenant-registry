import {
   FETCH_ENVIRONMENT_CONTEXT_SUCCESS, FETCH_ENVIRONMENT_CONTEXT_ERROR
} from "../actions/index";

const initialState = {
    applicationId: "",
    environmentId: "",
    scopeIds: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ENVIRONMENT_CONTEXT_SUCCESS:
            return (state = {
                ...state,
                applicationId: action.payload.data.applicationId,
                environmentId: action.payload.data.environmentId,
                scopeIds: action.payload.data.scopeIds,
                error: {}
            });
        case FETCH_ENVIRONMENT_CONTEXT_ERROR:
            console.log(action);
            return (state = {
                ...state,
                error: action.error
            });
        default:
            return state;
    }
}
