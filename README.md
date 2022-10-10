[![Node.js Package](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/npm-publish.yml/badge.svg?branch=v1.0.6)](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/npm-publish.yml)


# Update each Object attribute with call back

## Example

```
var recursiveObjectUpdate = require("recursive-object-update")
console.log(recursiveObjectUpdate({test: {
    test: {
        test: {
            test: {
            propery: "old data"
            }
        }
    }
}}, function (propValue){
    return propValue + " mydata"
}))
