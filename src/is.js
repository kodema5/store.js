export const isEmpty = (a) => (a==null) || (a==='') || (Array.isArray(a) && a.length===0)

export const isString = (a) => (typeof a === 'string')

export const isBoolean = (a) => (typeof a === 'boolean')

export const isFunction = (a) => (typeof a === 'function')

export const isObject = (a) => (a !== null && a instanceof Object && a.constructor === Object)

export const arrayFrom = (val) => (val === undefined || val===null) ? []
	: Array.isArray(val) ? val
	: [val]
