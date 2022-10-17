const updateObject = (objRef, objKey, callBack) => {
	if (typeof callBack === 'function') {
		objRef[objKey] = callBack(objRef[objKey])
	}
	return objRef;
}
function sanitizeObject(obj, callBack, isclone = false) {
	if (typeof obj === 'object' && obj !== null) {
		Object.keys(obj).forEach(objKey => {
			let tempObj = obj[objKey]
			if (typeof tempObj === 'string' || typeof tempObj === 'number') {
				return updateObject(obj, objKey, callBack)
			} else {
				if (isclone) {
					return Array.isArray(tempObj) ? [...sanitizeObject(tempObj, callBack, isclone)] : { ...sanitizeObject(tempObj, callBack, isclone) }
				} else {
					return sanitizeObject(tempObj, callBack, isclone)
				}
			}
		})
	}
	return obj;
}

module.exports = sanitizeObject;