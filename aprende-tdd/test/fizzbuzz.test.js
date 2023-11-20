import { describe, expect, it } from 'vitest'
import { fizzbuzz } from '../src/fizzbuzz'

// Escribir una función que al pasarle un número:
// - Muestra "fizz" si es múltiplo de 3.
// - Muestra "buzz" si es múltiplo de 5.
// - Muestra "fizzbuzz" si es múltiplo de 3 y de 5.
// - Muestra el número si no es múltiplo de ninguno de los anteriores.

// La idea de TDD es ir construyendo nuestra función a medida que va pasando los test

// 1
// const fizzbuzz = () => {}

// 2
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
// }

// 3
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')
// }

// 4
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')

//   return 1
// }

// 5
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')

//   return number
// }

// 6
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')

//   if (number === 3) return 'fizz'

//   return number
// }

// 7
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')

//   if (number % 3 === 0) return 'fizz'

//   return number
// }

// 9
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')

//   if (number % 3 === 0) return 'fizz'
//   if (number === 5) return 'buzz'

//   return number
// }

// 10
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')

//   if (number % 3 === 0) return 'fizz'
//   if (number % 5 === 0) return 'buzz'

//   return number
// }

// 11
// const fizzbuzz = (number) => {
//   if (typeof number !== 'number') throw new Error('Debería der un número')
//   if (Number.isNaN(number)) throw new Error('Debería der un número')

//   if (number % 15 === 0) return 'fizzbuzz'
//   if (number % 3 === 0) return 'fizz'
//   if (number % 5 === 0) return 'buzz'

//   return number
// }

describe('fizzbuzz', () => {
  // NOTA: este test lo hemos comentado posteriormente porque ya es redundante
  //   it('1 - deberia ser una función', () => {
  //     expect(typeof fizzbuzz).toBe('function')
  //   })

  it('2 - mostrar error si no tiene un número como parametro', () => {
    expect(() => fizzbuzz()).toThrow()
  })

  it('3 - mostrar error específico si no tiene un número como parametro', () => {
    expect(() => fizzbuzz()).toThrow('Debería der un número')
    expect(() => fizzbuzz(NaN)).toThrow('Debería der un número')
  })

  it('4 - debería retornar 1 si le pasamos el número 1', () => {
    expect(fizzbuzz(1)).toBe(1)
  })

  it('5 - debería retornar 2 si le pasamos el número 2', () => {
    expect(fizzbuzz(2)).toBe(2)
  })

  it('6 - debería retornar "fizz" si le pasamos el número 3', () => {
    expect(fizzbuzz(3)).toBe('fizz')
  })

  it('7 - debería retornar "fizz" si le pasamos un número que sea múltiplo de 3', () => {
    expect(fizzbuzz(6)).toBe('fizz')
    expect(fizzbuzz(9)).toBe('fizz')
    expect(fizzbuzz(12)).toBe('fizz')
  })

  // este test lo hemos comentado porque ya esta cubierto en nuestra función
  //   it('8 - debería retornar 4 si le pasamos el número 4', () => {
  //     expect(fizzbuzz(4)).toBe(4)
  //   })

  it('9 - debería retornar "buzz" si le pasamos el número 5', () => {
    expect(fizzbuzz(5)).toBe('buzz')
  })

  it('10 - debería retornar "buzz" si le pasamos un número que sea múltiplo de 5', () => {
    expect(fizzbuzz(10)).toBe('buzz')
    expect(fizzbuzz(20)).toBe('buzz')
  })

  it('11 - debería retornar "fizzbuzz" si le pasamos un número que sea múltiplo de 3 y de 5', () => {
    expect(fizzbuzz(15)).toBe('fizzbuzz')
  })
})
