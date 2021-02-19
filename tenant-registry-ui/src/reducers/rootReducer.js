import {combineReducers} from "redux";
import enterpriseReducer from './enterpriseReducer';
import environmentContextReducer from './environmentContextReducer';
import tenantReducer from './tenantReducer';
import provisioningReducer from './provisioningReducer';


const rootReducer = combineReducers({
    enterpriseHierarchy: enterpriseReducer,
    environmentContext: environmentContextReducer,
    tenant: tenantReducer,
    provisioning: provisioningReducer
});

export default rootReducer;
