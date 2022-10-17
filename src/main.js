const updateObject = (objRef, objKey, callBack, isClone) => {
  if (typeof callBack === 'function') {
    objRef[objKey] = callBack(objRef[objKey]);
  }
  return objRef;
}
function sanitizeObject(obj, callBack, isClone = false) {
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(objKey => {
      let tempObj = obj[objKey]
      if (typeof tempObj === 'string' || typeof tempObj === 'number') {
        if(isClone) {
          obj = Array.isArray(obj) ? [...obj] : {...obj};
        }
        return updateObject(obj, objKey, callBack, isClone)
      }else {
        return sanitizeObject(tempObj, callBack, isClone)
      }
    })
  }
  return obj;
}

module.exports = sanitizeObject;