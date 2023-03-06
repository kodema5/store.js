import { isEmpty, isObject, } from "./is.js"
import * as Arr from "./arr.js"

export let clean = (obj) => {
    let v = {}
    for (let k in obj) {
        let a = obj[k]
        if (isEmpty(a)) continue
        v[k] = a
    }
    return v
}

export let set = (root, path, value) => {

    let keys = path.split('.')
    let lastKey = keys.pop()

    var r = root || {}
    keys.forEach(k => {
        if (!r.hasOwnProperty(k)) r[k] = {}
        r = r[k]
    })

    r[lastKey] = value

    return root
}

export let get = (root, path, defaultValue) => {
    let keys = path.split('.')
    let r = root || {}
    for (let k of keys) {
        if (!r.hasOwnProperty(k)) return defaultValue
        r = r[k]
    }
    return r
}

export let trim = (root, path) => {
    let keys = path.split('.')
    let lastKey = keys.pop()

    var r = root || {}
    for (let k of keys) {
        if (!r.hasOwnProperty(k)) return false
        r = r[k]
    }

    return delete r[lastKey]
}

export let parse = (str, defaultValue) => {
    try {
        return JSON.parse(str)
    } catch(x) {
        return defaultValue
    }
}

export let merge = (obj,...bs) => {
    Array.from(bs).filter(Boolean).forEach((b) => {

        for (let [k,v] of Object.entries(b)) {
            let a = obj[k]

            // merge object
            if (isObject(a) && isObject(v)) {
                obj[k] = {...a, ...v}
            }

            // merge array
            else if (Array.isArray(a)) {
                obj[k] = [
                    ...a,
                    ...(Arr.from(v))
                ]
            }

            // replacement
            else {
                obj[k] = v
            }
        }
    })
    return obj
}