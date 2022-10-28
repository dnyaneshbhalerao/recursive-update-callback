if (Number(!process.versions.node.includes("14"))) {
  const assert = require('node:assert/strict');
  const sanitizeObject = require("./main.js")

  // Premitive object test
  assert.deepEqual(sanitizeObject("string", prop =>prop + " new", true), "string new")
  console.log("string test passed")

  assert.deepEqual(sanitizeObject(1, prop =>prop + 2), 3)
  console.log("number test passed")

  assert.deepEqual(sanitizeObject(null, prop =>prop + 2), null)
  console.log("null test passed")

  assert.deepEqual(sanitizeObject(undefined, prop =>prop + 2), undefined)
  console.log("undefined test passed")
  
  assert.deepEqual(sanitizeObject(true, prop =>prop + 2), true)
  console.log("boolean test passed")
  
  //Test for object one level without clone
  const objToUpdate = {
    propertyToupdate: "/sometext/"
  }
  const expected = sanitizeObject(objToUpdate, function (propValue) {
    return propValue + "update"
  })
  assert.deepEqual(expected, {
    propertyToupdate: "/sometext/update"
  })
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
  const actualNestedObj = sanitizeObject(nestedObj, function (propValue) {
    return propValue + "update"
  })
  assert.deepEqual(actualNestedObj, {
    nestedObjLevel1: {
        nestedObjLevel2: [{
            nestedObjLevel3: "some stringupdate"
        }],
        test : "/sometext/update"
    }
  } )
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
  
  // Test for object clone
  const objTNotUpdate = {
    nestedObjLevel1: {
        nestedObjLevel2: [{
            nestedObjLevel3: "some string",
            nestedSubLevel3: null
        }],
        test : "/sometext/"
    }
  }
  const actualClone = sanitizeObject(objTNotUpdate, function (propValue) {
    return propValue + " update"
  }, true)
  assert.deepEqual(actualClone, {
    nestedObjLevel1: {
        nestedObjLevel2: [{
            nestedObjLevel3: "some string update",
            nestedSubLevel3: null
        }],
        test : "/sometext/ update"
    }
  })
  console.log("Object clone Test Passed");

  const arrCloneNotToUpdate = [{
   test: "without append"
  }]
  const actualCloneArray = sanitizeObject(arrCloneNotToUpdate, function (oldValue) {
    return oldValue + " append this string"
  }, true);

  assert.deepEqual(actualCloneArray, [{
    test: "without append append this string"
   }])
  console.log("Array Clone one level Test Passed");

  // Nested array Test 

  const nestedTestArray = [{
    test: null
  },
  "my old",
  [{
    test3: [{
      nested: "to be appended by"
    }]
  }]
  ]
  const actualTestArray1 = sanitizeObject(nestedTestArray,(prpty) =>prpty + " append", true)

  assert.deepEqual(actualTestArray1, [{
    test: null
  },
  "my old append",
  [{
    test3: [{
      nested: "to be appended by append"
    }]
  }]
  ])
  console.log("Array Clone nested array expected Test passed")
  assert.deepEqual(nestedTestArray,  [{
    test: null
  },
  "my old",
  [{
    test3: [{
      nested: "to be appended by"
    }]
  }]
  ])
  console.log("Array Clone nested array do not modify ref Test Passed");
  
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
  assert.deepEqual(sanitizeObject(objectToUpdate, function (propValue){
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

  const arrayRefToUpdate2 = [{
      test: "test"
    },
      "my old value",
    [{
      test2: [{
        nested: "to be appended by"
      }]
    }]
  ]
  assert.deepEqual(sanitizeObject(arrayRefToUpdate2, function (propValue) {
    return propValue + " append"
  }, true), [{
    test: "test append"
  },
  "my old value append",
  [{
    test2: [{
      nested: "to be appended by append"
    }]
  }]
  ])
  console.log("Test example 4 passed")
  const testme = [[["MYSTRY"]]]
  assert.deepEqual(sanitizeObject(testme, function (propValue) {
    return propValue + " append"
  }, true), [[["MYSTRY append"]]],)
  assert.deepEqual(testme, [[["MYSTRY"]]],)
  console.log("************HURRAY**************")
  console.log("All Tests Passed")
}
