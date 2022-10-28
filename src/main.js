function sanitizeObject(obj, callBack, isClone = false) {
    let tempObj = obj;
    if(typeof callBack === 'function' && (typeof tempObj === 'string' || typeof tempObj === 'number')){
      return callBack(tempObj)
    }else if(typeof tempObj === 'object' && tempObj !== null){
      tempObj = isClone ? (Array.isArray(tempObj) ? [...tempObj] : {...tempObj}) : tempObj;
      Object.keys(tempObj).forEach(objKey => {
        const valueOfobject = tempObj[objKey]
        if(typeof valueOfobject === 'string' || typeof valueOfobject === 'number'){
          tempObj[objKey] = callBack(tempObj[objKey])
        }else {
          tempObj[objKey] = sanitizeObject(valueOfobject, callBack, isClone)
        }
      })
    } 
    return tempObj;
}

module.exports = sanitizeObject;