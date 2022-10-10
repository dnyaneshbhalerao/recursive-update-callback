const sanitizeObject = require("./main.js")
console.log(sanitizeObject({
    propertyToupdate: "/sometext/"
}, function(propValue){
    return propValue + "update"
}))
