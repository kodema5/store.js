
export let toSnake = (str, delimiter='_') => {
    return str.replace(
            /[A-Z]/g,
            (s, i) => (i===0 ? '' : delimiter) + s.toLowerCase()
        )
}


export let toCamel = (str) => {
    return str
        .toLowerCase()
        .replace(
            /[^a-zA-Z0-9]+(.)/g,
            (m, chr) => chr.toUpperCase()
        )
}

