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
