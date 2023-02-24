import { isFunction } from "./is.js"
export let from = (a) => isFunction(a) ? a : ( () => a)