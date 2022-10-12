const updateObject = (objRef, objKey, callBack) => {
	if(typeof callBack === 'function'){
	  objRef[objKey] = callBack(objRef[objKey])
	}
	return objRef;
  }
  function sanitizeObject(obj, callBack,){
	if(typeof obj === 'object' && obj !== null) {
		Object.keys(obj).forEach(objKey => {
			if(typeof obj[objKey] === 'string') {
				return updateObject(obj, objKey, callBack)
		  	}else {
				return sanitizeObject(obj[objKey], callBack)
			}
		})
	}
	return obj;
  }

module.exports = sanitizeObject;