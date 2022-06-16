import * as Obj from './obj.js'

export { Obj }

export * as Is from './is.js'

export class Store {
    constructor(id , initial = {}) {
        if (!id) throw new Error('store id required')
        this.id = id
        this.state = initial
    }

    set(path, value) {
        Obj.set(this.state, path, value)
        return this
    }

    get(path, defaultValue) {
        return (this.state && path)
            ? Obj.get(this.state, path, defaultValue)
            : this.state
    }

    trim(path) {
        if (path) {
            Obj.trim(this.state, path)
        } else {
            this.state = {}
        }
        return this
    }

    // session storage
    //
    save() {
        globalThis.sessionStorage.setItem(this.id, JSON.stringify(this.state))
        return this
    }

    load() {
        let s = window.sessionStorage.getItem(this.id)
        this.state = Obj.parse(s)
        return this
    }

    reset() {
        this.state = {}
        globalThis.sessionStorage.removeItem(this.id)
        return this
    }
}

// var store = new Store('web')
// store.load()
// globalThis.addEventListener('beforeunload', () => store.save())