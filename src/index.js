import * as Obj from './obj.js'

export { Obj }

export * as Is from './is.js'

export class Store {
    constructor(id , initial = {}) {
        if (!id) throw new Error('store id required')
        this.id = id
        this.value = initial
    }

    set(path, values) {
        this.value = Obj.set(this.value || {}, path, values)
        this.save()
        return this
    }

    get(path, defaultValue) {
        return (this.value && path)
            ? Obj.get(this.value, path, defaultValue)
            : this.value
    }

    trim(path) {
        if (path) {
            Obj.trim(this.value, path)
        } else {
            this.value = {}
        }
        return this
    }

    // local storage
    //
    save() {
        globalThis.localStorage.setItem(this.id, JSON.stringify(this.value))
        return this
    }

    load() {
        let s = window.localStorage.getItem(this.id)
        this.value = Obj.parse(s) || {}
        return this
    }

    reset() {
        this.value = {}
        globalThis.localStorage.removeItem(this.id)
        return this
    }
}

// var store = new Store('web')
// store.load()
// globalThis.addEventListener('beforeunload', () => store.save())