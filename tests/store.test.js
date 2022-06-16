// deno test --unstable --watch
//
import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.136.0/testing/asserts.ts";
import {
    describe, it, beforeEach
} from "https://deno.land/std@0.136.0/testing/bdd.ts";

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
        let s = new Store('store.js')
        s.set('foo', {a: 123})
        var a = globalThis.sessionStorage.getItem('store.js')
        assertEquals(a, null)

        s.save()
        a = globalThis.sessionStorage.getItem('store.js')
        assert(a)

        s.trim() // clear all local
        s.load() // laods from session-storage
        assertEquals(s.get(), {foo:{a:123}})

        s.reset() // remove from local-storage too
        a = globalThis.sessionStorage.getItem('store.js')
        assertEquals(a, null)

    })
})
