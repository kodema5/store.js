import {
    assert,
    assertEquals,
    describe,
    it,
} from './deps.js'
import { Is, Arr, Obj, Fn, Str, } from '../mod.js'



describe('util', () => {
    it('arr', () => {
        assertEquals(Arr.from(), [])
        assertEquals(Arr.from(1), [1])
        assertEquals(Arr.from([1]), [1])
    })

    it('is', () => {
        assert(Is.isBoolean(true))
        assert(Is.isEmpty())
        assert(Is.isEmpty(null))
        assert(Is.isEmpty(undefined))
        assert(Is.isEmpty([]))
        assert(Is.isEmpty(''))
        assert(!Is.isEmpty(0))

        assert(Is.isFunction(()=>{}))
        assert(!Is.isFunction(1))

        assert(!Is.isObject(new Date()))
        assert(Is.isObject({}))
        assert(!Is.isObject(null))

        assert(Is.isString(''))
    })

    it('fn', ()=> {
        assertEquals( Fn.from(1)(), 1)
        assertEquals( Fn.from(()=>1)(), 1)
    })

    it('obj', () => {
        let a = {}
        assertEquals(Obj.set(a,'a.b.c',1).a.b.c, 1)
        assertEquals(Obj.get(a,'a.b'), {c:1})
        assertEquals(Obj.get(a,'a.b.x',123), 123)

        a.d = null
        a = Obj.clean(a)
        assert(!('d' in a))

        Obj.trim(a, 'a.b')
        assertEquals(a, {a:{}})

        // save parse
        assertEquals(Obj.parse('xxxxxx', 123), 123)

        assertEquals(
            Obj.merge(
                {a:{b:1}, d:[1], e:[]},
                {a:{c:1}}, // object merge
                {d:2, e:[3]}, // array merge
                {f:4}, // assign
            ),
            {
                "a": {"b": 1,"c": 1},
                "d": [1,2],
                "e": [3],
                "f": 4
            }
        )
    })

    it('str', () => {
        assertEquals(Str.toSnake('ToUpperCase'), 'to_upper_case')
        assertEquals(Str.toCamel('to_upper_case'), 'toUpperCase')
    })

})
