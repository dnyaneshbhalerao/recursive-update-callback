if (Number(!process.versions.node.includes("14"))) {
  const assert = require('node:assert/strict');
  const sanitizeObject = require("./main.js")
  
  //Test for object one level without clone
  const objToUpdate = {
    propertyToupdate: "/sometext/"
  }
  const expected = sanitizeObject(objToUpdate, function (propValue) {
    return propValue + "update"
  })
  assert.deepEqual(objToUpdate, expected)
  console.log("Object one level without clone Test Passed");

  // Test for nested level
  const nestedObj = {
    nestedObjLevel1: {
        nestedObjLevel2: [{
            nestedObjLevel3: "some string"
        }],
        test : "/sometext/"
    }
  }
  const expectedNestedObj = sanitizeObject(nestedObj, function (propValue) {
    return propValue + "update"
  })
  assert.deepEqual(nestedObj, expectedNestedObj)
  console.log("Object Nested without clone Test Passed");

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

  assert.deepStrictEqual(arrToUpdate, expectedArray)
  console.log("Array without clone Test Passed");

  //Test for object clone
  const objTNotUpdate = {
    nestedObjLevel1: {
        nestedObjLevel2: [{
            nestedObjLevel3: "some string"
        }],
        test : "/sometext/"
    }
  }
  const expectedClone = sanitizeObject(objTNotUpdate, function (propValue) {
    return propValue + " update"
  }, true)
  assert.deepEqual(objTNotUpdate, expectedClone)
  console.log("Object clone Test Passed");

  const arrCloneNotToUpdate = [{
   test: "without append"
  }]
  const expectedCloneArray = sanitizeObject(arrCloneNotToUpdate, function (oldValue) {
    return oldValue + " append this string"
  }, true);

  assert.deepEqual(arrCloneNotToUpdate, expectedCloneArray)
  console.log("Array Clone one level Test Passed");

  // Test 
  const nestedTestArray = [{
    test: "test"
  },
  "my old",
  [{
    test3: [{
      nested: "to be appended by"
    }]
  }]
  ]
  const expectedTestArray = sanitizeObject(nestedTestArray,(prpty) =>prpty + " append", true)

  assert.notDeepEqual(nestedTestArray, expectedTestArray)
  console.log("Array Clone nested array Test Passed");
  
  //Test example 1
  var objectToUpdate1 = {
    test: {
      test: {
        test: {
          test: {
            propery: "old data"
          }
        }
      }
    }
  }
  assert.deepStrictEqual(sanitizeObject(objectToUpdate1, propValue=>(propValue + "mydata"), false), objectToUpdate1)
  console.log("Test example 1 passed")

  // Test example 2

  const arrayRefToUpdate = [{
      test: "test"
    },
    "my old value",
    [{
      test3: [{
      nested: "to be appended by"
    }]}]
  ]

  assert.deepStrictEqual(sanitizeObject(arrayRefToUpdate, function (propValue) {
    return propValue + " append"
  }), arrayRefToUpdate)
  console.log("Test example 2 passed")

  //Test example 3
  var objectToUpdate = {
    test: {
      test: {
        test: {
          test: {
            propery: "old data"
          }
        }
      }
    }
  }
  assert.notDeepEqual(sanitizeObject(objectToUpdate, function (propValue){
        return propValue + " mydata"
      }, true),{
        test: {
          test: {
            test: {
              test: {
                propery: "old data mydata"
              }
            }
          }
        }
      })
    console.log("Test example 3 passed")
}
