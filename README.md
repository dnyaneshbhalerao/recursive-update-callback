[![Node.js Package](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/npm-publish.yml)
[![Node.js CI](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/node.js.yml/badge.svg)](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/node.js.yml)


# Update each Object attribute with call back

## Example for object

```
var recursiveObjectUpdate = require("recursive-object-update")
recursiveObjectUpdate({
    test: {
        test: {
            test: {
                test: {
                    propery: "old data"
                }
            }
        }
    }
}, function (propValue){
    return propValue + " mydata"
})

// O/P

{
    test: {
        test: {
            test: {
                test: {
                    propery: "old data mydata"
                }
            }
        }
    }
}
```

## Example for array
```
var recursiveObjectUpdate = require("recursive-object-update")
recursiveObjectUpdate([{
        test: "test"
    },
        "my old value",
    [{
        test3: [{
            nested: "to be appended by"
        }]
    }]
], function (propValue) {
    return propValue + " append"
})

// O/P
[{
        test: "test append"
    },
        "my old value append",
    [{
        test3: [{
            nested: "to be appended by append"
        }]
    }]
]
```
