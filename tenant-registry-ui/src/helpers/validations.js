const validateHid = Hid => {
    const regexp = /^([1-9]+[0-9]*:)+$/;
    return regexp.test(Hid);
}

const validateHidParent = (Hid, parentHid) => {
    return parentHid.startsWith(Hid);
}

const validateTenantId = id => {
    const regexp = /^[A-Za-z0-9-_]{5,20}$/;
    return regexp.test(id);
}

const validateScopeId = id => {
    if (!id) {
        return true;
    }
    const regexp = /^[A-Za-z0-9-_]{3,15}$/;
    return regexp.test(id);
}

export function performValidation(tenantId, scopeId, aliasIds) {
    let validationError = false;
    let validationErrorMsg = "";

    if (!validateTenantId(tenantId[0]) || !tenantId[0]) {
        validationError = true;
        validationErrorMsg = "Tenant id value not valid";
    }
    // else if (scopeId[0] && !validateScopeId(scopeId[0])) {
    //     validationError = true;
    //     validationErrorMsg = "Scope id value not valid";
    // }
    else if (aliasIds) {
        aliasIds.map((id) => {
            if (!validateTenantId(id.displayValue)) {
                validationError = true;
                validationErrorMsg = "A Tenant alias id value is not valid";
            }
        });
    } else {
        validationError = false;
        validationErrorMsg = "";
    }

    return {validationError, validationErrorMsg};
}
