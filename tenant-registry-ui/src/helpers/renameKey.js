const mapShortToLong = {
    'enterpriseId': 'key', 'enterpriseName': 'label', 'children': 'nodes'
};

export function refit_keys(o){
    var build, key, destKey, value;

    build = {};
    for (key in o) {
        // Get the destination key
        destKey = mapShortToLong[key] || key;

        // Get the value
        value = o[key];

        // If this is an object, recurse
        if (typeof value === "object") {
            value = refit_keys(value);
        }

        // Set it on the result using the destination key
        build[destKey] = value;
    }
    return build;
}
