export const fizzbuzz = (number) => {
  if (typeof number !== 'number') throw new Error('Debería ser un número')
  if (Number.isNaN(number)) throw new Error('Debería ser un número')

  const multiplos = { 3: 'fizz', 5: 'buzz' }
  let result = ''

  Object.entries(multiplos).forEach(([multiplo, word]) => {
    if (number % multiplo === 0) result += word
  })

  return result === '' ? number : result
}
