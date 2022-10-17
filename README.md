[![Node.js Package](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/npm-publish.yml)
[![Node.js CI](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/dnyaneshbhalerao/recursive-update-callback/actions/workflows/node.js.yml)


# Update each Object attribute with call back 

## Introduction

Welcome to recursive update object attribute with callback. This library is intented to update/sanitize the string and number value which reside in the nested object or nested array. It has provision to directly update object reference which is passed as first arguement. If you wanted to replicate (clone) the object structure please pass true as value to third argument.

For better understanding of the librabry please refer to examples given below.

#### NOTE: Don't forget to return from callback.

#### Important!!! stabale release version is 1.1.4

### Steps to install library
npm command to install
```
npm i recursive-object-update 
```
yarn command
```
yarn add recursive-object-update
```

## Example for object Modification

```
var recursiveObjectUpdate = require("recursive-object-update")
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
recursiveObjectUpdate(objectToUpdate, function (propValue){
  return propValue + " mydata"
})

// O/P : => update object reference

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

## Example for array modification
```
var recursiveObjectUpdate = require("recursive-object-update")
const arrayRefToUpdate = [{
    test: "test"
  },
    "my old value",
  [{
    test3: [{
      nested: "to be appended by"
    }]
  }]
]
recursiveObjectUpdate(arrayRefToUpdate, function (propValue) {
  return propValue + " append"
})

// O/P => update array reference
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

## Example for object clone with third argument set true

```
var recursiveObjectUpdate = require("recursive-object-update")
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
recursiveObjectUpdate(objectToUpdate, function (propValue){
  return propValue + " mydata"
}, true)

// O/P : => Does not update object reference

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

## Example for array modification with third argument set true
```
var recursiveObjectUpdate = require("recursive-object-update")
const arrayRefToUpdate = [{
    test: "test"
  },
    "my old value",
  [{
    test3: [{
      nested: "to be appended by"
    }]
  }]
]
recursiveObjectUpdate(arrayRefToUpdate, function (propValue) {
  return propValue + " append"
}, true)

// O/P => Does not update reference
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

