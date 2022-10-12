if (Number(!process.versions.node.includes("14"))) {
    const assert = require('node:assert/strict');
    const sanitizeObject = require("./main.js")

    const actual = sanitizeObject({
        propertyToupdate: "/sometext/"
    }, function (propValue) {
        return propValue + "update"
    });

    const expected = {
        propertyToupdate: "/sometext/update"
    }

    assert.equal(JSON.stringify(actual), JSON.stringify(expected))
    console.log("Object Test Passed");

    const actualArray = sanitizeObject([{
        test: "test"
    },
        "my old value",
    [{
        test3: [{
            nested: "to be appended by"
        }]
    }]
    ], function (oldValue) {
        return oldValue + " append this string"
    });

    const expectedArray = [{
        test: "test append this string"
    },
        "my old value append this string",
    [{
        test3: [{
            nested: "to be appended by append this string"
        }]
    }]
    ]

    assert.equal(JSON.stringify(actualArray), JSON.stringify(expectedArray))
    console.log("Array Test Passed");

}
