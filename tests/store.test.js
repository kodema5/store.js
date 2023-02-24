import {
    assert,
    assertEquals,
    describe,
    it,
} from './deps.js'
import { Store } from '../mod.js'

describe('store', () => {

    it('can store', () => {
        let s = new Store('store.js')
        s.set('foo', {a: {b: {c:111}, d:222}})

        assertEquals(s.get('foo.a.b.c'), 111) // traverse
        assertEquals(s.get('foo.a.b.c.d', 2), 2) // default

        assertEquals(s.trim('foo.a.b').get('foo'), {a:{d:222}})
        assertEquals(s.get(), {foo:{a:{d:222}}})
        assertEquals(s.trim().get(), {}) // to clear all local
    })


    it('can session-storage', () => {
        let s = new Store('store.js', { store: globalThis.localStorage })
        s.set('foo', {a: 123})
        var a = globalThis.localStorage.getItem('store.js')
        assert(a, {foo:{a:123}})

        s.trim() // clear all local
        s.load() // laods from session-storage
        assertEquals(s.get(), {foo:{a:123}})

        s.reset() // remove from local-storage too
        a = globalThis.localStorage.getItem('store.js')
        assertEquals(a, null)

    })
})
