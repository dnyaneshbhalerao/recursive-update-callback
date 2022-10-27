const updateObject = (objRef, objKey, callBack) => {
  if (typeof callBack === 'function') {
    objRef[objKey] = callBack(objRef[objKey]);
  }
  return objRef;
}

function sanitizeObject(obj, callBack, isClone = false) {
  if ((typeof obj === 'string' || typeof obj === 'number' )&& obj !== null && typeof callBack === "function") {
    return callBack(obj)
  }
  
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(objKey => {
      const tempObjValue = obj[objKey];
      if(isClone && typeof tempObjValue === 'object') {
        obj = Array.isArray(obj) ? [...obj] : {...obj};
      }
      if (typeof tempObjValue === 'string' || typeof tempObjValue === 'number') {
        return updateObject(obj, objKey, callBack)
      }else {
        return sanitizeObject(tempObjValue, callBack, isClone)
      }       
    })
  }
  return obj;
}

module.exports = sanitizeObject;