if (Number(!process.versions.node.includes("14"))) {
  const assert = require('node:assert/strict');
  const sanitizeObject = require("./main.js")
  
  //Test for object
  const objToUpdate = {
    propertyToupdate: "/sometext/"
  }
  const expected = sanitizeObject(objToUpdate, function (propValue) {
    return propValue + "update"
  })
  assert.equal(JSON.stringify(objToUpdate), JSON.stringify(expected))
  console.log("Object Test Passed");

  //Test for array of object
  const arrToUpdate = [{
    test: "test"
  },
  "my old value",
  [{
    test3: [{
      nested: "to be appended by"
    }]
  }]
  ]
  const expectedArray = sanitizeObject(arrToUpdate, function (oldValue) {
    return oldValue + " append this string"
  });

  assert.equal(JSON.stringify(arrToUpdate), JSON.stringify(expectedArray))
  console.log("Array Test Passed");

  //Test for object clone
  const objTNotUpdate = {
    propertyToupdate: "/sometext/"
  }
  const expectedClone = sanitizeObject(objToUpdate, function (propValue) {
    return propValue + "update"
  })
  assert.notDeepEqual(JSON.stringify(objTNotUpdate), JSON.stringify(expectedClone))
  console.log("Object clone Test Passed");

  const arrCloneNotToUpdate = [{
    test: "test"
  },
  "my old value",
  [{
    test3: [{
      nested: "to be appended by"
    }]
  }]
  ]
  const expectedCloneArray = sanitizeObject(arrToUpdate, function (oldValue) {
    return oldValue + " append this string"
  });

  assert.notDeepEqual(JSON.stringify(arrCloneNotToUpdate), JSON.stringify(expectedCloneArray))
  console.log("Array Clone Test Passed");

}
