const updateObject = (objRef, objKey, callBack, isClone) => {
  if (typeof callBack === 'function') {
    objRef[objKey] = callBack(objRef[objKey]);
  }
  return objRef;
}

function sanitizeObject(obj, callBack, isClone = false) {
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(objKey => {
      let tempObjValue = obj[objKey]
      if(isClone) {
        obj = Array.isArray(obj) ? [...obj] : {...obj};
      }
      if (typeof tempObjValue === 'string' || typeof tempObjValue === 'number') {
        return updateObject(obj, objKey, callBack, isClone)
      }else {
        return sanitizeObject(tempObjValue, callBack, isClone)
      }      
    })
  }
  return obj;
}

module.exports = sanitizeObject;